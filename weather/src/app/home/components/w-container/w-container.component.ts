import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { filter, switchMap, takeWhile, tap } from 'rxjs/operators';

import {
  IChartData,
  IDataSet,
  ILocationDrop,
  MetricValue,
  WLocation,
} from '../../models/interfaces';
import { WeatherService } from '../../services/';

@Component({
  selector: 'app-w-container',
  templateUrl: './w-container.component.html',
  styleUrls: ['./w-container.component.scss'],
})
export class WContainerComponent implements OnInit, OnDestroy {
  minValue = moment('19100101');
  maxValue = moment('20171231');

  minValueEnd = moment('19100101');
  maxValueEnd = moment('20171231');

  locations: ILocationDrop[] = [
    { label: 'UK', value: WLocation.UK },
    { label: 'England', value: WLocation.England },
    { label: 'Scotland', value: WLocation.Scotland },
    { label: 'Wales', value: WLocation.Wales },
  ];

  form = this.fb.group({
    location: this.fb.control('', Validators.required),
    start: this.fb.control(null, Validators.required),
    end: this.fb.control(null, Validators.required),
  });

  dateSets: IChartData[] = [
    { data: [], label: `${MetricValue.Rainfall} (mm)` },
    { data: [], label: `${MetricValue.Tmax} (deg)` },
    { data: [], label: `${MetricValue.Tmin} (deg)` },
  ];

  dataLabels: string[] = [];
  lineChartOptions = {
    responsive: true,
  };

  lineChartColors = [
    {
      borderColor: 'rgba(100,100,200,0.6)',
    },
    {
      borderColor: 'rgba(200,0,0,1)',
    },
    {
      borderColor: 'rgba(0,0,220,1)',
    },
  ];

  private componentActive = true;

  ngOnInit() {
    combineLatest(
      this.form.controls.location.valueChanges,
      this.form.controls.start.valueChanges,
      this.form.controls.end.valueChanges
    )
      .pipe(
        filter(([l, s, e]) => !!s && !!e && !!l),
        takeWhile(() => this.componentActive),
        tap(([, s, e]) => {
          this.minValueEnd = s;
          this.maxValue = e;
        }),
        switchMap(([l, s, e]: [ILocationDrop, moment.Moment, moment.Moment]) =>
          this.getValues([s, e, l.value])
        )
      )
      .subscribe(([s, e, data]: [moment.Moment, moment.Moment, IDataSet[]]) => {
        const filteredData = data.filter(
          (d: IDataSet) =>
            moment(d.date).isSameOrAfter(s.startOf('month')) &&
            moment(d.date).isSameOrBefore(e.endOf('month'))
        );
        this.populateDataSet(filteredData);
        this.populateDataLabels(filteredData);
      });
    this.form.controls.start.setValue(moment().subtract(2, 'year'));
    this.form.controls.end.setValue(this.maxValueEnd.clone());
    this.form.controls.location.setValue(this.locations[0]);
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  constructor(private fb: FormBuilder, private service: WeatherService) {}

  private populateDataSet(values: IDataSet[]) {
    this.dateSets[0].data.length = 0;
    this.dateSets[1].data.length = 0;
    this.dateSets[2].data.length = 0;
    values.forEach((fv: IDataSet) => {
      this.dateSets[0].data.push(fv.rain);
      this.dateSets[1].data.push(fv.tmax);
      this.dateSets[2].data.push(fv.tmin);
    });
  }

  private populateDataLabels(values: IDataSet[]) {
    this.dataLabels = values.reduce(
      (p, c) => [...p, moment(c.date).format('MMM YYYY')],
      []
    );
  }

  private getValues([s, e, l]): Observable<
    [moment.Moment, moment.Moment, IDataSet[]]
  > {
    return forkJoin(
      this.service.getMetricsForInterval({
        location: l,
        metric: MetricValue.Rainfall,
      }),
      this.service.getMetricsForInterval({
        location: l,
        metric: MetricValue.Tmax,
      }),
      this.service.getMetricsForInterval({
        location: l,
        metric: MetricValue.Tmin,
      })
    ).pipe(
      filter(([r, max, min]) => !!r.length && !!max.length && !!min.length),
      switchMap(([r, max, min]) =>
        of([
          s,
          e,
          r.reduce(
            (p, c, ci) => [
              ...p,
              {
                date: `${c.year}${c.month < 10 ? `0${c.month}` : c.month}01`,
                tmin: min[ci].value,
                tmax: max[ci].value,
                rain: c.value,
              },
            ],
            []
          ),
        ] as [moment.Moment, moment.Moment, IDataSet[]])
      )
    );
  }
}

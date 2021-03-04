import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { AppService } from 'src/app/app.service';
import { LayoutService } from 'src/app/layout/layout.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  isActiveToday = true;
  isActiveYesterday = false;
  isActiveTomorrow = false;

  constructor(private appService: AppService, private layoutService: LayoutService) {
    this.appService.pageTitle = 'Dashboard';
   }

   options = {
    responsive: false,
    maintainAspectRatio: false
  };


  ngOnInit() {
    this.onClickToday();
  }

  onClickYesterday(){
    this.isActiveYesterday=true;
    this.isActiveToday=false;
    this.isActiveTomorrow=false;
  }

  onClickToday(){
    this.isActiveYesterday=false;
    this.isActiveToday=true;
    this.isActiveTomorrow=false;
  }

  onClickTomorrow(){
    this.isActiveYesterday=false;
    this.isActiveToday=false;
    this.isActiveTomorrow=true;
  }

  data5 = [{
    data: [ 272, 180, 100 ],
  }];
  colors5 = [{
    backgroundColor: [  '#36A2EB', '#FF6384', '#FFCE56' ],
    hoverBackgroundColor: [ '#36A2EB', '#FF6384', '#FFCE56' ]
  }];

  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective>;

  ngAfterViewInit() {
    setTimeout(() => {
      const resizeCharts = () => {
        this.charts.forEach(chart => chart.chart.resize());
      };

      // Initial resize
      resizeCharts();

      // For performance reasons resize charts on delayed resize event
      this.layoutService.on('resize.charts-demo', resizeCharts);
    });
  }

  ngOnDestroy() {
    setTimeout(() => this.layoutService.off('resize.charts-demo'));
  }

}

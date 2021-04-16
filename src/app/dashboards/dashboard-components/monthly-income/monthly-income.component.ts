import { Component, OnInit, ViewChild } from '@angular/core';
import {
	ApexAxisChartSeries,
	ApexChart,
	ChartComponent,
	ApexDataLabels,
	ApexYAxis,
	ApexLegend,
	ApexXAxis,
	ApexTooltip,
	ApexTheme,
	ApexGrid,
	ApexNonAxisChartSeries,
	ApexStroke,
	ApexPlotOptions
} from 'ng-apexcharts';


export type monthlyearningsChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	xaxis: ApexXAxis;
	yaxis: ApexYAxis;
	stroke: any;
	fill: any;
	theme: ApexTheme;
	tooltip: any;
	dataLabels: ApexDataLabels;
	legend: ApexLegend;
	colors: string[];
	markers: any;
	grid: ApexGrid;
};


@Component({
  selector: 'app-monthly-income',
  templateUrl: './monthly-income.component.html',
  styleUrls: ['./monthly-income.component.css']
})
export class MonthlyIncomeComponent implements OnInit {

  
	@ViewChild("chart") chart: ChartComponent = Object.create(null);
	public monthlyearningsChartOptions: Partial<monthlyearningsChartOptions>;

  constructor() { 

    this.monthlyearningsChartOptions = {
			series: [
				{
					name: 'Sales',
					data: [0, 50, 30, 60, 180, 120, 180, 80]
				},
				{
					name: 'Expense',
					data: [0, 100, 70, 100, 240, 180, 220, 140]
				},
				{
					name: 'Earning',
					data: [0, 150, 110, 240, 200, 200, 300, 200]
				}
			],
			chart: {
				height: 350,
				type: 'area',
				stacked: true,
				fontFamily: 'Montserrat,sans-serif',
				toolbar: {
					show: false
				}
			},
			dataLabels: {
				enabled: false
			},
			markers: {
				size: 0,
			},
			stroke: {
				curve: 'smooth',
				width: '2',
			},
			fill: {
				type: "solid",
				colors: ['#e9edf2', '#398bf7', '#7460ee'],
				opacity: 1
			},
			colors: ['#e9edf2', '#398bf7', '#7460ee'],
			legend: {
				show: false,
			},
			grid: {
				show: true,
				strokeDashArray: 0,
				borderColor: 'rgba(0,0,0,0.1)',
			},
			xaxis: {
				type: 'category',
				categories: [
					'January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug'
				],
				labels: {
					style: {
						colors: '#a1aab2'
					}
				}
			},
			yaxis: {
				labels: {
					style: {
						colors: '#a1aab2'
					}
				}
			},
			tooltip: {
				theme: 'dark',
				fillColors: ['#e9edf2', '#398bf7', '#7460ee']
			},
		};
  }

  ngOnInit(): void {
  }

}

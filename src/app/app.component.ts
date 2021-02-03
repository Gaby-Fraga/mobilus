import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'covid19';
  cases = [];
  avgCases = [];
  monthCases = [];  
  allCases = [];
  allDeaths = [];
  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource = new MatTreeNestedDataSource<any>();

  constructor(private appService: AppService){}

  ngOnInit(){

    this.appService.getCases().then((cases: any)=> {
      this.cases = cases;
      this.calculateTwoWeekAvg();
      this.calculateMonthCases();
    });

  }

  calculateTwoWeekAvg(){

    for(var x = 1; x <= 14; x++){
      var weekCases = [];
      for(var y = 0; y <= 7; y++){
        weekCases.push(this.cases[this.cases.length - x - y]);
      }
      this.avgCases.push({weekCases: weekCases, day: this.cases[this.cases.length - x]});
    }

    this.avgCases.forEach(day => {
      var weekDeathAvg = 0;
      day.weekCases.forEach((element, index) => {
        
        if(index < 7){
          var newDeaths = element.Deaths - day.weekCases[index + 1].Deaths;
          weekDeathAvg += newDeaths;
        }       
      });
      day.weekDeathAvg = weekDeathAvg / 7;
    });

    this.dataSource.data = this.avgCases;
  }

  calculateMonthCases(){

    var mostCases = 0;
    var mostDeaths = 0;

    this.allCases = [];
    this.allDeaths = [];

    for(var x = 1; x < 31; x++){
      var deaths = this.cases[this.cases.length - x].Deaths - this.cases[this.cases.length - x - 1].Deaths;
      var confirmed = this.cases[this.cases.length - x].Confirmed - this.cases[this.cases.length - x - 1].Confirmed;
      this.monthCases.push({day: this.cases[this.cases.length - x],
      deaths: deaths, confirmed: confirmed});
    }

    this.monthCases.forEach(element => {
      if(element.deaths > mostDeaths){
        this.allDeaths = [];
        this.allDeaths.push(element);
        mostDeaths = element.deaths;
      }else if (element.deaths == mostDeaths){
        this.allDeaths.push(element);
      }
      
      if(element.confirmed > mostCases){
        this.allCases = [];
        this.allCases.push(element);
        mostCases = element.confirmed;
      }else if (element.confirmed == mostCases){
        this.allCases.push(element);
      }
    });

  }

}

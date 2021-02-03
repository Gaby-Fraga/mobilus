import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'covid19';
  cases = {};

  constructor(private appService: AppService){}

  ngOnInit(){

    this.appService.getCases().then((cases: any)=> {
      debugger
      this.cases = cases;
    });

  }

}

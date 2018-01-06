import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import * as moment from 'moment';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {

    constructor(
        private dataService: DataService
    ){}

    public records: any;
    public singleRecord: any;
    public budget: number = 0;
    public filteredRecords: string[] = [];
    public status = [
            {
                name: 'new',
                number: 0
            },
            {
                name: 'working',
                number: 0
            },
            {
                name: 'delivered',
                number: 0
            },
            {
                name: 'archived',
                number: 0
            }
    ]
    public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'mm/dd/yyyy',
    };
    public fromDate: any;

    ngOnInit(){
        //ajax call to get json on load
        this.getRecords();
    }

    getRecords(){
        this.dataService.getRecords()
           .subscribe((response) => {
               //load data into view and call functions to manipulate data
               this.records = response;
               this.crunchNumbers();
           });
    }

    crunchNumbers(){
        this.averageBudget();
        this.getStatusAvg();
        this.cloneArray();
        this.singleRecord = this.records[0];
    }

    //loop through each status and add up each time it is used for analytics
    getStatusAvg(){
        for(let idx in this.records){
            for(var i in this.status){
                if(this.status[i].name === this.records[idx].status){
                    this.status[i].number++;
                }
            }
        }
    }

    //callback function when you select a date, pass in column to search, date selected, and boolean greater than or less than
    onDateSelect(key, event: IMyDateModel, bool) {
        this.searchDates(key, event.epoc, bool);
    }

    searchDates(key, value, gtr){
        //clear values on click of 'X'
        if(value === 0){
            this.searchRecords('title', '');
        //search through records and compare date in each col and date selected, return ones that match
        } else {
            this.filteredRecords = this.filteredRecords.filter((record) => {
                if(record[key] !== 'TBD'){
                    let ts = moment(record[key], 'MM/DD/YYYY').unix();
                    if(gtr){
                        if(ts >= value){
                            console.log('date less than ' + record[key]);
                            return record[key];
                        }
                    } else {
                        if(ts <= value){
                            console.log('date greater than ' + record[key]);
                            return record[key];
                        }
                    }
                }
            });
        }
    }

    //search through records for each value in text field, pass in column to search, and search value
    searchRecords(key, value){
        this.filteredRecords = this.records.filter((record) => {
            console.log(record[key]);
            return record[key].includes(value);
        });
    }

    //add up total budget and divide by length to get avg for analytics
    averageBudget() {
        for(let idx in this.records){
            this.budget += this.records[idx].budget;
        }
        this.budget = this.budget / this.records.length;
        return this.budget;
    }

    //deep clone array of records to manipulate in dashboard.  Can be called again to refresh data
    cloneArray(){
        this.filteredRecords = this.records.map((current, index) => {
            if(current.modified === null){
                current.modified = 'TBD';
            }
            return Object.assign({}, current);
        });
        //console.log(this.filteredRecords);
    }
}

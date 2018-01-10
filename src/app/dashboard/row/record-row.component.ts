import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: '[record-row]',
  templateUrl: './record-row.html'
})

export class RowComponent implements OnInit {

    constructor(

    ){}

    @Input() record: any;
    public budget = false;
    public status = false;
    public owner = false;
    public statusLabels: string[] = ['new', 'working', 'delivered', 'archived'];

    ngOnInit(){

    }

    //toggle functions to edit and save data for each col that can be edited
    toggleOwner(record) {
        this.owner = !this.owner;
        this.saveMessage(record, this.owner);
    }
    toggleBudget(record) {
        this.budget = !this.budget;
        this.saveMessage(record, this.budget);
    }
    toggleStatus(record) {
        this.status = !this.status;
        this.saveMessage(record, this.status);
    }

    //eventually this would be hooked up to api call to save to DB.  Also use a global notification service to alert the user.
    saveMessage(record, value){
        if(!value){
            //if value is updated, save new date for 'modified' field
            var date = moment();
            record.modified = date.format('MM/DD/YYYY')
            alert('Data and Date Modified');
        }
    }


}

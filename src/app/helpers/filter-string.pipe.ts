import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'filterstring'})

//filter function to use *ngFor on object
export class FilterStringPipe implements PipeTransform {
    transform(value): any {
        if(value.includes('_')){
            var newstr = value.replace("_"," ");
            return newstr.substr(0, 1).toUpperCase() + newstr.substr(1);
        } else {
            return value.substr(0, 1).toUpperCase() + value.substr(1);
        }
    }
}

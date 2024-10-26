import { Injectable } from '@angular/core';
import { FireBaseService } from './fire-base.service';


@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private fireBaseService : FireBaseService) {}

  async getContentSize(){
    return (await this.fetchData()).length;
  }

  async fetchData() {
    return await this.fireBaseService.getData();
  }

  async fetchDataId(index : number){
    return (await this.fireBaseService.getData())[index];
  }
}
  

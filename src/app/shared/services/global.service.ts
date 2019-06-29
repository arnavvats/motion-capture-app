import { Injectable } from '@angular/core';
declare var Utils;
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  openCvutils = new Utils();
  constructor() {
    this.openCvutils.loadOpenCv(this.loadOpenCvCallback);
  }
  loadOpenCvCallback() {
    console.log('opencv loaded');
  }
}

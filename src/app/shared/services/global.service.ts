import { Injectable } from '@angular/core';
declare var Utils;
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  openCvutils = new Utils();
  constructor() {
  }
  loadOpenCv(callback) {
    this.openCvutils.loadOpenCv(callback);
  }
}

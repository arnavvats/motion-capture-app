import { Component } from '@angular/core';
import {GlobalService} from './shared/services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'motion-capture-app';
  openCvLoaded = false;
  constructor(private globalService: GlobalService) {
    this.globalService.loadOpenCv(() => {
      this.openCvLoaded = true;
      console.log('opencv loaded');
    });
  }
}

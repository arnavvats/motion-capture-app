import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {VideoService} from '../../services/video.service';

@Component({
  selector: 'app-video-output',
  templateUrl: './video-output.component.html',
  styleUrls: ['./video-output.component.scss']
})
export class VideoOutputComponent implements OnInit {
  @ViewChild('canvas', {static: true}) canvas: ElementRef;
  constructor(private videoService: VideoService) {
  }

  ngOnInit() {
    this.videoService.canvsOutput = this.canvas.nativeElement;
  }

}

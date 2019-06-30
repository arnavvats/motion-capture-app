import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {VideoService} from '../../services/video.service';

@Component({
  selector: 'app-video-input',
  templateUrl: './video-input.component.html',
  styleUrls: ['./video-input.component.scss']
})
export class VideoInputComponent implements OnInit {
  @ViewChild('video', {static: true}) video: ElementRef;
  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.videoService.videoInput = this.video.nativeElement;
    navigator.mediaDevices.getUserMedia({video: true})
      .then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.videoService.processVideo();
      });
  }

}

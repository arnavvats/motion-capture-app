import { Injectable } from '@angular/core';
import {GlobalService} from './global.service';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
declare var cv;
@Injectable({
  providedIn: 'root'
})
export class VideoService {
  videoInput: HTMLVideoElement = null;
  canvsOutput: HTMLCanvasElement = null;
  xPos = new BehaviorSubject(-1);
  constructor(globalService: GlobalService, private http: HttpClient) {
  }
  async processVideo() {
    const src = new cv.Mat(this.videoInput.height, this.videoInput.width, cv.CV_8UC4);
    const dst = new cv.Mat(this.videoInput.height, this.videoInput.width, cv.CV_8UC4);
    const gray = new cv.Mat();
    const cap = new cv.VideoCapture(this.videoInput);
    const faces = new cv.RectVector();
    const classifier = new cv.CascadeClassifier();
    await this.createFileFromUrl('haarcascade_frontalface_default_file.xml', 'haarcascade_frontalface_default.xml');
    const r = classifier.load('haarcascade_frontalface_default_file.xml');
    console.log(r);
    const FPS = 100;
    const detectFaces = () => {
      const begin = Date.now();
      cap.read(src);
      src.copyTo(dst);
      cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0);
      classifier.detectMultiScale(gray, faces, 1.1, 3, 0);
      const face = faces.get(0);
      if (face) {
        const point1 = new cv.Point(face.x, face.y);
        const point2 = new cv.Point(face.x + face.width, face.y + face.height);
        this.xPos.next(face.x + face.width / 2);
        cv.rectangle(dst, point1, point2, [255, 0, 0, 255]);
      }
      cv.imshow(this.canvsOutput, dst);

      const delay = 1000 / FPS - (Date.now() - begin);
      setTimeout(detectFaces, delay);
    };
    detectFaces();
  }

  createFileFromUrl(path, url) {
    return this.http.get(url, {responseType: 'arraybuffer'}).toPromise().then(res => {
      const data = new Uint8Array(res);
      cv.FS_createDataFile('/', path, data, true, false, false);
    });
  }
}

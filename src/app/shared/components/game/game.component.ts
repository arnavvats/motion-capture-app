import {Component, OnInit, ViewChild} from '@angular/core';
import {VideoService} from '../../services/video.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @ViewChild('gameCanvas', {static: true}) gameCanvas;
  ctx;
  width = 360;
  height = 240;
  ball = {
    x: this.width / 2,
    y: this.height - 20,
    dx: 5,
    dy: -5,
    r: 10
  };
  board = {
    x: this.width / 2 - 90,
    y: this.height - 10,
    h: 10,
    w: 180
  };
  points = 0;
  ballInterval;
  boardSubscription;
  highScore = 0;
  state = 'stop';
  constructor(private videoService: VideoService) { }

  ngOnInit() {
    const canvasEl: HTMLCanvasElement = this.gameCanvas.nativeElement;
    this.ctx = canvasEl.getContext('2d');
    this.reset();
    this.getHighScore();
    this.ctx.font = "24px Helvetica, Arial, sans-serif";
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('Press Button Below to Play', this.width / 2 - 120, this.height / 2);
  }
  reset() {
    this.ball = {
      x: this.width / 2,
      y: this.height - 20,
      dx: 5,
      dy: -5,
      r: 10
    };
    this.board = {
      x: this.width / 2 - 90,
      y: this.height - 10,
      h: 10,
      w: 180
    };
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0,0, this.width, this.height);
    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, this.ball.r, 0, 2 * Math.PI);
    this.ctx.fillStyle = '#fff';
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.fillRect(this.board.x, this.board.y, this.board.w, this.board.h);
  }
  play() {
    this.state = 'play';
    this.points = 0;
    this.reset();
    this.ballInterval =  setInterval(this.update.bind(this), 50);
    this.boardSubscription = this.videoService.xPos.subscribe(xPos => {
      this.updateBoard(xPos);
    });
  }
  stop() {
    this.state = 'stop';
    this.setHighScore(this.points);
    clearInterval(this.ballInterval);
    this.boardSubscription.unsubscribe();
    this.reset();
    this.ctx.fillStyle = 'red';
    this.ctx.fillText('Game Over', this.width / 2 - 40 , this.height / 2);
    this.ctx.fillText('Points : ' + this.points, this.width / 2 - 40, this.height / 2 + 40);
  }
  updateBall() {
    const x_min = this.ball.r;
    const x_max = this.width - this.ball.r;
    const y_max = this.height - this.ball.r - this.board.h;
    const y_min= this.ball.r;
    if (this.ball.x + this.ball.dx < x_min) {
      this.ball.x = x_min;
      this.ball.dx = 5;
    } else if (this.ball.x + this.ball.dx > x_max) {
      this.ball.x = x_max;
      this.ball.dx = -5;
    } else {
      this.ball.x += this.ball.dx;
    }
    if (this.ball.y + this.ball.dy < y_min) {
      this.ball.y = y_min;
      this.ball.dy = 5;
    } else if (this.ball.y + this.ball.dy > y_max) {
      if (this.ball.x < this.board.x || this.ball.x > this.board.x + this.board.w) {
        this.stop();
      } else {
        this.points += 10;
      }
      this.ball.y = y_max;
      this.ball.dy = -5;
    } else {
      this.ball.y += this.ball.dy;
    }

  }
  update() {
    this.updateBall();
    if (this.state === 'stop') return;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0,0, this.width, this.height);
    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, this.ball.r, 0, 2 * Math.PI);
    this.ctx.fillStyle = '#fff';
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.fillRect(this.board.x, this.board.y, this.board.w, this.board.h);
  }

  updateBoard(xPos) {
    xPos = Math.min(270, Math.max(90, xPos))
    xPos -= 90
    const centre = Math.round((xPos / 180) * this.width);
    const board_hw = Math.round(this.board.w / 2);
    if (centre - board_hw < 0) {
      this.board.x = 0;
    } else if (centre + board_hw > this.width) {
      this.board.x = this.width - this.board.w;
    } else {
      this.board.x = centre - board_hw;
    }
  }

  getHighScore() {
    let high_score = localStorage.getItem('high_score');
    if (high_score === null) {
      localStorage.setItem('high_score',  '0');
      this.highScore = 0;
    } else {
      this.highScore = parseInt(high_score);
    }

  }
  setHighScore(points) {
    this.highScore = Math.max(points, this.highScore);
    localStorage.setItem('high_score', this.highScore.toString());
  }

}

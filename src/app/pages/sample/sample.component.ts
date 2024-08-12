import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {

  videos = [
    {
      id: 0,
      title:'Birthday Ann 1080p',
      path:'sample/Birthday Ann (1080p).mp4'
    },
    {
      id: 1,
      title:'Birthday Jon 1080p',
      path:'sample/Birthday john (1080p).mp4',
    },
    {
      id: 2,
      title:'Birthday Mom 1080p',
      path:'sample/Birthday Mom (1080p).mp4'
    },
    {
      id: 3,
      title:'Birthday Dad 1080p',
      path:'sample/Birthday Dad (1080p).mp4'
    },
    {
      id: 4,
      title:'Birthday Grand Dad 1080p',
      path:'sample/Birthday Grand-Dad 1080p.mp4'
    },
    {
      id: 5,
      title:'Happy birthday 6',
      path:'sample/Happy birthday 6.mp4'
    },
    {
      id: 6,
      title:'Happy birthday 7',
      path:'sample/Happy birthday 7.mp4'
    },
    {
      id: 7,
      title:'Happy birthday 8',
      path:'sample/Happy birthday 8.mp4'
    },
    {
      id: 8,
      title:'Happy birthday 9',
      path:'sample/Happy birthday 9.mp4'
    },
    {
      id: 9,
      title:'Happy birthday 10',
      path:'sample/Happy birthday 10.mp4'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }
}

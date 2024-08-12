import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-sample-player',
  templateUrl: './sample-player.component.html',
  styleUrls: ['./sample-player.component.scss']
})
export class SamplePlayerComponent implements OnInit {
  activateRoute: ActivatedRoute;
  @ViewChild('video') video: ElementRef;
  
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

  url: string = '';

  service: ImageService;

  controls: string[] = [
    'nodownload',
    'nofullscreen',
    'noremoteplayback'
  ];

  constructor(
    _activateRoute: ActivatedRoute,
    _service: ImageService
  ) {
    this.activateRoute = _activateRoute;
    this.service = _service;
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      let file = this.videos.find (x => x.id == params['id']);
      this.service.getImageURL(file!.path).then(url => {
        this.url = url;
      })
    });
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

const { XMLParser} = require("fast-xml-parser/src/fxp");

class Emoticon{
  public emoji: string;
  public name: string;
}

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss']
})
export class EmojiComponent implements OnInit {
  @Output() SelectEvent = new EventEmitter<string>();

  http: HttpClient;

  emoticons: Emoticon[] = [];

  constructor(
    _http: HttpClient
  ){ 
    this.http = _http;
  }

  ngOnInit(): void {
    this.readXML();
  }

  readXML(){
    this.http.get('assets/emoticon.xml',
      {
        headers: new HttpHeaders()  
        .set('Content-Type', 'text/xml')  
        .append('Access-Control-Allow-Methods', 'GET')  
        .append('Access-Control-Allow-Origin', '*')  
        .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),  
        responseType: 'text'  
      }
    ).subscribe(data => {
      const parser = new XMLParser();
      let emoticons = parser.parse(data)['Emoticons']['Emoticon'];
      for(let i: number = 0; i < emoticons.length; i++){
        this.emoticons.push(emoticons[i] as Emoticon);
      }
    });
  }

  select(code: string){
    this.SelectEvent.emit(code);
  }
}

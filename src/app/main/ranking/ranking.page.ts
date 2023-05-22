import { Component, OnInit } from '@angular/core';
import {  firstValueFrom, of } from 'rxjs';
import { TesorosService } from 'src/core/services/tesoros.service';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {
  ranking: any[] = [];

  constructor(private tesorosServ: TesorosService) {}

  ngOnInit() {
    this.getData();
  }

  async getData() {
     (await this.tesorosServ.getranking()).docs.map(async (c) => {
     const user = await (this.tesorosServ.getUser(c.id))
     this.ranking.push({ id: c.id, data: c.data() ,user : user.data() });
    });
  }

  shared(){
    Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });
  } 
}

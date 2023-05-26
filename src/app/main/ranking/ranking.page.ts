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
      title: 'Ranking Buscadores de tesoros',
      text: 'Los jugadores con mas puntuaciones',
      url: 'http://localhost:8100/main/tabs/ranking',
      dialogTitle: 'Comparte con tus amigos',
    });
  } 
}

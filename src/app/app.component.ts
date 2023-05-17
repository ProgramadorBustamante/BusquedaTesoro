import { Component } from '@angular/core';
import { TesorosService } from 'src/core/services/tesoros.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private tesorrosServ : TesorosService) {
 
  //  tesorrosServ.test();
  }

  
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  implements OnInit {
  data : any ;
  constructor() { }

  ngOnInit() {
    console.log(this.data);
    
  }

}

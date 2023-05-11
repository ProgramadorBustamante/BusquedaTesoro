import { Component,OnDestroy } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnDestroy {
  textcode: string = "";
  content_visibility: string = '';

  constructor() {}

 
    async checkPermission() {
      try {
        // check or request permission
        const status = await BarcodeScanner.checkPermission({ force: true });
        if (status.granted) {
          // the user granted permission
          return true;
        }
        return false;
      } catch(e) {
        console.log(e);
        return false;
      }
    }
  
    async scanQr() {
      try {
        const permission = await this.checkPermission();
        if(!permission) {
          return;
        }
        await BarcodeScanner.hideBackground();
        document.querySelector('body')?.classList.add('scanner-active');
        this.content_visibility = 'hidden';
        const result = await BarcodeScanner.startScan();
        console.log(result);
        BarcodeScanner.showBackground();
        document.querySelector('body')?.classList.remove('scanner-active');
        this.content_visibility = '';
        if(result?.hasContent) {
          this.textcode = result.content;
          console.log(this.textcode);
        }
      } catch(e) {
        console.log(e);
        this.stopScan();
      }
    }
  
    stopScan() {
      BarcodeScanner.showBackground();
      BarcodeScanner.stopScan();
      document.querySelector('body')?.classList.remove('scanner-active');
      this.content_visibility = '';
    }
  
    ngOnDestroy(): void {
        this.stopScan();
    }


  
}

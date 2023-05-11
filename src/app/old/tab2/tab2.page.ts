import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { CameraSource } from '@capacitor/camera/dist/esm/definitions';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  imageUrl: string | undefined;

  constructor() {}

  async openCamera(){
    const image = await Camera.getPhoto({
      quality: 90,
      source :CameraSource.Prompt,
      resultType: CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    this.imageUrl = image.webPath;
  
    console.log(this.imageUrl);
    
    // Can be set to the src of an image now
    // imageElement.src = imageUrl;
  }
}

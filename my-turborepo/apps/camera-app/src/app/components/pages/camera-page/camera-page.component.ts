import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CameraRecorder } from '../../../CameraRecorder';
import { StreamClient } from '../../../StreamClient';

@Component({
  selector: 'app-camera-page',
  templateUrl: './camera-page.component.html',
  styleUrls: ['./camera-page.component.scss']
})
export class CameraPageComponent  implements AfterViewInit {
  private streamClient?: StreamClient;
  private cameraRecorder?: CameraRecorder;
  mediaStream?: MediaStream;
  constructor(@Inject(PLATFORM_ID) private _platform: Object) {}
  async ngAfterViewInit() {
    console.log(isPlatformBrowser(this._platform) ,'mediaDevices' in navigator)
    if(isPlatformBrowser(this._platform) && 'mediaDevices' in navigator) {
      
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      this.mediaStream = stream;
      this.streamClient = new StreamClient(stream,{candidateEndpointUrl: '/connect'});
    }
  }
  startStream() {
    console.log(this.streamClient)
    this.streamClient?.connectToServer();
  }


}

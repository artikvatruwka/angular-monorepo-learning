import { StreamingCamera } from './../../../../../../libs/streaming-camera/src/lib/streaming-camera';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Observable, interval } from 'rxjs';
@Component({
  selector: 'app-camera-preview',
  templateUrl: './camera-preview.component.html',
  styleUrls: ['./camera-preview.component.scss']
})
export class CameraPreviewComponent implements OnInit{
  // private cameraRecorder?: CameraRecorder;
  private videoPlayer?:  HTMLVideoElement | null;
  chunk?: Blob;

  constructor(private ref: ElementRef) {
    this.videoPlayer = (ref.nativeElement as HTMLElement).querySelector('video');
  }

  upload( blob: Blob) {
    new StreamingCamera();
    fetch('/upload', {
      method: 'POST',
      body: blob,
      'headers': {
        'Content-type': 'video/webm'
      }
    })
    .catch(error => {
      // Handle any errors that occur during the fetch
      alert('error occured')
    });
  }

  ngOnInit(): void {
    // this.cameraRecorder = new CameraRecorder();
    // this.cameraRecorder.init().then(()=>{
    //   if ( this.videoPlayer ) this.videoPlayer.srcObject = this.cameraRecorder?.stream!;
    //   this.cameraRecorder?.recordVideo(5000).then(file=>{
    //     if(file) this.upload(file);
    //   });

    // });
  }

  ngOnDestroy(): void {
    // this.cameraRecorder?.getTracks().forEach((track: MediaStreamTrack) => {
    //   track.stop();
    // });
  }
}

import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from '@angular/material/menu'
@Component({
  standalone: true,
  selector: 'ui-camera-preview',
  templateUrl: './camera-preview.component.html',
  styleUrls: ['./camera-preview.component.css'],
  imports: [MatButtonModule]
})
export class CameraPreviewComponent implements AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer!:  ElementRef<HTMLVideoElement> ;  
  @Input() mediaStream!: MediaProvider;
  @Input() onButtonClick!: () => void;
  ngAfterViewInit() {
    this.videoPlayer.nativeElement.srcObject = this.mediaStream;
    this.videoPlayer.nativeElement.onloadedmetadata = (e) => {
      this.videoPlayer.nativeElement.play();
    };
  }
  handleButtonClick() {
    console.log(":)")
    this.onButtonClick();
  }
}

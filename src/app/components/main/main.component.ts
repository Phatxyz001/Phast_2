import { Component, OnInit, ViewChild, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  public isMuted: boolean = true;

  @ViewChild('bgVideo') bgVideo: any;
  @ViewChild('iconVolume') iconVolume: any;
  @ViewChild('volumeInput') volumeInput: any;

  public volume: number = 0;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    const videoElement = this.bgVideo.nativeElement;

    this.isMuted = false; 
    this.volume = 100; 
    videoElement.volume = 1;
    this.volumeInput.nativeElement.value = 100;
    localStorage.setItem('volume', '100');

    videoElement.play().then(() => {
      videoElement.muted = false;
    }).catch(() => {
      const enableAudio = () => {
        videoElement.muted = false;
        videoElement.play();
        document.removeEventListener('click', enableAudio);
      };
      document.addEventListener('click', enableAudio);
    });

    if (this.iconVolume) {
      this.renderer.removeClass(this.iconVolume.nativeElement, 'bxs-volume-mute');
      this.renderer.removeClass(this.iconVolume.nativeElement, 'bx-tada');
      this.renderer.removeClass(this.iconVolume.nativeElement, 'bx-flip-vertical');
      this.renderer.addClass(this.iconVolume.nativeElement, 'bxs-volume-full');
    }
  }

  public toggleMute(): void {
    if (this.bgVideo) {
      this.isMuted = !this.isMuted;
      this.bgVideo.nativeElement.muted = this.isMuted;

      if (this.iconVolume) {
        if (this.isMuted) {
          this.volume = 0;
          this.volumeInput.nativeElement.value = 0;

          this.renderer.removeClass(this.iconVolume.nativeElement, 'bxs-volume-full');
          this.renderer.addClass(this.iconVolume.nativeElement, 'bxs-volume-mute');
          this.renderer.addClass(this.iconVolume.nativeElement, 'bx-tada');
          this.renderer.addClass(this.iconVolume.nativeElement, 'bx-flip-vertical');
        } else {
          let localVolume = localStorage.getItem('volume');
          this.volume = localVolume ? parseInt(localVolume) : 100;
          this.volumeInput.nativeElement.value = this.volume;
          this.bgVideo.nativeElement.volume = this.volume / 100;

          this.renderer.removeClass(this.iconVolume.nativeElement, 'bxs-volume-mute');
          this.renderer.removeClass(this.iconVolume.nativeElement, 'bx-tada');
          this.renderer.removeClass(this.iconVolume.nativeElement, 'bx-flip-vertical');
          this.renderer.addClass(this.iconVolume.nativeElement, 'bxs-volume-full');
        }
      }
    }
  }
}

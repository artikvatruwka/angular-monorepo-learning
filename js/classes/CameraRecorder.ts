
export interface ICameraRecorder {
  recordVideo: (length: number) => Promise<Blob | undefined>;
  init:  () => Promise<void>;
  stream?: MediaStream;
}

/**
* CameraRecorder is wrapper for mediaRecorder and MediaStream to ensure camera is loaded
*/
export class CameraRecorder implements ICameraRecorder {
  stream?: MediaStream;

  async recordVideo(length: number) {
      if (!this.stream) return undefined;
      const mediaRecorder = new MediaRecorder(this.stream,{'mimeType': 'video/webm'})
      mediaRecorder.start(length);
      const blob = await new Promise< Blob>((res)=>{
          const handleDataAvailable =(e: BlobEvent) => {
              const blob = e.data;
              res(blob);
              mediaRecorder.removeEventListener('dataavailable', handleDataAvailable);
          }
          mediaRecorder.addEventListener('dataavailable', handleDataAvailable)
      });
      return blob;
  }

  async #checkBrowserReady() {
      if (document.readyState === 'complete') return true;
      return await new Promise<boolean>((res)=>{
          window.addEventListener('load',()=>{
              res(true);
          });
      })
  }

  async #requestCameraAccess() {
      this.stream  = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  }

  async init() {
      if(!Boolean(await this.#checkBrowserReady())) return;
      await this.#requestCameraAccess();
      return;
  }
}

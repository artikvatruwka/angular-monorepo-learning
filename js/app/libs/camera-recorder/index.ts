
export interface ICameraRecorder {
    recordVideo: (length: number) => Promise<Blob | undefined>;
    init:  () => Promise<void>;
    stream?: MediaStream;
    retryOnError?: boolean;
}


export class CameraRecorder implements ICameraRecorder { 
    stream?: MediaStream;
    retryOnError?: boolean;

    constructor(options?: {retryOnError: boolean}) {
        this.retryOnError = !!options?.retryOnError;
    }

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
        console.log('not ready');
        return await new Promise<boolean>((res)=>{
            console.log('will set listener');
            console.log(document.readyState);
            window.addEventListener('load',()=>{
                console.log(document.readyState);
                console.log('resolved');
                res(true);
            });
        })
    }
    
    async #requestCameraAccess() {
        this.stream  = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    }

    async init() {
        console.log(11);
        if(!Boolean(await this.#checkBrowserReady())) return;
        console.log(12);
        await this.#requestCameraAccess();
        console.log(13);
        return;
    }
}
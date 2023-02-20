export class StreamingCamera {
    serverAnswer?: RTCSessionDescription;
    peerConnection: RTCPeerConnection;
    constructor(private stream: MediaStream, private config: {candidateEndpointUrl: string}) {
      this.peerConnection = new RTCPeerConnection({
          iceServers: [{urls: ['stun:stun1.l.google.com:19302']}] 
      });
      this.peerConnection.addEventListener('icecandidate',(ev)=>{
        ev.candidate && this.peerConnection.addIceCandidate(ev.candidate)
      })
     }
  
    async connectToServer() {
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      await fetch(this.config.candidateEndpointUrl,{
          method: 'post',
          body: JSON.stringify(offer)
      })
      .then(response => response.json())
      .then((response: {answer: RTCSessionDescription})=>{
          this.serverAnswer = response.answer;
          this.peerConnection.setRemoteDescription(new RTCSessionDescription(response.answer))
      });
      return !!this.serverAnswer;
    }
  
    streamToServer() { 
        this.stream.getTracks().forEach((track)=>{
            this.peerConnection.addTrack(track, this.stream);
        })
    }
    
  }
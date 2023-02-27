import express, { Request, Response } from 'express';
// import NodeMediaServer from 'node-media-server';
// import { spawn } from 'child_process';

const app = express();
const port = process.env.PORT || 3000;

// create node-media-server instance
// const nms = new NodeMediaServer({
//   rtmp: {
//     port: 1935,
//     chunk_size: 60000,
//     gop_cache: true,
//     ping: 60,
//     ping_timeout: 30
//   },
//   http: {
//     port: 8000,
//     mediaroot: './media',
//     // webroot: './www',
//     allow_origin: '*'
//   }
// });

// start node-media-server
// nms.run();

// define route for WebRTC stream

const remoteConnection = new RTCPeerConnection({
    iceServers: [{urls: ['stun:stun1.l.google.com:19302']}] 
});

remoteConnection.addEventListener('icecandidate',(ev)=>{
    ev.candidate && remoteConnection.addIceCandidate(ev.candidate);
});

remoteConnection.addEventListener('track',(ev)=>{

});

app.get('/connect', async (req: Request<{offer: string}>, res: Response) => {
    const clientOffer = JSON.parse(req.body) as RTCSessionDescriptionInit;
    await remoteConnection.setRemoteDescription(clientOffer);
    const answer = await remoteConnection.createAnswer();
    await remoteConnection.setLocalDescription(answer);
    res.send(answer);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
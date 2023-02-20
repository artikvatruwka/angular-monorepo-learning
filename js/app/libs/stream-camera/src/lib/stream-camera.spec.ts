import { streamCamera } from './stream-camera';

describe('streamCamera', () => {
  it('should work', () => {
    expect(streamCamera()).toEqual('stream-camera');
  });
});

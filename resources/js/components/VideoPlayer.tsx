import React from 'react';
import ReactPlayer from 'react-player';

type VideoPlayerProps = {
  videoUrl: string;
  isMuted: boolean;
  videoRef: React.RefObject<ReactPlayer | null>;
  onVideoStart: () => void;
  onVideoPause: () => void;
  onVideoEnd: () => void;
  onVideoPlay?: () => void;
  controls: boolean;
  playing: boolean; 
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  isMuted,
  videoRef,
  onVideoStart,
  onVideoPause,
  onVideoEnd,
  onVideoPlay,
  controls,
  playing
}) => {
  return (
    <ReactPlayer
      ref={videoRef}
      url={videoUrl}
      muted={isMuted}
      playing={playing} // Control video playback based on the "playing" state
      controls={controls}
      onStart={onVideoStart}
      onPause={onVideoPause}
      onEnded={onVideoEnd}
      onPlay={onVideoPlay}
      width="100%"
      height="100%"
      style={{ objectFit: 'cover' }}
    />
  );
};

export default VideoPlayer;

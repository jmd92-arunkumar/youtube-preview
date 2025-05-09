import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Video } from '@/types/video';
import VideoPlayer from './VideoPlayer';
import { toast } from 'react-toastify';
import ReactPlayer from 'react-player';

type VideoCardProps = {
  video: Video;
  mode: 'interactive' | 'static';
  isMuted: boolean;
};

const VideoCard: React.FC<VideoCardProps> = ({ video, mode, isMuted }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<ReactPlayer>(null);
  const videoStateRef = useRef<'idle' | 'playing' | 'paused' | 'ended'>('idle');
  const playbackPositionRef = useRef(0);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    // Clear any pending hide actions immediately
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
      hoverTimeoutRef.current = setTimeout(() => {
      setShowVideo(true);
      setIsHovered(true);
    }, 500);
  };
  

  const handleMouseLeave = () => {
    // Clear any pending show timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  
    // Set hide timeout
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      if (videoStateRef.current === 'playing') {
        playbackPositionRef.current = videoRef.current?.getCurrentTime() || 0;
        videoRef.current?.getInternalPlayer()?.pause();
      }
      setShowVideo(false);
    }, 150); // Reduced from 200ms for quicker response
  };

  const onVideoStart = useCallback(() => {
    if (playbackPositionRef.current > 0) {
      videoRef.current?.seekTo(playbackPositionRef.current);
    }
    videoStateRef.current = 'playing';
    toast.success('Video started');
  }, []);

  const onVideoPause = useCallback(() => {
    if (videoStateRef.current === 'playing') {
      playbackPositionRef.current = videoRef.current?.getCurrentTime() || 0;
      videoStateRef.current = 'paused';
      if (isHovered) {
        toast.info('Video paused');
      }
    }
  }, [isHovered]);

  const onVideoEnd = useCallback(() => {
    playbackPositionRef.current = 0;
    videoStateRef.current = 'ended';
    toast.warning('Video ended');
    setShowVideo(false);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative group w-full max-w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-video w-full rounded-xl overflow-hidden">
        {mode === 'interactive' && showVideo ? (
          <VideoPlayer
            videoUrl={video.videoUrl}
            isMuted={isMuted}
            videoRef={videoRef}
            onVideoStart={onVideoStart}
            onVideoPause={onVideoPause}
            onVideoEnd={onVideoEnd}
            controls={true}
            playing={isHovered && videoStateRef.current !== 'ended'}
          />
        ) : (
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/fallback-thumbnail.jpg';
            }}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="flex flex-col space-y-2 bg-black bg-opacity-70 text-white p-2 rounded-b-xl">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-500 rounded-full" />
          <div>
            <h3 className="text-sm font-semibold">{video.title}</h3>
            <p className="text-xs">{video.author}</p>
            <p className="text-xs">
              {video.views} views • {video.uploadTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
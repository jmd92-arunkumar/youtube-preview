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
  const videoRef = useRef<ReactPlayer | null>(null);
  const videoStateRef = useRef<'idle' | 'playing' | 'ended'>('idle'); // Track state of the video
  const justEndedRef = useRef(false); // Flag to track if the video just ended

  const handleMouseEnter = () => {
    if (videoStateRef.current === 'ended') {
      return; // Don't start the video if it just ended
    }
    setIsHovered(true);
    setShowVideo(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoStateRef.current === 'playing') {
      // Only pause if the video is currently playing
      videoRef.current?.getInternalPlayer()?.pause();
      videoStateRef.current = 'idle';
      toast.info('Video Paused');
    }
    setShowVideo(false);
  };

  const onVideoStart = useCallback(() => {
    if (videoStateRef.current !== 'ended') {
      videoStateRef.current = 'playing';
      toast.success('Video Started');
    }
  }, []);

  const onVideoPause = useCallback(() => {
    if (videoStateRef.current !== 'ended') {
      videoStateRef.current = 'idle';
      toast.info('Video Paused');
    }
  }, []);

  const onVideoEnd = useCallback(() => {
    if (videoStateRef.current !== 'ended') {
      videoStateRef.current = 'ended';
      toast.success('Video Ended');
      justEndedRef.current = true;
      // Auto restart after a 5-second delay if user has not hovered
      setTimeout(() => {
        if (!isHovered) {
          videoStateRef.current = 'playing';
          setShowVideo(true);
          toast.success('Video Restarted');
        }
      }, 5000);
    }
  }, [isHovered]);

  useEffect(() => {
    // Cleanup when component is unmounted
    return () => {
      // Clear any timeouts that might still be running
      justEndedRef.current = false;
    };
  }, []);

  return (
    <div
      className="relative group w-full max-w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-video w-full rounded-xl overflow-hidden">
        {mode === 'interactive' && isHovered && showVideo ? (
          <VideoPlayer
            videoUrl={video.videoUrl}
            isMuted={isMuted}
            videoRef={videoRef}
            onVideoStart={onVideoStart}
            onVideoPause={onVideoPause}
            onVideoEnd={onVideoEnd}
            controls={true}
            playing={isHovered && showVideo && videoStateRef.current !== 'ended'}
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

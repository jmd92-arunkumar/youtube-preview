import React from 'react';
import VideoCard from '@/components/VideoCard';
import { Video } from '@/types/video';

type VideoListProps = {
  videos: Video[];
  mode: 'interactive' | 'static';
  isMuted: boolean;
};

const VideoList: React.FC<VideoListProps> = ({ videos, mode, isMuted }) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {videos.length > 0 ? (
          videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              mode={mode}
              isMuted={isMuted}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No videos found</p>
        )}
      </div>
    </div>
  );
};

export default VideoList;

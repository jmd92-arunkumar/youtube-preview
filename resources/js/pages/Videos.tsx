import React, { useEffect, useState } from 'react';
import { fetchData } from '@/utils/fetcher';
import VideoList from '@/components/VideoList';
import { Video } from '../types/video';
import SearchBar from '../components/SearchBar';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [mode, setMode] = useState<'interactive' | 'static'>('interactive');
  const [query, setQuery] = useState('');
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const url = query ? `/videos/filter?search=${query}` : '/videos/data';
        const data = await fetchData<Video[]>(url);
        setVideos(data);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
    };

    fetchVideos();
  }, [query]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'interactive' ? 'static' : 'interactive'));
  };

  return (
    <div className="videos-container">
      <ToastContainer />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        {/* Search Bar Section */}
        <div className="flex justify-center items-center py-8">
          <SearchBar query={query} setQuery={handleSearch} />
        </div>

        {/* Mode Toggle Button */}
        <div className="flex justify-end py-4">
          <button
            onClick={toggleMode}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {mode === 'interactive' ? 'Switch to Static Mode' : 'Switch to Interactive Mode'}
          </button>
        </div>

        {/* Video List Section */}
        {videos.length > 0 ? (
          <VideoList 
            videos={videos} 
            mode={mode} 
            isMuted={isMuted} 
          />
        ) : (
          <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;
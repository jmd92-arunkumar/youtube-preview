import React, { useEffect, useState } from 'react';
import { fetchData } from '@/utils/fetcher';
import VideoList from '@/components/VideoList';
import { Video } from '../types/video';
import SearchBar from '../components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Videos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [mode, setMode] = useState<'interactive' | 'static'>('interactive');
  const [query, setQuery] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsSearching(true);
        const url = query ? `/videos/filter?search=${query}` : '/videos/data';
        const data = await fetchData<Video[]>(url);
        setVideos(data);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
        setVideos([]);
      } finally {
        setIsSearching(false);
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
        {isSearching ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : videos.length > 0 ? (
          <VideoList 
            videos={videos} 
            mode={mode} 
            isMuted={isMuted} 
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
              {query ? 'No videos found for your search' : 'No videos available'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {query ? 'Try a different search term' : 'Please check back later'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;

import React, { useState, useRef, useEffect } from 'react';
import { CAMERA_LOCATIONS, CCTV_FEEDS } from '../../constants';
import { MapPin, Circle, ZoomIn, ZoomOut, Moon, ArrowLeft, ArrowRight } from 'lucide-react';

export const CCTV: React.FC = () => {
  const [camId, setCamId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [nightVision, setNightVision] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const switchCam = (direction: 'next' | 'prev') => {
    setLoading(true);
    // Fake loading delay
    setTimeout(() => {
        setCamId(prev => {
            const len = CCTV_FEEDS.length;
            if (direction === 'next') return (prev + 1) % len;
            return (prev - 1 + len) % len;
        });
        setLoading(false);
        setZoom(1);
    }, 800);
  };

  // Reset video when source changes
  useEffect(() => {
      if (videoRef.current) {
          videoRef.current.load();
          videoRef.current.play().catch(() => {});
      }
  }, [camId]);

  return (
    <div className="h-full flex flex-col bg-black text-green-500 relative select-none overflow-hidden">
      {/* Top Bar */}
      <div className="h-14 bg-zinc-900 border-b border-green-900 flex items-center justify-between px-4 z-20 shrink-0">
        <div className="flex items-center gap-3 text-sm md:text-base font-bold tracking-widest text-white truncate">
           <MapPin size={16} className="text-red-500" />
           {CAMERA_LOCATIONS[camId] || `LOCATION_UNKNOWN_${camId}`}
        </div>
        <div className="flex gap-4 items-center shrink-0">
             <div className="flex items-center gap-2 text-xs text-red-600 bg-red-950 px-2 py-1 border border-red-900 rounded animate-pulse font-black">
                 <Circle size={8} fill="currentColor" /> REC
             </div>
        </div>
      </div>
      
      {/* Main Viewport */}
      <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
        {loading ? (
            <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-xs font-mono text-green-500 tracking-[0.2em]">CONNECTING TO FEED...</div>
            </div>
        ) : (
            <>
                <div 
                    className="w-full h-full relative transition-transform duration-500 ease-out"
                    style={{
                        transform: `scale(${zoom})`,
                        filter: nightVision 
                            ? 'grayscale(100%) contrast(1.2) brightness(0.8) sepia(1) hue-rotate(90deg) saturate(300%)' 
                            : 'grayscale(60%) contrast(1.1) brightness(0.9)'
                    }}
                >
                    <video 
                        ref={videoRef}
                        src={CCTV_FEEDS[camId % CCTV_FEEDS.length]} 
                        className="w-full h-full object-cover"
                        autoPlay 
                        muted 
                        loop
                        playsInline
                        onError={(e) => {
                            // Fallback if video fails
                            (e.target as HTMLVideoElement).style.display = 'none';
                        }}
                    />
                    {/* Fallback Noise if video fails */}
                    <div className="absolute inset-0 -z-10 bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] bg-cover opacity-20"></div>
                </div>
                
                {/* HUD Overlays */}
                <div className="absolute top-4 left-4 text-white font-mono text-xl font-bold drop-shadow-md border-l-4 border-red-600 pl-2 z-10">
                    {new Date().toLocaleTimeString()}
                </div>
                
                {/* Scanlines & Noise */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] z-10 mix-blend-overlay"></div>
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_60%,rgba(0,0,0,0.9)_100%)] z-10"></div>
            </>
        )}
      </div>
      
      {/* Controls */}
      <div className="h-16 bg-zinc-900 border-t border-green-900 z-20 flex items-center justify-between px-4 md:px-8">
          <div className="flex gap-2">
             <button onClick={() => switchCam('prev')} className="bg-zinc-800 p-2 hover:bg-green-700 text-green-500 hover:text-white rounded"><ArrowLeft size={20} /></button>
             <button onClick={() => switchCam('next')} className="bg-zinc-800 p-2 hover:bg-green-700 text-green-500 hover:text-white rounded"><ArrowRight size={20} /></button>
          </div>
          
          <div className="flex gap-2 md:gap-4">
              <button 
                onClick={() => setZoom(prev => Math.min(prev + 0.5, 3))} 
                className="p-2 bg-zinc-800 hover:text-white text-gray-400 rounded"
              >
                  <ZoomIn size={20} />
              </button>
              <button 
                onClick={() => setZoom(1)} 
                className="p-2 bg-zinc-800 hover:text-white text-gray-400 rounded"
              >
                  <ZoomOut size={20} />
              </button>
              <button 
                onClick={() => setNightVision(!nightVision)} 
                className={`p-2 rounded transition-colors ${nightVision ? 'bg-green-900 text-green-400' : 'bg-zinc-800 text-gray-400'}`}
              >
                  <Moon size={20} />
              </button>
          </div>
      </div>
    </div>
  );
};

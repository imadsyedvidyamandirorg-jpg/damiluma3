
import React from 'react';
import { X, Minus, Maximize2, Terminal } from 'lucide-react';

interface WindowProps {
  title: string;
  onClose: () => void;
  onMinimize: () => void;
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

export const Window: React.FC<WindowProps> = ({ title, onClose, onMinimize, children, isActive, onClick }) => {
  return (
    <div 
      className={`absolute top-[10%] left-[10%] w-[80%] h-[75%] md:w-[70%] md:h-[70%] bg-black/80 border border-green-500 flex flex-col shadow-[0_0_50px_rgba(0,255,0,0.1)] backdrop-blur-md ${isActive ? 'z-50 border-green-400 shadow-[0_0_60px_rgba(0,255,0,0.25)] ring-1 ring-green-500/50' : 'z-10 opacity-75 grayscale-[0.8]'}`}
      onClick={onClick}
      style={{
          transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
          animation: 'windowOpen 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Header */}
      <div className={`h-12 ${isActive ? 'bg-green-900/60' : 'bg-green-900/20'} border-b border-green-500 flex items-center justify-between px-4 cursor-move select-none relative overflow-hidden shrink-0`}>
        {/* Animated Header Background */}
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(90deg,transparent,rgba(0,255,0,0.4),transparent)] translate-x-[-100%] animate-[shimmer_3s_infinite]"></div>
        
        <div className="flex items-center gap-3 relative z-10">
           <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500 shadow-[0_0_10px_#0f0]' : 'bg-green-800'}`}></div>
           <span className="text-green-400 font-mono text-lg uppercase tracking-[0.2em] font-bold flex items-center gap-2 drop-shadow-md">
              <Terminal size={18} /> {title}
           </span>
        </div>
        <div className="flex gap-2 relative z-10">
          <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} className="p-2 hover:bg-green-500/20 text-green-500 hover:text-green-300 rounded transition-colors"><Minus size={18} /></button>
          <button className="p-2 hover:bg-green-500/20 text-green-500 hover:text-green-300 rounded transition-colors opacity-50 cursor-not-allowed"><Maximize2 size={18} /></button>
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-2 hover:bg-red-900/50 text-red-500 hover:text-red-300 rounded transition-colors"><X size={18} /></button>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-hidden bg-black/90 relative group">
        {/* Grid Overlay inside Window */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(0deg,transparent_24%,rgba(0,255,0,0.3)_25%,rgba(0,255,0,0.3)_26%,transparent_27%,transparent_74%,rgba(0,255,0,0.3)_75%,rgba(0,255,0,0.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(0,255,0,0.3)_25%,rgba(0,255,0,0.3)_26%,transparent_27%,transparent_74%,rgba(0,255,0,0.3)_75%,rgba(0,255,0,0.3)_76%,transparent_77%,transparent)] bg-[size:40px_40px]"></div>
        <div className="relative z-10 h-full overflow-auto custom-scrollbar">
            {children}
        </div>
      </div>
    </div>
  );
};

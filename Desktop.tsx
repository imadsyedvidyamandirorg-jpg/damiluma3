
import React, { useState, useEffect, useRef } from 'react';
import { AppDefinition, WindowState } from '../types';
import { Window } from './Window';
import { 
  Terminal, Wifi, DollarSign, Camera, Globe, Bot, FileText, 
  Cpu, Skull, Trash2, Map, Crosshair, Key, HardDrive, 
  Activity, Command, Calculator, Clock, Music, FileCode, Maximize
} from 'lucide-react';
import { TerminalApp } from './apps/TerminalApp';
import { TerminalPro } from './apps/TerminalPro';
import { WifiCracker } from './apps/WifiCracker';
import { BankThief } from './apps/BankThief';
import { CCTV } from './apps/CCTV';
import { AIAssistant } from './apps/AIAssistant';
import { VirusMaker } from './apps/VirusMaker';
import { TorBrowser } from './apps/TorBrowser';
import { IPLocator } from './apps/IPLocator';
import { CryptoMiner, AudioVisualizer, HackerNotes, NeonCalculator, TextOutputApp } from './apps/GenericApps';

const APPS: AppDefinition[] = [
  { id: 'term', name: 'Compiler', icon: Terminal, component: TerminalApp },
  { id: 'termpro', name: 'Term Pro', icon: Command, component: TerminalPro },
  { id: 'wifi', name: 'WiFi Crack', icon: Wifi, component: WifiCracker },
  { id: 'bank', name: 'Bank Thief', icon: DollarSign, component: BankThief },
  { id: 'virus', name: 'Virus Gen', icon: Skull, component: VirusMaker },
  { id: 'cctv', name: 'CCTV', icon: Camera, component: CCTV },
  { id: 'tor', name: 'TOR', icon: Globe, component: TorBrowser },
  { id: 'ip', name: 'IP Locate', icon: Crosshair, component: IPLocator },
  { id: 'ai', name: 'Dami Aries', icon: Bot, component: AIAssistant },
  { id: 'miner', name: 'Miner', icon: Cpu, component: CryptoMiner },
  { id: 'notes', name: 'Notes', icon: FileText, component: HackerNotes },
  { id: 'shred', name: 'Shredder', icon: Trash2, component: () => <div className="flex items-center justify-center h-full text-green-500 font-bold text-xl border-4 border-dashed border-green-800 m-8">DRAG FILES HERE TO DESTROY</div> },
  { id: 'geo', name: 'Sat Track', icon: Map, component: () => <TextOutputApp text="SATELLITE LINK ESTABLISHED... TRACKING... [NO ACTIVE TARGET]" /> },
  { id: 'vault', name: 'Vault', icon: Key, component: () => <TextOutputApp text="[ENCRYPTED CONTAINER LOCKED] - ENTER BIOMETRICS" /> },
  { id: 'mem', name: 'MemScan', icon: HardDrive, component: () => <TextOutputApp text="0x00A1F 0000 1101 ... DUMPING MEMORY TO DISK..." /> },
  { id: 'audio', name: 'Visualizer', icon: Activity, component: AudioVisualizer },
  { id: 'calc', name: 'Calc', icon: Calculator, component: NeonCalculator },
  { id: 'clock', name: 'SysMon', icon: Clock, component: () => <div className="flex items-center justify-center h-full text-6xl font-mono text-green-400">{new Date().toLocaleTimeString()}</div> },
  { id: 'music', name: 'Lo-Fi', icon: Music, component: () => <div className="p-8 text-center"><div className="w-32 h-32 bg-green-900 rounded-full mx-auto animate-spin-slow mb-4 border-4 border-green-500 border-t-transparent"></div>PLAYING: Synthwave Mix 24/7</div> },
  { id: 'ascii', name: 'ASCII', icon: FileCode, component: () => <pre className="text-[10px] leading-3 p-4 text-green-500 whitespace-pre font-mono">
{`
    .  .
    |\\_|\
    | a_a\
    | | "]
____| '-\___
\  \ _ /  /
 \  \ /  /
  \  v  /
   \___/
`}
  </pre> },
];

const MatrixRain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const letters = "0101010101ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops: number[] = [];

        for(let i=0; i<columns; i++) drops[i] = Math.random() * -100;

        const draw = () => {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = "#0F0";
            ctx.font = fontSize + "px monospace";
            
            for(let i=0; i<drops.length; i++) {
                const text = letters.charAt(Math.floor(Math.random() * letters.length));
                if (Math.random() > 0.98) {
                    ctx.fillStyle = "#FFF";
                } else {
                    ctx.fillStyle = "#0F0";
                }
                
                ctx.fillText(text, i*fontSize, drops[i]*fontSize);
                
                if(drops[i]*fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        const interval = setInterval(draw, 33);
        const handleResize = () => {
             canvas.width = window.innerWidth;
             canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);
        
        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30 pointer-events-none" />;
};

export const Desktop: React.FC = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const openApp = (app: AppDefinition) => {
    const existing = windows.find(w => w.appId === app.id);
    if (existing) {
      setActiveId(existing.id);
      setWindows(prev => prev.map(w => w.id === existing.id ? { ...w, isMinimized: false } : w));
      return;
    }

    const newWindow: WindowState = {
      id: Date.now().toString(),
      appId: app.id,
      title: app.name,
      isOpen: true,
      isMinimized: false,
      zIndex: windows.length + 1
    };
    setWindows(prev => [...prev, newWindow]);
    setActiveId(newWindow.id);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeId === id) setActiveId(null);
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    if (activeId === id) setActiveId(null);
  };

  const focusWindow = (id: string) => {
    setActiveId(id);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: Math.max(...prev.map(p => p.zIndex)) + 1 } : w));
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => console.log(e));
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="h-screen w-screen bg-black relative overflow-hidden text-green-500 font-mono select-none">
      
      {/* Dynamic Background */}
      <MatrixRain />
      
      {/* Desktop Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-y-8 gap-x-4 p-8 content-start relative z-10 w-full md:w-3/4">
        {APPS.map(app => (
          <div 
            key={app.id} 
            onClick={() => openApp(app)}
            className="flex flex-col items-center gap-3 cursor-pointer group transition-all duration-200 hover:scale-110"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-black/40 border border-green-500/30 rounded-xl flex items-center justify-center group-hover:border-green-400 group-hover:bg-green-900/30 group-hover:shadow-[0_0_20px_rgba(0,255,0,0.5)] backdrop-blur-sm transition-all relative overflow-hidden">
                <div className="absolute inset-0 bg-green-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <app.icon size={36} className="opacity-80 group-hover:opacity-100 group-hover:text-white relative z-10" />
            </div>
            <span className="text-[10px] md:text-xs text-center font-bold tracking-wider bg-black/60 px-3 py-1 rounded-full group-hover:text-white group-hover:bg-green-600 border border-transparent group-hover:border-green-400 transition-all uppercase">{app.name}</span>
          </div>
        ))}
      </div>

      {/* Windows */}
      {windows.map(win => {
        const app = APPS.find(a => a.id === win.appId);
        if (!app || !win.isOpen || win.isMinimized) return null;
        
        return (
          <Window 
            key={win.id}
            title={win.title}
            isActive={activeId === win.id}
            onClick={() => focusWindow(win.id)}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
          >
            <app.component />
          </Window>
        );
      })}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-black/80 border-t border-green-600 flex items-center px-4 gap-4 z-[100] shadow-[0_-5px_30px_rgba(0,255,0,0.15)] backdrop-blur-xl">
        <div className="bg-green-600 text-black font-black px-4 py-2 rounded text-xl mr-4 shadow-[0_0_15px_#0f0] animate-pulse cursor-pointer hover:bg-white transition-colors">DAMI</div>
        
        <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar items-center">
            {windows.map(win => {
                const app = APPS.find(a => a.id === win.appId);
                return (
                    <div 
                        key={win.id}
                        onClick={() => focusWindow(win.id)}
                        className={`min-w-[160px] h-10 px-4 border-b-2 flex items-center gap-3 cursor-pointer transition-all rounded-t-lg ${
                            activeId === win.id && !win.isMinimized 
                            ? 'bg-green-900/40 border-green-400 text-white shadow-[inset_0_0_15px_rgba(0,255,0,0.2)]' 
                            : 'hover:bg-green-900/20 border-transparent text-green-600 hover:text-green-400'
                        }`}
                    >
                        {app && <app.icon size={18} />}
                        <span className="text-sm font-bold truncate tracking-wide">{win.title}</span>
                    </div>
                )
            })}
        </div>

        <div className="flex items-center gap-6 border-l border-green-800 pl-6 ml-4">
            <button onClick={toggleFullScreen} className="text-green-500 hover:text-white" title="Toggle Fullscreen">
                <Maximize size={24} />
            </button>
            <div className="flex flex-col items-end justify-center text-green-400">
                <span className="font-black text-2xl leading-none tracking-widest">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                <span className="text-xs uppercase tracking-[0.2em] opacity-70">{new Date().toLocaleDateString()}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

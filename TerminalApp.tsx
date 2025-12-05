
import React, { useState, useEffect, useRef } from 'react';
import { HACKER_TYPER_CODE_KERNEL, HACKER_TYPER_CODE_SQL, HACKER_TYPER_CODE_DDOS } from '../../constants';
import { playTypingSound, playAccessGranted } from '../../utils/sound';
import { ShieldAlert, Database, Cpu, Activity, CheckCircle, Terminal } from 'lucide-react';

const FAKE_LOGS_GENERIC = [
    "Allocating memory block 0x004F...",
    "Resolving pointer chains...",
    "Injecting shellcode payload...",
    "Establishing encrypted tunnel...",
    "Bypassing heuristic analysis...",
    "Optimizing exploit chain...",
    "Cleaning system logs...",
    "Verifying checksum...",
    "Handshake acknowledged...",
    "Elevating privileges...",
    "Mounting virtual filesystem...",
    "Parsing response headers..."
];

const MODES = [
    { 
        id: 'kernel', 
        name: 'KERNEL ROOTKIT', 
        code: HACKER_TYPER_CODE_KERNEL, 
        icon: Cpu, 
        color: 'text-green-500',
        borderColor: 'border-green-500',
        bg: 'bg-green-500',
        successTitle: 'ROOT ACCESS\nGRANTED',
        successSubtitle: 'SYSTEM PRIVILEGES ELEVATED',
        logs: ["Hooking sys_call_table...", "Overwriting CR0 register...", "Hiding PID from process list...", "Disabling ASLR...", "Patching kernel modules..."]
    },
    { 
        id: 'sql', 
        name: 'DB INJECTION', 
        code: HACKER_TYPER_CODE_SQL, 
        icon: Database, 
        color: 'text-blue-500',
        borderColor: 'border-blue-500',
        bg: 'bg-blue-500',
        successTitle: 'DATABASE\nDUMP COMPLETE',
        successSubtitle: 'USER_TABLE_EXPORTED.JSON',
        logs: ["Injecting UNION SELECT...", "Bypassing WAF (Cloudflare)...", "Dumping schema information...", "Extracting admin hashes...", "Converting to JSON..."]
    },
    { 
        id: 'ddos', 
        name: 'BOTNET ATTACK', 
        code: HACKER_TYPER_CODE_DDOS, 
        icon: ShieldAlert, 
        color: 'text-red-500',
        borderColor: 'border-red-500',
        bg: 'bg-red-500',
        successTitle: 'TARGET\nOFFLINE',
        successSubtitle: 'SERVICE UNAVAILABLE (503)',
        logs: ["Initializing zombie nodes...", "Synchonizing packet flood...", "Sending SYN packets...", "Overwhelming load balancer...", "Target latency critical..."]
    },
];

export const TerminalApp: React.FC = () => {
  const [mode, setMode] = useState(MODES[0]);
  const [displayedCode, setDisplayedCode] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'compiling' | 'success'>('typing');
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [randomStats, setRandomStats] = useState<string>('');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const logsRef = useRef<HTMLDivElement>(null);

  // Auto-scroll code
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedCode, executionLogs]);

  // Key Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase !== 'typing') return;
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      
      playTypingSound();
      
      const charsToAdd = Math.floor(Math.random() * 5) + 2;
      const nextIndex = Math.min(charIndex + charsToAdd, mode.code.length);
      
      setDisplayedCode(mode.code.slice(0, nextIndex));
      setCharIndex(nextIndex);
      
      if (nextIndex >= mode.code.length) {
          setPhase('compiling');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [charIndex, phase, mode]);

  // Compilation/Execution Phase
  useEffect(() => {
      if (phase === 'compiling') {
          let logCount = 0;
          const maxLogs = 20;
          setExecutionLogs([]);
          
          const interval = setInterval(() => {
              const isSpecific = Math.random() > 0.6;
              const logText = isSpecific 
                ? mode.logs[Math.floor(Math.random() * mode.logs.length)]
                : FAKE_LOGS_GENERIC[Math.floor(Math.random() * FAKE_LOGS_GENERIC.length)];
              
              setExecutionLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${logText}`]);
              logCount++;
              
              if (logCount > maxLogs) {
                  clearInterval(interval);
                  generateRandomStats();
                  setPhase('success');
                  playAccessGranted();
              }
          }, 80); // Fast log scrolling
          
          return () => clearInterval(interval);
      }
  }, [phase, mode]);

  const generateRandomStats = () => {
      if (mode.id === 'kernel') {
          setRandomStats(`UID: 0 (root)\nPID: ${Math.floor(Math.random()*9999)}\nMEM: 0x${Math.random().toString(16).slice(2,10).toUpperCase()}`);
      } else if (mode.id === 'sql') {
          setRandomStats(`RECORDS: ${Math.floor(Math.random()*1000000)}\nSIZE: ${(Math.random()*50).toFixed(2)} GB\nHASHES: CRACKED`);
      } else {
          setRandomStats(`PACKETS: ${Math.floor(Math.random()*999)}M\nBW: ${(Math.random()*100).toFixed(1)} Tbps\nSTATUS: DOWN`);
      }
  };

  const reset = (newModeIndex: number) => {
      setMode(MODES[newModeIndex]);
      setDisplayedCode('');
      setCharIndex(0);
      setPhase('typing');
      setExecutionLogs([]);
      setRandomStats('');
  };

  return (
    <div className="h-full w-full bg-black p-4 font-mono text-base md:text-xl overflow-hidden flex flex-col relative" onClick={() => {
        // Allow clicking to simulate typing for easier demo/mobile use
        if(phase === 'typing') {
             const e = new KeyboardEvent('keydown', { key: 'a' });
             window.dispatchEvent(e);
        }
    }}>
      {/* Header / Mode Selector */}
      <div className="flex gap-2 mb-4 border-b border-gray-800 pb-2 overflow-x-auto no-scrollbar z-10">
          {MODES.map((m, i) => (
              <button 
                key={m.id}
                onClick={(e) => { e.stopPropagation(); reset(i); }}
                className={`flex items-center gap-2 px-3 py-1 text-xs md:text-sm font-bold border transition-all ${mode.id === m.id ? `${m.bg} text-black border-transparent` : 'border-gray-800 text-gray-500 hover:text-gray-300'}`}
              >
                  <m.icon size={14} /> {m.name}
              </button>
          ))}
      </div>

      {/* Main Code Area */}
      <div 
        ref={containerRef} 
        className={`flex-1 overflow-y-auto whitespace-pre-wrap ${mode.color} leading-snug pb-20 font-bold drop-shadow-[0_0_5px_currentColor] transition-all duration-300 ${phase === 'success' ? 'opacity-20 blur-sm' : 'opacity-100'}`}
      >
        {displayedCode}
        {phase === 'typing' && (
            <span className={`inline-block w-3 h-5 ${mode.bg} animate-[blink_0.8s_infinite] align-middle ml-1`}></span>
        )}
        
        {/* Logs overlay at bottom during compiling */}
        {phase === 'compiling' && (
            <div className="mt-4 border-t border-dashed border-gray-600 pt-4 text-sm md:text-base text-white opacity-90">
                {executionLogs.map((log, i) => (
                    <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-75">
                        <span className={`${mode.color} mr-2`}>➜</span>{log}
                    </div>
                ))}
                <div className="animate-pulse">_</div>
            </div>
        )}
      </div>

      {/* Success Overlay */}
      {phase === 'success' && (
        <div className="absolute inset-0 flex items-center justify-center z-20 animate-in fade-in zoom-in duration-300 p-8" onClick={(e) => e.stopPropagation()}>
           <div className={`border-4 ${mode.borderColor} bg-black/90 p-8 md:p-12 text-center shadow-[0_0_100px_currentColor] relative overflow-hidden max-w-2xl w-full`}>
              {/* Background scanline for box */}
              <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(255,255,255,1)_50%)] bg-[size:100%_4px]"></div>
              
              <div className="flex justify-center mb-6">
                 <div className={`p-6 rounded-full border-4 ${mode.borderColor} animate-bounce`}>
                     <mode.icon size={64} className={mode.color} />
                 </div>
              </div>
              
              <h1 className={`text-5xl md:text-7xl font-black ${mode.color} tracking-tighter mb-2 leading-tight uppercase drop-shadow-[0_0_10px_currentColor]`}>
                 {mode.successTitle}
              </h1>
              <p className="text-xl text-white font-mono tracking-[0.3em] uppercase mb-8 border-b border-gray-700 pb-4 inline-block">
                  {mode.successSubtitle}
              </p>
              
              {/* Random Stats */}
              <div className={`text-left ${mode.borderColor} border-l-4 pl-4 bg-gray-900/50 p-4 font-mono text-sm md:text-lg text-gray-300 mb-8 whitespace-pre-line`}>
                  {randomStats}
              </div>

              <div className="flex gap-4 justify-center">
                  <button 
                    onClick={(e) => { e.stopPropagation(); reset(0); }}
                    className="bg-white text-black font-black text-lg py-3 px-8 uppercase hover:scale-105 transition-transform"
                  >
                    NEW TERMINAL
                  </button>
              </div>
           </div>
        </div>
      )}
      
      {/* Start Prompt */}
      {charIndex === 0 && phase === 'typing' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
              <div className="text-center animate-pulse">
                  <Terminal size={64} className={`mx-auto mb-4 ${mode.color}`} />
                  <p className={`text-3xl md:text-4xl mb-2 font-bold ${mode.color}`}>[ {mode.name} LOADED ]</p>
                  <p className="text-sm md:text-lg tracking-[0.2em] text-gray-500 uppercase">Start typing to inject payload...</p>
              </div>
          </div>
      )}
    </div>
  );
};

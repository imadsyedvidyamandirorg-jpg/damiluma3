
import React, { useState, useEffect } from 'react';
import { Wifi, Lock, ShieldAlert, RefreshCw, Signal, Router } from 'lucide-react';
import { WIFI_NETWORKS } from '../../constants';

export const WifiCracker: React.FC = () => {
  const [scanComplete, setScanComplete] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [selectedNet, setSelectedNet] = useState<any>(null);
  const [crackingProgress, setCrackingProgress] = useState(0);
  const [crackedPassword, setCrackedPassword] = useState<string | null>(null);
  const [matrixText, setMatrixText] = useState('');
  const [scanProgress, setScanProgress] = useState(0);

  // Fake scanning effect
  const startScan = () => {
    setScanning(true);
    setScanComplete(false);
    setSelectedNet(null);
    setCrackedPassword(null);
    setScanProgress(0);
    
    // Animate scan progress
    const interval = setInterval(() => {
        setScanProgress(prev => {
            if (prev >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setScanning(false);
                    setScanComplete(true);
                }, 500);
                return 100;
            }
            return prev + 2;
        });
    }, 50);
  };

  // Matrix rain effect for cracking
  useEffect(() => {
    if (selectedNet && !crackedPassword) {
        setCrackingProgress(0);
        const interval = setInterval(() => {
            // Generate matrix gibberish
            const chars = '0123456789ABCDEF!@#$%^&*()_+<>?';
            let str = '';
            for(let i=0; i<48; i++) {
                str += chars.charAt(Math.floor(Math.random() * chars.length));
                if (i % 6 === 0) str += ' ';
            }
            setMatrixText(str);
            
            setCrackingProgress(prev => {
                const step = Math.random() * 1.5;
                if (prev >= 100) {
                    clearInterval(interval);
                    setCrackedPassword(Math.random().toString(36).slice(-12).toUpperCase().replace('.', ''));
                    return 100;
                }
                return prev + step;
            });
        }, 50);
        return () => clearInterval(interval);
    }
  }, [selectedNet, crackedPassword]);

  return (
    <div className="h-full flex flex-col p-6 bg-black/90 text-green-400 font-mono relative overflow-hidden">
      {/* HUD Background elements */}
      <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
          <Wifi size={200} />
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b-2 border-green-800 pb-4 shrink-0 z-10">
        <div>
            <h2 className="text-3xl font-black flex items-center gap-3 tracking-tighter text-neon">
                <Router className={scanning ? "animate-pulse" : ""} /> AIRMON-NG SUITE v4.2
            </h2>
            <p className="text-sm text-green-600 font-bold tracking-widest">WPA3 HANDSHAKE CAPTURE & DECRYPTION</p>
        </div>
        <button 
            onClick={startScan}
            disabled={scanning || (selectedNet && !crackedPassword)}
            className="flex items-center gap-2 bg-green-900 hover:bg-green-700 border border-green-500 px-6 py-3 rounded text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(0,255,0,0.2)]"
        >
            <RefreshCw className={scanning ? "animate-spin" : ""} size={20}/> {scanning ? 'SCANNING RANGE...' : 'INITIATE SCAN'}
        </button>
      </div>

      <div className="flex gap-6 h-full overflow-hidden relative z-10">
        {/* Network List Panel */}
        <div className="w-1/3 border-r-2 border-green-900 pr-6 overflow-y-auto">
            {!scanComplete && !scanning && <div className="text-center mt-20 opacity-50 text-xl">[ WAITING FOR COMMAND ]</div>}
            
            {scanning && (
                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                    <div className="text-2xl font-bold animate-pulse">DETECTING APs...</div>
                    <div className="w-full h-4 bg-green-900/30 rounded-full overflow-hidden border border-green-600">
                        <div className="h-full bg-green-500" style={{width: `${scanProgress}%`}}></div>
                    </div>
                    <div className="font-mono text-sm opacity-75">Channel Hopping: {Math.floor(scanProgress / 7)} / 14</div>
                </div>
            )}
            
            {scanComplete && (
                <div className="space-y-3">
                    <div className="text-xs text-green-600 uppercase mb-2 flex justify-between">
                        <span>SSID</span>
                        <span>SIGNAL</span>
                    </div>
                    {WIFI_NETWORKS.map((net, i) => (
                        <div 
                            key={i}
                            onClick={() => !selectedNet && setSelectedNet(net)}
                            className={`p-4 border border-green-800 bg-black/50 hover:bg-green-900/40 cursor-pointer transition-all flex justify-between items-center group relative overflow-hidden ${selectedNet === net ? 'bg-green-900/80 border-green-400 shadow-[inset_0_0_20px_rgba(0,255,0,0.2)]' : ''}`}
                        >
                            <div className="relative z-10">
                                <div className="font-bold text-lg group-hover:text-white transition-colors">{net.ssid}</div>
                                <div className="text-xs text-green-600 font-mono mt-1">{net.mac} • {net.security}</div>
                            </div>
                            <div className="flex items-center gap-2 relative z-10">
                                <span className="text-xs font-bold">{net.signal}%</span>
                                <Signal size={18} className={`${net.signal > 70 ? 'text-green-500' : 'text-yellow-500'}`}/>
                                <Lock size={14} className="text-red-400 opacity-50"/>
                            </div>
                            {/* Hover effect */}
                            <div className="absolute inset-0 bg-green-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* Attack Panel */}
        <div className="flex-1 flex flex-col items-center justify-center bg-black/50 border border-green-900/50 relative overflow-hidden rounded-lg">
            {!selectedNet ? (
                <div className="text-green-800 flex flex-col items-center opacity-30 animate-pulse">
                    <ShieldAlert size={150} />
                    <span className="text-2xl mt-4 font-bold tracking-widest">SELECT TARGET</span>
                </div>
            ) : (
                <div className="w-full h-full p-8 flex flex-col items-center justify-center relative z-10">
                     <h3 className="text-2xl mb-8 text-green-300 tracking-widest border-b border-green-800 pb-2">
                         TARGET: <span className="text-white font-black">{selectedNet.ssid}</span>
                     </h3>
                     
                     {!crackedPassword ? (
                        <div className="w-full max-w-2xl">
                            {/* Matrix Rain Box */}
                            <div className="bg-black border-2 border-green-500 p-6 font-mono text-xl text-center shadow-[0_0_30px_rgba(0,255,0,0.15)] mb-8 relative overflow-hidden h-48 flex items-center justify-center">
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                                <div className="text-2xl md:text-4xl tracking-widest text-green-400 font-bold break-all opacity-80 z-10 font-mono">
                                    {matrixText}
                                </div>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="w-full h-8 bg-black border-2 border-green-600 rounded p-1 relative shadow-[0_0_15px_rgba(0,255,0,0.2)]">
                                <div 
                                    className="h-full bg-green-500 shadow-[0_0_20px_#0f0] transition-all duration-100 ease-linear relative overflow-hidden" 
                                    style={{width: `${crackingProgress}%`}}
                                >
                                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[size:20px_20px] animate-[shimmer_0.5s_infinite]"></div>
                                </div>
                            </div>
                            
                            {/* Log console */}
                            <div className="mt-6 font-mono text-sm text-green-600 text-left w-full bg-black/80 p-4 border border-green-900/50 h-32 overflow-hidden flex flex-col justify-end">
                                <div className="opacity-50">> Initializing AIRCRACK-NG...</div>
                                <div className="opacity-70">> Capturing IVs... {Math.floor(crackingProgress * 842)} packets</div>
                                <div className="opacity-80">> Injection: ACK FLOOD [Enabled]</div>
                                <div className="text-white animate-pulse">> Brute-forcing keys... testing {Math.floor(crackingProgress * 123)}/sec</div>
                            </div>
                        </div>
                     ) : (
                        <div className="animate-bounce-in text-center p-12 border-4 border-green-400 bg-green-900/20 shadow-[0_0_100px_rgba(0,255,0,0.4)] rounded-2xl relative overflow-hidden w-full max-w-xl">
                            <div className="absolute inset-0 bg-green-500/5 animate-pulse"></div>
                            <ShieldAlert size={80} className="mx-auto text-green-400 mb-6 drop-shadow-[0_0_15px_rgba(0,255,0,0.8)]" />
                            <h2 className="text-5xl font-black text-white mb-2 tracking-tighter">SUCCESS</h2>
                            <p className="mb-8 text-green-300 text-xl tracking-[0.2em]">NETWORK COMPROMISED</p>
                            
                            <div className="bg-black text-green-500 text-4xl p-6 font-mono border-2 border-green-500 tracking-widest select-all relative group mb-8">
                                {crackedPassword}
                                <div className="absolute inset-0 bg-green-500 mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity"></div>
                            </div>
                            
                            <button onClick={startScan} className="text-green-400 hover:text-white underline underline-offset-4 decoration-2">
                                RETURN TO SCANNER
                            </button>
                        </div>
                     )}
                </div>
            )}
            
            {/* Background animated lines */}
            {selectedNet && !crackedPassword && (
                 <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,255,0,1)_50%)] bg-[size:100%_4px] animate-[scanline_2s_linear_infinite]"></div>
            )}
        </div>
      </div>
    </div>
  );
};

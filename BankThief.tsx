
import React, { useState, useEffect } from 'react';
import { BANK_NAMES } from '../../constants';
import { DollarSign, Globe, ShieldCheck, Server, Lock } from 'lucide-react';

export const BankThief: React.FC = () => {
  const [step, setStep] = useState<'input' | 'routing' | 'transfer' | 'success'>('input');
  const [data, setData] = useState({ name: '', amount: '50000000' });
  const [logs, setLogs] = useState<string[]>([]);
  const [transferredAmount, setTransferredAmount] = useState(0);

  // Routing animation with logs
  useEffect(() => {
    if (step === 'routing') {
        const nodes = [
            "Proxy Node 1 (St. Petersburg)", 
            "Bypassing Firewall (Beijing)", 
            "Routing through Cayman Islands...", 
            "Handshake with Swiss Server...",
            "Decrypting RSA-4096 Keys...",
            "Injecting SQL Payload...",
            "Accessing Swift Network..."
        ];
        let i = 0;
        setLogs([]);
        const interval = setInterval(() => {
            if (i < nodes.length) {
                setLogs(prev => [...prev, `> ${nodes[i]}`]);
                i++;
            } else {
                clearInterval(interval);
                setTimeout(() => setStep('transfer'), 800);
            }
        }, 600);
        return () => clearInterval(interval);
    }
  }, [step]);

  // Money counter animation
  useEffect(() => {
      if (step === 'transfer') {
          const target = parseInt(data.amount.replace(/,/g, '')) || 0;
          const duration = 4000; // 4 seconds to drain
          const startTime = Date.now();

          const interval = setInterval(() => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              // Easing function for drama
              const ease = 1 - Math.pow(1 - progress, 3);
              
              const current = Math.floor(target * ease);
              setTransferredAmount(current);

              if (progress >= 1) {
                  clearInterval(interval);
                  setTimeout(() => setStep('success'), 1000);
              }
          }, 30);
          return () => clearInterval(interval);
      }
  }, [step, data.amount]);

  const startHeist = () => {
      if (!data.name || !data.amount) return;
      setStep('routing');
      setTransferredAmount(0);
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 text-green-400 font-mono relative overflow-hidden p-4 md:p-8">
      {/* Background World Map decorative */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
        <Globe size={600} className="animate-pulse" />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center">
        {step === 'input' && (
            <div className="w-full max-w-3xl bg-black/90 border-2 border-green-600 p-10 shadow-[0_0_50px_rgba(0,255,0,0.15)] backdrop-blur-xl">
                <div className="flex items-center gap-4 mb-10 border-b-2 border-green-800 pb-6">
                    <div className="p-3 bg-green-900/30 rounded-full border border-green-500">
                        <DollarSign size={40} className="text-green-500"/>
                    </div>
                    <div>
                        <h2 className="text-3xl font-black tracking-widest text-white">SWIFT INJECTOR v9.0</h2>
                        <p className="text-sm text-green-600 uppercase tracking-wider">Unauthorized Banking Terminal</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase text-green-500 block tracking-wider">Target Entity</label>
                        <input 
                            value={data.name}
                            onChange={e => setData({...data, name: e.target.value})}
                            className="w-full bg-green-900/10 border-b-2 border-green-700 p-4 text-xl text-white focus:border-green-400 focus:bg-green-900/20 outline-none transition-all placeholder-green-800"
                            placeholder="e.g. ARASAKA CORP"
                            autoFocus
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold uppercase text-green-500 block tracking-wider">Amount (USD)</label>
                        <input 
                            value={data.amount}
                            onChange={e => setData({...data, amount: e.target.value})}
                            type="number"
                            className="w-full bg-green-900/10 border-b-2 border-green-700 p-4 text-xl text-white focus:border-green-400 focus:bg-green-900/20 outline-none transition-all placeholder-green-800"
                            placeholder="0.00"
                        />
                    </div>
                    <div className="col-span-2 space-y-2">
                         <label className="text-sm font-bold uppercase text-green-500 block tracking-wider">Target Institution</label>
                         <div className="relative">
                             <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600" />
                             <select className="w-full bg-green-900/10 border border-green-700 p-4 pl-12 text-lg outline-none text-green-400 appearance-none cursor-pointer hover:border-green-500 transition-colors">
                                 {BANK_NAMES.map(b => <option key={b}>{b}</option>)}
                             </select>
                         </div>
                    </div>
                </div>
                
                <button 
                    onClick={startHeist}
                    className="w-full mt-10 bg-green-700 hover:bg-green-600 text-black font-black text-2xl py-5 uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_40px_rgba(0,255,0,0.5)] transform hover:scale-[1.01]"
                >
                    Initiate Transfer
                </button>
            </div>
        )}

        {step === 'routing' && (
            <div className="w-full max-w-4xl space-y-12">
                <div className="flex items-center justify-between px-12 relative">
                    {/* Visual Connection Line */}
                    <div className="absolute left-0 right-0 top-1/2 h-1 bg-green-900/50 -z-10"></div>
                    <div className="absolute left-0 top-1/2 h-1 bg-green-500 -z-10 transition-all duration-[4000ms] ease-linear w-full animate-[grow_4s_linear]"></div>

                    <div className="flex flex-col items-center gap-4 bg-black p-4 border border-green-500 z-10">
                        <Server size={64} className="text-green-500 animate-pulse" />
                        <span className="text-sm font-bold bg-green-900/50 px-2 py-1 rounded">LOCALHOST</span>
                    </div>

                    <div className="flex gap-2">
                        {[1,2,3,4,5].map(i => (
                            <div key={i} className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{animationDelay: `${i*150}ms`}}></div>
                        ))}
                    </div>

                    <div className="flex flex-col items-center gap-4 bg-black p-4 border border-red-500 z-10 shadow-[0_0_30px_rgba(255,0,0,0.2)]">
                        <Server size={64} className="text-red-500" />
                        <span className="text-sm font-bold bg-red-900/50 px-2 py-1 rounded text-red-300">MAINFRAME</span>
                    </div>
                </div>

                <div className="h-64 overflow-hidden w-full bg-black/80 border-2 border-green-800 p-6 font-mono text-lg shadow-inner">
                    {logs.map((l, i) => (
                        <div key={i} className="text-green-400 mb-2 animate-in fade-in slide-in-from-left-4 duration-300">
                            {l} <span className="text-green-700 text-xs ml-2">[OK]</span>
                        </div>
                    ))}
                    <div className="animate-pulse">_</div>
                </div>
            </div>
        )}

        {step === 'transfer' && (
            <div className="text-center w-full max-w-4xl">
                <h2 className="text-3xl mb-8 text-green-300 tracking-[0.3em] uppercase animate-pulse">Establishing Secure Uplink...</h2>
                
                <div className="relative py-12 border-y border-green-900/50 bg-green-900/5 mb-12">
                    <div className="text-7xl md:text-9xl font-black text-green-500 font-mono mb-2 text-neon tabular-nums tracking-tighter drop-shadow-[0_0_20px_rgba(0,255,0,0.6)]">
                        ${transferredAmount.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-700 tracking-[0.5em] font-bold">FUNDS TRANSFERRED</div>
                </div>

                <div className="w-full h-8 bg-black border-2 border-green-600 rounded-full overflow-hidden p-1 shadow-[0_0_20px_rgba(0,255,0,0.2)]">
                    <div 
                        className="h-full bg-green-500 shadow-[0_0_30px_#0f0] relative"
                        style={{width: `${(transferredAmount / parseInt(data.amount.replace(/,/g,''))) * 100}%`}}
                    >
                         <div className="absolute inset-0 bg-white/20 animate-[shimmer_1s_infinite]"></div>
                    </div>
                </div>
                
                <div className="mt-8 flex justify-between text-sm text-green-600 font-mono px-4">
                    <span className="border border-green-800 px-3 py-1">SOURCE: {data.name.toUpperCase()}</span>
                    <span className="animate-pulse text-red-500 font-bold border border-red-900 bg-red-900/10 px-3 py-1">TRACING ATTEMPT: BLOCKED</span>
                    <span className="border border-green-800 px-3 py-1">DEST: OFFSHORE_WALLET_X9</span>
                </div>
            </div>
        )}

        {step === 'success' && (
            <div className="text-center animate-bounce-in flex flex-col items-center">
                <div className="p-8 rounded-full border-4 border-green-500 mb-8 bg-green-900/20 shadow-[0_0_60px_rgba(0,255,0,0.4)]">
                    <ShieldCheck size={100} className="text-green-500 drop-shadow-[0_0_15px_#0f0]" />
                </div>
                <h2 className="text-6xl font-black text-white mb-4 tracking-tighter">TRANSFER COMPLETE</h2>
                <p className="text-2xl text-green-400 font-mono mb-12 border-b-2 border-green-800 pb-4 inline-block px-12">
                    ${parseInt(data.amount.replace(/,/g,'')).toLocaleString()} added to secure wallet.
                </p>
                <div className="flex gap-6 justify-center">
                    <button onClick={() => setStep('input')} className="border-2 border-green-500 text-green-500 px-8 py-4 text-xl font-bold hover:bg-green-500 hover:text-black transition-all uppercase tracking-wider">
                        Hack New Target
                    </button>
                    <button className="bg-green-600 text-black px-8 py-4 text-xl font-bold hover:bg-green-500 shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all uppercase tracking-wider">
                        Launder Funds
                    </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

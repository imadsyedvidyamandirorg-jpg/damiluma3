
import React, { useState, useEffect } from 'react';
import { Skull, Radio, Activity, Globe, UploadCloud } from 'lucide-react';

export const VirusMaker: React.FC = () => {
    const [step, setStep] = useState(1);
    const [config, setConfig] = useState({
        type: 'Ransomware',
        encryption: 'AES-256',
        stealth: true,
        target: ''
    });
    const [deployLog, setDeployLog] = useState<string[]>([]);
    const [infectedCount, setInfectedCount] = useState(0);

    const startDeploy = () => {
        if (!config.target) return;
        setStep(3);
        
        let logs = ["Initializing payload...", "Connecting to Command & Control...", `Targeting ${config.target}...`];
        let i = 0;
        
        const interval = setInterval(() => {
            if (i < logs.length) {
                setDeployLog(prev => [...prev, logs[i]]);
                i++;
            } else {
                setDeployLog(prev => [...prev, `Spreading to node ${Math.floor(Math.random()*255)}...`]);
                setInfectedCount(prev => prev + Math.floor(Math.random() * 50));
            }
        }, 800);
    };

    return (
        <div className="h-full bg-slate-900 text-red-500 font-mono flex flex-col p-6">
            <div className="border-b-2 border-red-900 pb-4 mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-black flex items-center gap-3"><Skull size={32} /> PLAGUE_BUILDER v4.0</h2>
                <div className="text-xs border border-red-800 px-2 py-1 text-red-400">UNREGISTERED COPY</div>
            </div>

            {step === 1 && (
                <div className="space-y-6 animate-in fade-in">
                    <div>
                        <label className="block text-red-400 font-bold mb-2">SELECT PAYLOAD TYPE</label>
                        <div className="grid grid-cols-2 gap-4">
                            {['Ransomware', 'Trojan', 'Worm', 'Spyware'].map(t => (
                                <button 
                                    key={t}
                                    onClick={() => setConfig({...config, type: t})}
                                    className={`p-4 border ${config.type === t ? 'bg-red-900 border-red-500 text-white' : 'border-red-900 hover:bg-red-900/20'} text-left transition-all`}
                                >
                                    <div className="font-bold">{t}</div>
                                    <div className="text-xs opacity-70 mt-1">
                                        {t === 'Ransomware' && 'Encrypts files & demands crypto.'}
                                        {t === 'Trojan' && 'Backdoor access remote shell.'}
                                        {t === 'Worm' && 'Self-replicating network flood.'}
                                        {t === 'Spyware' && 'Keylogger & Screen capture.'}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <button onClick={() => setStep(2)} className="w-full bg-red-600 hover:bg-red-500 text-black font-bold py-3 mt-8">
                        NEXT: CONFIGURATION
                    </button>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right">
                     <div>
                        <label className="block text-red-400 font-bold mb-2">TARGET PARAMETERS</label>
                        <input 
                            value={config.target}
                            onChange={e => setConfig({...config, target: e.target.value})}
                            placeholder="ENTER IP / PHONE / HOSTNAME" 
                            className="w-full bg-black border border-red-800 p-3 text-white outline-none focus:border-red-500"
                        />
                     </div>
                     
                     <div className="space-y-2">
                        <label className="block text-red-400 font-bold">OPTIONS</label>
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setConfig({...config, stealth: !config.stealth})}>
                            <div className={`w-4 h-4 border border-red-500 ${config.stealth ? 'bg-red-500' : ''}`}></div>
                            <span>Poly-morphic Code (Anti-Virus Evasion)</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <div className={`w-4 h-4 border border-red-500 bg-red-500`}></div>
                             <span>Disable System Restore</span>
                        </div>
                     </div>

                     <div className="flex gap-4 mt-8">
                         <button onClick={() => setStep(1)} className="flex-1 border border-red-800 text-red-500 py-3">BACK</button>
                         <button onClick={startDeploy} className="flex-1 bg-red-600 hover:bg-red-500 text-black font-bold py-3 animate-pulse">
                             COMPILE & DEPLOY
                         </button>
                     </div>
                </div>
            )}

            {step === 3 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in">
                    <Globe size={120} className="text-red-600 animate-pulse mb-8" />
                    <h3 className="text-3xl font-black mb-2">DEPLOYING {config.type.toUpperCase()}</h3>
                    <p className="text-red-400 mb-8 tracking-widest">TARGET: {config.target || 'GLOBAL_NETWORK'}</p>
                    
                    <div className="w-full bg-black border border-red-900 h-48 overflow-y-auto text-left p-4 font-mono text-sm mb-4">
                        {deployLog.map((l, i) => (
                            <div key={i} className="mb-1">> {l}</div>
                        ))}
                    </div>
                    
                    <div className="flex items-center gap-4 text-2xl font-bold">
                        <Activity className="animate-bounce" />
                        <span>INFECTED HOSTS: {infectedCount}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

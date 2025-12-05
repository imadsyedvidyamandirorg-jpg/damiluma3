
import React, { useState, useEffect } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

// 8. Crypto Miner
export const CryptoMiner: React.FC = () => {
  const [btc, setBtc] = useState(0.4021);
  const [hashrate, setHashrate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setBtc(prev => prev + 0.0000001);
        setHashrate(Math.floor(Math.random() * 50) + 120);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full bg-black p-4 font-mono text-green-500 flex flex-col items-center justify-center">
       <div className="text-6xl mb-4 animate-pulse">₿</div>
       <div className="text-2xl mb-2">{btc.toFixed(8)} BTC</div>
       <div className="text-sm text-gray-500">Hashrate: {hashrate} TH/s</div>
       <div className="w-full h-32 mt-8">
         <ResponsiveContainer width="100%" height="100%">
            <LineChart data={Array.from({length: 20}, (_, i) => ({val: Math.random()}))}>
                <Line type="monotone" dataKey="val" stroke="#0f0" dot={false} />
            </LineChart>
         </ResponsiveContainer>
       </div>
    </div>
  );
};

// 15. Audio Visualizer
export const AudioVisualizer: React.FC = () => {
    return (
        <div className="h-full flex items-end justify-center gap-1 p-4 bg-black/80">
            {Array.from({length: 20}).map((_, i) => (
                <div 
                    key={i} 
                    className="w-4 bg-green-500 transition-all duration-75"
                    style={{ 
                        height: `${Math.random() * 80 + 10}%`,
                        opacity: 0.5 + Math.random() * 0.5
                    }}
                ></div>
            ))}
        </div>
    )
}

// 7. Hacker Notes
export const HackerNotes: React.FC = () => (
    <textarea className="w-full h-full bg-black text-green-400 p-4 font-mono outline-none resize-none" placeholder="// Encrypted Notes storage..." defaultValue="# TODO LIST\n- Penetrate Firewall 404\n- Decrypt User DB\n- Buy Milk" />
)

// 17. Neon Calculator
export const NeonCalculator: React.FC = () => (
    <div className="h-full grid grid-cols-4 gap-2 p-4 font-mono text-xl">
        <div className="col-span-4 bg-green-900/20 text-right p-4 text-green-500 border border-green-500 mb-2">80085</div>
        {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map(k => (
            <button key={k} className="border border-green-800 hover:bg-green-900 text-green-500">{k}</button>
        ))}
    </div>
)

// Placeholder for generic text output apps
export const TextOutputApp: React.FC<{text: string}> = ({text}) => (
    <div className="p-4 font-mono text-green-500 whitespace-pre-wrap">{text}</div>
)

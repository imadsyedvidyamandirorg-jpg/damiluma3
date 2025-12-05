
import React, { useState } from 'react';
import { Crosshair, Smartphone, Globe } from 'lucide-react';

export const IPLocator: React.FC = () => {
    const [input, setInput] = useState('');
    const [searching, setSearching] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleSearch = () => {
        if (!input) return;
        setSearching(true);
        setResult(null);
        setTimeout(() => {
            setSearching(false);
            setResult({
                lat: (Math.random() * 180 - 90).toFixed(6),
                lon: (Math.random() * 360 - 180).toFixed(6),
                country: 'Russian Federation',
                city: 'Moscow',
                carrier: 'MegaFon',
                status: 'ACTIVE'
            });
        }, 2000);
    };

    return (
        <div className="h-full flex flex-col bg-black p-4 text-green-500 font-mono overflow-hidden">
            <div className="flex gap-2 mb-4 border border-green-800 p-2 bg-green-900/10">
                <input 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="ENTER IP OR PHONE NO."
                    className="flex-1 bg-transparent outline-none text-white placeholder-green-800"
                />
                <button onClick={handleSearch} className="bg-green-900 text-white px-4 hover:bg-green-700">
                    TRACE
                </button>
            </div>

            <div className="flex-1 border border-green-900 relative bg-green-900/5 overflow-hidden flex items-center justify-center">
                {/* Simulated Map Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                
                {searching ? (
                    <div className="text-center z-10">
                        <Globe size={64} className="mx-auto animate-spin mb-4 opacity-50"/>
                        <div className="text-xl animate-pulse">TRIANGULATING SIGNAL...</div>
                        <div className="text-xs mt-2">ACCESSING GSM TOWERS...</div>
                    </div>
                ) : result ? (
                    <div className="z-10 bg-black/80 border border-green-500 p-6 text-center animate-in zoom-in duration-300 shadow-[0_0_50px_rgba(0,255,0,0.3)]">
                        <Crosshair size={48} className="mx-auto mb-4 text-red-500 animate-pulse" />
                        <h2 className="text-2xl text-white font-bold mb-4">TARGET LOCATED</h2>
                        <div className="text-left space-y-2 text-sm">
                            <div className="flex justify-between border-b border-gray-800 pb-1">
                                <span>COORDINATES:</span> <span className="text-white">{result.lat}, {result.lon}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-800 pb-1">
                                <span>LOCATION:</span> <span className="text-white">{result.city}, {result.country}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-800 pb-1">
                                <span>PROVIDER:</span> <span className="text-white">{result.carrier}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>STATUS:</span> <span className="text-red-500 font-bold animate-pulse">{result.status}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="opacity-30 flex flex-col items-center">
                        <Smartphone size={64} className="mb-4" />
                        <div>WAITING FOR INPUT</div>
                    </div>
                )}
            </div>
        </div>
    );
};

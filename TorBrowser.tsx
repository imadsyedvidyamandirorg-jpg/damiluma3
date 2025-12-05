
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Lock, Home, ShoppingBag, MessageSquare, Database } from 'lucide-react';

const SITES: any = {
    'onion://home': {
        title: 'Hidden Wiki',
        // Updated to destructure nav from props
        content: ({ nav }: { nav: (url: string) => void }) => (
            <div className="p-8 max-w-4xl mx-auto">
                <h1 className="text-4xl text-gray-200 font-serif mb-6 border-b border-gray-700 pb-4">The Hidden Wiki</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div onClick={() => nav('onion://market')} className="bg-gray-800 p-4 rounded hover:bg-gray-700 cursor-pointer border-l-4 border-blue-500">
                        <h3 className="text-xl text-blue-400 font-bold mb-2 flex items-center gap-2"><ShoppingBag size={18}/> Silk Road 4.0</h3>
                        <p className="text-gray-400 text-sm">Marketplace for illicit digital goods. Escrow enabled.</p>
                    </div>
                    <div onClick={() => nav('onion://chat')} className="bg-gray-800 p-4 rounded hover:bg-gray-700 cursor-pointer border-l-4 border-green-500">
                        <h3 className="text-xl text-green-400 font-bold mb-2 flex items-center gap-2"><MessageSquare size={18}/> Red Room Chat</h3>
                        <p className="text-gray-400 text-sm">Anonymous encrypted chat. No logging.</p>
                    </div>
                    <div onClick={() => nav('onion://leaks')} className="bg-gray-800 p-4 rounded hover:bg-gray-700 cursor-pointer border-l-4 border-red-500">
                        <h3 className="text-xl text-red-400 font-bold mb-2 flex items-center gap-2"><Database size={18}/> Data Leaks</h3>
                        <p className="text-gray-400 text-sm">Corporate database dumps. SQL/Credit Cards.</p>
                    </div>
                </div>
            </div>
        )
    },
    'onion://market': {
        title: 'Silk Road 4.0',
        content: () => (
            <div className="p-4">
                <div className="bg-gray-800 p-4 mb-4 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-yellow-500">SILK ROAD 4.0</h2>
                    <div className="text-sm">Balance: 0.0000 BTC <button className="ml-2 bg-yellow-600 px-2 py-1 rounded text-black font-bold">DEPOSIT</button></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="border border-gray-700 bg-gray-900 p-3">
                            <div className="h-32 bg-black mb-2 flex items-center justify-center text-gray-700 font-bold">[IMG_ENCRYPTED]</div>
                            <div className="font-bold text-gray-300">Item #{3920+i}</div>
                            <div className="text-xs text-gray-500 mb-2">Seller: DarkStar99</div>
                            <div className="flex justify-between items-center">
                                <span className="text-yellow-500 font-mono">₿ {0.05 * i}</span>
                                <button className="bg-blue-900 text-xs px-2 py-1 rounded hover:bg-blue-800">BUY NOW</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    },
    'onion://chat': {
        title: 'Red Room',
        content: () => (
            <div className="flex flex-col h-[calc(100%-4rem)]">
                <div className="bg-red-900/20 p-4 border-b border-red-900">
                    <h2 className="text-red-500 font-bold flex items-center gap-2"><Lock size={16}/> ENCRYPTED CHANNEL #9482</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-sm">
                    <div className="text-gray-500 text-center text-xs my-4">--- KEY EXCHANGE COMPLETE ---</div>
                    <div className="text-green-500"><span className="text-gray-500">[14:02] user1:</span> Anyone got the new zero-day for Chrome?</div>
                    <div className="text-blue-400"><span className="text-gray-500">[14:03] admin:</span> Selling it for 5 BTC. DM me.</div>
                    <div className="text-purple-400"><span className="text-gray-500">[14:04] anon:</span> Do not trust user 'admin', he is a fed.</div>
                    <div className="text-red-500"><span className="text-gray-500">[14:05] SYSTEM:</span> User 'anon' has been disconnected.</div>
                </div>
                <div className="p-2 border-t border-gray-700 flex gap-2">
                     <input className="flex-1 bg-black border border-gray-600 p-2 text-white" placeholder="Message..." />
                     <button className="bg-gray-700 px-4 text-white">SEND</button>
                </div>
            </div>
        )
    }
};

export const TorBrowser: React.FC = () => {
  const [url, setUrl] = useState('onion://home');
  const [history, setHistory] = useState<string[]>(['onion://home']);

  const navigate = (newUrl: string) => {
      setUrl(newUrl);
      setHistory(prev => [...prev, newUrl]);
  };

  const CurrentPage = SITES[url]?.content || (() => <div className="p-8 text-center text-red-500 font-bold">404 - NODE UNREACHABLE</div>);

  return (
    <div className="h-full flex flex-col bg-[#1a1a1a] text-gray-300 font-sans">
      {/* Browser Chrome */}
      <div className="h-12 bg-[#2b2b2b] flex items-center px-2 gap-2 border-b border-black shadow-md shrink-0">
          <div className="flex gap-1">
             <div className="w-3 h-3 rounded-full bg-red-500 opacity-50"></div>
             <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-50"></div>
             <div className="w-3 h-3 rounded-full bg-green-500 opacity-50"></div>
          </div>
          <div className="flex gap-2 ml-4 text-gray-400">
              <ArrowLeft size={16} className="cursor-pointer hover:text-white"/>
              <ArrowRight size={16} className="cursor-pointer hover:text-white"/>
              <RotateCw size={16} className="cursor-pointer hover:text-white"/>
          </div>
          <div className="flex-1 bg-[#1a1a1a] rounded px-3 py-1 text-xs md:text-sm flex items-center gap-2 text-green-500 font-mono border border-gray-700 mx-4">
              <Lock size={12} />
              <input 
                value={url} 
                onChange={(e) => setUrl(e.target.value)} 
                className="bg-transparent border-none outline-none w-full text-green-500"
              />
          </div>
          <Home size={18} className="text-gray-400 cursor-pointer hover:text-white" onClick={() => navigate('onion://home')} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-[#121212] relative">
          <CurrentPage nav={navigate} />
      </div>
    </div>
  );
};

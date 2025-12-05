import React, { useState } from 'react';
import { Lock, AlertTriangle } from 'lucide-react';

// ❗ FIXED IMPORT — NOW USING ROOT FILE (NO FOLDERS)
import { playAccessDenied, playAccessGranted } from "./sound";

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (pass === '123') {
      playAccessGranted();
      onLogin();
    } else {
      playAccessDenied();
      setError(true);
      setPass('');
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div className={`h-screen w-screen bg-black flex items-center justify-center flex-col ${error ? 'animate-pulse bg-red-900/20' : ''}`}>
      <div className={`p-8 border-2 ${error ? 'border-red-500' : 'border-green-500'} rounded-lg w-96 bg-black shadow-[0_0_20px_rgba(0,255,0,0.3)]`}>
        
        <div className="flex justify-center mb-6 text-green-500">
          {error ? (
            <AlertTriangle size={64} className="text-red-500 animate-bounce" />
          ) : (
            <Lock size={64} />
          )}
        </div>

        <h1 className={`text-3xl font-bold text-center mb-8 font-mono ${error ? 'text-red-500' : 'text-green-500'} text-neon`}>
          {error ? 'ACCESS DENIED' : 'DAMI LUMA LOCKED'}
        </h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className={`bg-black border-b-2 ${error ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500'} outline-none p-2 text-center text-xl font-mono placeholder-green-800`}
            placeholder="ENTER PASSWORD"
            autoFocus
          />

          <button 
            type="submit"
            className={`mt-4 py-2 px-4 ${error ? 'bg-red-900 hover:bg-red-800' : 'bg-green-900 hover:bg-green-800'} text-white font-mono rounded transition-colors uppercase`}
          >
            {error ? 'Retry' : 'Decrypt & Enter'}
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-500 text-center font-mono text-sm">
            INTRUSION DETECTED. IP LOGGED.
          </div>
        )}
      </div>
    </div>
  );
};


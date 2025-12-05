
import React, { useState, useEffect, useRef } from 'react';

export const TerminalPro: React.FC = () => {
  const [history, setHistory] = useState<string[]>(['DamiOS Shell v1.2.4', 'Type "help" for commands.']);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
    inputRef.current?.focus();
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      setHistory(prev => [...prev, `root@dami:~# ${cmd}`]);
      
      // Command Logic
      const args = cmd.split(' ');
      const command = args[0].toLowerCase();
      
      let response = '';
      switch(command) {
        case 'help':
          response = `AVAILABLE COMMANDS:
  help    - Show this menu
  clear   - Clear terminal
  scan    - Scan target IP (scan <ip>)
  hack    - Auto-exploit target
  ssh     - Connect to remote host
  whoami  - Print effective userid`;
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'whoami':
          response = 'root (uid=0, gid=0)';
          break;
        case 'scan':
          if (!args[1]) response = 'Usage: scan <target_ip>';
          else response = `Starting Nmap 7.92 scan on ${args[1]}...
Host is up (0.0024s latency).
Not shown: 997 closed tcp ports (reset)
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https
MAC Address: 00:1A:2B:3C:4D:5E (Dami Virtual Nic)

Nmap done: 1 IP address (1 host up) scanned in 1.45 seconds`;
          break;
        case 'hack':
           if (!args[1]) response = 'Usage: hack <target>';
           else response = `[+] Targeting ${args[1]}...
[+] Exploit: linux/http/apache_mod_cgi_bash_env_exec
[+] Sending payload...
[!] Target is vulnerable!
[*] Command shell session 1 opened.
[+] Root access confirmed.`;
           break;
        case 'ssh':
            response = `Connecting to ${args[1] || 'unknown'}...
Permission denied (publickey,password).`;
            break;
        case '':
            response = '';
            break;
        default:
          response = `bash: ${command}: command not found`;
      }
      
      if(response) {
          const lines = response.split('\n');
          setHistory(prev => [...prev, ...lines]);
      }
      setInput('');
    }
  };

  return (
    <div className="h-full bg-black/95 p-4 font-mono text-sm md:text-base text-gray-300 overflow-y-auto" onClick={() => inputRef.current?.focus()}>
      {history.map((line, i) => (
        <div key={i} className={`${line.startsWith('root') ? 'text-green-500 mt-2' : 'text-gray-300'} whitespace-pre-wrap`}>
          {line}
        </div>
      ))}
      <div className="flex items-center gap-2 mt-2 text-green-500">
        <span>root@dami:~#</span>
        <input 
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="bg-transparent outline-none flex-1 text-white"
          autoFocus
        />
      </div>
      <div ref={endRef} />
    </div>
  );
};

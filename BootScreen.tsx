import React, { useEffect, useState } from 'react';

interface BootScreenProps {
  onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const bootSequence = [
      "Dami Luma BIOS v4.0.21",
      "Copyright (C) 2077 Dami Systems Inc.",
      "CPU: Quantum Core i9-9900K @ 8.5GHz",
      "Memory Test: 65536MB OK",
      "Detecting Primary Master ... DAMI-SSD-2TB",
      "Detecting Primary Slave ... None",
      "Initializing GPU ... NVIDIA RTX 9090 Ti",
      "Loading Kernel ...",
      "Mounting root file system ...",
      "Checking file system integrity ...",
      "Loading modules: net, crypto, hacking_tools, dark_web_connector ...",
      "Module 'moral_compass' ... FAILED (Bypassed)",
      "System Ready.",
      "Booting Dami Luma OS..."
    ];

    let delay = 0;
    bootSequence.forEach((line, index) => {
      delay += Math.random() * 300 + 100;
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (index === bootSequence.length - 1) {
          setTimeout(onComplete, 1000);
        }
      }, delay);
    });
  }, [onComplete]);

  return (
    <div className="h-screen w-screen bg-black text-green-500 font-mono p-8 text-lg flex flex-col justify-end pb-20">
      {lines.map((line, i) => (
        <div key={i} className="mb-1">{line}</div>
      ))}
      <div className="animate-pulse">_</div>
    </div>
  );
};
'use client';

import { useState } from 'react';
import Button from '../components/Button';
import { motion } from 'framer-motion';
import { Saira } from 'next/font/google';

const saira = Saira({
  weight: '400',
  subsets: ['latin'],
});

export default function Connect() {
  const serverIP = 'Fivem_Server_IP:30120';
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(serverIP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="container mx-auto py-16 text-center">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6"
      >
        Connect to FlyHighMC
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg mb-8"
      >
        <p className="text-lg mb-4">Server IP</p>
        <div className="flex items-center justify-center space-x-3 mb-4">
          <span className="text-xl font-mono bg-gray-700 py-2 px-4 rounded">
            {serverIP}
          </span>
        </div>
        
        <Button onClick={handleCopy}>
          {copied ? '✓ Copied!' : 'Copy Server IP'}
        </Button>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8 text-lg"
      >
        <h2 className={`${saira.className} text-2xl font-bold mb-4`}>How to Connect</h2>
        <ol className={`${saira.className} max-w-md mx-auto text-left space-y-3 list-decimal list-inside`}>
          <li>Download and install <a href="https://fivem.net" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">FiveM</a></li>
          <li>Launch FiveM and click on the <strong>Play</strong> button</li>
          <li>Click on <strong>Direct Connect</strong></li>
          <li>Paste the server IP and click <strong>Connect</strong></li>
          <li>Enjoy your time on the WallkerRocker server!</li>
        </ol>
      </motion.div>
    </section>
  );
}

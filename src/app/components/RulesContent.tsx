// src/components/RulesContent.tsx
'use client';
import { motion } from 'framer-motion';
import Button from './Button'; // Adjust path as needed
import { Archivo } from 'next/font/google';
import { useState, useEffect } from 'react';

const archivo = Archivo({
  weight: "400",
  subsets: ["latin"],
});

export default function RulesContent({
  backgroundImage = '',
  backgroundOverlay = 'bg-black/70'
}) {
  const rulesList = [
    'Be respectful to all players.',
    'No griefing or random violence.',
    'No cheating or exploiting bugs.',
    'Follow staff instructions at all times.',
    'Have fun and roleplay responsibly.'
  ];
 
  const [imageLoaded, setImageLoaded] = useState(!backgroundImage);
 
  // Preload image for better performance
  useEffect(() => {
    if (!backgroundImage) return;
   
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => setImageLoaded(true);
  }, [backgroundImage]);
  
  // Add effect to handle full page styling
  useEffect(() => {
    if (backgroundImage) {
      // Apply styles to make background take up the full page
      document.body.style.overflow = 'auto';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.minHeight = '100vh';
      
      // Clean up when component unmounts
      return () => {
        document.body.style.overflow = '';
        document.body.style.margin = '';
        document.body.style.padding = '';
        document.body.style.minHeight = '';
      };
    }
  }, [backgroundImage]);
 
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* Background layer */}
      {backgroundImage && (
        <div
          className={`fixed inset-0 w-full h-full transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            zIndex: -2,
          }}
        />
      )}
     
      {/* Overlay for better readability */}
      {backgroundImage && (
        <div
          className={`fixed inset-0 w-full h-full ${backgroundOverlay}`}
          style={{ zIndex: -1 }}
        />
      )}
     
      {/* Content container */}
      <div className="container mx-auto relative z-10 w-full">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${archivo.className} text-3xl font-bold mb-8 text-center ${backgroundImage ? 'text-white' : ''}`}
        >
          Server Rules
        </motion.h1>
       
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`${archivo.className} ${backgroundImage ? 'bg-gray-800/80' : 'bg-gray-800'} rounded-lg p-6 max-w-2xl mx-auto mb-8 backdrop-blur-sm shadow-lg`}
        >
          <ul className="space-y-4">
            {rulesList.map((rule, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="bg-[#d5f365] text-gray-800 font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </span>
                <span className={backgroundImage ? 'text-gray-100' : ''}>
                  {rule}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
       
        <div className={`${archivo.className} text-center`}>
          <Button
            href="/connect"
            className="inline-block px-4 py-2 text-sm"
          >
            I Agree to the Rules
          </Button>
        </div>
      </div>
    </section>
  );
}
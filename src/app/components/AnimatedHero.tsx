'use client';
import { motion } from 'framer-motion';
import StrokedButton from './StrokedButton';
import { useState, useEffect } from 'react';
import { Iceberg } from 'next/font/google';

const iceberg = Iceberg({
  weight: '400',
  subsets: ['latin'],
});

// Define interface for the SVG text component props
interface StrokedSVGTextProps {
  text: string;
  className?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  fontSize?: string;
  delay?: number;
}

// SVG Text component with multiline support for responsive displays
const StrokedSVGText: React.FC<StrokedSVGTextProps> = ({ 
  text, 
  className = '', 
  fill = 'white', 
  stroke = 'black',
  strokeWidth = 2,
  fontSize = '60px',
  delay = 0
}) => {
  // Track state for text wrapping and dimensions
  const [lines, setLines] = useState<string[]>([text]);
  const [viewBoxHeight, setViewBoxHeight] = useState(100);
  const [viewBoxWidth, setViewBoxWidth] = useState(600);
  const [deviceType, setDeviceType] = useState('desktop');
  
  // Handle text wrapping based on screen size
  useEffect(() => {
    const updateTextWrapping = () => {
      const width = window.innerWidth;
      let wordBreakPoint = 25; // Default chars per line
      let newDeviceType = 'desktop';
      
      // Set wrapping breakpoints based on device width
      if (width < 640) { // Mobile
        wordBreakPoint = 10;
        newDeviceType = 'mobile';
      } else if (width < 768) { // Small tablets
        wordBreakPoint = 15;
        newDeviceType = 'small-tablet';
      } else if (width < 1024) { // Tablets
        wordBreakPoint = 20;
        newDeviceType = 'tablet';
      }
      
      setDeviceType(newDeviceType);
      
      // Skip wrapping for title (assumed to be short)
      if (text.length <= wordBreakPoint || text === 'WallkerRocker') {
        setLines([text]);
        setViewBoxHeight(100);
        setViewBoxWidth(Math.max(text.length * 40, 300));
        return;
      }
      
      // Wrap text for longer content
      const words = text.split(' ');
      const newLines: string[] = [];
      let currentLine = '';
      
      // Create wrapped lines
      words.forEach((word) => {
        if (currentLine.length + word.length > wordBreakPoint && currentLine.length > 0) {
          newLines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = currentLine.length === 0 ? word : `${currentLine} ${word}`;
        }
      });
      
      // Add the last line
      if (currentLine.length > 0) {
        newLines.push(currentLine);
      }
      
      // Update state with wrapped lines
      setLines(newLines);
      setViewBoxHeight(Math.max(newLines.length * 70, 100));
      
      // Find the longest line to set width
      const maxLineLength = Math.max(...newLines.map(line => line.length));
      setViewBoxWidth(Math.max(maxLineLength * 30, 300));
    };
    
    // Initial update
    updateTextWrapping();
    
    // Add resize listener
    window.addEventListener('resize', updateTextWrapping);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateTextWrapping);
  }, [text]);
  
  return (
    <motion.svg 
      className={`w-full overflow-visible ${className}`} 
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      preserveAspectRatio="xMidYMid meet"
      initial={{ opacity: 0, y: delay === 0 ? -50 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: delay, ease: 'easeOut' }}
    >
      {lines.map((line, index) => {
        // Calculate vertical position based on number of lines
        const yPos = lines.length === 1 
          ? 50 // Center if only one line
          : (index + 0.5) * (100 / lines.length); // Distribute lines evenly
        
        return (
          <text
            key={index}
            x="50%"
            y={`${yPos}%`}
            dominantBaseline="middle"
            textAnchor="middle"
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            className={iceberg.className}
            style={{ fontSize, fontWeight: 'bold' }}
            paintOrder="stroke"
          >
            {line}
          </text>
        );
      })}
    </motion.svg>
  );
};

// Define interface for the AnimatedHero component props
interface AnimatedHeroProps {
  backgroundImage?: string;
  backgroundOverlay?: string;
}

export default function AnimatedHero({
  backgroundImage = 'bg_flyhighmc_website_home_page.png',
  backgroundOverlay = 'bg-black/60'
}: AnimatedHeroProps) {
  const [imageLoaded, setImageLoaded] = useState(!backgroundImage);
 
  // Preload image for better performance
  useEffect(() => {
    if (!backgroundImage) return;
   
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => setImageLoaded(true);
   
    // Apply the background to the entire html/body when component mounts
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'auto';
    document.body.style.height = '100vh';
   
    // Clean up when component unmounts
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [backgroundImage]);

  return (
    <>
      {/* Full page background wrapper */}
      {backgroundImage && (
        <div
          className="fixed inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            zIndex: -2,
          }}
        />
      )}
     
      {/* Overlay for better text readability - fixed position */}
      {backgroundImage && (
        <div
          className={`fixed inset-0 w-full h-full ${backgroundOverlay}`}
          style={{ zIndex: -1 }}
        />
      )}
     
      {/* Main content section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="container mx-auto relative">
          {/* Title with stroke effect */}
          <div className="mb-6">
            <StrokedSVGText 
              text="FlyHigh MC" 
              fill="#FC3604FF" 
              stroke="#000000" 
              strokeWidth={10}
              fontSize="60px"
              className="h-24 md:h-28"
            />
          </div>
         
          {/* Subtitle with stroke effect */}
          <div className="mb-8">
            <StrokedSVGText 
              text="The Minecraft Survival Server, where you can be you!" 
              fill="#ffffff" 
              stroke="#000000" 
              strokeWidth={1.5}
              fontSize="100px"
              delay={0.2}
              className="h-16 md:h-20"
            />
          </div>
         
          {/* Buttons container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <StrokedButton 
              href="/connect"
              children="Connect Now"
              bgClass="bg-[#FF0606FF]"
              textClass="text-[#00FF6EFF]"
              strokeColor="#000000"
              
            />
            <StrokedButton 
              href="https://discord.gg/chbxgdyUhy"
              children="Join Discord"
              bgClass="bg-[#0905FFFF]" 
              textClass="text-[#FFFFFFFF]"
              strokeColor="#000000"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
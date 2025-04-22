// AnimatedStrokedText.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedStrokedTextProps {
  text: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  fontSize?: string;
  fontWeight?: string;
  className?: string;
}

const AnimatedStrokedText: React.FC<AnimatedStrokedTextProps> = ({
  text,
  fill = 'white',
  stroke = 'black',
  strokeWidth = 2,
  fontSize = '24px',
  fontWeight = 'bold',
  className = ''
}) => {
  return (
    <svg 
      className={`w-full overflow-visible ${className}`} 
      viewBox="0 0 300 80"
      preserveAspectRatio="xMidYMid meet"
    >
      <motion.text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        style={{ fontSize, fontWeight }}
        paintOrder="stroke"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {text}
      </motion.text>
    </svg>
  );
};

export default AnimatedStrokedText;
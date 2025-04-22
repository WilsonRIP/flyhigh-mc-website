// components/StrokedText.tsx
import React from 'react';

interface StrokedTextProps {
  text: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  fontSize?: string;
  fontWeight?: string;
  className?: string;
  x?: string;
  y?: string;
}

const StrokedText: React.FC<StrokedTextProps> = ({
  text,
  fill = 'white',
  stroke = 'black',
  strokeWidth = 2,
  fontSize = '24px',
  fontWeight = 'bold',
  className = '',
  x = '50%',
  y = '50%'
}) => {
  return (
    <svg 
      className={`w-full overflow-visible ${className}`} 
      viewBox="0 0 300 80"
      preserveAspectRatio="xMidYMid meet"
    >
      <text
        x={x}
        y={y}
        dominantBaseline="middle"
        textAnchor="middle"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        style={{ fontSize, fontWeight }}
        paintOrder="stroke"
      >
        {text}
      </text>
    </svg>
  );
};

export default StrokedText;
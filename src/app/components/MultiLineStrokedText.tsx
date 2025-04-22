// MultiLineStrokedText.tsx
import React from 'react';

interface MultiLineStrokedTextProps {
  lines: string[];
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: number;
  className?: string;
}

const MultiLineStrokedText: React.FC<MultiLineStrokedTextProps> = ({
  lines,
  fill = 'white',
  stroke = 'black',
  strokeWidth = 2,
  fontSize = '24px',
  fontWeight = 'bold',
  lineHeight = 1.2,
  className = ''
}) => {
  const lineCount = lines.length;
  const viewBoxHeight = lineCount * 50;
  
  return (
    <svg 
      className={`w-full overflow-visible ${className}`} 
      viewBox={`0 0 300 ${viewBoxHeight}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {lines.map((line, index) => {
        const yPosition = (viewBoxHeight / (lineCount + 1)) * (index + 1);
        
        return (
          <text
            key={index}
            x="50%"
            y={yPosition}
            dominantBaseline="middle"
            textAnchor="middle"
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            style={{ 
              fontSize, 
              fontWeight,
              lineHeight 
            }}
            paintOrder="stroke"
          >
            {line}
          </text>
        );
      })}
    </svg>
  );
};

export default MultiLineStrokedText;
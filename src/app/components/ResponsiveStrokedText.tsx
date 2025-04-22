// ResponsiveStrokedText.tsx
import React from 'react';
import StrokedText from './StrokedText';

interface ResponsiveStrokedTextProps {
  text: string;
  fill?: string;
  stroke?: string;
  baseStrokeWidth?: number;
  baseFontSize?: number;
  fontWeight?: string;
  className?: string;
}

const ResponsiveStrokedText: React.FC<ResponsiveStrokedTextProps> = ({
  text,
  fill = 'white',
  stroke = 'black',
  baseStrokeWidth = 2,
  baseFontSize = 24,
  fontWeight = 'bold',
  className = ''
}) => {
  return (
    <div className={className}>
      {/* Mobile */}
      <div className="block md:hidden">
        <StrokedText 
          text={text}
          fill={fill}
          stroke={stroke}
          strokeWidth={baseStrokeWidth * 0.7}
          fontSize={`${baseFontSize * 0.7}px`}
          fontWeight={fontWeight}
        />
      </div>
      
      {/* Tablet */}
      <div className="hidden md:block lg:hidden">
        <StrokedText 
          text={text}
          fill={fill}
          stroke={stroke}
          strokeWidth={baseStrokeWidth * 0.85}
          fontSize={`${baseFontSize * 0.85}px`}
          fontWeight={fontWeight}
        />
      </div>
      
      {/* Desktop */}
      <div className="hidden lg:block">
        <StrokedText 
          text={text}
          fill={fill}
          stroke={stroke}
          strokeWidth={baseStrokeWidth}
          fontSize={`${baseFontSize}px`}
          fontWeight={fontWeight}
        />
      </div>
    </div>
  );
};

export default ResponsiveStrokedText;
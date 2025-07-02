import React from 'react';
import { useTheme } from '@mui/material/styles';

interface TriangleProps {
  top?: number;
  leftSide?: number;
  rightSide?: number;
  bottomLeft?: number;
  bottomRight?: number;
  width?: number;
  height?: number;
}

const TriangleDiagram: React.FC<TriangleProps> = ({
  top = 4,
  leftSide = 16,
  rightSide = 52,
  bottomLeft = 28,
  bottomRight = 40,
  width = 400,
  height = 300,
}) => {
  const theme = useTheme();
  // Calculate triangle points
  const trianglePoints = `${width / 2},50 50,${height - 50} ${width - 50},${height - 50}`;

  return (
    <div>
      <div>
        <svg width={width} height={height}>
          {/* Triangle outline */}
          <polygon
            points={trianglePoints}
            fill="none"
            stroke={theme.palette.primary.main}
            strokeWidth="3"
          />

          {/* Numbers positioned around the triangle */}
          {/* Top number */}
          <text x={width / 2} y="35" textAnchor="middle" fill={theme.palette.text.primary}>
            {top}
          </text>

          {/* Left side number - moved further left */}
          <text
            x={width / 2 - 90}
            y={height / 2 - 10}
            textAnchor="middle"
            fill={theme.palette.text.primary}
          >
            {leftSide}
          </text>

          {/* Right side number - moved further right */}
          <text
            x={width / 2 + 90}
            y={height / 2 - 10}
            textAnchor="middle"
            fill={theme.palette.text.primary}
          >
            {rightSide}
          </text>

          {/* Bottom left number */}
          <text x="30" y={height - 25} textAnchor="middle" fill={theme.palette.text.primary}>
            {bottomLeft}
          </text>

          {/* Bottom right number */}
          <text
            x={width - 30}
            y={height - 25}
            textAnchor="middle"
            fill={theme.palette.text.primary}
          >
            {bottomRight}
          </text>
        </svg>
      </div>
    </div>
  );
};

export { TriangleDiagram };

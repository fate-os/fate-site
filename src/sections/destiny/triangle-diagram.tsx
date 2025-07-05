import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Directions } from '@/types';
import { Iconify } from '@/components/iconify';
import { Box, Stack } from '@mui/material';

interface TriangleProps {
  top?: number;
  leftSide?: number;
  rightSide?: number;
  bottomLeft?: number;
  bottomRight?: number;
  leftSideArrow?: Directions;
  rightSideArrow?: Directions;
  bottomArrow?: Directions;
  width?: number;
  height?: number;
  straightLeft?: Directions;
  straightRight?: Directions;
}

const TriangleDiagram: React.FC<TriangleProps> = ({
  top = 4,
  leftSide = 16,
  rightSide = 52,
  bottomLeft = 28,
  bottomRight = 40,
  leftSideArrow,
  rightSideArrow,
  bottomArrow,
  straightLeft,
  straightRight,
  width = 400,
  height = 300,
}) => {
  const theme = useTheme();
  // Calculate triangle points
  const trianglePoints = `${width / 2},50 50,${height - 50} ${width - 50},${height - 50}`;

  return (
    <Box style={{ position: 'relative' }}>
      {/* Straight arrows in center using Iconify */}
      <Stack
        justifyContent={'center'}
        direction={'row'}
        alignItems={'center'}
        minHeight={300}
        spacing={5}
      >
        {/* Straight Left Arrow */}
        {straightLeft && (
          <Iconify
            icon={straightLeft === 'up' ? 'heroicons:arrow-up-solid' : 'heroicons:arrow-down-solid'}
            width={70}
            height={70}
            color={theme.palette.primary.main}
          />
        )}

        {/* Straight Right Arrow */}
        {straightRight && (
          <Iconify
            icon={
              straightRight === 'up' ? 'heroicons:arrow-up-solid' : 'heroicons:arrow-down-solid'
            }
            width={70}
            height={70}
            color={theme.palette.primary.main}
          />
        )}
      </Stack>

      {(!straightLeft || !straightLeft) && (
        <Box>
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

            {/* Left side arrow - dynamic based on leftSideArrow prop */}
            {leftSideArrow && (
              <g>
                {(() => {
                  // Position: right side of the leftSide number, inside the triangle near the left angle
                  const arrowX = width / 2 - 90 + 32; // 32px right of number
                  const arrowY = height / 2 - 10; // align vertically with the number
                  const scale = 0.1; // keep bold
                  const baseRotate = 40; // base rotation to match left triangle edge
                  const rotate = leftSideArrow === 'up' ? baseRotate : baseRotate + 180; // flip for down
                  return (
                    <g
                      transform={`translate(${arrowX},${arrowY}) scale(${scale}) rotate(${rotate})`}
                    >
                      <path
                        d="M202.82812,114.82812a3.99853,3.99853,0,0,1-5.65625,0L132,49.65723V216a4,4,0,0,1-8,0V49.65723L58.82812,114.82812a3.99957,3.99957,0,0,1-5.65625-5.65625l72-72a3.99854,3.99854,0,0,1,5.65625,0l72,72A3.99854,3.99854,0,0,1,202.82812,114.82812Z"
                        fill={theme.palette.error.main}
                        stroke={theme.palette.error.main}
                        strokeWidth={8}
                      />
                    </g>
                  );
                })()}
              </g>
            )}

            {/* Right side number - moved further right */}
            <text
              x={width / 2 + 90}
              y={height / 2 - 10}
              textAnchor="middle"
              fill={theme.palette.text.primary}
            >
              {rightSide}
            </text>

            {/* Right side arrow - dynamic based on rightSideArrow prop */}
            {rightSideArrow && (
              <g>
                {(() => {
                  // Position: left side of the rightSide number, inside the triangle near the right angle
                  const arrowX = width / 2 + 90 - 32; // 32px left of number
                  const arrowY = height / 2 - 10; // align vertically with the number
                  const scale = 0.1; // keep bold
                  const baseRotate = -40; // base rotation to match right triangle edge
                  const rotate = rightSideArrow === 'up' ? baseRotate : baseRotate + 180; // flip for down
                  return (
                    <g
                      transform={`translate(${arrowX},${arrowY}) scale(${scale}) rotate(${rotate})`}
                    >
                      <path
                        d="M202.82812,114.82812a3.99853,3.99853,0,0,1-5.65625,0L132,49.65723V216a4,4,0,0,1-8,0V49.65723L58.82812,114.82812a3.99957,3.99957,0,0,1-5.65625-5.65625l72-72a3.99854,3.99854,0,0,1,5.65625,0l72,72A3.99854,3.99854,0,0,1,202.82812,114.82812Z"
                        fill={theme.palette.error.main}
                        stroke={theme.palette.error.main}
                        strokeWidth={8}
                      />
                    </g>
                  );
                })()}
              </g>
            )}

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

            {/* Bottom arrow - dynamic based on bottomArrow prop */}
            {bottomArrow && (
              <g>
                {(() => {
                  // Position: center bottom of the triangle
                  const arrowX = width / 2;
                  const arrowY = height - 60; // above the bottom numbers
                  const scale = 0.1; // keep bold
                  const baseRotate = 0; // pointing up by default
                  const rotate = bottomArrow === 'up' ? baseRotate : baseRotate + 180; // flip for down
                  return (
                    <g
                      transform={`translate(${arrowX},${arrowY}) scale(${scale}) rotate(${rotate})`}
                    >
                      <path
                        d="M202.82812,114.82812a3.99853,3.99853,0,0,1-5.65625,0L132,49.65723V216a4,4,0,0,1-8,0V49.65723L58.82812,114.82812a3.99957,3.99957,0,0,1-5.65625-5.65625l72-72a3.99854,3.99854,0,0,1,5.65625,0l72,72A3.99854,3.99854,0,0,1,202.82812,114.82812Z"
                        fill={theme.palette.error.main}
                        stroke={theme.palette.error.main}
                        strokeWidth={8}
                      />
                    </g>
                  );
                })()}
              </g>
            )}
          </svg>
        </Box>
      )}
    </Box>
  );
};

export { TriangleDiagram };

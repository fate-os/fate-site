import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Direction } from '@/types';
import { Iconify } from '@/components/iconify';
import { Box, Stack } from '@mui/material';

interface TriangleProps {
  top?: number;
  leftSide?: number;
  rightSide?: number;
  bottomLeft?: number;
  bottomRight?: number;
  leftSideArrow?: Direction;
  rightSideArrow?: Direction;
  bottomArrow?: Direction;
  width?: number;
  height?: number;
  straightLeft?: Direction;
  straightRight?: Direction;
  straightBottom?: Direction;
  shine?: Direction;
  middleText?: string;
  onClick?: () => void;
  perpendicular?: Direction;
  hasCircle?: boolean;
}

const TriangleDiagram: React.FC<TriangleProps> = ({
  top,
  leftSide,
  rightSide,
  bottomLeft,
  bottomRight,
  leftSideArrow,
  rightSideArrow,
  bottomArrow,
  straightLeft,
  straightRight,
  width = 400,
  height = 300,
  straightBottom,
  shine,
  middleText,
  onClick,
  perpendicular,
  hasCircle,
}) => {
  const theme = useTheme();

  // Check if any of the main parameters are provided
  const hasContent =
    top || leftSide || rightSide || bottomLeft || bottomRight || middleText || shine;

  // Calculate triangle points
  const triangleTop = { x: width / 2, y: 50 };
  const triangleLeft = { x: 50, y: height - 50 };
  const triangleRight = { x: width - 50, y: height - 50 };

  // Rainbow configuration - proper rainbow colors (ROYGBIV)
  const rainbowColors = [
    '#FF0000', // Red (outermost)
    '#FF8C00', // Orange
    '#FFD700', // Yellow
    '#00FF00', // Green
    '#0000FF', // Blue
    '#4B0082', // Indigo
    '#8B00FF', // Violet (innermost)
  ];

  // Rainbow circle parameters
  const rainbowCenter = { x: triangleTop.x, y: triangleTop.y };
  const baseRadius = 40;
  const strokeWidth = 6;
  const spacing = 2;

  // Create full circle path
  const createFullCircle = (radius: number) => {
    const cx = rainbowCenter.x;
    const cy = rainbowCenter.y;
    return `M ${cx - radius} ${cy} A ${radius} ${radius} 0 1 1 ${cx + radius} ${cy} A ${radius} ${radius} 0 1 1 ${cx - radius} ${cy}`;
  };

  return (
    <Box sx={{ position: 'relative', mt: 10 }}>
      {perpendicular === 'up' && (
        <Box
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 300,
          }}
        >
          <svg
            width={150}
            height={150}
            viewBox="0 0 114.496 114.496"
            style={{ display: 'block', margin: 'auto' }}
          >
            <g>
              <g>
                <path
                  d="M0,104.752c0,4.037,3.271,7.309,7.308,7.309h51.158h48.722c4.037,0,7.309-3.271,7.309-7.309
                    c0-4.039-3.271-7.31-7.309-7.31H65.775V9.745c0-4.037-3.271-7.309-7.31-7.309c-4.036,0-7.308,3.271-7.308,7.309v87.699H7.307
                    C3.271,97.442,0,100.715,0,104.752z"
                  fill={theme.palette.primary.main}
                />
              </g>
            </g>
          </svg>
        </Box>
      )}

      {/* Straight arrows in center using Iconify */}
      {(straightLeft || straightLeft || straightBottom) && (
        <Stack
          justifyContent={'center'}
          direction={'row'}
          alignItems={'center'}
          minHeight={300}
          spacing={5}
          style={{ position: 'relative' }}
        >
          {hasCircle && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Iconify
                icon="game-icons:circle"
                width={straightLeft && straightLeft ? 400 : 250}
                height={straightLeft && straightLeft ? 400 : 250}
                color={theme.palette.primary.main}
              ></Iconify>
            </Box>
          )}
          {/* Straight Left Arrow */}
          {straightLeft && (
            <Iconify
              icon={
                straightLeft === 'up' ? 'heroicons:arrow-up-solid' : 'heroicons:arrow-down-solid'
              }
              width={120}
              height={120}
              color={theme.palette.primary.main}
            />
          )}

          {/* Straight Right Arrow */}
          {straightRight && (
            <Iconify
              icon={
                straightRight === 'up' ? 'heroicons:arrow-up-solid' : 'heroicons:arrow-down-solid'
              }
              width={120}
              height={120}
              color={theme.palette.primary.main}
            />
          )}
          {straightBottom && (
            <>
              {straightBottom === 'both_left_and_right' && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 100 125"
                  enableBackground="new 0 0 100 100"
                  xmlSpace="preserve"
                  width={300}
                  height={300}
                  style={{ color: theme.palette.primary.main }}
                >
                  <g>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeMiterlimit="10"
                      x1="10.001"
                      y1="49.823"
                      x2="90"
                      y2="49.823"
                    />
                    <polygon
                      points="12.249,42.753 5.177,49.823 12.247,56.894"
                      fill="currentColor"
                    />
                    <polygon
                      points="87.753,56.894 94.823,49.823 87.753,42.753"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              )}
              {straightBottom === 'straight_horizontal' && (
                <Iconify
                  icon="pixel:minus"
                  width={120}
                  height={120}
                  color={theme.palette.primary.main}
                />
              )}
            </>
          )}
        </Stack>
      )}

      {hasContent && (
        <Box
          minHeight={shine ? 500 : 400}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <svg width={width} height={height} style={{ overflow: 'visible' }}>
            {/* Rainbow arc */}
            {/* Full circle rainbow */}
            {shine === 'up' && (
              <g>
                {rainbowColors.map((color, i) => {
                  const radius =
                    baseRadius + (rainbowColors.length - 1 - i) * (strokeWidth + spacing);
                  return (
                    <path
                      key={i}
                      d={createFullCircle(radius)}
                      fill="none"
                      stroke={color}
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                    />
                  );
                })}
              </g>
            )}

            {/* Triangle outline */}
            <polygon
              points={`${triangleTop.x},${triangleTop.y} ${triangleLeft.x},${triangleLeft.y} ${triangleRight.x},${triangleRight.y}`}
              fill={shine ? 'white' : 'none'}
              stroke={theme.palette.primary.main}
              strokeWidth="3"
              style={{ cursor: onClick ? 'pointer' : 'default' }}
              onClick={onClick}
            />

            {/* Middle text */}
            {middleText && (
              <text
                x={width / 2}
                y={height / 2 + 5}
                textAnchor="middle"
                fill={theme.palette.text.primary}
                fontSize="16"
                fontWeight="700"
              >
                {middleText}
              </text>
            )}

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
                  const arrowX = width / 2 + 90 - 55; // 32px left of number
                  const arrowY = height / 2 - 10; // align vertically with the number
                  const scale = 0.1; // keep bold
                  const baseRotate = -30; // base rotation to match right triangle edge
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

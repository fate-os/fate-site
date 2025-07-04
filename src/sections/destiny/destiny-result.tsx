import React from 'react';
import { Box } from '@mui/material';
import { useAppSelector } from '@/store/hooks';
import { TriangleDiagram } from './triangle-diagram';
const MAX_YEARS = 60;

function DestinyResultWithTheme() {
  const { destinyForm } = useAppSelector((e) => e.app);

  return (
    <Box>
      {destinyForm ? (
        <TriangleDiagram
          top={32}
          rightSide={44}
          bottomRight={56}
          bottomLeft={8}
          leftSide={20}
        ></TriangleDiagram>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default DestinyResultWithTheme;

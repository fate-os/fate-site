import Popover from '@mui/material/Popover';
import { listClasses } from '@mui/material/List';
import { menuItemClasses } from '@mui/material/MenuItem';

import { StyledArrow } from './styles';
import { calculateAnchorOrigin } from './utils';

// ----------------------------------------------------------------------

export function CustomPopover({ open, onClose, children, anchorEl, slotProps, ...other }: any) {
  const arrowPlacement = slotProps?.arrow?.placement ?? ('top-right' as string);

  const arrowSize = slotProps?.arrow?.size ?? 14;

  const arrowOffset = slotProps?.arrow?.offset ?? 17;

  const { paperStyles, anchorOrigin, transformOrigin } = calculateAnchorOrigin(arrowPlacement);

  return (
    <Popover
      open={!!open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      slotProps={{
        ...slotProps,
        paper: {
          ...slotProps?.paper,
          sx: {
            ...paperStyles,
            overflow: 'inherit',
            [`& .${listClasses.root}`]: { minWidth: 140 },
            [`& .${menuItemClasses.root}`]: { gap: 2 },
            ...slotProps?.paper?.sx,
          },
        },
      }}
      {...other}
    >
      {!slotProps?.arrow?.hide && (
        <StyledArrow
          sx={slotProps?.arrow?.sx}
          placement={arrowPlacement as any}
          offset={arrowOffset}
          size={arrowSize}
        />
      )}

      {children}
    </Popover>
  );
}

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import { toast } from 'src/components/snackbar';

import moment from 'moment';

import { CouponObject } from '@/types';
import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { DLETE_COUPON } from '@/graphql/mutation/adminMutatin';

// ----------------------------------------------------------------------

type UserTableRowProps = {
  row: CouponObject;
  selected?: boolean;
  onDeleteRow?: () => void;
};

export function CouponTableRow({ row, selected, onDeleteRow }: UserTableRowProps) {
  const confirm = useBoolean();
  const popover = usePopover();

  const [deleteCoupon, { loading }] = useMutation(DLETE_COUPON);

  const handleDelete = useCallback(async (id: string) => {
    try {
      if (!id) {
        toast.warning('Id is required');
        return;
      }

      const { data } = await deleteCoupon({
        variables: {
          deleteCouponId: id,
        },
      });

      if (data?.deleteCoupon?.success) {
        toast.success(data?.deleteCoupon?.message);

        onDeleteRow && onDeleteRow();

        return;
      }
      toast.warning(data?.deleteCoupon?.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      confirm.onFalse();
    }
  }, []);
  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.name}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.percent_off}%</TableCell>

        <TableCell>{moment.unix(row.created).format('D MMM YYYY [at] h:mm a')}</TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center">
            <Tooltip title="Action" placement="top" arrow>
              <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
                <Iconify icon="eva:more-vertical-fill" />
              </IconButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete coupon!"
        content="Are you sure want to delete the coupon?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(row.id)}
            loading={loading}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

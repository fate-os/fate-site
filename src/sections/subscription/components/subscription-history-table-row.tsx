import Stack from '@mui/material/Stack';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { SubscriptionHistory } from '@/types';
import moment from 'moment';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

// ----------------------------------------------------------------------

type HistoryTableRowProps = {
  row: SubscriptionHistory;
};

export function HistoryTableRow({ row }: HistoryTableRowProps) {
  return (
    <>
      <TableRow hover tabIndex={-1}>
        <TableCell sx={{ textTransform: 'capitalize' }}>{row.summery}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {row.billing_month && moment(row.billing_month).format('D MMM YYYY [at] h:mm a')}
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {row.amount !== 0 && row.amount} {}
          {row.currency && row.currency}
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Stack>
            {row.invoice_number && <Typography>{row.invoice_number}</Typography>}
            {row.invoice_url && (
              <Box>
                <Button
                  size="small"
                  color="info"
                  endIcon={<Iconify icon="fe:link-external"></Iconify>}
                  LinkComponent={Link}
                  target="_blank"
                  href={row.invoice_url}
                >
                  view
                </Button>
              </Box>
            )}
          </Stack>
        </TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (row.status === 'paid' && 'primary') ||
              (row.status === 'succeeded' && 'success') ||
              (row.status === 'complete' && 'secondary') ||
              (row.status === 'pending' && 'warning') ||
              (row.status === 'error' && 'error') ||
              (row.status === 'past due' && 'error') ||
              'default'
            }
          >
            {row.status}
          </Label>
        </TableCell>

        {/* <TableCell>
          <Stack direction="row" alignItems="center">
            <Tooltip title="Quick Edit" placement="top" arrow>
              <IconButton
                color={quickEdit.value ? 'inherit' : 'default'}
                onClick={quickEdit.onTrue}
              >
                <Iconify icon="solar:pen-bold" />
              </IconButton>
            </Tooltip>

            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Stack>
        </TableCell> */}
      </TableRow>
    </>
  );
}

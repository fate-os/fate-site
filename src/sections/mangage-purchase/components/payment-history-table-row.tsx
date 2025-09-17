import React from 'react';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { PaymentHistory } from '@/types';
import moment from 'moment';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

// ----------------------------------------------------------------------

type HistoryTableRowProps = {
  row: PaymentHistory;
};

export function HistoryTableRow({ row }: HistoryTableRowProps) {
  // Parse metadata to get receipt URL
  const metadata = row.metadata ? JSON.parse(row.metadata) : {};
  const receiptUrl = metadata.receiptUrl || '';

  // Generate summary based on payment details
  const summary = `${row.year_count} year${row.year_count > 1 ? 's' : ''} Fate Reading`;

  // Determine status based on payment data
  const status = 'completed'; // Since it's in the database, we assume it's completed

  return (
    <TableRow hover tabIndex={-1}>
      <TableCell sx={{ textTransform: 'capitalize' }}>{summary}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        {row.created_at && moment(row.created_at).format('D MMM YYYY [at] h:mm a')}
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>${row.paid_amount.toFixed(2)} USD</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        <Stack>
          {row.stripe_session_id && (
            <Typography variant="caption" color="textSecondary">
              ID: {row.stripe_session_id.slice(-8)}
            </Typography>
          )}
          {receiptUrl && (
            <Box>
              <Button
                size="small"
                color="info"
                endIcon={<Iconify icon="fe:link-external"></Iconify>}
                LinkComponent={Link}
                target="_blank"
                href={receiptUrl}
              >
                View Receipt
              </Button>
            </Box>
          )}
        </Stack>
      </TableCell>

      <TableCell>
        <Label variant="soft" color="success">
          {status}
        </Label>
      </TableCell>
    </TableRow>
  );
}

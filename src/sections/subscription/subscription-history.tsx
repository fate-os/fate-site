'use client';

import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { useSetState } from 'src/hooks/use-set-state';

import { DashboardContent } from 'src/layouts/dashboard';
import { _roles, _userList } from 'src/_mock';

import { toast } from 'src/components/snackbar';

import { Scrollbar } from 'src/components/scrollbar';

import {
  useTable,
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';
import { HistoryTableRow } from './components/subscription-history-table-row';
import { HistoryTableToolbar } from './components/subscription-history-table-toolbar';
import { HistoryFiltersResult } from './components/subscription-history-table-filters-result';

import { Typography } from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import { SUBSCRIPTION_HISTORY } from '@/graphql/query/accountSubscription';
import { SubscriptionHistory, SubscriptionHistoryResponse } from '@/types';
import { ProgressLoader } from '@/components/loading-screen/loaders';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'summary', label: 'Summary' },
  { id: 'month', label: 'Date & Time', width: 200 },
  { id: 'amount', label: 'Amount', width: 200 },
  { id: 'invoice', label: 'Invoice', width: 180 },
  { id: 'status', label: 'Status', width: 100 },
];

// ----------------------------------------------------------------------

export function SubscriptionHistoryView() {
  const table = useTable();

  const [tableData, setTableData] = useState<SubscriptionHistory[]>([]);

  const [loading, setLoading] = useState(true);

  const filters = useSetState({ status: [] });

  const [getHistory] = useLazyQuery<SubscriptionHistoryResponse>(SUBSCRIPTION_HISTORY);

  const getHistoryData = useCallback(async () => {
    try {
      const { data } = await getHistory();

      if (data?.subscriptionHistory?.success) {
        setTableData(data.subscriptionHistory.result);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getHistoryData();
  }, [getHistoryData]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state as any,
  });

  const canReset = filters.state.status.length > 0;

  return (
    <>
      <DashboardContent maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 2 }}>
          Subscription history
        </Typography>

        <Card sx={{ boxShadow: 'none', border: (t) => `1px solid ${t.palette.divider}` }}>
          <HistoryTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            options={{ status: ['succeeded', 'error', 'pending', 'paid', 'past due', 'complete'] }}
          />

          {canReset && (
            <HistoryFiltersResult
              filters={filters}
              totalResults={dataFiltered.length}
              onResetPage={table.onResetPage}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <Box sx={{ position: 'relative' }}>
            <Scrollbar>
              {loading ? (
                <ProgressLoader></ProgressLoader>
              ) : (
                <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                  <TableHeadCustom
                    order={table.order}
                    orderBy={table.orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={dataFiltered.length}
                    onSort={table.onSort}
                  />
                  <TableBody>
                    {dataFiltered
                      .slice(
                        table.page * table.rowsPerPage,
                        table.page * table.rowsPerPage + table.rowsPerPage
                      )
                      .map((row) => (
                        <HistoryTableRow key={row.id} row={row} />
                      ))}

                    <TableEmptyRows
                      height={table.dense ? 56 : 56 + 20}
                      emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                    />
                  </TableBody>
                </Table>
              )}
            </Scrollbar>
          </Box>

          <TablePaginationCustom
            page={table.page}
            dense={table.dense}
            count={dataFiltered.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onChangeDense={table.onChangeDense}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </DashboardContent>
    </>
  );
}

type ApplyFilterProps = {
  inputData: SubscriptionHistory[];
  comparator: any;
  filters: { status: string };
};

function applyFilter({ inputData, comparator, filters }: ApplyFilterProps) {
  const { status } = filters;

  const stabilizedThis = inputData.map((el: any, index: number) => [el, index]);

  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el: any) => el[0]);

  if (status.length) {
    inputData = inputData.filter((user) => status.includes(user.status || ''));
  }

  return inputData;
}

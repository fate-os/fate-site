'use client';

import { useState, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { paths } from 'src/routes/paths';
import { useSetState } from 'src/hooks/use-set-state';
import { DashboardContent } from 'src/layouts/dashboard';
import { toast } from 'src/components/snackbar';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
  emptyRows,
} from 'src/components/table';
import { CouponTableRow } from '../coupon-table-row';
import { CouponTableToolbar } from '../coupon-table-toolbar';
import { CouponTableFiltersResult } from '../coupon-table-filters-result';

import { AdminListResponseType, CouponObject } from '@/types';

import { useLazyQuery } from '@apollo/client';
import { ProgressLoader } from '@/components/loading-screen/loaders';
import { Button } from '@mui/material';
import { RouterLink } from '@/routes/components';
import { Iconify } from '@/components/iconify';
import { ADMIN_COUPON_LIST } from '@/graphql/query/adminTypes';

interface FilterState {
  name: string;
}

const TABLE_HEAD = [
  { id: 'name', label: 'Name', width: 220 },
  { id: 'off', label: 'Percent off', width: 180 },
  { id: 'created', label: 'Created', width: 150 },
  { id: 'action', label: '', width: 80 },
];

export function CouponListView() {
  const table = useTable({
    defaultRowsPerPage: 20,
  });

  const [totalCount, setTotalCount] = useState(0);
  const [tableData, setTableData] = useState<CouponObject[]>([]);
  const [loading, setLoading] = useState(true);

  const filters = useSetState<FilterState>({ name: '' });

  const [getCouponList, { refetch }] = useLazyQuery<AdminListResponseType>(ADMIN_COUPON_LIST, {
    fetchPolicy: 'no-cache',
  });

  const fetchCouponList = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getCouponList();

      if (data?.adminCouponList?.success) {
        setTableData(data.adminCouponList?.result || []);
        setTotalCount(data.adminCouponList?.result?.length || 0);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [getCouponList]);

  useEffect(() => {
    fetchCouponList();
  }, [fetchCouponList]);

  const canReset = Object.values(filters.state).some((value) => value !== '');

  return (
    <DashboardContent sx={{ mb: 15 }}>
      <CustomBreadcrumbs
        heading="Coupon List"
        links={[{ name: 'Dashboard' }, { name: 'Coupon' }, { name: 'List' }]}
        sx={{ mb: { xs: 5, md: 10 } }}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.coupon.new}
            variant="outlined"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Coupon
          </Button>
        }
      />
      <Card sx={{ boxShadow: 'none', border: (t) => `1px solid ${t.palette.divider}` }}>
        {/* <CouponTableToolbar filters={filters} onResetPage={() => filters.setState({ name: '' })} /> */}
        {loading ? (
          <ProgressLoader />
        ) : (
          <>
            {canReset && (
              <CouponTableFiltersResult
                filters={filters}
                totalResults={totalCount}
                sx={{ p: 2.5, pt: 0 }}
                onResetPage={() => filters.setState({ name: '' })}
              />
            )}

            <Box sx={{ position: 'relative' }}>
              <Scrollbar>
                <Table size={table.dense ? 'small' : 'medium'}>
                  <TableHeadCustom
                    order={table.order}
                    orderBy={table.orderBy}
                    headLabel={TABLE_HEAD}
                    onSort={table.onSort}
                  />

                  <TableBody>
                    {tableData.map((row) => (
                      <CouponTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onDeleteRow={() => fetchCouponList()}
                      />
                    ))}

                    <TableEmptyRows
                      height={table.dense ? 56 : 56 + 20}
                      emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                    />

                    <TableNoData notFound={!tableData.length} sx={{}} />
                  </TableBody>
                </Table>
              </Scrollbar>
            </Box>
          </>
        )}
      </Card>
    </DashboardContent>
  );
}

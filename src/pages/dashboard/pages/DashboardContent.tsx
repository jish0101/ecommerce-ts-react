import { ReactNode, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import Loader from '@/components/Loader';
import { GetResponse } from '@/types/api';
import { toast } from '@/hooks/use-toast';
import H3 from '@/components/typography/H3';
import useGetQuery from '@/hooks/useGetQuery';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '@/components/tables/DataTable';
import { buttonVariants } from '@/components/ui/button';
import TablePagination from '@/components/tables/Pagination';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useQueryClient } from 'react-query';
import useModal from '@/store/modal/useModal';

type Pagination = {
  page: number;
  pageSize: number;
  total: number;
};

const DEFAULT_PAGINATION: Pagination = {
  page: 1,
  pageSize: 10,
  total: 100
};

type DashboardPageProps<T> = {
  title: string;
  endpoint: string;
  columns: ColumnDef<T>[];
  form: ReactNode;
  queryKey: string;
};

const DashboardContent = <T,>({
  title,
  columns,
  form,
  endpoint,
  queryKey
}: DashboardPageProps<T>) => {
  const client = useQueryClient();
  const { isOpen, toggleModal } = useModal();
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

  const { data, isLoading, isError, error } = useGetQuery<GetResponse<T>>({
    endpoint,
    pagination,
    queryKey
  });

  function pageChangeHandler(page: number) {
    setPagination((state) => ({ ...state, page }));
  }

  useEffect(() => {
    client.invalidateQueries({ queryKey });
  }, [pagination]);

  if (isError || error) {
    toast({
      title: 'Failed',
      description: error.response ? error.response.data?.message : error.message
    });
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <H3>{title}</H3>
          <Dialog onOpenChange={toggleModal} open={isOpen}>
            <DialogTrigger
              className={cn(
                buttonVariants({ variant: 'default' }),
                'h-8 px-2 py-2 capitalize md:h-9 md:px-4 md:py-2'
              )}
            >
              Create {title}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="capitalize">
                  Create a new {title}
                </DialogTitle>
                <DialogDescription>Fill in all details</DialogDescription>
              </DialogHeader>
              {form}
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent className={'py-0 md:py-0'}>
          <DataTable data={data ? data.data : []} columns={columns} />
          <div className="my-4 flex justify-center md:justify-end md:p-2">
            <TablePagination
              currentPage={pagination.page}
              onPageChange={pageChangeHandler}
              pageSize={pagination.pageSize}
              total={pagination.total}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardContent;

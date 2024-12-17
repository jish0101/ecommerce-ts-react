import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import ProductForm from './ProductForm';
import P from '@/components/typography/P';
import { Edit, Eye, Trash } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import DashboardContent from '../DashboardContent';
import { Button, buttonVariants } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Category } from '@/types/category';
import CategoryForm from '../category/CategoryForm';
import { Product } from '@/types/product';
import H2 from '@/components/typography/H2';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GetResponse } from '@/types/api';
import useGetQuery from '@/hooks/useGetQuery';
import Loader from '@/components/Loader';
import { useState } from 'react';

type Props = {};

type ToggleState = {
  open: boolean;
  payload: any;
};

const DashboardProductPage = ({}: Props) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<ToggleState>({
    open: false,
    payload: null
  });

  const { data, isLoading } = useGetQuery<GetResponse<Category>>({
    endpoint: '/api/categories/get',
    queryKey: 'categories/all'
  });

  const productColumns: ColumnDef<Product>[] = [
    {
      accessorKey: '_id',
      header: 'ID',
      cell: (info) => info.getValue()
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (info) => info.getValue()
    },
    {
      accessorKey: 'desc',
      header: 'Description',
      cell: (info) => (
        <Dialog>
          <DialogTrigger
            className={cn(
              buttonVariants({ variant: 'default' }),
              'h-8 w-8 rounded-full px-0 py-0 capitalize [&_svg]:size-5'
            )}
          >
            <Eye />
          </DialogTrigger>
          <DialogContent className="sm:min-w-[400px] lg:min-w-fit">
            <DialogHeader>
              <DialogTitle>
                <H2>Description</H2>
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[calc(100vh-200px)]">
              <P>{String(info.getValue())}</P>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: (info) => `$${info.getValue()}`
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
      cell: (info) => info.getValue()
    },
    {
      accessorKey: 'imageLinks',
      header: 'Images',
      cell: (info) => {
        const images = info.getValue() as string[];
        return (
          <div className="flex space-x-2">
            {images && images.length ? (
              <img
                alt={`Image`}
                src={images.at(0)}
                className="h-10 w-10 rounded-full"
              />
            ) : null}
          </div>
        );
      }
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: (info) =>
        new Date(info.getValue() as string).toLocaleDateString('en-US')
    },
    {
      accessorKey: 'updatedAt',
      header: 'Updated At',
      cell: (info) =>
        new Date(info.getValue() as string).toLocaleDateString('en-US')
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: (info) => (
        <div className="flex space-x-2">
          <Dialog
            onOpenChange={(open) =>
              setIsEditModalOpen({ open, payload: info.row.original })
            }
            open={isEditModalOpen.open}
          >
            <DialogTrigger
              className={cn(
                buttonVariants({ variant: 'default', size: 'icon' }),
                'rounded-full [&_svg]:size-5'
              )}
            >
              <Edit />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  <H2>Update product</H2>
                </DialogTitle>
                <DialogDescription>Fill in all details</DialogDescription>
              </DialogHeader>
              {data ? (
                <ProductForm
                  defaultValues={isEditModalOpen.payload}
                  categories={data}
                />
              ) : null}
            </DialogContent>
          </Dialog>
          <Button
            size={'icon'}
            className="rounded-full [&_svg]:size-5"
            variant={'destructive'}
          >
            <Trash />
          </Button>
        </div>
      )
    }
  ];

  const catColumns: ColumnDef<Category>[] = [
    {
      accessorKey: '_id',
      header: 'ID',
      cell: (info) => info.getValue()
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (info) => info.getValue()
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: (info) =>
        new Date(info.getValue() as string).toLocaleDateString('en-US')
    },
    {
      accessorKey: 'updatedAt',
      header: 'Updated At',
      cell: (info) =>
        new Date(info.getValue() as string).toLocaleDateString('en-US')
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: (info) => (
        <div className="flex space-x-2">
          <Dialog
            onOpenChange={(open) =>
              setIsEditModalOpen({ open, payload: info.row.original })
            }
            open={isEditModalOpen.open}
          >
            <DialogTrigger
              className={cn(
                buttonVariants({ variant: 'default', size: 'icon' }),
                'rounded-full [&_svg]:size-5'
              )}
            >
              <Edit />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  <H2>Update Category</H2>
                </DialogTitle>
                <DialogDescription>Fill in all details</DialogDescription>
              </DialogHeader>
              <CategoryForm />
            </DialogContent>
          </Dialog>
          <Button
            size={'icon'}
            className="rounded-full [&_svg]:size-5"
            variant={'destructive'}
          >
            <Trash />
          </Button>
        </div>
      )
    }
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Tabs defaultValue="products">
      <TabsList>
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="category">Category</TabsTrigger>
      </TabsList>
      <TabsContent value="products">
        <DashboardContent
          title="Product"
          queryKey={'products'}
          form={<ProductForm categories={data} />}
          columns={productColumns}
          endpoint="/api/products/get"
        />
      </TabsContent>
      <TabsContent value="category">
        <DashboardContent
          title="Category"
          queryKey={'categories'}
          form={<CategoryForm />}
          columns={catColumns}
          endpoint="/api/categories/get"
        />
      </TabsContent>
    </Tabs>
  );
};
export default DashboardProductPage;

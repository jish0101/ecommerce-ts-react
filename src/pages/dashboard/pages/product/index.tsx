import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { User } from '@/types/user';
import ProductForm from './ProductForm';
import P from '@/components/typography/P';
import { Edit, Trash } from 'lucide-react';
import useModal from '@/store/modal/useModal';
import { ColumnDef } from '@tanstack/react-table';
import DashboardContent from '../DashboardContent';
import { Button, buttonVariants } from '@/components/ui/button';

type Props = {};

const DashboardProductPage = ({}: Props) => {
  const { isOpen, toggleModal } = useModal();

  const productColumns: ColumnDef<User>[] = [
    {
      accessorKey: '_id',
      header: 'ID',
      cell: (info) => info.getValue()
    },
    {
      accessorKey: 'fullName',
      header: 'Full Name',
      cell: (info) => info.getValue()
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: (info) => (
        <a href={`mailto:${info.getValue()}`} className="text-primary">
          {String(info.getValue())}
        </a>
      )
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: (info) => (
        <P className="flex items-center justify-center rounded-full bg-primary font-medium text-background">
          {String(info.getValue())}
        </P>
      )
    },
    {
      accessorKey: 'isVerified',
      header: 'Verified',
      cell: (info) =>
        info.getValue() ? (
          <P className="flex w-fit items-center justify-center rounded-full bg-primary px-3 font-medium uppercase text-background">
            Yes
          </P>
        ) : (
          <P className="flex w-fit items-center justify-center rounded-full bg-destructive px-3 font-medium uppercase text-background">
            No
          </P>
        )
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: (info) =>
        new Date(info.getValue() as string).toLocaleDateString('en-US')
    },
    {
      accessorKey: 'profileImage',
      header: 'Profile',
      cell: (info) => (
        <img
          alt="Profile"
          src={info.getValue() as string}
          className="h-10 w-10 rounded-full"
        />
      )
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: (info) => (
        <div className="flex space-x-2">
          <Dialog
            onOpenChange={() => toggleModal(info.row.original)}
            open={isOpen}
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
                <DialogTitle>Update user</DialogTitle>
                <DialogDescription>Fill in all details</DialogDescription>
              </DialogHeader>
              <ProductForm />
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

  return (
    <DashboardContent
      title="Product"
      queryKey={'products'}
      form={<ProductForm />}
      columns={productColumns}
      endpoint="/api/products/get"
    />
  );
};
export default DashboardProductPage;

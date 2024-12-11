import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import UserForm from "./UserForm"
import H3 from "@/components/typography/H3"
import DataTable from "@/components/tables/DataTable"
import { buttonVariants } from "@/components/ui/button"
import TablePagination from "@/components/tables/Pagination"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import useUsers from "@/hooks/useUsers"
import Loader from "@/components/Loader"
import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/user"
import { toast } from "@/hooks/use-toast"
import P from "@/components/typography/P"
import { cn } from "@/lib/utils"


type Pagination = {
  page: number;
  pageSize: number;
  total: number;
}

const DEFAULT_PAGINATION: Pagination = {
  page: 1,
  pageSize: 10,
  total: 100,
}

const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "_id",
    header: "ID",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info) => (
      <a href={`mailto:${info.getValue()}`} className="text-primary">
        {String(info.getValue())}
      </a>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: (info) => (
      <P className="font-semibold bg-primary rounded-sm flex items-center justify-center">{String(info.getValue())}</P>
    ),
  },
  {
    accessorKey: "isVerified",
    header: "Verified",
    cell: (info) =>
      info.getValue() ? (
        <P className="bg-primary">Yes</P>
      ) : (
        <P className="bg-red-500 rounded-sm flex justify-center items-center uppercase font-semibold">No</P>
      ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: (info) =>
      new Date(info.getValue() as string).toLocaleDateString("en-US"),
  },
  {
    accessorKey: "profileImage",
    header: "Profile Image",
    cell: (info) => (
      <img
        alt="Profile"
        src={info.getValue() as string}
        className="w-10 h-10 rounded-full"
      />
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex space-x-2">
        <button className="bg-blue-500 text-white px-2 py-1 rounded">
          Edit
        </button>
        <button className="bg-red-500 text-white px-2 py-1 rounded">
          Delete
        </button>
      </div>
    ),
  },
];

const DashboardUsersPage = () => {
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const {data, isLoading, isError, error} = useUsers(pagination);

  function pageChangeHandler (page: number) {
    setPagination((state) => ({...state, page}));
  }

  if (isError || error) {
    toast({
      title: "Failed",
      description: error.response
        ? error.response.data?.message
        : error.message,
    });

  }

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div className="flex flex-col">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <H3>Users</H3>
          <Dialog>
            <DialogTrigger className={cn(buttonVariants({variant: "default"}), "md:h-9 md:px-4 md:py-2 px-2 py-2 h-8")}>
              Create User
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Create a new user
                </DialogTitle>
                <DialogDescription>
                  Fill in all details
                </DialogDescription>
              </DialogHeader>
              <UserForm />
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          <DataTable data={data ? data.data: []} columns={userColumns} />
          <div className="flex justify-end p-2">
            <TablePagination currentPage={pagination.page} onPageChange={pageChangeHandler} pageSize={pagination.pageSize} total={pagination.total} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardUsersPage
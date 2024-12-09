import { useState } from "react"
import H3 from "@/components/typography/H3"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import UserForm from "./UserForm"
import { buttonVariants } from "@/components/ui/button"
import DataTable from "@/components/tables/DataTable"
import TablePagination from "@/components/tables/Pagination"

type Props = {}

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

const DashboardUsersPage = ({}: Props) => {
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

  function pageChangeHandler (page: number) {
    setPagination((state) => ({...state, page}));
  }

  return (
    <div className="flex flex-col">
      <Card>
        <CardHeader className="md:flex-row items-center justify-between">
          <H3>Users</H3>
          <Dialog>
            <DialogTrigger className={buttonVariants({variant: "default"})}>
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
          <DataTable data={[]} columns={[]} />
          <div className="flex justify-end p-2">
            <TablePagination currentPage={pagination.page} onPageChange={pageChangeHandler} pageSize={pagination.pageSize} total={pagination.total} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardUsersPage
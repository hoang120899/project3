import { Icon } from "@fluentui/react";
import {
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Text,
  Title3,
} from "@fluentui/react-components";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { authAPI } from "src/api-client";
import { Filter } from "src/component/Filter";
import { Pagination } from "src/component/Pagination";
import { TableActions } from "src/component/TableAction";
import { MainLayout } from "src/component/layout";
import { DEFAULT_PAGE_SIZE } from "src/constaint";
import { useDebounceFn } from "src/hooks";
import { ListUser, User } from "src/models";
import { PATH_DASHBOARD } from "src/routes";

interface ListUsersProps {
  dataUser?: User;
  error?: string;
}
export const ListUsers = ({ dataUser, error }: ListUsersProps) => {
  const router = useRouter();
  const [users, setUsers] = useState<ListUser>();
  const defaultFilter = useMemo(
    () => ({
      keyword: "",
      page: 1,
      size: DEFAULT_PAGE_SIZE,
    }),
    []
  );
  const [filterValue, setFilterValue] = useState(defaultFilter);

  // handleActions
  const handleAddNewUser = useCallback(() => {
    router.push(PATH_DASHBOARD.users.addNew());
  }, []);
  const handleOpenDetail = useCallback((id: string) => {
    router.push(PATH_DASHBOARD.users.view(id));
  }, []);
  const handleDeleteUser = useCallback((id: string) => {
    authAPI.deleteUser(id).then(() => {
      handleFetchValue();
    });
  }, []);

  // fetch API
  const handleFetchValue = useCallback(() => {
    console.log(filterValue);
    authAPI
      .getAllUsers()
      .then((data: any) => {
        setUsers(data);
      })
      .catch(() => console.log("error"));
  }, [filterValue]);
  const { run: callAPI } = useDebounceFn(() => handleFetchValue(), {
    wait: 300,
  });
  // handle Effect
  useEffect(() => {
    callAPI();
  }, [filterValue]);

  // useEffect(() => {
  //   console.log("dataUser", dataUser);
  // }, [dataUser]);
  return (
    <div>
      <div className="mb-6 flex justify-between content-center">
        <Title3>List Users</Title3>
        <Button onClick={handleAddNewUser} icon={<Icon iconName="Add" />}>
          Add user
        </Button>
      </div>
      <div>
        <div className="mb-2">
          <Filter
            value={filterValue.keyword}
            onChange={(value: any) =>
              setFilterValue((init) => ({
                ...init,
                keyword: value,
              }))
            }
          />
        </div>
        <Table arial-label="Default table">
          <TableHeader>
            <TableRow>
              <TableHeaderCell className="w-12 items-center content-between">
                <Text weight="bold">ID</Text>
              </TableHeaderCell>
              <TableHeaderCell>
                <Text weight="bold">Fullname</Text>
              </TableHeaderCell>
              <TableHeaderCell>
                <Text weight="bold">Last Updated</Text>
              </TableHeaderCell>
              <TableHeaderCell>
                <Text weight="bold">Note</Text>
              </TableHeaderCell>
              <TableHeaderCell>
                <Text weight="bold">Actions</Text>
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users
              ? users.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <TableCellLayout>{index + 1}</TableCellLayout>
                    </TableCell>
                    <TableCell>
                      <Link
                        onClick={() => handleOpenDetail(item.id)}
                        className="text-black"
                      >
                        {item.firstName} {item.lastName}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {dayjs(item.dateUpdated).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>{item.note}</TableCell>
                    <TableCell>
                      <TableActions
                        record={item}
                        deleteAction={handleDeleteUser}
                      />
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
      <div className="mt-6">
        <Pagination
          totalCount={users?.length || 0}
          currentPage={filterValue.page ?? 1}
          onChangePage={(page: number) =>
            setFilterValue((val) => ({ ...val, page }))
          }
        />
      </div>
    </div>
  );
};

export default ListUsers;

ListUsers.Layout = MainLayout;

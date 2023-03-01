import { Link } from "@fluentui/react-components";
import { MainLayout } from "component/layout";
import { ListUser } from "models";
import { useEffect, useState } from "react";
import { userService } from "services";

export default Index;

function Index() {
  const [users, setUsers] = useState<ListUser>();

  useEffect(() => {
    userService.getAll().then((x) => setUsers(x));
  }, []);

  //   function deleteUser(id) {
  //     setUsers(
  //       users.map((x) => {
  //         if (x.id === id) {
  //           x.isDeleting = true;
  //         }
  //         return x;
  //       })
  //     );
  //     userService.delete(id).then(() => {
  //       setUsers((users) => users.filter((x) => x.id !== id));
  //     });
  //   }

  return (
    <MainLayout>
      <h1>Users</h1>
      <Link href="/users/add" className="btn btn-sm btn-success mb-2">
        Add User
      </Link>
    </MainLayout>
  );
}

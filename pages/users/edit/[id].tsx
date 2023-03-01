import { MainLayout } from "component/layout";
import { useEffect, useState } from "react";
import { userService } from "services";

interface EditProps {
  id: string;
}

const Edit = ({ id, ...props }: EditProps) => {
  const [user, setUser] = useState(null);

  // handle Effect
  useEffect(() => {
    // fetch user and set default form values if in edit mode
    userService
      .getById(id)
      .then((x) => setUser(x))
      .catch(() => console.log("error"));
  }, []);
  return (
    <MainLayout>
      <h1>Edit User</h1>
    </MainLayout>
  );
};

export default Edit;

export async function getServerSideProps({ params }: any) {
  return {
    props: { id: params.id },
  };
}

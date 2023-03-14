import { Button, Title3 } from "@fluentui/react-components";
import { Card } from "@fluentui/react-components/unstable";
import { FormikProps } from "formik";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { authAPI } from "src/api-client";
import Form from "src/component/Form";
import FormItem from "src/component/Form/Item";
import { InputForm } from "src/component/Input";
import { InputArea } from "src/component/Input/InputArea";
import { ModalChangePassword } from "src/component/ModalChangePassword";
import { MainLayout } from "src/component/layout";
import { useAuth } from "src/context";
import { useToggle } from "src/hooks";
import { User } from "src/models";
import * as Yup from "yup";

interface ProfileProps {}

const Profile = (props: ProfileProps) => {
  const { user, handleUpdateUser: updateUserProfile } = useAuth();
  const router = useRouter();
  const { toggle: updateValue } = useToggle();
  const formRef = useRef<FormikProps<any>>(null);
  const initialValues = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      id: "",
      note: "",
    }),
    []
  );

  const [dataUser, setDataUser] = useState<User>(initialValues);
  // form validation rules
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/[^\s]/, "First name can't be all space!")
      .required("First name is required!"),
    lastName: Yup.string()
      .matches(/[^\s]/, "Last name can't be all space!")
      .required("Last name is required!"),
    email: Yup.string()
      .email("The email address is not valid")
      .required("Email address is required!"),
    username: Yup.string()
      .matches(/[^\s]/, "Username can't be all space!")
      .required("The Username is required!"),
  });
  const handleSubmitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, []);
  // handle fetch Value
  const handleFetchValue = useCallback(
    (isUpdate?: boolean) => {
      authAPI
        .getByIdUser(user.id)
        .then((data: any) => {
          setDataUser(data);
          if (isUpdate) {
            updateUserProfile(data);
          }
        })
        .catch(() => console.log("error"));
    },
    [user]
  );
  // get functions to build form with useForm() hook
  function onSubmit(user: any) {
    return authAPI
      .updateUser(user.id, user)
      .then(() => {
        handleFetchValue();
      })
      .catch(() => console.log("update failed"));
  }

  useEffect(() => {
    handleFetchValue();
  }, []);

  useEffect(() => {
    console.log("dataUser", dataUser);
  }, [dataUser]);
  return (
    <div>
      <div className="mb-6 flex justify-between content-center">
        <div className="flex items-center">
          <Title3>Profile</Title3>
        </div>
        <Button onClick={handleSubmitForm} disabled={!formRef.current?.dirty}>
          Save
        </Button>
      </div>
      <div>
        <Card className="flex p-8" style={{ minHeight: 650 }}>
          <Form
            initialValues={dataUser || initialValues}
            ref={formRef}
            onSubmit={(values) => onSubmit(values)}
            onValuesChange={() => updateValue()}
            validationSchema={validationSchema}
            enableReinitialize
          >
            <FormItem name="id" />
            <FormItem name="firstName">
              <InputForm
                label="First name"
                inputProps={{ placeholder: "First name", size: "medium" }}
              />
            </FormItem>
            <FormItem name="lastName">
              <InputForm
                label="Last name"
                inputProps={{ placeholder: "Last name", size: "medium" }}
              />
            </FormItem>
            <FormItem name="email">
              <InputForm
                label="Email address"
                inputProps={{
                  placeholder: "Email address",
                  size: "medium",
                  autoComplete: "email",
                }}
              />
            </FormItem>
            <FormItem name="username">
              <InputForm
                label="Username"
                inputProps={{
                  placeholder: "User name",
                  size: "medium",
                  autoComplete: "off",
                }}
              />
            </FormItem>
            <FormItem name="note">
              <InputArea
                label="Note"
                inputProps={{
                  placeholder: "Note ...",
                  size: "medium",
                  autoComplete: "off",
                }}
              />
            </FormItem>
          </Form>
          <div>
            <ModalChangePassword />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;

Profile.Layout = MainLayout;

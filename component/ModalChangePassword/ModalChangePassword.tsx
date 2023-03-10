import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from "@fluentui/react-components";
import { useBoolean } from "@fluentui/react-hooks";
import { authAPI } from "api-client";
import Form from "component/Form";
import FormItem from "component/Form/Item";
import { InputForm } from "component/Input";
import { FormikProps } from "formik";
import { useToggle } from "hooks";
import { useCallback, useMemo, useRef, useState } from "react";
import * as Yup from "yup";

export interface ModalChangePasswordProps {}

export function ModalChangePassword(props: ModalChangePasswordProps) {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(false);
  const { toggle: updateValue } = useToggle();
  const formRef = useRef<FormikProps<any>>(null);
  const [title, setTitle] = useState("");
  const initialValues = useMemo(
    () => ({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    }),
    []
  );

  // form validation rules
  const validateSchemaObjectPassword = Yup.object().shape({
    currentPassword: Yup.string()
      .matches(
        // eslint-disable-next-line no-useless-escape
        /^(?=.*[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*[@$!%*#=\/^?&])[a-zA-Z@$!%*#=\/^?&\d]{8,}$/g,
        "The password must be 8 characters long and must be a combination of uppercase letters, lowercase letters, numbers, and symbols"
      )
      .required("The current password is required"),
    newPassword: Yup.string()
      .matches(
        // eslint-disable-next-line no-useless-escape
        /^(?=.*[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*[@$!%*#=\/^?&])[a-zA-Z@$!%*#=\/^?&\d]{8,}$/g,
        "The password must be 8 characters long and must be a combination of uppercase letters, lowercase letters, numbers, and symbols"
      )
      .required("New Password is required!"),
    confirmNewPassword: Yup.string()
      .required("Confirm New Password is required!")
      .oneOf(
        [Yup.ref("newPassword")],
        "The confirmation password is not match"
      ),
  });
  const handleSubmitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  function onSubmit(user: any) {
    return authAPI
      .updateUser(user.id, user)
      .then(() => {
        // update password
      })
      .catch(() => console.log("update failed"));
  }

  return (
    <>
      <Dialog open={hideDialog} onOpenChange={toggleHideDialog}>
        <DialogTrigger disableButtonEnhancement>
          <Button>Change password</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent className="mt-4 mb-4">
              <Form
                initialValues={initialValues}
                ref={formRef}
                onSubmit={(values) => onSubmit(values)}
                onValuesChange={() => updateValue()}
                validationSchema={validateSchemaObjectPassword}
                enableReinitialize
              >
                <FormItem name="id" />
                <FormItem name="currentPassword">
                  <InputForm
                    label="Current Password"
                    inputProps={{
                      placeholder: "Current Password",
                      size: "medium",
                      type: "password",
                    }}
                  />
                </FormItem>
                <FormItem name="newPassword">
                  <InputForm
                    label="New Password"
                    inputProps={{
                      placeholder: "New Password",
                      size: "medium",
                      type: "password",
                    }}
                  />
                </FormItem>
                <FormItem name="confirmNewPassword">
                  <InputForm
                    label="Confirm New Password"
                    inputProps={{
                      placeholder: "Confirm New Password",
                      size: "medium",
                      autoComplete: "email",
                      type: "password",
                    }}
                  />
                </FormItem>
              </Form>
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Cancel</Button>
              </DialogTrigger>
              <Button appearance="primary" onClick={handleSubmitForm}>
                Confirm
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
}

import { useToggle } from "@/hooks/toggle";
import { Button, Form, Modal, Spin, message } from "antd";
import { UserUpsertForm } from "./UserUpsertForm";
import { UserCreateDto } from "@/dtos/user";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { useUserContext } from "@/store/UserContext";

export const UserCreateAction = () => {
  const { visible, toggle } = useToggle();
  const { dispatch } = useUserContext();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const createUser = trpc.users.createUser.useMutation();

  const handleClose = () => {
    form.resetFields();
    toggle();
  };

  const handleCreate = async (data: UserCreateDto) => {
    setIsLoading(true);
    const res = await createUser.mutateAsync(data);
    message.success("User Created");
    dispatch({ type: "Add", payload: { user: res } });
    setIsLoading(false);
    handleClose();
  };

  return (
    <>
      <Button onClick={toggle} type="primary">
        Create User
      </Button>
      <Modal
        title="Create User"
        open={visible}
        onCancel={handleClose}
        okText="Create"
        onOk={form.submit}
      >
        <Spin spinning={isLoading}>
          <UserUpsertForm onSubmit={handleCreate} form={form} />
        </Spin>
      </Modal>
    </>
  );
};

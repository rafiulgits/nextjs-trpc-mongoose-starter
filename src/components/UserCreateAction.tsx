import { useToggle } from "@/hooks/toggle";
import { Button, Form, Modal, Spin, message } from "antd";
import { UserUpsertForm } from "./UserUpsertForm";
import { UserCreateDto } from "@/dtos/user";
import { trpc } from "@/utils/trpc";
import { useState } from "react";

export const UserCreateAction = () => {
  const { visible, toggle } = useToggle();
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
    // insert into global state
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

import { useToggle } from "@/hooks/toggle";
import { Button, Form, Modal, Spin, message } from "antd";
import { UserUpsertForm } from "./UserUpsertForm";
import { UserCreateDto, UserDto } from "@/dtos/user";
import { trpc } from "@/utils/trpc";
import { useEffect, useState } from "react";

interface Props {
  user: UserDto;
}

export const UserUpdateAction = (props: Props) => {
  const { visible, toggle } = useToggle();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const updateUser = trpc.users.updateUser.useMutation();

  useEffect(() => {
    form.setFieldsValue(props.user);
  }, [props.user]);

  const handleClose = () => {
    form.resetFields();
    form.setFieldsValue(props.user);
    toggle();
  };

  const handleUpdate = async (data: UserCreateDto) => {
    setIsLoading(true);
    const res = await updateUser.mutateAsync({ ...data, id: props.user.id });
    message.success("User Updated");
    // insert into global state
    setIsLoading(false);
    handleClose();
  };

  return (
    <>
      <Button onClick={toggle} type="primary">
        Edit
      </Button>
      <Modal
        title="Update User"
        open={visible}
        onCancel={handleClose}
        okText="Update"
        onOk={form.submit}
      >
        <Spin spinning={isLoading}>
          <UserUpsertForm onSubmit={handleUpdate} form={form} />
        </Spin>
      </Modal>
    </>
  );
};

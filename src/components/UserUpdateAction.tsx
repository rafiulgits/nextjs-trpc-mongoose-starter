import { useToggle } from "@/hooks/toggle";
import { Button, Form, Modal, Spin, message } from "antd";
import { UserUpsertForm } from "./UserUpsertForm";
import { UserCreateDto, UserDto } from "@/dtos/user";
import { trpc } from "@/utils/trpc";
import { useEffect, useState } from "react";
import { useUserContext } from "@/store/UserContext";

interface Props {
  user: UserDto;
}

export const UserUpdateAction = (props: Props) => {
  const { visible, toggle } = useToggle();
  const { dispatch } = useUserContext();
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
    dispatch({ type: "Update", payload: { user: res } });
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

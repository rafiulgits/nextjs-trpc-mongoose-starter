import { trpc } from "@/utils/trpc";
import { Button, Popconfirm } from "antd";
import { useState } from "react";

interface Props {
  userId: string;
}

export const UserDeleteAction = (props: Props) => {
  const removeUser = trpc.users.removeUser.useMutation();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await removeUser.mutateAsync(props.userId);
    setIsDeleting(false);
  };

  return (
    <Popconfirm
      okText="Confirm"
      onConfirm={handleDelete}
      title="Delete Confirmation"
      okButtonProps={{ danger: true }}
      description="Are you sure to delete?"
    >
      <Button loading={isDeleting} type="primary" danger>
        Delete
      </Button>
    </Popconfirm>
  );
};

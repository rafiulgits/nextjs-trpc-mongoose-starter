import { UserCreateDto } from "@/dtos/user";
import { Form, FormInstance, Input } from "antd";

interface Props {
  onSubmit: (data: UserCreateDto) => void;
  form: FormInstance;
}

export const UserUpsertForm = (props: Props) => {
  return (
    <Form layout="vertical" form={props.form} onFinish={props.onSubmit}>
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input placeholder="Your Name" />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true }]}>
        <Input inputMode="email" placeholder="example@mail.com" />
      </Form.Item>
    </Form>
  );
};

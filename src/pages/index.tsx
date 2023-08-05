import { trpc } from "@/utils/trpc";
import { UserCreateAction } from "@/components/UserCreateAction";
import { Col, Row, Space, Table } from "antd";
import { UserDto } from "@/dtos/user";
import { UserUpdateAction } from "@/components/UserUpdateAction";
import { UserDeleteAction } from "@/components/UserDeleteAction";

export default function Home() {
  const usersRes = trpc.users.getUsers.useQuery();

  return (
    <Row justify="center" style={{ marginTop: "3rem" }}>
      <Col lg={19} md={20} sm={22} xs={23}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <UserCreateAction />
        </div>
        <br />
        <Table
          size="small"
          dataSource={usersRes.data}
          columns={[
            { title: "ID", dataIndex: "id", key: "id" },
            { title: "Name", dataIndex: "name", key: "name" },
            { title: "Email", dataIndex: "email", key: "email" },
            {
              title: "Actions",
              dataIndex: "actions",
              render: (_: any, row: UserDto) => {
                return (
                  <Space>
                    <UserUpdateAction user={row} />
                    <UserDeleteAction userId={row.id} />
                  </Space>
                );
              },
            },
          ]}
        />
      </Col>
    </Row>
  );
}

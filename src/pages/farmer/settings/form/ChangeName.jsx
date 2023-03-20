import Page from "@/components/Page";
import PageHeader from "@/components/PageHeader";
import { useCurrentUserQuery } from "@/query/queries/useCurrentUserQuery";
import { Button, Input, Space } from "antd";

export default function ChangeName() {
  const { data: user } = useCurrentUserQuery();

  return (
    <Page className="bg-white">
      <PageHeader title="Change Name" back="/farmer/settings" />

      <Space direction="vertical flex p-4">
        <Input defaultValue={user.fullname} />
      </Space>
      <div className="flex justify-end px-4">
        <Button type="primary" className="flex-grow">
          Submit
        </Button>
      </div>
    </Page>
  );
}

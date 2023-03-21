import Page from "@/components/Page";
import { useTitle } from "@/contexts/VendorContext";
import { useCropOptions } from "@/query/queries/useCropsQuery";
import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { required } from "./rules";

export default function AddDemand() {
  const { data: crops, isLoading: fetchingCrops } = useCropOptions();
  const handleSubmit = ({ crop_id }) => {
    FormData.crop_id = crop_id;
  };
  useTitle("Add Demand");
  return (
    <Page className="bg-white">
      <Form
        className="min-w-full flex-shrink-0  p-4 transition"
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="description"
          rules={required()}
          label=" Description"
          tooltip="[Update this]"
        >
          <TextArea rows={4} placeholder="Type here ...." />
        </Form.Item>

        <Form.Item
          name="crop_id"
          rules={required()}
          label="Commodity"
          tooltip="[Update this]"
        >
          <Select
            placeholder="Please select the desired commodity "
            options={crops}
            size="large"
            loading={fetchingCrops}
          />
        </Form.Item>

        <Form.Item
          name="quantity"
          rules={required()}
          label="Quantity (This will be specified as kilograms)"
          tooltip="[Update this]"
        >
          <Input type="number" size="large" placeholder="KG 10000" />
        </Form.Item>

        <Form.Item
          name="budget"
          rules={required()}
          label="Budget"
          tooltip="[Update this]"
        >
          <Input type="number" size="large" placeholder="₱ 10000" />
        </Form.Item>

        <Button size="large" type="primary" className="mt-4 rounded" block>
          Submit Demand
        </Button>
      </Form>
    </Page>
  );
}

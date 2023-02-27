import Page from "@/components/Page";
import PageHeader from "@/components/PageHeader";
import { Collapse } from "antd";

const { Panel } = Collapse;

const onChange = (key) => {
  console.log(key);
};

export default function Faq() {
  return (
    <Page>
      <PageHeader title="TalipaAPP FaQ" />

      <div className="flex items-center bg-white text-xl font-bold">
        <p className="m-0 mx-2">Frequently Asked Questions</p>
      </div>

      <Collapse defaultActiveKey={["0"]} onChange={onChange}>
        <Panel header="Which courier will deliver my ordered items?" key="1">
          <p>
            As of now, TalipaAPP only offers Transpotify as the only courier.
          </p>
        </Panel>

        <Panel
          header="Does TalipaAPP offers vouchers to its customers?"
          key="2"
        >
          <p>No, voucher system is not yet implemented.</p>
        </Panel>

        <Panel header="What payment methods do you accept?" key="3">
          <p>TalipaAPP only accepts cash on delivery and GCash</p>
        </Panel>

        <Panel header="How long will my order take to get to me?" key="4">
          <p>Orders usually take 1 to 2 days to get to the recipient.</p>
        </Panel>

        <Panel header="Can i cancel an order that is already shipped?" key="5">
          <p>
            If the order has already been shipped and is on its way to you, it
            may not be possible to cancel it. However, you can contact the
            seller and ask if they can cancel the order or if they offer any
            options for returning or exchanging the item once it has been
            received.{" "}
          </p>
        </Panel>

        <Panel header="Can i receive a call before delivery?" key="6">
          <p>
            It depends on the delivery service and the seller's policy. Some
            delivery services offer the option to receive a call before
            delivery, while others do not. You can contact the seller and ask if
            they offer this service or if the delivery service they use provides
            it.{" "}
          </p>
        </Panel>

        <Panel
          header="What if I’m not available when my order arrives?"
          key="7"
        >
          <p>
            If you're not available when your order arrives you can contact a
            someone that can receive the order in your behalf.{" "}
          </p>
        </Panel>

        <Panel
          header="Can i change my delivery address after placing my order?"
          key="8"
        >
          <p>
            Whether you can change your delivery address after placing an order
            depends on the seller and the shipping status of the order. If the
            order has not yet been shipped, you may be able to change the
            delivery address by contacting the seller. If the order has already
            been shipped, it may not be possible to change the delivery address.{" "}
          </p>
        </Panel>

        <Panel
          header="Can i choose the courier who will deliver my order?"
          key="9"
        >
          <p>
            You can check with the seller to see what shipping options they
            offer and if you have the ability to choose the courier for your
            delivery. If the seller does not offer the option to choose a
            courier, they may be able to provide more information on the courier
            that will be used for your delivery and the estimated delivery time.{" "}
          </p>
        </Panel>

        <Panel
          header="Can i select the vehicle that will be use to ship my order?"
          key="10"
        >
          <p>
            This is typically handled by the courier service and is based on
            factors such as the size and weight of the shipment, the delivery
            route, and the available vehicles in the area. The courier service
            will use the most efficient and cost-effective method to deliver
            your order, which may not involve a specific type of vehicle. If you
            have specific delivery requirements, such as a preference for a
            particular type of vehicle, it's best to check with the seller and
            the courier service to see if they can accommodate your request.{" "}
          </p>
        </Panel>
      </Collapse>
    </Page>
  );
}

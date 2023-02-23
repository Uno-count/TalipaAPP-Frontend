import PageHeader from "@/components/PageHeader";
import UserOutlined from "@/icons/heroicons/UserOutlined";
import { Avatar, Button, Input, Spin } from "antd";
import React, { useRef } from "react";
import { Empty } from "antd";
import {
  AudioOutlined,
  SendOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import Http from "@/helpers/Http";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Page from "@/components/Page";
import SendMessage from "./components/SendMessage";
import { sleep } from "@/helpers/utils";

const fetchMessages = async (id) => {
  const result = await Http.get(`/messages/${id}`);
  return result.data;
};

const fethUser = async (id) => {
  const result = await Http.get(`/users/${id}`);
  return result.data;
};

export default function PrivateMessage() {
  const params = useParams();
  const scrollable = useRef();
  const messagesCount = useRef(0)
  const { data, isLoading, refetch } = useQuery(["messages", params.id], () =>
    fetchMessages(params.id), {

      onSuccess(data) {
        // console.log(messagesCount)
        if (data.length > messagesCount.current) {
          messagesCount.current = data.length
          // scrollable.value.scrollTop = scrollable.scroll
          console.log(scrollable)
          if(scrollable.current) scrollable.current.scrollTop = scrollable.current.scrollHeight

        }
      },

      async onSettled() {
        await sleep(5000)
        refetch()
      }
    }
  );
  const { data: user, isLoading: isUserLoading } = useQuery(
    ["users", params.id],
    () => fethUser(params.id)
  );

  if (isLoading || isUserLoading)
    return (
      <Page>
        <PageHeader back="/farmer/chat" title="Loading" />
        <div className="flex flex-col items-center py-16">
          <Spin />
        </div>
      </Page>
    );

  const App = () => <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  const onSearch = (value) => console.log(value);
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );

  return (
    <div className="app-size flex flex-col bg-white">
      <PageHeader back="/farmer/messages" title={user.fullname} />
      <div className="flex p-2">
        <div className="flex grow justify-center bg-white p-2" size="large">
          <span>10:00</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col-reverse overflow-y-auto" ref={scrollable}>
        <div className="mb-4">
          {data.map((item) =>
            params.id == item.receiver_id ? (
              <div key={item.id} className="row-end-1 flex justify-end p-4">
                <div className="row-end-1 max-w-[300px] rounded border border-[#e5e7eb] p-2 shadow-sm">
                  <span>{item.content}</span>
                </div>
              </div>
            ) : (
              <div
                key={item.id}
                className="flex items-end justify-start gap-2 p-4"
              >
                <Avatar
                  size="medium"
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                />
                <div className="row-end-1 max-w-[300px] rounded border border-[#e5e7eb] p-2 shadow-sm">
                  <span>{item.content}</span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <SendMessage id={params.id} />
    </div>
  );
}
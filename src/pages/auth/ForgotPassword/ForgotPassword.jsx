import { sendForgotPasswordOtp } from "@/apis/AuthApi";
import Page from "@/components/Page";
import PageHeader from "@/components/PageHeader";
import { getErrorMessage } from "@/helpers/Http";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, notification } from "antd";
import { useEffect, useState } from "react";
import ForgotPasswordCode from "./ForgotPasswordCode";
import forgotPasswordImg from "./images/forgot_password.svg";
import VerifyNumber from "./VerifyNumber";

const rules = [
  { required: true, message: "Please input a valid number" },
  { len: 10, message: "Please enter 10 digit phone number" },
  {
    pattern: /^9[0-9]*$/,
    message: "Please enter a valid phone number starting with 9",
  },
];

const useSendOtp = () => {
  const [number, setNumber] = useState();
  const [throttle, setThrottle] = useState(0);
  const { mutate, isLoading, isSuccess } = useMutation(sendForgotPasswordOtp, {
    onSuccess(_data, contact_number) {
      setNumber(contact_number);
      setThrottle(60)
    },
    onError(err) {
      notification.error({ message: getErrorMessage(err) })
    }
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setThrottle((t) => Math.max(t - 1, 0));
    }, 1000);

    return () => {
      clearInterval(timer);
      setThrottle(0);
    };
  }, []);

  const sendOtp = (contact_number) => {
    if (throttle > 0 || isLoading) return;
    mutate(contact_number);
  };

  const resend = () => {
    sendOtp(number);
  };

  const resetNumber = () => {
    setNumber(undefined);
  };

  return {
    throttle,
    sendOtp,
    isLoading,
    isSuccess,
    number,
    resend,
    resetNumber,
  };
};

export default function ForgotPassword() {
  const { throttle, isLoading, sendOtp, number, resend, resetNumber, isSuccess } =
    useSendOtp();

  const handleSubmit = ({ contact_number }) => {
    sendOtp(contact_number);
  };

  if (number)
    return (
      <VerifyNumber
        resend={resend}
        throttle={throttle}
        isLoading={isLoading}
        number={number}
        resetNumber={resetNumber}
      />
    );

  return (
    <Page className="bg-white">
      <PageHeader back="/login" title="Forgot Password" />

      <div className="flex flex-col items-center p-8">
        <div className="flex aspect-square w-1/2 items-center justify-center rounded-full bg-green-500/10 p-8">
          <img className="" src={forgotPasswordImg} />
        </div>

        <span className="mt-8 text-center text-lg font-medium">
          Please Enter Your Contact Number To receive a Verification Code
        </span>

        <Form
          onFinish={handleSubmit}
          className="mt-12 w-full"
          layout="vertical"
        >
          <Form.Item
            rules={rules}
            name="contact_number"
            label="Contact Number"
            className="w-full"
          >
            <Input
              prefix="+63"
              type="number"
              className="w-full rounded"
              size="large"
            />
          </Form.Item>

          <Button
            loading={isLoading}
            htmlType="submit"
            shape="round"
            className="mt-12"
            type="primary"
            size="large"
            block
          >
            Send
          </Button>
        </Form>
      </div>
    </Page>
  );
}

// export default function ForgotPassword() {
//   const [number, setNumber] = useState(null);

//   const handleSubmit = (data) => {
//     setNumber(data.number);
//   };

//   if (number !== null) return <ForgotPasswordCode />;

//   return (
//     <Page className="bg-white">
//       <PageHeader back="/login" title="TalipaAPP" />

//       <Form className="p-4" onFinish={handleSubmit}>
//         <h2 className="text-xl font-bold ">Forgot Password</h2>
//         <div className="mt-6 flex flex-col">
//           <span>Enter your number for the verification process,</span>
//           <span>We will send 6 digits code to your number.</span>
//         </div>

//         <Form.Item
//           name="number"
//           className="mt-6"
//           rules={[
//             {
//               required: true,
//               message: "Please input a valid number",
//             },
//           ]}
//         >
//           <InputNumber
//             addonBefore="+63"
//             className="w-full rounded"
//             required
//             minLength={10}
//             maxLength={10}
//             size="large"
//           />
//         </Form.Item>

//         <Button
//           htmlType="submit"
//           size="large"
//           className="mt-6 rounded"
//           block
//           type="primary"
//         >
//           Continue
//         </Button>
//       </Form>
//     </Page>
//   );
// }

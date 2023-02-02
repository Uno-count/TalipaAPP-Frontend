// import PageHeader from "@/components/PageHeader";
// import UserOutlined from "@/icons/heroicons/UserOutlined";
// import { Avatar, Button, Input, Select } from "antd";
// import { CopyOutlined } from "@ant-design/icons";

// export default function ForgotPasswordCode() {
//   return (
//     <div className="app-size bg-white">
//       <PageHeader
//         left={<img src="/assets/images/logo.png" className="h-16" />}
//         title="TalipaAPP"
//       />

//       <div className="justify-start p-4">
//         <p className="text-md font-bold">
//           We sent you an SMS verification code
//         </p>
//         <span className="">
//           Please check your phone for a text message with your code.
//         </span>
//       </div>

//       <div>
//         <span className="p-7 font-bold">Enter 6-digit code.</span>
//       </div>

//       <div className="mx-6 p-1">
//         <Select
//           className="m"
//           mode="multiple"
//           disabled
//           size="large"
//           style={{ width: "100%" }}
//           placeholder="+***********17"
//         />
//       </div>

//       <div className="mx-6 mt-2 flex items-center p-1">
//         <Input
//           className="flex grow justify-center"
//           allowClear
//           size="large"
//           placeholder="Enter code Ex: ######"
//         />
//       </div>

//       <div className="mb-34 my-80 flex">
//         <Button className="mx-4 flex-grow rounded-md">Back</Button>
//         <Button className="mx-4 flex-grow rounded-md" type="primary">
//           Continue
//         </Button>
//       </div>
//     </div>
//   );
// }

import { Button, message, Spin } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import OTPInput, { ResendOTP } from "otp-input-react";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { verifyLoginOtp } from "../../../apis/AuthApi";
// import { getErrorMessage, setAuthorization } from "../../../helpers/Http";
import { useNavigate } from "react-router-dom";
import { verifyLoginOtp } from "@/apis/AuthApi";
import PageHeader from "@/components/PageHeader";
import queryKeyFactory from "@/query/queryKeyFactory";

function OTPButton({ children, className = "", onClick }) {
  return (
    <Button
      onClick={onClick}
      className={`aspect-square h-auto w-1/3 border-none ${className}`}
      type="ghost"
    >
      {children}
    </Button>
  );
}

export default function ForgotPasswordCode({ reset, phone }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [OTP, setOTP] = useState("");
  const { mutate, isLoading } = useMutation(verifyLoginOtp, {
    onSuccess({ token, user }) {
      setAuthorization(token);
      queryClient.setQueryData(queryKeyFactory.currentUser, user);

      if (user.user_type === "farmer") navigate("/farmer");
      else if (user.user_type === "vendor") navigate("/");
      else throw "Invalid User Type";
    },
    onError(error) {
      message.error(getErrorMessage(error));
      setOTP("");
    },
  });

  useEffect(() => {
    if (OTP.length === 6) {
      mutate({ code: OTP, contact_number: phone });
    }
  }, [OTP]);

  const append = (n) => {
    setOTP((OTP) => {
      if (OTP.length < 6 && n >= 0) return OTP + n;
      if (OTP.length > 0 && n < 0) return OTP.substring(0, OTP.length - 1);
      return OTP;
    });
  };

  return (
    // <PageHeader back={"/login"} title="TalipaAPP" />
    <Spin tip="Verifying your code" spinning={isLoading}>
      <div className="app-size">
        <PageHeader back={"/forgotpassword"} title="TalipaAPP" />
        <div className="flex flex-col bg-white px-7 py-4">
          <div className="">
            <span className="block text-2xl font-bold">
              Enter 6 Digits Code
            </span>
            <p className="mt-2">
              Enter 6 digits code that you received on you number.
            </p>
          </div>

          <div className="mt-9 flex flex-grow flex-col">
            <OTPInput
              inputStyles={{
                borderRadius: "4px",
                width: "100%",
                height: "auto",
                marginRight: 0,
                aspectRatio: 1,
                boxShadow: "2px 2px 2px 2px #ccc",
                outlineColor: "green",
              }}
              className="items-center justify-between gap-3 font-bold"
              value={OTP}
              onChange={setOTP}
              autoFocus
              OTPLength={6}
              otpType="number"
            />

            <div className="mt-4 text-center">
              <span>Code not received? </span>
              <span>Resend</span>
            </div>

            <div className="flex flex-wrap justify-end">
              <OTPButton onClick={() => append(1)}>1</OTPButton>
              <OTPButton onClick={() => append(2)}>2</OTPButton>
              <OTPButton onClick={() => append(3)}>3</OTPButton>
              <OTPButton onClick={() => append(4)}>4</OTPButton>
              <OTPButton onClick={() => append(5)}>5</OTPButton>
              <OTPButton onClick={() => append(6)}>6</OTPButton>
              <OTPButton onClick={() => append(7)}>7</OTPButton>
              <OTPButton onClick={() => append(8)}>8</OTPButton>
              <OTPButton onClick={() => append(9)}>9</OTPButton>
              <OTPButton onClick={() => append(0)}>0</OTPButton>
              <OTPButton onClick={() => append(-1)}>
                <img
                  className="mx-auto"
                  src="/assets/images/icon _delete.svg"
                  alt=""
                />
              </OTPButton>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
}

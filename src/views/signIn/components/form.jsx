import "./body.css";
import { Form, Input, Button, notification } from "antd";
import { useState } from "react";
import config from "../../../config";

const axios = require("axios").default;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const FormSignIn = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    setLoading(true);
    axios({
      method: "POST",
      url: config.API_URL + config.API_VR + "tasks/signin",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      data: e,
    })
      .then((res) => {
        if (res.data.status_code == 0) {
          notification.open({
            message: "Thông báo lỗi",
            description: res.data.msg,
          });
          setLoading(false);
          return false;
        } else {
          const accessToken = res.data.accessToken
          localStorage.setItem("accessToken", accessToken)
          alert("Đăng nhập thành công");
          setLoading(false);
          window.location.href = "/dashboard";
        }
      })
      .catch((err) => {
        console.log(err)
        // notification.open({
        //   message: "Thông báo lỗi",
        //   description: err.response.msg,
        // });
        setLoading(false);
      });
  };

  return (
    <div>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Địa chỉ email"
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ email!",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormSignIn;

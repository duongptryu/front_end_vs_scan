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
          const accessToken = res.data.accessToken;
          localStorage.setItem("accessToken", accessToken);
          notification.open({
            message: "Thông báo",
            description: "Xác thực thành công",
          });
          window.location = "/signin"
        }
      })
      .catch((err) => {
        console.log(err);
        notification.open({
          message: "Thông báo lỗi",
          description: "Hệ thống đang lỗi, vui lòng thử lại sau",
        });
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
          label={<label style={{ color: "white" }}>Địa chỉ email</label>}
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
          label={<label style={{ color: "white" }}>Mật khẩu</label>}
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

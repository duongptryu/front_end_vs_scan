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

const FormSignUp = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    setLoading(true);
    if (e.password != e.confirmPassword) {
      notification.open({
        message: "Thông báo lỗi",
        description: "Mật khẩu không trùng khớp",
      });
      setLoading(false);
      return false;
    }

    axios({
      method: "POST",
      url: config.API_URL + config.API_VR + "tasks/signup",
      mode: "cors",
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
          return false
        } else {
          alert("Đăng ký thành công");
          setLoading(false);
          window.location.href = "/signin";
        }
      })
      .catch((err) => {
        notification.open({
          message: "Thông báo lỗi",
          description: err.response.msg,
        });
        setLoading(false);
      });
  };

  return (
    <div style={{ color: "white" }}>
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
        <Form.Item
          label="Nhập lại mật khẩu"
          name="confirmPassword"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Họ và tên"
          name="fullName"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: false, type: "string" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormSignUp;
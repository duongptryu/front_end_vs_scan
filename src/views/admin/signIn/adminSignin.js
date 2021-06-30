import { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, notification } from "antd";
import config from "../../../config"
const axios = require("axios").default;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const AdminSignIn = () => {

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = "Đăng nhập";
    checkUser();
  },[]);

  
  const handleSubmit = (e) => {
    setLoading(true);
    axios({
      method: "POST",
      url: config.API_URL + config.API_VR + "tasks/admin/signin",
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
          localStorage.setItem("role", "0");
          notification.open({
            message: "Thông báo",
            description: "Xác thực thành công",
          });
          window.location = "/admin/plugin"
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

  const checkUser = () => {
    const token = localStorage.getItem("accessToken");
    if (token == null || token == "") {
      return false;
    }
    axios({
      method: "GET",
      url: config.API_URL + config.API_VR + " tasks/admin/profile",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        window.location = "/admin/plugin";
        return false;
      })
      .catch((err) => {
        return false;
      });
  };

  return (
    <div style={{position:"absolute", left:"40%", top:"30vh"}}>
        <Row>
            <h1 style={{marginLeft:"30%",marginBottom:"10%"}}>
            Admin Login
                </h1>
            </Row>
      <Row>
        <Col>
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={handleSubmit}
            loading={loading}
          >
            <Form.Item
              label="Username"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                  type:"email"
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default AdminSignIn;

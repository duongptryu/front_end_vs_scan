import {
  Row,
  Col,
  Space,
  Layout,
  Typography,
  Button,
  Modal,
  Form,
  Input,
  notification,
  Spin
} from "antd";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import config from "../../../config";
const axios = require("axios").default;

const { Content } = Layout;
const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
};

const FormItem = Form.Item;

const ContentUser = (props) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [changeProfile, setChangeProfile] = useState(false)

  const onCancel = () => {
    setVisible(false);
    setLoading(false);
    setChangeProfile(false)
  };

  const onSubmit = (e) => {
    setLoading(true);
    const data = e;
    const token = localStorage.getItem("accessToken");
    if (token == null || !token) {
      return <Redirect to="/signin" />;
    }
    axios({
      method: "POST",
      url: config.API_URL + config.API_VR + `tasks/user/changePassword`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    })
      .then((res) => {
        if (res.data.status_code == 0) {
          setLoading(false)
          setVisible(false)
          notification.open({
            message: "Thông báo lỗi",
            description: res.data.msg,
          });
          return
        } else {
          alert("Đổi mật khẩu thành công");
          localStorage.removeItem("accessToken");
          window.location = "/signin";
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (err.response.status == 401) {
          return <Redirect to="/signin" />;
        } else {
          notification.open({
            message: "Thông báo lỗi",
            description: "Hệ thống lỗi",
          });
        }
      });
    form.resetFields();
  };


  const onSubmitChange = (e) => {
    setLoading(true);
    const data = e;
    const token = localStorage.getItem("accessToken");
    if (token == null || !token) {
      return <Redirect to="/signin" />;
    }
    axios({
      method: "POST",
      url: config.API_URL + config.API_VR + `tasks/user/update`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    })
      .then((res) => {
        if (res.data.status_code == 0) {
          setLoading(false)
          setChangeProfile(false)
          notification.open({
            message: "Thông báo lỗi",
            description: res.data.msg,
          });
          return
        } else {
          setLoading(false)
          setChangeProfile(false)
          notification.open({
            message: "Thông báo",
            description: "Thay đổi thông tin thành công",
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (err.response.status == 401) {
          return <Redirect to="/signin" />;
        } else {
          notification.open({
            message: "Thông báo lỗi",
            description: "Hệ thống lỗi",
          });
        }
      });
    form.resetFields();
  };
  


  return (
    <div style={{ marginRight: "10px", marginLeft: "20px", height: "80vh" }}>
      <Spin spinning={loading}>
      <div style={{ marginTop: "20px" }}>
        <Row>
          <Col span={24}>Thông tin người dùng / </Col>
        </Row>
      </div>

      <Content
        style={{
          marginTop: "20px",
          backgroundColor: "white",
          padding: "20px",
          height: "100%",
        }}
      >
        <Row>
          <Col span={15} loading={true}>
            <h1 style={{ fontSize: "35px" }}>Thông tin người dùng</h1>
            <Space direction="vertical">
              <Space direction="horizontal">
                <Title level={5}>Tên người dùng: </Title>{" "} <p style={{ paddingTop: "5px", fontSize: "14px" }}>{props.user.fullName}</p>
                
              </Space>
              <Space>
                <Title level={5}>Email: </Title>
                <p style={{ paddingTop: "5px", fontSize: "14px" }}>
                  {props.user.email}
                </p>
              </Space>
              <Space>
                <Title level={5}>Số điện thoại: </Title>
                <p style={{ paddingTop: "5px", fontSize: "14px" }}>
                  {props.user.phone}
                </p>
              </Space>
              <Space>
                <Title level={5}>Địa chỉ: </Title>
                <p style={{ paddingTop: "5px", fontSize: "14px" }}>
                  {props.user.address}
                </p>
              </Space>
              <Space>
                <Title level={5}>Ngày tham gia: </Title>
                <p style={{ paddingTop: "5px", fontSize: "14px" }}>
                  {props.user.createTime}
                </p>
              </Space>
              <Space>
                <Title level={5}>Ngày cập nhật cuối: </Title>
                <p style={{ paddingTop: "5px", fontSize: "14px" }}>
                  {props.user.updateTime}
                </p>
              </Space>
              <Space direction="horizontal">

              <Button
                type="primary"
                onClick={() => {
                  setVisible(true);
                }}
                >
                Đổi mật khẩu
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setChangeProfile(true);
                }}
                style={{marginLeft:"50px"}}
                >
                Thay đổi thông tin cá nhân
              </Button>
                </Space>
            </Space>
          </Col>
        </Row>
        <Modal
          visible={visible}
          title="Đổi mật khẩu"
          onCancel={onCancel}
          loading={loading}
          footer={[
            <Button key="back" onClick={onCancel}>
              Hủy
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              form="myForm"
              htmlType="submit"
            >
              Đổi mật khẩu
            </Button>,
          ]}
        >
          <Form
            name="control-ref"
            layout="horizontal"
            id="myForm"
            onFinish={onSubmit}
            form={form}
          >
            <FormItem
              name="currentPassword"
              rules={[{ required: true, message: "Yêu cầu nhập trường này!", }]}
              label={`Mật khẩu hiện tại`}
              hasFeedback
              {...formItemLayout}
            >
              <Input></Input>
            </FormItem>
            <FormItem
              name="newPassword"
              rules={[{ required: true, message: "Yêu cầu nhập trường này!" }]}
              label={`Mật khẩu mới`}
              hasFeedback
              {...formItemLayout}
            >
              <Input></Input>
            </FormItem>
            <FormItem
              name="confirmPassword"
              rules={[{ required: true, message: "Yêu cầu nhập trường này!" }]}
              label={`Nhập lại mật khẩu`}
              hasFeedback
              {...formItemLayout}
            >
              <Input></Input>
            </FormItem>
          </Form>
        </Modal>


        <Modal
          visible={changeProfile}
          title="Thay đổi thông tin cá nhân"
          onCancel={onCancel}
          loading={loading}
          footer={[
            <Button key="back" onClick={onCancel}>
              Hủy
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              form="formProfile"
              htmlType="submit"
            >
              Lưu
            </Button>,
          ]}
          
        >
          <Form
            name="control-ref"
            layout="horizontal"
            id="formProfile"
            fields={[
              {
                name: ["fullName"],
                value: props.user.fullName,
              },
              {
                name: ["phone"],
                value: props.user.phone,
              },
              {
                name: ["address"],
                value: props.user.address
              },
            ]}
            onFinish={onSubmitChange}
            form={form}
          >
            <FormItem
              name="fullName"
              rules={[{ required: true, message: "Yêu cầu nhập trường này!"}]}
              label={`Tên người dùng`}
              hasFeedback
              {...formItemLayout}
            >
              <Input></Input>
            </FormItem>
            <FormItem
              name="phone"
              rules={[{ required: true, message: "Yêu cầu nhập trường này!" }]}
              label={`Số điện thoại`}
              hasFeedback
              {...formItemLayout}
            >
              <Input></Input>
            </FormItem>
            <FormItem
              name="address"
              rules={[{ required: true, message: "Yêu cầu nhập trường này!" }]}
              label={`Địa chỉ`}
              hasFeedback
              {...formItemLayout}
            >
              <Input></Input>
            </FormItem>
          </Form>
        </Modal>


      </Content>
      </Spin>
    </div>
  );
};

export default ContentUser;

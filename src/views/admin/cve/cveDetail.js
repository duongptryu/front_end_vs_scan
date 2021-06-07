import {
    Layout,
    notification,
    Spin,
    Row,
    Col,
    Divider,
    Button,
    Modal,
    Form,
    Input,
  } from "antd";
  import SideBar from "../dashboard/components/sidebar";
  import Header_ from "../dashboard/components/header";
  import Footer_ from "../dashboard/components/footer";
  import { Redirect, useParams } from "react-router-dom";
  import { useEffect, useState } from "react";
  import config from "../../../config";
  const axios = require("axios").default;
  
  
  const { Content } = Layout;
  
  
  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 14,
    },
  };
  
  const FormItem = Form.Item;
  
  const DetailCve = () => {
    let { id } = useParams();
    if (id == null){
      window.location = "/admin/"
    }
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
  
    const [data, setData] = useState();
  
    useEffect(() => {
      fetch({});
    }, []);
  
  
    const fetch = (params = {}) => {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      if (token == null || token == "") {
        window.location = "/signin";
        return false;
      }
  
      axios({
        method: "GET",
        url: config.API_URL + config.API_VR + `tasks/cve/detail?cveId=${id}`,
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          // if (res.data.status_code == 1) {
          //   setData(res.data.pluginInfo);
          // } else {
          //   setData();
          // }
        })
        .catch((err) => {
          // if (err.response.status == 401) {
          //   window.location.href = "/";
          // } else {
          setLoading(false);
          setData([]);
          notification.open({
            message: "Thông báo lỗi",
            description: "Vui lòng thử lại sau",
          });
          // }
        });
    };
  
  
    const onCancel = () => {
      setVisible(false);
    };
  
    const onOk = () => {
      setVisible(false);
    };
  
    const onSubmit = (e) => {
      console.log(e);
    };
  
    const handleRef = (refString) => {
      const x = refString.Split(" ")
      let store = 
      x.forEach(ref => {
  
      })
    }
  
    return (
      <div>
        <Layout>
          <SideBar></SideBar>
          <Layout style={{ marginLeft: "15%" }}>
            <Header_></Header_>
            <Content
              style={{ height: "80vh", margin: "2%", backgroundColor: "white" }}
            >
              <Spin spinning={loading}>
              <div
                style={{
                  marginRight: "10px",
                  marginLeft: "20px",
                  marginTop: "25px",
                }}
              >
                <Row>
                  <Col span={12}>
                    <h1 style={{ fontSize: "30px" }}>Chi tiết plugin</h1>
                  </Col>
                </Row>
              </div>
              <Divider></Divider>
              {data && (
                <div style={{ marginLeft: "3%", marginRight:"3%", textAlign:"justify" }}>
                <h1>
                  <b>Tên:</b><p>{data.pluginName}</p>
                </h1>
                <h1>
                  <b>Mức độ: </b><p>
                  {data.risk}
                  </p>
  
                </h1>
                <h1>
                  <b>CWE: </b><p>
                  {data.cweId}
                  </p>
                </h1>
                <h1>
                  <b>Mô tả: </b><p>
                  {data.description}
                  </p>
                </h1>
                <h1>
                  <b>Giải pháp: </b><p>
                  {data.solution}
                  </p>
                </h1>
                <h1>
                  <b>Tham khảo: </b><p>
                  {data.reference}
                  </p>
                </h1>
              </div>
              )}
              
              <Divider></Divider>
              <div style={{ marginLeft: "3%" }}>
                <Button
                  type="primary"
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  Cập nhật
                </Button>
              </div>
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
                    rules={[
                      { required: true, message: "Yêu cầu nhập trường này!" },
                    ]}
                    label={`Mật khẩu hiện tại`}
                    hasFeedback
                    {...formItemLayout}
                  >
                    <Input></Input>
                  </FormItem>
                  <FormItem
                    name="newPassword"
                    rules={[
                      { required: true, message: "Yêu cầu nhập trường này!" },
                    ]}
                    label={`Mật khẩu mới`}
                    hasFeedback
                    {...formItemLayout}
                  >
                    <Input></Input>
                  </FormItem>
                  <FormItem
                    name="confirmPassword"
                    rules={[
                      { required: true, message: "Yêu cầu nhập trường này!" },
                    ]}
                    label={`Nhập lại mật khẩu`}
                    hasFeedback
                    {...formItemLayout}
                  >
                    <Input></Input>
                  </FormItem>
                </Form>
              </Modal>
              </Spin>
            </Content>
            <Footer_></Footer_>
          </Layout>
        </Layout>
      </div>
    );
  };
  
  export default DetailCve;
  
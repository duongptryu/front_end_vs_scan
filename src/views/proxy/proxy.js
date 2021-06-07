import {
  Layout,
  notification,
  Spin,
  Row,
  Col,
  Select,
  Space,
  Button,
  Divider,
  Input,
} from "antd";
import SideBar from "../dashboard/components/sideBar";
import Header_ from "../dashboard/components/header";
import Footer_ from "../dashboard/components/footer";
import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import config from "../../config";
const axios = require("axios").default;

const { Content } = Layout;
const { Option } = Select;

const Proxy = () => {
  const [cve, setCve] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    document.title = "Proxy Notfound";
    getAllCve();
  }, []);

  const getAllCve = () => {
    const token = localStorage.getItem("accessToken");
    if (token == null || !token) {
      window.location = "/signin";
    }
    setLoading(true);
    axios({
      method: "GET",
      url: config.API_URL + config.API_VR + `tasks/cve/list`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setLoading(false);
        if (res.data.status_code != 1) {
          notification.open({
            message: "Thông báo lỗi",
            description: "Hệ thống đang lỗi, vui lòng thử lại sau",
          });
          return false;
        }
        setCve(res.data.cves);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status == 401) {
          window.location = "/signin";
        } else {
          notification.open({
            message: "Thông báo lỗi",
            description: err.response.data,
          });
        }
      });
  };

  return (
    <div>
      <Layout>
        <SideBar></SideBar>
        <Layout style={{ marginLeft: "15%" }}>
          <Header_></Header_>
          <Spin spinning={loading}>
            <div
              style={{
                marginRight: "10px",
                marginLeft: "20px",
                height: "80vh",
              }}
            >
              <div style={{ marginTop: "20px" }}>
                <Row>
                  <Col span={24}>0-day checking / </Col>
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
                  <Col span={24} style={{ textAlign: "center" }}>
                    <h1>0-day Checking</h1>
                    <h1>PROXY NOTFOUND</h1>
                    <p>description</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row
                  style={{
                    textAlign: "center",
                    width: "80%",
                    margin: "0 auto",
                    marginLeft:"20%"
                  }}
                >
                  <Col span={6}>
                    {cve.length > 0 && (
                      <Select
                        defaultValue={cve[0].cveId}
                        style={{ width: "100%" }}
                        //   onChange={handleChange}
                        size="large"
                      >
                        {cve.map((cve) => {
                          return (
                            <Option value={cve.cveId}>
                              {cve.cveName} - {cve.cveNumber}
                            </Option>
                          );
                        })}
                      </Select>
                    )}
                  </Col>
                  <Col span={8}>
                    <Input
                      size="large"
                      placeholder="Domain"
                      prefix={<SearchOutlined />}
                    />
                  </Col>
                  <Col span={2} style={{textAlign:"left", marginLeft:"1%"}}>
                    <Button type="primary" size="large">
                      Checking
                    </Button>
                  </Col>
                  <Col span={5} style={{textAlign:"left"}}>
                    <Button type="primary" size="large" >
                      Checking All
                    </Button>
                  </Col>
                </Row>
                <br></br>
                {result != null && (
                  <div>
                    <Divider orientation="left">Result</Divider>
                    <Row>
                      <Space direction="vertical">
                        <h3>Kết quả: </h3>
                        <h3>Các domain bị: </h3>
                        <h3>Các domain nghi ngờ: </h3>
                        <h3>Các domain an toàn: </h3>
                        <h3>Các domain không kết nối:</h3>
                      </Space>
                    </Row>
                  </div>
                )}
              </Content>
            </div>
          </Spin>
          <Footer_></Footer_>
        </Layout>
      </Layout>
    </div>
  );
};

export default Proxy;

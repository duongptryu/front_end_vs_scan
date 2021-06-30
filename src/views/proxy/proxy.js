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
import { SearchOutlined, SecurityScanOutlined } from "@ant-design/icons";
import config from "../../config";
const axios = require("axios").default;

const { Content } = Layout;
const { Option } = Select;

const Proxy = () => {
  const [cve, setCve] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [cveId, setCveId] = useState("")
  const [target, setTarget] = useState("")
  const [checked, setChecked] = useState(false)


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
        console.log(res)
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
        // if (err.response.status == 401) {
        //   window.location = "/signin";
        // } else {
          notification.open({
            message: "Thông báo lỗi",
            description: "Vui lòng thử lại sau",
          });
        // }
      });
  };

  const handleChange = (e) => {
    if (e == "default") {
      return
    }
    setCveId(e)
    cve.forEach(c => {
      if (c.cveId == e) {
        document.querySelector("#des").innerHTML = c.des
        return
      }
    })
   
  }

  const check = () => {
    console.log(cveId)
    console.log(target)
    const dataNew = {
      cveId: cveId,
      target: target,
      type: 0
    }

    const token = localStorage.getItem("accessToken");
    if (token == null || !token) {
      window.location = "/signin";
    }
    setLoading(true);
    axios({
      method: "POST",
      url: config.API_URL + config.API_VR + `tasks/cve/check`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data:dataNew
    })
      .then((res) => {
        setLoading(false);
        setChecked(true)
        if (res.data.status_code == 1) {
          notification.open({
            message: "Thông báo",
            description: "Quét thành công",
          });
          setResult(res.data.results)
        }else {
          notification.open({
            message: "Thông báo",
            description: "Quét thành công",
          });
          setResult(null)
        }
        console.log(result)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setChecked(false)
        setResult(null)
        // if (err.response.status == 401) {
        //   window.location = "/signin";
        // } else {
          notification.open({
            message: "Thông báo lỗi",
            description: "Vui lòng thử lại sau",
          });
        // }
      });
  }

  
  const checkAll = () => {
    console.log(cveId)
    console.log(target)
    const dataNew = {
      cveId: cveId,
      target: target,
      type: 1
    }

    const token = localStorage.getItem("accessToken");
    if (token == null || !token) {
      window.location = "/signin";
    }
    setLoading(true);
    axios({
      method: "POST",
      url: config.API_URL + config.API_VR + `tasks/cve/check`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data:dataNew
    })
      .then((res) => {
        setLoading(false);
        setChecked(true)
        console.log(res)
        if (res.data.status_code == 1) {
          notification.open({
            message: "Thông báo",
            description: "Quét thành công",
          });
          setResult(res.data.results)
        }else {
          notification.open({
            message: "Thông báo",
            description: "Quét thành công",
          });
          setResult(null)
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setChecked(false)
        setResult(null)
        // if (err.response.status == 401) {
        //   window.location = "/signin";
        // } else {
          notification.open({
            message: "Thông báo lỗi",
            description: "Vui lòng thử lại sau",
          });
        // }
      });
  }

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
                  <Space>
                  <SecurityScanOutlined />
                  <Col span={24} >0-day checking / </Col>
                  </Space>
                </Row>
              </div>

              <Content
                style={{
                  marginTop: "20px",
                  backgroundColor: "white",
                  padding: "20px",
                  height: "80vh",
                }}
              >
                <Row>
                  <Col span={24} style={{ textAlign: "center" }}>
                    <h1>0-day Checking</h1>
                    {/* <h1>PROXY NOTFOUND</h1> */}
                    <p id="des"></p>
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
                        defaultValue="default"
                        style={{ width: "100%" }}
                        onChange={handleChange}
                        size="large"
                      >
                        <Option value="default">
                              Vui lòng chọn CVE
                            </Option>
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
                      onChange={(e) => {setTarget(e.target.value)}}
                    />
                  </Col>
                  <Col span={2} style={{textAlign:"left", marginLeft:"1%"}}>
                    <Button type="primary" size="large" onClick={check}>
                      Checking
                    </Button>
                  </Col>
                  <Col span={5} style={{textAlign:"left"}}>
                    <Button type="primary" size="large" onClick={checkAll}>
                      Checking All
                    </Button>
                  </Col>
                </Row>
                <br></br>
                <Divider>Result</Divider>
                {result != null && (
                <div
                  style={{
                    marginLeft: "3%",
                    marginRight: "3%",
                    textAlign: "justify",
                  }}
                >
                  <h3>
                    <b>Các domain bị:</b>
                    <br></br>
                    <Space direction="vertical">
                    {result.yes.length > 0 ?  (result.yes.map(domain => {
                      return <li>{domain}</li>
                    })): "Không có"}
                    </Space>
                  </h3>
                  <h3>
                    <b>Các domain nghi ngờ:</b>
                    <br></br>
                    <Space direction="vertical">

                    {result.potenial.length > 0 ?  (result.potenial.map(domain => {
                      return <li>{domain}</li>
                    })): "Không có"}
                    </Space>
                  </h3>
                
                  <h3>
                    <b>Các domain an toàn: </b>
                    <br></br>
                    <Space direction="vertical">
                    {result.no.length > 0 ?  (result.no.map(domain => {
                      return <li>{domain}</li>
                    })): "Không có"}
                    </Space>
                  </h3>
                  <h3>
                    <b>Các domain không kết nối: </b>
                    <br></br>
                    <Space direction="vertical">
                    {result.timeout.length > 0 ?  (result.timeout.map(domain => {
                      return <li>{domain}</li>
                    })): "Không có"}
                    </Space>
                  </h3>
                </div>
              )}
              </Content>
            </div>
          </Spin>
          {/* <Footer_></Footer_> */}
        </Layout>
      </Layout>
    </div>
  );
};

export default Proxy;

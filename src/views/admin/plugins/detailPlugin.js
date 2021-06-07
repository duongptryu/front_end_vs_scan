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
  Select,
} from "antd";
import SideBar from "../dashboard/components/sidebar";
import Header_ from "../dashboard/components/header";
import Footer_ from "../dashboard/components/footer";
import { Redirect, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import config from "../../../config";
const axios = require("axios").default;

const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;


const FormItem = Form.Item;

const DetailPlugin = () => {
  let { id } = useParams();
  if (id == null) {
    window.location = "/admin/";
  }
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [form] = Form.useForm();

  const [data, setData] = useState();
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [risk, setRisk] = useState("");
  const [solution, setSolution] = useState("");
  const [ref, setRef] = useState("");
  const [cweId, setCweId] = useState("");

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
      url:
        config.API_URL + config.API_VR + `tasks/plugin/detail?pluginId=${id}`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        if (res.data.status_code == 1) {
          setData(res.data.pluginInfo);
        } else {
          setData();
        }
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

  
  const handleUpdate = () => {
    setLoading(true);
    setUpdate(false)
    const token = localStorage.getItem("accessToken");
    if (token == null || token == "") {
      window.location = "/";
      return false;
    }
    let nameC, riskC, desC, solC, refC
    if (name == "") {
      nameC = data.pluginName
    }else {
      nameC = name
    }
    if (risk == "") {
      riskC = data.risk
    }else {
      riskC = risk
    }
    if (des == "") {
      desC = data.description
    }else {
      desC = des
    }
    if (solution == "") {
      solC = data.solution
    }else {
      solC = solution
    }
    if (ref == "") {
      refC = data.reference
    }else {
      refC = ref
    }

    const dataUpdate = {
      pluginId: id,
      pluginName: nameC,
      risk:riskC,
      description: desC,
      solution: solC,
      cweId: data.cweId,
      reference: refC
    }
    console.log(dataUpdate)

    axios({
      method: "POST",
      url:
        config.API_URL + config.API_VR + `tasks/plugin/edit`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data:dataUpdate
    })
      .then((res) => {
        setLoading(false);
        if (res.data.status_code == 1) {
          notification.open({
            message: "Thông báo",
            description: "Cập nhật thành công",
          });
        } else {
          notification.open({
            message: "Thông báo",
            description: "Cập nhật thất bại",
          });
        }
        fetch({});
      })
      .catch((err) => {
        console.log(err)
        // if (err.response.status == 401) {
        //   window.location.href = "/";
        // } else {
        setLoading(false);
        setData([]);
        notification.open({
          message: "Thông báo lỗi",
          description: "Vui lòng thử lại sau",
        });
        fetch({});
        // }
      });
  };


  return (
    <div>
      <Layout>
        <SideBar></SideBar>
        <Layout style={{ marginLeft: "15%" }}>
          <Header_></Header_>
          <Content
            style={{ margin: "2%", backgroundColor: "white" }}
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
                <div
                  style={{
                    marginLeft: "3%",
                    marginRight: "3%",
                    textAlign: "justify",
                  }}
                >
                  <h1>
                    <b>Tên:</b>
                    <br></br>
                    {update ? (
                      <Input defaultValue={data.pluginName} onChange={(e) => setName(e.target.value)}></Input>
                    ) : (
                      <p>{data.pluginName}</p>
                    )}
                  </h1>
                  <h1>
                    <b>Mức độ: </b>
                    <br></br>
                    {update ? (
                      <Select defaultValue={data.risk} style={{ width: 120 }} onChange={(e) => {
                        setRisk(e)
                      }}>
                        <Option value="information">Information</Option>
                        <Option value="high">High</Option>
                        <Option value="medium">Medium</Option>
                        <Option value="low">Low</Option>
                      </Select>
                    ) : (
                      <p>{data.risk}</p>
                    )}
                  </h1>
                  <h1>
                    <b>CWE: </b>
                    <p >{data.cweId}</p>
                  </h1>
                  <h1>
                    <b>Mô tả: </b>
                    <br></br>
                    {update ? (
                      <TextArea rows={4} defaultValue={data.description} name="des" onChange={(e) => {setDes(e.target.value)}}/>
                    ) : (
                      <p>{data.description}</p>
                    )}
                  </h1>
                  <h1>
                    <b>Giải pháp: </b>
                    <br></br>
                    {update ? (
                      <TextArea rows={4} defaultValue={data.solution} name="solution" onChange={(e) => {setSolution(e.target.value)}}/>
                    ) : (
                      <p>{data.solution}</p>
                    )}
                  </h1>
                  <h1>
                    <b>Tham khảo: </b>
                    <br></br>
                    {update ? (
                      <TextArea rows={4} defaultValue={data.reference} name="ref" onChange={(e) => {setRef(e.target.value)}}/>
                    ) : (
                      <p>{data.reference}</p>
                    )}
                  </h1>
                </div>
              )}

              <Divider></Divider>
              <div style={{ marginLeft: "3%", marginBottom:"5%"}}>
                {update ? (<Button
                  type="primary"
                  onClick={() => {
                    handleUpdate()
                  }}
                >
                  Lưu
                </Button>) : <Button
                  type="primary"
                  onClick={() => {
                    setUpdate(true);
                  }}
                >
                  Cập nhật
                </Button>}
                
              </div>
            </Spin>
          </Content>
          <Footer_></Footer_>
        </Layout>
      </Layout>
    </div>
  );
};

export default DetailPlugin;

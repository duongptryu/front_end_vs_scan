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
  Upload
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import SideBar from "../dashboard/components/sidebar";
import Header_ from "../dashboard/components/header";
import Footer_ from "../dashboard/components/footer";
import { Redirect, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import config from "../../../config";
const axios = require("axios").default;

const { Content } = Layout;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const FormItem = Form.Item;

const DetailCve = () => {
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [update, setUpdate] = useState(false);
  const [UploadVisiable, setUploadVisiable] = useState(false);

  const [fileList, setFileList] = useState([]);

  
  const handleCancel = () => {
    setUploadVisiable(false);
  };


  const props = {
    onRemove: (file) => {
      notification.open({
        message: "Thông báo",
        description: `${file.name} file removed successfully`,
      });
      setFileList([]);
    },
    beforeUpload: (file) => {
      notification.open({
        message: "Thông báo",
        description: `${file.name} file uploaded successfully`,
      });
      setFileList([file]);
      return false;
    },
    fileList,
  };

  let { id } = useParams();
  if (id == null) {
    window.location = "/admin/";
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
      },
    })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        if (res.data.status_code == 1) {
          setData(res.data.cveInfo);
        } else {
          setData();
        }
      })
      .catch((err) => {
        if (err.response.status == 401) {
          window.location.href = "/";
        } else {
          setLoading(false);
          setData([]);
          notification.open({
            message: "Thông báo lỗi",
            description: "Vui lòng thử lại sau",
          });
        }
      });
  };

  const handleUpdate = () => {
    setLoading(true);
    setUpdate(false);
    const token = localStorage.getItem("accessToken");
    if (token == null || token == "") {
      window.location = "/";
      return false;
    }
    let nameC, desC, numbC;
    if (name == "") {
      nameC = data.cveName;
    } else {
      nameC = name;
    }
    if (des == "") {
      desC = data.des;
    } else {
      desC = des;
    }

    const dataUpdate = {
      cveId: data.cveId,
      cveName: nameC,
      des: desC,
    };

    axios({
      method: "POST",
      url: config.API_URL + config.API_VR + `tasks/cve/update`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: dataUpdate,
    })
      .then((res) => {
        // setLoading(false);
        console.log(res.data);
        if (res.data.status_code == 1) {
          notification.open({
            message: "Thông báo ",
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
        console.log(err);
        if (err.response.status == 401) {
          window.location.href = "/";
        } else {
          setLoading(false);
          setData([]);
          notification.open({
            message: "Thông báo lỗi",
            description: "Vui lòng thử lại sau",
          });
        }
      });
  };

  
  const UploadFileCVE = (e) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (token == null || token == "") {
      window.location = "/signin";
      return false;
    }
    if (fileList.length < 1){
      notification.open({
        message: "Thông báo",
        description: "Cần tải lên file CVE",
      });
      setLoading(false);
      return
    }
    const f = new FormData();
    f.append("cveId", id);
    f.append("pocFile", fileList[0]);
    axios({
      method: "POST",
      url: config.API_URL + config.API_VR + `tasks/cve/poc`,
      mode: "cors",
      headers: {
        // "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      processData: false,
      data: f,
    })
      .then((res) => {
        form.resetFields();
        setLoading(false);
        setUploadVisiable(false);
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
      })
      .catch((err) => {
        // if (err.response.status == 401) {
        //   window.location.href = "/";
        // } else {
        setLoading(false);
        setUploadVisiable(false);
        notification.open({
          message: "Thông báo lỗi",
          description: "Vui lòng thử lại sau",
        });
        // }
      });
  };

  return (
    <div>
      <Layout>
        <SideBar></SideBar>
        <Layout style={{ marginLeft: "15%" }}>
          <Header_></Header_>
          <Content style={{ margin: "2%", backgroundColor: "white" }}>
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
                      <Input
                        defaultValue={data.cveName}
                        onChange={(e) => setName(e.target.value)}
                      ></Input>
                    ) : (
                      <p>{data.cveName}</p>
                    )}
                  </h1>
                  <h1>
                    <b>Number:</b>
                    <br></br>
                    {update ? (
                      <Input
                        defaultValue={data.cveNumber}
                        onChange={(e) => setName(e.target.value)}
                      ></Input>
                    ) : (
                      <p>{data.cveNumber}</p>
                    )}
                  </h1>

                  <h1>
                    <b>CVE ID: </b>
                    <p>{data.cveId}</p>
                  </h1>
                  <h1>
                    <b>Mô tả: </b>
                    <br></br>
                    {update ? (
                      <TextArea
                        rows={4}
                        defaultValue={data.des}
                        name="des"
                        onChange={(e) => {
                          setDes(e.target.value);
                        }}
                      />
                    ) : (
                      <p>{data.des}</p>
                    )}
                  </h1>
                </div>
              )}

              <Divider></Divider>
              <div style={{ marginLeft: "3%", marginBottom: "5%" }}>
                {update ? (
                  <Button
                    type="primary"
                    onClick={() => {
                      handleUpdate();
                    }}
                  >
                    Lưu
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    onClick={() => {
                      setUpdate(true);
                    }}
                  >
                    Cập nhật
                  </Button>
                )}
                <Button
                  style={{ marginLeft: "20px" }}
                  onClick={() => {setUploadVisiable(true)}}
                >
                  Cập nhật file CVE
                </Button>
              </div>

              <Modal
        visible={UploadVisiable}
        title="Cập nhật file CVE"
        loading={loading}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
        ]}
      >
        <Form
          form={form}
          {...layout}
          name="basic"
          onFinish={UploadFileCVE}
          onFinishFailed={handleCancel}
        >
          <Form.Item style={{marginLeft:"35%"}}
          >
             <Upload {...props} maxCount={1}>
            <Button size="large" icon={<UploadOutlined />}>
              Tải lên file CVE
            </Button>
          </Upload>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
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

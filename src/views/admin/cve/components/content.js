import {
  Row,
  Col,
  Divider,
  Space,
  Button,
  Table,
  notification,
  Popconfirm,
  Modal,
  Form,
  Input,
  Upload
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../../../../config";
const axios = require("axios").default;

const { FormItem } = Form;
const { TextArea } = Input;

const Content_ = () => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    fetch({ pagination });
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  const fetch = (params = {}) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (token == null || token == "") {
      window.location = "/signin";
      return false;
    }

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
        if (res.data.status_code == 1) {
          setData(res.data.cves);
          setPagination({
            ...params.pagination,
            total: res.data.cves.length,
          });
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        if (err.response.status == 401) {
          window.location.href = "/";
        } else {
        setLoading(false);
        setData([]);
        notification.open({
          message: "Th??ng b??o l???i",
          description: "Vui l??ng th??? l???i sau",
        });
        }
      });
  };

  let x = 1;
  const columns = [
    {
      title: "STT",
      key: "index",
      width: "5%",
      align: "center",
      render: () => {
        return x++;
      },
    },
    {
      title: "T??n CVE",
      dataIndex: "cveName",
      width: "60%",
    },
    {
      title: "CVE Number",
      dataIndex: "cveNumber",
      width: "40%",
    },
    {
      title: "Action",
      width: "40%",
      render: (cve) => {
        return (
          <Link to={"/admin/cve/" + cve.cveId}>
            {" "}
            <Button type="primary">Chi ti???t</Button>
          </Link>
        );
      },
    },
  ];

  const handleCancel = () => {
    setVisible(false);
  };

  const onAddCve = (e) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (token == null || token == "") {
      window.location = "/signin";
      return false;
    }
    if (fileList.length < 1){
      notification.open({
        message: "Th??ng b??o",
        description: "C???n t???i l??n file CVE",
      });
      setLoading(false);
      return
    }
    const f = new FormData();
    f.append("cveNumber", e.cveNumber);
    f.append("cveName", e.cveName);
    f.append("des", e.des);
    f.append("pocFile", fileList[0]);
    console.log(f)
    axios({
      method: "POST",
      url: config.API_URL + config.API_VR + `tasks/cve/add`,
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
        setVisible(false);
        if (res.data.status_code == 1) {
          notification.open({
            message: "Th??ng b??o",
            description: "Th??m th??nh c??ng",
          });
        } else {
          notification.open({
            message: "Th??ng b??o",
            description: "Th??m th???t b???i",
          });
        }
        fetch({ pagination });
      })
      .catch((err) => {
        // if (err.response.status == 401) {
        //   window.location.href = "/";
        // } else {
        setLoading(false);
        setVisible(false);
        notification.open({
          message: "Th??ng b??o l???i",
          description: "Vui l??ng th??? l???i sau",
        });
        // }
      });
  };

  const [fileList, setFileList] = useState([])

  const props = {
    onRemove: (file) => {
      notification.open({
        message: "Th??ng b??o",
        description: `${file.name} file removed successfully`,
      });
      setFileList([])
    },
    beforeUpload: (file) => {
      notification.open({
        message: "Th??ng b??o",
        description: `${file.name} file uploaded successfully`,
      });
      setFileList([file])
      return false;
    },
    fileList,
  };

  return (
    <div
      style={{
        marginRight: "10px",
        marginLeft: "20px",
        height: "75vh",
        marginTop: "25px",
      }}
    >
      <div>
        <Row>
          <Col span={12}>
            <Space>
              <h1 style={{ fontSize: "30px", marginTop: "1rem" }}>
                Danh s??ch c??c CVE
              </h1>
              <Button
                size="large"
                type="primary"
                style={{ marginLeft: "2rem", marginTop: "0rem" }}
                onClick={() => {
                  setVisible(true);
                }}
              >
                Th??m CVE
              </Button>
            </Space>
          </Col>
        </Row>
      </div>
      <Divider></Divider>
      <div style={{ margin: "0 auto", width: "60%" }}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>

      <Modal
        visible={visible}
        title="Th??m m???i CVE"
        loading={loading}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            H???y
          </Button>,
        ]}
      >
        <Form
          form={form}
          {...layout}
          name="basic"
          onFinish={onAddCve}
          onFinishFailed={handleCancel}
        >
          <Form.Item
            label="CVE Name"
            name="cveName"
            rules={[{ required: true, message: "Vui l??ng nh???p t??n CVE!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="CVE Number"
            name="cveNumber"
            rules={[{ required: true, message: "Vui l??ng nh???p s??? CVE" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="CVE Description"
            name="des"
            rules={[{ required: true, message: "Vui l??ng mi??u t??? CVE!" }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item style={{marginLeft:"35%"}}
          >
             <Upload {...props} maxCount={1}>
            <Button size="large" icon={<UploadOutlined />}>
              T???i l??n file CVE
            </Button>
          </Upload>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Th??m
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Content_;

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
} from "antd";
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
      title: "Tên CVE",
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
            <Button type="primary">Chi tiết</Button>
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

    axios({
      method: "POST",
      url: config.API_URL + config.API_VR + `tasks/cve/add`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: e,
    })
      .then((res) => {
        form.resetFields();
        setLoading(false);
        setVisible(false);
        if (res.data.status_code == 1) {
          notification.open({
            message: "Thông báo",
            description: "Thêm thành công",
          });
        } else {
          notification.open({
            message: "Thông báo",
            description: "Thêm thất bại",
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
          message: "Thông báo lỗi",
          description: "Vui lòng thử lại sau",
        });
        // }
      });
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
                Danh sách các CVE
              </h1>
              <Button
                size="large"
                type="primary"
                style={{ marginLeft: "2rem", marginTop: "0rem" }}
                onClick={() => {
                  setVisible(true);
                }}
              >
                Thêm CVE
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
        title="Thêm mới CVE"
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
          onFinish={onAddCve}
          onFinishFailed={handleCancel}
        >
          <Form.Item
            label="CVE Name"
            name="cveName"
            rules={[{ required: true, message: "Vui lòng nhập tên CVE!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="CVE Number"
            name="cveNumber"
            rules={[{ required: true, message: "Vui lòng nhập số CVE" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="CVE Description"
            name="des"
            rules={[{ required: true, message: "Vui lòng miêu tả CVE!" }]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Content_;

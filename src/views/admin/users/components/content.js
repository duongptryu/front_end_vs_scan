import {
  Row,
  Col,
  Divider,
  Space,
  Button,
  Table,
  notification,
  Modal,
  Form,
  Input,
  Popconfirm,
} from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../../../../config";
const axios = require("axios").default;

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const Content_ = () => {
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [data, setData] = useState([]);
  const [popUpData, setPopUpData] = useState([]);
  const [visible, setVisible] = useState(false);

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

  const handleEditUser = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const openPopUP = (userID) => {
    for (let i = 0; i <= data.length; i++) {
      if (data[i].userId == userID) {
        setPopUpData(data[i]);
        break;
      }
    }
    setVisible(true);
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
      url: config.API_URL + config.API_VR + `tasks/user/list`,
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
          let x = res.data.allusers.activeUsers;
          let y = x.concat(res.data.allusers.notActiveUsers);
          setData(y);
          setPagination({
            ...params.pagination,
            total: y,
          });
          console.log(data);
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
      title: "Ngày tạo",
      dataIndex: "createTime",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "30%",
    },
    {
      title: "Tên người dùng",
      dataIndex: "fullName",
      width: "30%",
    },
    {
      title: "Trạng thái",
      width: "30%",
      render: (user) => {
        if (user.isActive) {
          return "Hoạt động";
        } else {
          return "Không hoạt động";
        }
      },
    },
    {
      title: "Action",
      width: "20%",
      render: (target) => {
        return (
            target.isActive ? (
              <Space>
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={() => {
                  block(target.userId);
                }}
                disabled
              >
                Block
              </Button>
                <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={() => {
                  unblock(target.userId);
                }}
              >
                UnBlock
              </Button>
                 </Space>
            ) : (
              <Space>
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={() => {
                  block(target.userId);
                }}
              >
                Block
              </Button>
                <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={() => {
                  unblock(target.userId);
                }}
                disabled
              >
                UnBlock
              </Button>
                 </Space>
            )
       
        );
      },
    },
  ];

  const block = (e) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (token == null || token == "") {
      window.location = "/signin";
      return false;
    }
    let dataX = {
      enable: [],
      disable: [e],
    };

    axios({
      method: "POST",
      url: config.API_URL + config.API_VR + `tasks/user/status`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: dataX,
    })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        // if (res.data.status_code == 1) {
        //   setData(res.data.allusers.activeUsers);
        //   setPagination({
        //     ...params.pagination,
        //     total: res.data.allusers.activeUsers.length,
        //   });
        //   console.log(data);
        // } else {
        //   setData([]);
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

  const unblock = (e) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (token == null || token == "") {
      window.location = "/signin";
      return false;
    }
    const dataX = {
      enable: [e],
      disable: [],
    };

    axios({
      method: "POST",
      url: config.API_URL + config.API_VR + `tasks/user/status`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: dataX,
    })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        // if (res.data.status_code == 1) {
        //   setData(res.data.allusers.activeUsers);
        //   setPagination({
        //     ...params.pagination,
        //     total: res.data.allusers.activeUsers.length,
        //   });
        //   console.log(data);
        // } else {
        //   setData([]);
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

  return (
    <div
      style={{
        marginRight: "10px",
        marginLeft: "20px",
        height: "70vh",
        marginTop: "25px",
      }}
    >
      <div>
        <Row>
          <Col span={12}>
            <h1 style={{ fontSize: "30px" }}>Danh sách người dùng</h1>
          </Col>
        </Row>
      </div>
      <Divider></Divider>

      <div style={{ margin: "2%" }}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default Content_;

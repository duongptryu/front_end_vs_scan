import { Row, Col, Divider, Space, Button, Table, notification, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../../../../config";
const axios = require("axios").default;


const Content_ = () => {
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [data, setData] = useState([]);

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
      url: config.API_URL + config.API_VR + `tasks/plugin/list`,
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
          setData(res.data.plugins);
          setPagination({
            ...params.pagination,
            total: res.data.plugins.length,
          });
          console.log(data);
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
          message: "Thông báo lỗi",
          description: "Vui lòng thử lại sau",
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
      title: "Mức độ",
      dataIndex: "risk",
      sorter: (a, b) => { 
        const orders = { 'Low': 1, 'Medium': 2, 'High': 3, "Information": 4};
        return orders[a.risk] - orders[b.risk];
      },
      filters: [
        {
          text: 'High',
          value: 'High',
        },
        {
          text: 'Medium',
          value: 'Medium',
        },
        {
          text: 'Low',
          value: 'Low',
        },
        {
          text: 'Information',
          value: 'Information',
        },
      ],
      onFilter: (value, record) => record.risk.indexOf(value) === 0,
      width: "10%",
      render: (risk) => {
        if (risk == "High") {
          return (
            <Button
              type="text"
              style={{ backgroundColor: config.HIGH, color: "white", width:"90%" }}
            >
              {risk}
            </Button>
          );
        } else if (risk == "Medium") {
          return (
            <Button
              type="text"
              style={{ backgroundColor: config.MEDIUM, color: "white", width:"90%"  }}
            >
              {risk}
            </Button>
          );
        } else if (risk == "Low") {
          return (
            <Button
              type="text"
              style={{ backgroundColor: config.LOW, color: "white", width:"90%"  }}
            >
              {risk}
            </Button>
          );
        } else {
          return (
            <Button
              type="text"
              style={{ backgroundColor: config.INFO, color: "white", width:"90%"  }}
            >
              {risk}
            </Button>
          );
        }
      },
    },
    {
      title: "Tên điểm yếu",
      width: "30%",
      render: (target) => {
        return (
          <Link to={"/admin/plugin/detail/" + target.pluginId}>{target.pluginName}</Link>
        );
      },
    },
    {
      title: "cwe",
      dataIndex:"cweId",
      width: "20%",
    },
    {
      title: "Action",
      width: "20%",
      render: (target) => {
        return (
          <Space>
            <Link to={"/admin/plugin/detail/" + target.pluginId}><Button
              type="primary"
              style={{ width:"100%" }}
            >
              Sửa
            </Button></Link>
          </Space>
        );
      },
    },
  ];

  const confirm = (e)=> {
    console.log(e);

  }
  
  const cancel = (e)=> {
    console.log(e);
  }

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
            <h1 style={{ fontSize: "30px" }}>Danh sách các plugin</h1>
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

export default Content_

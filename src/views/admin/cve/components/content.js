import {
  Row,
  Col,
  Divider,
  Space,
  Button,
  Table,
  notification,
  Popconfirm,
} from "antd";
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
            <h1 style={{ fontSize: "30px" }}>Danh sách các CVE</h1>
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
    </div>
  );
};

export default Content_;

import { Row, Col, Divider, Space, Button, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import config from "../../../../config";
import reqwest from "reqwest";

const Content_ = () => {
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [data, setData] = useState([]);
  const getRandomuserParams = (params) => ({
    results: params.pagination.pageSize,
    page: params.pagination.current,
    ...params,
  });

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
    reqwest({
      url: "https://randomuser.me/api",
      method: "get",
      type: "json",
      data: getRandomuserParams(params),
    }).then((data) => {
      console.log(data);
      setData(data.results);
      setPagination({
        pagination: {
          ...params.pagination,
          total: 200,
        },
      });
      setLoading(false);
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
      dataIndex: "gender",
      width: "20%",
    },
    {
      title: "Tên điểm yếu",
      width: "30%",
      render: (target) => {
        return (
          <Link to={"/detail-domain/" + target.targetId}>{target.gender}</Link>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "gender",
      width: "30%",
      sorter: (a, b) => {
        return a.overview.high - b.overview.high;
      },
    },
    {
      title: "Tên người dùng",
      dataIndex: "gender",
      width: "30%",
      sorter: (a, b) => {
        return a.overview.high - b.overview.high;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "gender",
      width: "30%",
      sorter: (a, b) => {
        return a.overview.high - b.overview.high;
      },
    },
    {
      title: "Action",
      width: "20%",
      render: (target) => {
        return (
          <Space>
            <Button type="primary" style={{ width: "100%" }}>
              Sửa
            </Button>
            <Button type="primary" style={{ width: "100%" }}>
              Xóa
            </Button>
          </Space>
        );
      },
    },
  ];

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
            <h1 style={{ fontSize: "30px" }}>Danh sách các plugin</h1>
          </Col>
        </Row>
      </div>
      <Divider></Divider>
      <div style={{ margin: "2%" }}>
        <Table
          columns={columns}
          rowKey={(record) => record.login.uuid}
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

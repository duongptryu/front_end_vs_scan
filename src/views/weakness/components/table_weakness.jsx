import { useEffect, useState } from "react";
import "../../dashboard/index.css";
import {
  Table,
  Button,
  Space,
  Col,
  Row,
  Input,
  DatePicker,
  notification,
} from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import config from "../../../config";
const axios = require("axios").default;

const dateFormat = "YYYY/MM/DD";

const { RangePicker } = DatePicker;
const { Search } = Input;

const TableWkn = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);

  let seconds = Math.floor(Date.now() / 1000);

  const [time, setTime] = useState({
    timeStart: seconds - 604800,
    timeEnd: seconds,
  })

  useEffect(() => {
    document.title = "Quản lý lỗ hổng - Bảng domain"
    fetch({ time, pagination });
  }, []);

  const convertDate = (second) => {
    var curdate = new Date(null);
    curdate.setTime(second * 1000);
    let x = curdate.toLocaleString().split(",")[0];
    const x_split = x.split("/");
    return x_split[2] + "/" + x_split[0] + "/" + x_split[1];
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
      url:
        config.API_URL +
        config.API_VR +
        `tasks/vulns/overviews?timeStart=${params.time.timeStart}&timeEnd=${params.time.timeEnd}`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        let data_res = [];
        for (var key in res.data.overviews.vulns) {
          data_res.push({ ...res.data.overviews.vulns[key], id: key });
        }
        console.log(data_res);
        setData(data_res);
        setLoading(false);
        setPagination({
          ...params.pagination,
          total: data_res.length,
        });
      })
      .catch((err) => {
        setLoading(false);
        setData([]);
        notification.open({
          message: "Thông báo lỗi",
          description: "Vui lòng thử lại sau",
        });
      });
  };

  const columns = [
    {
      title: "Mức độ",
      dataIndex: "risk",
      sorter: (a, b) => {
        const orders = { Low: 1, Medium: 2, High: 3, Information: 4 };
        return orders[a.risk] - orders[b.risk];
      },
      filters: [
        {
          text: "High",
          value: "High",
        },
        {
          text: "Medium",
          value: "Medium",
        },
        {
          text: "Low",
          value: "Low",
        },
        {
          text: "Information",
          value: "Information",
        },
      ],
      onFilter: (value, record) => record.risk.indexOf(value) === 0,
      width: "10%",
      render: (risk) => {
        if (risk == "High") {
          return (
            <Button
              type="text"
              style={{
                backgroundColor: config.HIGH,
                color: "white",
                width: "80%",
              }}
            >
              {risk}
            </Button>
          );
        } else if (risk == "Medium") {
          return (
            <Button
              type="text"
              style={{
                backgroundColor: config.MEDIUM,
                color: "white",
                width: "80%",
              }}
            >
              {risk}
            </Button>
          );
        } else if (risk == "Low") {
          return (
            <Button
              type="text"
              style={{
                backgroundColor: config.LOW,
                color: "white",
                width: "80%",
              }}
            >
              {risk}
            </Button>
          );
        } else {
          return (
            <Button
              type="text"
              style={{
                backgroundColor: config.INFO,
                color: "white",
                width: "80%",
              }}
            >
              {risk}
            </Button>
          );
        }
      },
    },
    {
      title: "Tên lỗ hổng",
      width: "40%",
      render: (target) => {
        return (
          <Link to={"/detail-vuln/" + target.id}>{target.pluginName}</Link>
        );
      },
    },
    {
      title: "cwe",
      dataIndex: "cwe",
      sorter: (a,b) => {return a.cwe - b.cwe},
      width: "10%",
    },
    {
      title: "Số domain bị ảnh hưởng",
      dataIndex: "countDomain",
      sorter: (a,b) => {return a.countDomain - b.countDomain},
      width: "20%",
    },
    {
      title: "Tổng số endpoint bị ảnh hưởng",
      dataIndex: "count",
      sorter: (a,b) => {return a.count - b.count},
      width: "40%",
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      time,
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  return (
    <div>
      <Row>
        <Col span={12}>
          <Space>
            <Search
              placeholder="Tìm kiếm"
              enterButton="Search"
              size="medium"
              width="200px"
            />
          </Space>
        </Col>
        <Col span={4}>
          <Space style={{ marginBottom: 16, float: "right" }} size={12}>
            <RangePicker
              defaultValue={[
                moment(convertDate(time.timeStart), dateFormat),
                moment(convertDate(time.timeEnd), dateFormat),
              ]}
              loading={loading}
            />
          </Space>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        size="small"
      />
    </div>
  );
};

export default TableWkn;

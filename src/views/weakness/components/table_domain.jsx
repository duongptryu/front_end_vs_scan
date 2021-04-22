// import "antd/dist/antd.css";
import {
  Table,
  Button,
  Space,
  notification,
  Col,
  DatePicker,
  Input,
  Row
} from "antd";
import moment from 'moment';
import { useEffect, useState } from "react";
import "../../dashboard/index.css";
import config from "../../../config";
const axios = require("axios").default;

const { RangePicker } = DatePicker;
const { Search } = Input;

const TableDomain = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [loading, setLoading] = useState(false);

  const [time, setTime] = useState({
    timeStart: "161755384",
    timeEnd: "1618590699",
  });

  useEffect(() => {
    fetch({time, pagination});
  }, []);

  const convertDate = (second) => {
    var curdate = new Date(null);
    curdate.setTime(second * 1000);
    let x = curdate.toLocaleString().split(",")[0];
    const x_split = x.split("/");
    return x_split[2] + "/" + x_split[0] + "/" + x_split[1];
  };

  const convertDateWithTime = (second) => {
    var curdate = new Date(null);
    curdate.setTime(second * 1000);
    return curdate.toLocaleString();
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
        console.log(res.data.overviews.hostOverviews);
        setData(res.data.overviews.hostOverviews);
        setLoading(false);
        setPagination({
          ...params.pagination,
          total: res.data.overviews.hostOverviews.length,
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
      title: "Lần quét cuối",
      sorter: true,
      render: (target) => {
        console.log(target.overview.startTime);
        return convertDateWithTime(target.overview.startTime);
      },
      width: "20%",
    },
    {
      title: "Domain",
      dataIndex: "target",
      // filters: [
      //   { text: "Male", value: "male" },
      //   { text: "Female", value: "female" },
      // ],
      sorter: true,
      width: "30%",
    },
    {
      title: "Lỗ hổng",
      width: "30%",
      sorter: true,
      render: (target) => {
        return (
          <Space>
            <Button
              type="text"
              style={{ backgroundColor: "#ff6666", color: "white" }}
            >
              {target.overview.high}
            </Button>
            <Button
              type="text"
              style={{ backgroundColor: "#ffd633", color: "white" }}
            >
              {target.overview.medium}
            </Button>
            <Button
              type="text"
              style={{ backgroundColor: "#66ff33", color: "white" }}
            >
              {target.overview.low}
            </Button>
            <Button
              type="text"
              style={{ backgroundColor: "#3399ff", color: "white" }}
            >
              {target.overview.info}
            </Button>
          </Space>
        );
      },
    },
    {
      title: "Trạng thái",
      width: "20%",
      sorter: true,
      render: (target) => {
        return <p>{target.overview.scanStatus}</p>;
      },
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

  const dateFormat = 'YYYY/MM/DD'

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
            <RangePicker defaultValue={[moment(convertDate(time.timeStart), dateFormat), moment(convertDate(time.timeEnd), dateFormat)]} loading={loading}/>
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

export default TableDomain;

// import "antd/dist/antd.css";
import { Table, Space, Button, notification } from "antd";
import "../index.css";
import { useEffect, useState } from "react";
import config from "../../../config";
const axios = require("axios").default;



const TableDomain = (props) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [loading, setLoading] = useState(false);

  const [time, setTime] = useState({
    timeStart: props.time.timeStart,
    timeEnd: props.time.timeEnd,
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

  let x = 1

  const columns = [
    {
      title: 'STT',
      key: 'index',
      width: "5%",
      render: () => {
        return x++
      },
    },
    {
      title: "Domain",
      dataIndex: "target",
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

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
      size="small"
    />
  );
};

export default TableDomain;

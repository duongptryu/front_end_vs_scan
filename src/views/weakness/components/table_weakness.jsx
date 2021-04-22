
import { useEffect, useState } from "react";
import "../../dashboard/index.css";
import { Table, Button, Space, Col, Row, Input, DatePicker, notification } from "antd";
import moment from "moment";
import config from "../../../config";
const axios = require("axios").default;



const dateFormat = 'YYYY/MM/DD'

const { RangePicker } = DatePicker;
const { Search } = Input;

const TableWkn = () => {
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
    fetch({time,pagination});
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
        let data_res = []
        for(var key in res.data.overviews.vulns){
          data_res.push(res.data.overviews.vulns[key])
        }
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
      sorter: true,
      width: "10%",
    },
    {
      title: "Tên điểm yếu",
      dataIndex: "pluginName",
      sorter: true,
      width: "40%",
    },
    {
      title: "cwe",
      dataIndex: "cwe",
      width: "10%",
      sorter: true,
    },
    {
      title: "Số domain bị ảnh hưởng",
      dataIndex: "countDomain",
      width: "20%",
      sorter: true,
    },
    {
      title: "Tổng số endpoint bị ảnh hưởng",
      dataIndex: "count",
      width: "40%",
      sorter: true,
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

// import "antd/dist/antd.css";
import { Table, notification } from "antd";
import { useEffect, useState } from "react";
import "../../dashboard/index.css";
import config from "../../../config";
const axios = require("axios").default;


const TableWkn = (props) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1)

  const [time, setTime] = useState({
    timeStart: props.time.timeStart,
    timeEnd: props.time.timeEnd,
  });

  useEffect(() => {
    fetch({time,pagination});
  }, []);

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

  var x = 1

  const columns = [
    {
      title: 'STT',
      key: 'index',
      width:"5%",
      render: () => {
        return x++
      },
    },
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
      width: "15%",
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

export default TableWkn;

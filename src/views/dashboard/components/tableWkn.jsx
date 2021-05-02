// import "antd/dist/antd.css";
import { Table, notification, Button } from "antd";
import { useEffect, useState } from "react";
import "../../dashboard/index.css";
import config from "../../../config";
import {Link} from "react-router-dom"
const axios = require("axios").default;

const TableWkn = (props) => {
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
    fetch({ time, pagination });
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
        let data_res = [];
        for (var key in res.data.overviews.vulns) {
          data_res.push({...res.data.overviews.vulns[key],"id":key});
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

  var x = 1;

  const columns = [
    {
      title: "STT",
      key: "index",
      width: "5%",
      align:"center",
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
      title: "Tên lỗ hổng",
      width: "40%",
      render: (target) => {
        return <Link to={"/detail-vuln/" + target.id}>{target.pluginName}</Link>
      }
    },
    {
      title: "cwe",
      dataIndex: "cwe",
      width: "10%",
      sorter: (a,b) => a.cwe - b.cwe,
      align:"center"
    },
    {
      title: "Số domain bị ảnh hưởng",
      dataIndex: "countDomain",
      width: "15%",
      sorter: (a,b) => a.cwe - b.cwe,
      align:"center"
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

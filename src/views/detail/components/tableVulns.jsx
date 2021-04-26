// import "antd/dist/antd.css";
import { Table, Space, Button, notification } from "antd";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom"
import config from "../../../config";
import detailDomainContext from "../../../contexts/detailDomain/detailDomainContext"
const axios = require("axios").default;

const TableVulns = () => {
  const { id, time } = useContext(detailDomainContext);

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch({ pagination });
  }, []);

  const fetch = (params = {}) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (token == null || token == "") {
      window.location = "/signin";
      return false;
    }

    let query = config.API_URL + config.API_VR + `tasks/host/vulns?targetId=${id}`
    if (time != undefined) {
      query = query + `&historyIndexTime=${time}`
    }

    axios({
      method: "GET",
      url: query,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setData(res.data.hostVulns.vulns);
        setLoading(false);
        setPagination({
          ...params.pagination,
          total:res.data.hostVulns.vulns.length,
        });
      })
      .catch((err) => {
        setLoading(false);
        setData([]);
        notification.open({
          message: "Thông báo",
          description: "Không có dữ liệu",
        });
      });
  };

  let x = 1;

  const columns = [
    {
      title: "STT",
      key: "index",
      width: "5%",
      render: () => {
        return x++;
      },
    },
    {
      title: "Mức độ",
      dataIndex: "risk",
      sorter: true,
      width: "10%",
      render: (risk) => {
        if (risk == "High") {
            return (
              <Button
                type="text"
                style={{ backgroundColor: "#ff6666", color: "white", width:"80%"}}
                
              >
                {risk}
              </Button>
            );
          } else if (risk == "Medium") {
            return (
              <Button
                type="text"
                style={{ backgroundColor: "#ffd633", color: "white",  width:"80%"}}
              >
                {risk}
              </Button>
            );
          } else if (risk == "Low") {
            return (
              <Button
                type="text"
                style={{ backgroundColor: "#66ff33", color: "white",  width:"80%" }}
              >
                {risk}
              </Button>
            );
          } else {
            return (
              <Button
                type="text"
                style={{ backgroundColor: "#3399ff", color: "white",  width:"80%"}}
              >
                {risk}
              </Button>
            );
          }
      }
    },
    {
      title: "Tên điểm yếu",
      width: "30%",
      sorter: true,
      render: (target) => {
          return <Link to={"/detail-vuln/"+ target.pluginId + "/" + id}>{target.pluginName}</Link>
      } 
    },
    {
      title: "CWE",
      dataIndex: "cwe",
      width: "10%",
      sorter: true,
    },
    {
      title: "Số endpoint ảnh hưởng",
      dataIndex: "count",
      width: "20%",
      sorter: true,
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
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

export default TableVulns;

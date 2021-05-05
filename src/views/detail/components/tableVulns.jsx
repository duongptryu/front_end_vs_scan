// import "antd/dist/antd.css";
import { Table, Button, notification, Row, Col, Input } from "antd";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import config from "../../../config";
import detailDomainContext from "../../../contexts/detailDomain/detailDomainContext";
const axios = require("axios").default;

const { Search } = Input;
const TableVulns = () => {
  const { id, time } = useContext(detailDomainContext);
  const [data, setData] = useState([]);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Chi tiết domain - Bảng lỗ hổng";
    fetch({ pagination });
  }, []);


  const fetch = (params = {}) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (token == null || token == "") {
      window.location = "/signin";
      return false;
    }

    let query =
      config.API_URL + config.API_VR + `tasks/host/vulns?targetId=${id}`;
    if (time != undefined) {
      query = query + `&historyIndexTime=${time}`;
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
        let data_high = [];
        let data_medium = [];
        let data_low = [];
        let data_info = [];
        res.data.hostVulns.vulns.forEach((target) => {
          if (target.risk == "High") {
            data_high.push(target);
          } else if (target.risk == "Medium") {
            data_medium.push(target);
          } else if (target.risk == "Low") {
            data_low.push(target);
          } else {
            data_info.push(target);
          }
        });

        let data_res = [
          ...data_high,
          ...data_medium,
          ...data_low,
          ...data_info,
        ];
        setData(data_res);
        setLoading(false);
        setPagination({
          ...params.pagination,
          total: res.data.hostVulns.vulns.length,
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
      align: "center",
    },
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
      width: "30%",
      render: (target) => {
        return (
          <Link to={"/detail-vuln/" + target.pluginId + "/" + id}>
            {target.pluginName}
          </Link>
        );
      },
    },
    {
      title: "CWE",
      dataIndex: "cwe",
      width: "10%",
      align: "center",
      sorter: (a, b) => a.cwe - b.cwe,
    },
    {
      title: "Số endpoint ảnh hưởng",
      dataIndex: "count",
      width: "20%",
      align: "center",
      sorter: (a, b) => a.count - b.count,
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

  const handleSearch = (e) => {
    if (id == undefined) {
      return false;
    }
    setLoading(true);

    const token = localStorage.getItem("accessToken");
    let query =
      config.API_URL +
      config.API_VR +
      `tasks/vulns/search?keyword=${e}&targetId=${id}`;
    if (time != undefined) {
      query = query + `&historyIndexTime=${time}`;
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
        setLoading(false);
        if (res.data.status_code == 0) {
          notification.open({
            message: "Thông báo",
            description: res.data.msg,
          });
        } else {
          console.log(res)
          let data_res = [];
          let data_high = [];
          let data_medium = [];
          let data_low = [];
          let data_info = [];
          for (var key in res.data.vulns) {
            if (res.data.vulns[key].risk == "High") {
              data_high.push({ ...res.data.vulns[key], id: key });
            } else if (res.data.vulns[key].risk == "Medium") {
              data_medium.push({ ...res.data.vulns[key], id: key });
            } else if (res.data.vulns[key].risk == "Low") {
              data_low.push({ ...res.data.vulns[key], id: key });
            } else {
              data_info.push({ ...res.data.vulns[key], id: key });
            }
          }
          data_res = [...data_high, ...data_medium, ...data_low, ...data_info];
          setData(data_res);
        }
      })
      .catch((err) => {
        notification.open({
          message: "Thông báo",
          description: "Hệ thông đang bận, vui lòng thử lại sau",
        });
        setLoading(false);
      });
  };

  return (
    <div>
      <Row>
        <Col span={8} style = {{ marginBottom: "20px"}}>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="medium"
            onSearch={handleSearch}
          />
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

export default TableVulns;

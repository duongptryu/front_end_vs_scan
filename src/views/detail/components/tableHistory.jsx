// import "antd/dist/antd.css";
import { Table, notification } from "antd";
import { useEffect, useState, useContext } from "react";
import config from "../../../config";
import detailDomainContext from "../../../contexts/detailDomain/detailDomainContext"
const axios = require("axios").default;

const TableHistory = () => {
  const { id } = useContext(detailDomainContext);

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [loading, setLoading] = useState(false);

  const convertDate = (second) => {
    var curdate = new Date(null);
    curdate.setTime(second * 1000);
    return curdate.toLocaleString().split(",");
  };

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

    axios({
      method: "GET",
      url: config.API_URL + config.API_VR + `tasks/vulns/history?targetId=${id}`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setData(res.data.scanHistory);
        setLoading(false);
        setPagination({
          ...params.pagination,
          total:res.data.hostVulns.vulns.length,
        });
      })
      .catch((err) => {
        //   console.log(err)
        setLoading(false);
        // setData([]);
        // notification.open({
        //   message: "Thông báo lỗi",
        //   description: "Vui lòng thử lại sau",
        // });
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
      title: "Ngày bắt đầu",
      dataIndex: "startTime",
      sorter: true,
      width: "20%",
      render: (startTime) => {
          return convertDate(startTime)
      }
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endTime",
      width: "20%",
      sorter: true,
      render: (endTime) => {
        return convertDate(endTime)
    }
    },
    {
      title: "Trạng thái",
      dataIndex: "scanStatus",
      width: "10%",
      sorter: true,
    },
    {
      title: "Số lỗ hổng",
    //   dataIndex: "count",
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

export default TableHistory;

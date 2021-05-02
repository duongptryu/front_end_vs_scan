// import "antd/dist/antd.css";
import { Table, notification } from "antd";
import { useEffect, useState, useContext } from "react";
import config from "../../../config";
import { Link } from "react-router-dom";
import detailDomainContext from "../../../contexts/detailDomain/detailDomainContext";
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
    document.title = "Chi tiết domain - Bảng lịch sử"
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
        console.log(res)
        if (res.data.scanHistory.length == 0) {
          setLoading(false);
          notification.open({
            message: "Thông báo",
            description: "Không có dữ liẹu",
          });
          return false;
        }
        setData(res.data.scanHistory);
        setLoading(false);
        setPagination({
          ...params.pagination,
          total: res.data.scanHistory.length,
        });
        return false;
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setData([]);
        notification.open({
          message: "Thông báo",
          description: "Vui lòng thử lại sau",
        });
      });
  };

  let x = 1;

  const columns = [
    {
      title: "STT",
      key: "index",
      width: "5%",
      render: (target) => {
        return <a href={"/detail-domain/" + id + "/" + target.startTime}>{x++}</a>
      },
      align:"center"
    },
    {
      title: "Ngày bắt đầu",
      sorter: (a,b) => {return a.startTime - b.startTime},
      width: "20%",
      render: (target) => {
        return <a href={"/detail-domain/" + id + "/" + target.startTime}>{convertDate(target.startTime)}</a>
      },
    },
    {
      title: "Ngày kết thúc",
      width: "20%",
      sorter: (a,b) => {return a.endTime - b.endTime},
      render: (target) => {
       return <a href={"/detail-domain/" + id + "/" + target.startTime}>{convertDate(target.endTime)}</a>
      },
    },
    {
      title: "Trạng thái",
      width: "10%",
      sorter: (a, b) => a.scanStatus.localeCompare(b.scanStatus),
      render : (target) => {
        return <a href={"/detail-domain/" + id + "/" + target.startTime}>{target.scanStatus}</a>
      },
      align:"center"
    }
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

import { Space, Row, notification } from "antd";
import { Pie } from "@ant-design/charts";
import { useState, useContext, useEffect } from "react";
import detailDomainContext from "../../../contexts/detailDomain/detailDomainContext";
// import config from "../../../config";
const axios = require("axios").default;

const Detail = (props) => {
  const { id } = useContext(detailDomainContext);

  const [data, setData] = useState([
    {
      country: "High",
      value: 1,
    },
    {
      country: "Medium",
      value: 1,
    },
    {
      country: "Low",
      value: 1,
    },
    {
      country: "Information",
      value: 1,
    },
  ]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    fetch({ pagination });
  }, data);

  const fetch = (params = {}) => {
    const token = localStorage.getItem("accessToken");
    if (token == null || token == "") {
      window.location = "/signin";
      return false;
    }

    axios({
      method: "GET",
      url: config.API_URL + config.API_VR + `tasks/host/vulns?targetId=${id}`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        console.log(res);
        // setData(res.data.hostVulns.overview);
        // setPagination({
        //   ...params.pagination,
        //   total: res.data.hostVulns.vulns.length,
        // });
      })
      .catch((err) => {
        console.log(err);
        // setData([]);
        // notification.open({
        //   message: "Thông báo lỗi",
        //   description: "Vui lòng thử lại sau",
        // });
      });
  };

  const config = {
    color: ["#ff6666", "#ffd633", "#66ff33", "#3399ff"],
    data,
    meta: {
      country: {
        alias: "Domain",
        range: [0, 1],
      },
      value: {
        alias: "Domain",
        formatter: (v) => {
          return `${v}`;
        },
      },
    },
    angleField: "value",
    colorField: "country",
  };

  const convertDate = (second) => {
    var curdate = new Date(null);
    curdate.setTime(second * 1000);
    return curdate.toLocaleString().split(",");
  };

  return (
    <div>
      <Row>
        <h2>Thông tin chi tiết</h2>
        <hr />
      </Row>
      <Row>
        <Space direction="vertical">
          <p>Địa chỉ: </p>
          <p>
            <b>Trạng thái: </b>
          </p>
          <p>
            {" "}
            <b>Xác thực:</b>
          </p>
          <p>
            <b>Ngày thêm:</b>{" "}
          </p>
        </Space>
      </Row>
      <hr />
      <Row>
        <h2>Thông tin rà quét</h2>
      </Row>
      <Row>
        <Space direction="vertical">
          <p>
            {" "}
            <b>Trạng thái: </b>
          </p>
          <p>
            <b>Bắt đầu: </b>
          </p>
          <p>
            <b>Kết thúc: </b>
          </p>
        </Space>
      </Row>
      <Row>
        <Pie {...config} width={300} />
      </Row>
    </div>
  );
};

export default Detail;

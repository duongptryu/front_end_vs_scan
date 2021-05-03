import { Space, Row, notification } from "antd";
import { Pie } from '@ant-design/charts';
import React, { useState, useContext, useEffect } from "react";
import detailDomainContext from "../../../contexts/detailDomain/detailDomainContext";
import config from "../../../config";

const axios = require("axios").default;

const url = config.API_URL + config.API_VR;

const Detail= () => {
  const { id, time } = useContext(detailDomainContext);

  const [data, setData] = useState([]);
  const [data_, setData_] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  useEffect(() => {
    fetch();
  }, []);

  const checkDictEmpty = (dict) => {
    for (var x in dict) {
      return false;
    }
    return true;
  };

  const fetch = (params = {}) => {
    const token = localStorage.getItem("accessToken");
    if (token == null || token == "") {
      window.location = "/signin";
      return false;
    }

    let query = url + `tasks/host/vulns?targetId=${id}`
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
        if (checkDictEmpty(res.data.hostVulns)) {

          setData([]);
          notification.open({
            message: "Thông báo",
            description: "Không có dữ liệu",
          });
          return false;
        }
        const res_data = res.data.hostVulns.overview;
        setData_({...res.data.hostVulns.targetInfo,startTime: res_data.startTime, endTime: res_data.endTime});
        setData([
          {
            country: "High",
            value: res_data.high,
          },
          {
            country: "Medium",
            value: res_data.medium,
          },
          {
            country: "Low",
            value: res_data.low,
          },
          {
            country: "Information",
            value: res_data.info,
          },
        ]);
        setPagination({
          ...params.pagination,
          total: res.data.hostVulns.vulns.length,
        });
      })
      .catch((err) => {
        setData([]);
        notification.open({
          message: "Thông báo lỗi",
          description: "Vui lòng thử lại sau",
        });
      });
  };

  const config_pie = {
    color: [config.HIGH, config.MEDIUM, config.LOW, config.INFO],
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
          <p><b>Địa chỉ:</b> {data_.target}</p>
          <p>
            <b>Trạng thái: </b> {data_.scanStatus}
          </p>
          <p>
            {" "}
            <b>Xác thực: </b>
            {data_.verify == false && "Chưa xác thực"}
            {data_.verify == true && "Đã xác thực"}
          </p>
          <p>
            <b>Ngày thêm:</b>{" "}
            {data_.createTime}
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
            <b>Trạng thái: </b> {data_.scanStatus}
          </p>
          <p>
            <b>Bắt đầu: </b> {convertDate(data_.startTime) || null}
          </p>
          <p>
            <b>Kết thúc: </b>
            {convertDate(data_.endTime) || null}
          </p>
        </Space>
      </Row>
      <Row>
        <Pie {...config_pie} width={400}/>
      </Row>
    </div>
  );
};

export default Detail;

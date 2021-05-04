// import "antd/dist/antd.css";
import { Row, Col, Divider } from "antd";
import { useState, useEffect } from "react"
import {
  DashboardOutlined,
  FileSearchOutlined,
  ExclamationOutlined,
  MonitorOutlined,
} from "@ant-design/icons";
import NumberCard from "./card";
import TableWkn from "./tableWkn";
import TableDomain from "./tableDomain";
import { Link } from "react-router-dom"
import VulsByDate from "./vulsByDate"
import config from "../../../config"
const axios = require("axios").default;



const Content_ = () => {
  let seconds = Math.floor(Date.now() / 1000);
  console.log(seconds)

  const [time, setTime] = useState({
    timeStart: seconds - 604800,
    timeEnd: seconds,
  })

  const [overview, setOverview] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(time);
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
        `tasks/vulns/overviews?timeStart=${params.timeStart}&timeEnd=${params.timeEnd}`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
          console.log(res)
        setOverview(res.data.overviews.overview);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // window.location = "/signin";
        // return false;
      });
  };


  return (
    <div style={{ marginRight: "10px", marginLeft: "20px" }}>
      <div style={{ marginTop: "20px" }}>
        <Row>
          <Col span={24}>
            <DashboardOutlined /> Dashboard /{" "}
          </Col>
        </Row>
      </div>
      <Divider orientation="left">Tổng hợp</Divider>
      <Row gutter={[48, 16]} justify="center">
        <Col span={7}>
          <NumberCard
            icon={<FileSearchOutlined />}
            color="blue"
            title="Tổng domain"
            backgroundColor="#b380ff"
            loading={loading}
            number={overview.numberTargets}
            ></NumberCard>
        </Col>
        <Col span={7}>
          <NumberCard
            icon={<ExclamationOutlined />}
            color="red"
            title="Lỗ hổng"
            backgroundColor="#0099ff"
            loading={loading}
            number={overview.severity}
          ></NumberCard>
        </Col>
        <Col span={7}>
          <NumberCard
            icon={<MonitorOutlined />}
            color="red"
            title="Domain chưa rà soát"
            backgroundColor="#66ff66"
            loading={loading}
            number={overview.notScantargets}
          ></NumberCard>
        </Col>
      </Row>

      <Divider orientation="left">Thống kê lỗ hổng</Divider>
      <VulsByDate time={time}/>

      <Divider orientation="left">Thống kê chi tiết</Divider>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Row style={{ marginBottom: "20px" }}>
            <Col span={12}>
              {" "}
              <h3>
                <strong>Theo domain</strong>
              </h3>
            </Col>
            <Col span={12}>
              <div style={{ float: "right" }}>
              <Link to="/weakness">Xem chi tiết</Link>
              </div>
            </Col>
          </Row>
          <TableDomain time={time}></TableDomain>
        </Col>
        <Col span={12}>
          <Row style={{ marginBottom: "20px" }}>
            <Col span={12}>
              <h3>
                <strong>Theo lỗ hổng</strong>
              </h3>
            </Col>
            <Col span={12}>
              <div style={{ float: "right" }}>
                <Link to="/weakness">Xem chi tiết</Link>
              </div>
            </Col>
          </Row>
          <TableWkn time={time}></TableWkn>
        </Col>
      </Row>
    </div>
  );
};

export default Content_;

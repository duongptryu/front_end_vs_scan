// import "antd/dist/antd.css";
import { Row, Col, Divider } from "antd";
import { useState } from "react"
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



const Content_ = () => {
  const [time, setTime] = useState({
    timeStart: "161755384",
    timeEnd: "1618590699",
  })
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
        <Col span={6}>
          <NumberCard
            icon={<FileSearchOutlined />}
            color="blue"
            title="Tổng số domain rà quét"
            backgroundColor="#b380ff"
            ></NumberCard>
        </Col>
        <Col span={6}>
          <NumberCard
            icon={<ExclamationOutlined />}
            color="red"
            title="Tổng số lỗ hổng"
            backgroundColor="#0099ff"
          ></NumberCard>
        </Col>
        <Col span={6}>
          <NumberCard
            icon={<MonitorOutlined />}
            color="red"
            title="Các IP chưa rà quét"
            backgroundColor="#66ff66"
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
                <strong>Theo điểm yếu</strong>
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

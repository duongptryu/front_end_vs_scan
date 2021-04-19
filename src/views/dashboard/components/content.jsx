// import "antd/dist/antd.css";
import { Row, Col, Divider, DatePicker, Space } from "antd";
import { BulbOutlined, DashboardOutlined } from "@ant-design/icons";
import NumberCard from "./card";
import TableWkn from "./tableWkn";
import TableDomain from "./tableDomain";

const { RangePicker } = DatePicker;

const Content_ = () => {
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
            icon={<BulbOutlined />}
            color="blue"
            title="Test"
          ></NumberCard>
        </Col>
        <Col span={6}>
          <NumberCard
            icon={<BulbOutlined />}
            color="blue"
            title="Test"
          ></NumberCard>
        </Col>
        <Col span={6}>
          <NumberCard
            icon={<BulbOutlined />}
            color="red"
            title="Test"
          ></NumberCard>
        </Col>
      </Row>

      <Divider orientation="left">Thống kê lỗ hổng</Divider>
      <Row>
        <Col span={24}>
          <div
            style={{ float: "right", marginRight: "10%", marginBottom: "20px" }}
          >
            <Space direction="vertical" size={150}>
              <RangePicker />
            </Space>
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 48]}>
        <Col span={6}>
          <NumberCard
            icon={<BulbOutlined />}
            color="blue"
            title="Test"
          ></NumberCard>
        </Col>
        <Col span={6}>
          <NumberCard
            icon={<BulbOutlined />}
            color="blue"
            title="Test"
          ></NumberCard>
        </Col>
        <Col span={6}>
          <NumberCard
            icon={<BulbOutlined />}
            color="blue"
            title="Test"
          ></NumberCard>
        </Col>
        <Col span={6}>
          <NumberCard
            icon={<BulbOutlined />}
            color="blue"
            title="Test"
          ></NumberCard>
        </Col>
      </Row>

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
                <a>Xem chi tiết</a>
              </div>
            </Col>
          </Row>
          <TableDomain></TableDomain>
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
                <a>Xem chi tiết</a>
              </div>
            </Col>
          </Row>
          <TableWkn></TableWkn>
        </Col>
      </Row>
    </div>
  );
};

export default Content_;

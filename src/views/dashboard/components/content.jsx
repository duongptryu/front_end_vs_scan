// import "antd/dist/antd.css";
import { Row, Col, Divider, DatePicker, Space } from "antd";
import { BulbOutlined } from "@ant-design/icons";
import NumberCard from "./card";

const { RangePicker } = DatePicker;

const Content_ = () => {
  return (
    <div style={{ marginRight: "10px", marginLeft: "20px" }}>
      <Row>
        <Col span={24}>This is the title</Col>
      </Row>
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
          <div style={{ float: "right", marginRight: "10%" }}>
            <Space direction="vertical" size={50}>
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
          <Row>
            <Col span={12}>Theo domain</Col>
            <Col span={12}>Xem chi tiết</Col>
          </Row>
          Table 1
        </Col>
        <Col span={12}>
          <Row>
            <Col span={12}>Theo điểm yếu</Col>
            <Col span={12}>Xem chi tiết</Col>
          </Row>
          Table 2
        </Col>
      </Row>
    </div>
  );
};

export default Content_;

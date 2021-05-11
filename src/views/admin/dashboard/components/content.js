import { Row, Col, Divider } from "antd";
import NumberCard from "../../../dashboard/components/card";
import {useState} from "react"
import {
    UserOutlined,
    PushpinOutlined,
    ExclamationOutlined 
  } from "@ant-design/icons";

const Content_ = () => {
    const [loading, setLoading]  = useState(false)
  return (
    <div
      style={{
        marginRight: "10px",
        marginLeft: "20px",
        height: "80vh",
        marginTop: "25px",
      }}
    >
      <div>
        <Row>
          <Col span={12}>
            <h1 style={{fontSize:"50px"}}>Dashboard</h1>
          </Col>
        </Row>
      </div>
      <Divider></Divider>
      <div style={{marginTop:"10%"}}>
        <Row justify="space-around">
          <Col span={7}>
            <NumberCard
            icon={<UserOutlined />}
              color="blue"
              title="Tổng số người dùng"
              backgroundColor="#b380ff"
              loading={loading}
              number={12}
            ></NumberCard>
          </Col>
          <Col span={7}>
            <NumberCard
              color="red"
              icon={<PushpinOutlined />}
              title="Tổng số domain"
              backgroundColor="#0099ff"
              loading={loading}
              number={12}
            ></NumberCard>
          </Col>
          <Col span={7}>
            <NumberCard
              color="red"
              icon={<ExclamationOutlined />}
              title="Tổng số lỗ hổng"
              backgroundColor="#66ff66"
              loading={loading}
              number={12}
            ></NumberCard>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Content_;

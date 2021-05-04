import {
  Row,
  Col,
  Input,
  Typography,
  Space,
  notification,
  Divider,
  Spin,
} from "antd";
import { useState, useEffect } from "react";
import config from "../../../config";
const axios = require("axios").default;

const { Search } = Input;
const { Title } = Typography;

const VulDetail = (props) => {
  const [dataVuls, setDataVuls] = useState({});
  const [effectedDomain, setEffectedDomain] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch();
  }, []);

  const fetch = (params = {}) => {
    setLoading(true)
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
        `tasks/vulns/detail?pluginId=${props.id}`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setLoading(false)
        if (res.data.status_code == 1) {
          setDataVuls(res.data.vulnDetails.pluginInfo);
          setEffectedDomain(res.data.vulnDetails.outputs);
        } else {
          setDataVuls({});
          setEffectedDomain([]);
          notification.open({
            message: "Thông báo lỗi",
            description: "Không có dữ liệu",
          });
        }
      })
      .catch((err) => {
        setLoading(false)
        setDataVuls({});
        setEffectedDomain([]);
        notification.open({
          message: "Thông báo lỗi",
          description: "Vui lòng thử lại sau",
        });
      });
  };

  return (
    <div>
      <Spin spinning={loading}>
        <Row>
          <Col span={16}></Col>
          <Col span={8}>
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
            />
          </Col>
        </Row>
        <Row>
          <Divider orientation="left">Thông tin lỗ hổng</Divider>
        </Row>
        <Row style={{ marginBottom: "20px" }}>
          <Space direction="vertical">
            <Title level={5}>
              <b>Tên: </b> {dataVuls.pluginName}
            </Title>
            <Title level={5}>
              <b>Mức độ: </b>
              {dataVuls.risk}
            </Title>
            <Title level={5}>
              <b>Cwe: </b>
              {dataVuls.cweId}
            </Title>
            <Title level={5}>
              <b>Mô tả: </b>
              {dataVuls.description}
            </Title>
            <Title level={5}>
              <b>Giải pháp: </b>
              {dataVuls.solution}
            </Title>
            <Title level={5}>
              <b>Tham khảo: </b>
              <a href={dataVuls.reference}>{dataVuls.reference}</a>
            </Title>
            <br />
          </Space>
          <Divider orientation="left">Các điểm bị ảnh hưởng</Divider>
          {effectedDomain.map((target) => {
            return (
              <div>
                <Space direction="vertical">
                  <h3>
                    <b>Endpoint:</b> {target.url}{" "}
                  </h3>
                  <h3>
                    <b>Param:</b> {target.param}
                  </h3>
                  <h3>
                    <b>Attack: </b>
                    {target.attack}
                  </h3>
                  <h3>
                    <b>Độ chính xác:</b> {target.confidence}
                  </h3>
                </Space>
                <Divider />
              </div>
            );
          })}
        </Row>
      </Spin>
    </div>
  );
};

export default VulDetail;

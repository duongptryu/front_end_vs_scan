// import "antd/dist/antd.css";
import {
  Row,
  Col,
  Layout,
  Space,
  Button,
  Input,
  notification,
  Spin,
} from "antd";
import "../../dashboard/index.css";
import { TableOutlined } from "@ant-design/icons";
import TableVulns from "./tableVulns";
import Detail from "./detail";
import { useState } from "react";
import TableHistory from "./tableHistory";
import config from "../../../config";
const axios = require("axios").default;

const { Content } = Layout;
const { Search } = Input;

const ContentDomain = (props) => {
  const [table, setTable] = useState("TableVuln");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  
  const startScan = () => {
    setLoading(true);
    

    const token = localStorage.getItem("accessToken");
    if (token == null || token == "") {
      window.location = "/signin";
      return false;
    }

    axios({
      method: "POST",
      url: config.API_URL + config.API_VR + "tasks/scan/start",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: {
        targetIds: [props.id],
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.targetIds.length == 0) {
          setLoading(false);
          notification.open({
            message: "Thông báo lỗi",
            description: "Không thành công, vui lòng thử lại sau",
          });
          return false;
        } else {
          notification.open({
            message: "Thông báo",
            description: "Hệ thống đang quét, vui lòng đợi trong giây lát",
          });
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        notification.open({
          message: "Thông báo",
          description: "Không thành công",
        });
        setLoading(false);
      });
  };


  return (
    <div style={{ marginRight: "10px", marginLeft: "20px" }}>
      <Spin spinning={loading}>
        <div style={{ marginTop: "20px" }}>
          <Row>
            <Col span={24}>
              <TableOutlined /> Quản lý domain / Thông tin chi tiết{" "}
            </Col>
          </Row>
        </div>

        <Content
          style={{
            marginTop: "20px",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <Row>
              <Col span={12}>
                <h1>Thống kê lỗ hổng</h1>
              </Col>
            </Row>
            <Row style={{ marginBottom: "20px" }}>
              <Button
                size="medium"
                style={{ backgroundColor: "#36d413", color: "white" }}
                type="ghost"
                onClick={startScan}
              >
                Scan
              </Button>
            </Row>
            <Row>
              <Col span={8}>
                <Space>
                  <Button
                    size="medium"
                    type={table == "TableVuln" && "primary"}
                    onClick={() => {
                      setTable("TableVuln");
                    }}
                  >
                    Danh sách lỗ hổng
                  </Button>
                  <Button
                    size="medium"
                    type={table == "TableHistory" && "primary"}
                    onClick={() => {
                      setTable("TableHistory");
                    }}
                  >
                    Lịch sử
                  </Button>
                </Space>
              </Col>
            </Row>
          </div>
          <Row>
            <Col span={15} style={{ marginRight: "100px" }}>
              {table == "TableVuln" && <TableVulns data={data}></TableVulns>}
              {table == "TableHistory" && <TableHistory></TableHistory>}
            </Col>
            <Col span={6}>
              <Detail></Detail>
            </Col>
          </Row>
        </Content>
      </Spin>
    </div>
  );
};

export default ContentDomain;

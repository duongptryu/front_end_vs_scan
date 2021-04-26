// import "antd/dist/antd.css";
import { Row, Col, Layout, Space, Button, Input, notification } from "antd";
import "../../dashboard/index.css";
import { TableOutlined } from "@ant-design/icons";
import TableVulns from "./tableVulns";
import Detail from "./detail";
import { useState } from "react";
import TableHistory from "./tableHistory";
const axios = require("axios").default;

const { Content } = Layout;
const { Search } = Input;

const ContentDomain = () => {
  const [table, setTable] = useState("TableVuln");

  return (
    <div style={{ marginRight: "10px", marginLeft: "20px" }}>
      <div style={{ marginTop: "20px" }}>
        <Row>
          <Col span={24}>
            <TableOutlined /> Quản lý domain / Thông tin chi tiết{" "}
          </Col>
        </Row>
      </div>

      <Content
        style={{ marginTop: "20px", backgroundColor: "white", padding: "20px" }}
      >
        <div style={{ marginBottom: "20px" }}>
          <Row>
            <Col span={12}>
              <h1>Thống kê lỗ hổng</h1>
            </Col>
            <Col span={8}>
              <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "20px" }}>
            <Button
              size="medium"
              style={{ backgroundColor: "#36d413", color: "white" }}
              type="ghost"
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
                  Danh sách điểm yếu
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
            {table == "TableVuln" && <TableVulns></TableVulns>}
            {table == "TableHistory" && <TableHistory></TableHistory>}
          </Col>
          <Col span={6}>
            <Detail></Detail>
          </Col>
        </Row>
      </Content>
    </div>
  );
};

export default ContentDomain;

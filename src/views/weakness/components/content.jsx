// import "antd/dist/antd.css";
import {
  Row,
  Col,
  Layout,
  Space,
  Button,
  Input,
  DatePicker,
} from "antd";
import { useEffect, useState } from "react";
import "../../dashboard/index.css";
import {
  PlusOutlined,
  TableOutlined,
} from "@ant-design/icons";
import TableDomain from "./table_domain";
import TableWkn from "./table_weakness"

const { Content } = Layout;
const { Search } = Input;

const { RangePicker } = DatePicker;

const Content_ = () => {

    const [table, setTable] = useState("TableDomain")

  return (
    <div style={{ marginRight: "10px", marginLeft: "20px", height:"85vh" }}>
      <div style={{ marginTop: "20px" }}>
        <Row>
          <Col span={24}>
            <TableOutlined /> Quản lý lỗ hổng /{" "}
          </Col>
        </Row>
      </div>

      <Content
        style={{ marginTop: "20px", backgroundColor: "white", padding: "20px" }}
      >
        <div style={{ marginBottom: "20px" }}>
          <h1>Thống kê lỗ hổng</h1>
          <Row>
            <Col span={8}>
              <Space>
                <Button
                  size="medium"
                  type={ table == "TableDomain" && "primary"}
                  onClick = {() => {
                    setTable("TableDomain")
                  }}
                >
                  Theo domain
                </Button>
                <Button
                  size="medium"
                  type={ table == "TableWkn" && "primary"}
                  onClick = {() => {
                    setTable("TableWkn")
                  }}
                >
                  Theo lỗ hổng
                </Button>
              </Space>
            </Col>
          </Row>
        </div>
        {table == "TableDomain" && (
             <TableDomain></TableDomain>
        )}
       {table == "TableWkn" && (
             <TableWkn></TableWkn>
        )}
      </Content>
    </div>
  );
};

export default Content_;

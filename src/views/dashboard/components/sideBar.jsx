import Logo from "../../../assets/img/logo.png";
import "antd/dist/antd.css";
import { Layout, Menu, Image } from "antd";
import {
  UserOutlined,
  SecurityScanOutlined,
  TableOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const SideBar = () => {
  return (
    <>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        width="15%"
      >
        <div className="logo">
          <a>
            <Image width={280} src={Logo} />
          </a>
        </div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<TableOutlined />}>
            <Link to="/weakness">Quản lý lỗ hổng</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<TableOutlined />}>
            <Link to="/domain">Quản lý domain</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<SecurityScanOutlined />}>
            <Link to="/proxy-notfound">0-Day Checking</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<UserOutlined />}>
            <Link to="/user/me">Tài khoản</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default SideBar;

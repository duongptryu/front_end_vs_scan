import Logo from "../../../../assets/img/logo.png";
import "antd/dist/antd.css";
import { Layout, Menu, Image } from "antd";
import {
  UserOutlined,
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
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
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
            <Link to="/admin/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<TableOutlined />}>
            <Link to="/admin/plugin">Quản lý plugin</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<TableOutlined />}>
            <Link to="/admin/cve">Quản lý CVE</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<TableOutlined />}>
            <Link to="/admin/users">Quản lý người dùng</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<TableOutlined />}>
            <Link to="/user/me">Tài khoản</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default SideBar;

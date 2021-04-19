import { Menu, Layout, Avatar, Popover, Badge, List } from "antd";
import {Fragment} from "react"
import {
  BellOutlined,
  RightOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
const { Header } = Layout;
const { SubMenu } = Menu

const Header_ = () => {
  const leftSide = [
    <h1>VSCANNER</h1>
  ]

  const rightContent = [
    <Menu key="user" mode="horizontal">
      <SubMenu
        title={
          <Fragment>
            <span style={{marginRight: 4 }}>
              Hi,
            </span>
            <span>Duong</span>
            <Avatar style={{ marginLeft: 8 }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Kk79LFjTf_Ypx8aaJkRtJHQ_zU6_P1_L6w&usqp=CAU" />
          </Fragment>
        }
      >
        <Menu.Item key="SignOut">
          Sign out
        </Menu.Item>
      </SubMenu>
    </Menu>,
  ]

  return (
      <Header
        className="site-layout-sub-header-background"
        style={{ padding: 0, borderBottom:"solid gray 2px", height: "8vh" }}
      >

        <div style={{position:"absolute", marginLeft:"5%", marginTop:"10px"}}>{leftSide}</div>

        <div style={{float:"right", marginRight:"5px", padding:"0 0 0 0"}}>{rightContent}</div>
      </Header>
      
  );
};

export default Header_;

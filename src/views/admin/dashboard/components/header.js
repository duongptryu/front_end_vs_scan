import { Menu, Layout, Avatar, Popover, Badge, List } from "antd";
import { useState, useEffect} from "react"
import {Fragment} from "react"
import {
  BellOutlined,
  RightOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons'
import config from "../../../../config";

const axios = require("axios").default;

const { Header } = Layout;
const { SubMenu } = Menu

const Header_ = () => {
  const leftSide = [
    <h1>VSCANNER</h1>
  ]

  const [user, setUser] = useState({name:"unknown"})

  useEffect(() => {
    getUser()
  },[])

  const getUser = () => {
    const token = localStorage.getItem("accessToken");
    if (token == null || token == "") {
      return false;
    }
    axios({
      method: "GET",
      url: config.API_URL + config.API_VR + "tasks/admin/profile",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        console.log(res)
        setUser({name:res.data.userInfo.fullName})
      })
      .catch((err) => {
        window.location = "/signin"
        return false;
      });
  };

  const logOut = () => {
    setUser({})
    localStorage.removeItem("accessToken")
    localStorage.removeItem("role")
    window.location = "/"
  }

  const rightContent = [
    <Menu key="user" mode="horizontal">
      <SubMenu
        title={
          <Fragment>
            
            <span style={{marginRight: 4 }}>
              Hi,
            </span>
            <span onClick={() => {window.location = "/user/me"}}>{user.name}</span>
            <Avatar style={{ marginLeft: 8 }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Kk79LFjTf_Ypx8aaJkRtJHQ_zU6_P1_L6w&usqp=CAU" />
          </Fragment>
        }
      >
        <Menu.Item key="SignOut" onClick={logOut}>
          Sign out
        </Menu.Item>
      </SubMenu>
    </Menu>,
  ]

  return (
      <Header
        className="site-layout-sub-header-background"
        style={{ padding: 0, borderBottom:"solid gray 2px", height: "12vh" }}
      >

        <div style={{position:"absolute", marginLeft:"5%", marginTop:"10px"}}>{leftSide}</div>

        <div style={{float:"right", marginRight:"5px", padding:"0 0 0 0"}}>{rightContent}</div>
      </Header>
      
  );
};

export default Header_;

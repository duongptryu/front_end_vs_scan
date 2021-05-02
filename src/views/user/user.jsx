import { Layout, notification, Spin } from "antd";
import SideBar from "../dashboard/components/sideBar";
import Header_ from "../dashboard/components/header";
import Footer_ from "../dashboard/components/footer";
import { Redirect } from "react-router-dom";
import ContentUser from "./components/content";
import { useEffect, useState } from "react";
import config from "../../config";
const axios = require("axios").default;

const User = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Trang cá nhân";
    getUser();
  }, []);

  const getUser = () => {
    const token = localStorage.getItem("accessToken");
    if (token == null || !token) {
      window.location = "/signin"
    }
    setLoading(true);
    axios({
      method: "GET",
      url: config.API_URL + config.API_VR + `tasks/user/profile`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setLoading(false);
        console.log(res);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err)
        setLoading(false);
        // console.log(err.response.status);
        if (err.response.status == 401) {
          window.location = "/signin";
        } else {
          notification.open({
            message: "Thông báo lỗi",
            description: err.response.data,
          });
        }
      });
  };

  return (
    <div>
      <Layout>
        <SideBar></SideBar>
        <Layout style={{ marginLeft: "15%" }}>
          <Header_></Header_>
          <Spin spinning={loading}>
            <ContentUser user={user}></ContentUser>
          </Spin>
          <Footer_></Footer_>
        </Layout>
      </Layout>
    </div>
  );
};

export default User;

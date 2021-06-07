import { Layout, notification, Spin } from "antd";
import SideBar from "../dashboard/components/sidebar";
import Header_ from "../dashboard/components/header";
import Footer_ from "../dashboard/components/footer";
import { Redirect } from "react-router-dom";
import Content_ from "./components/content"
// import { useEffect, useState } from "react";
// import config from "../../config";
// const axios = require("axios").default;

const AdminPlugin = () => {
  const role = localStorage.getItem("role")
  if (role != 0) {
    return window.location = "/"
  }else {
    return (
      <div>
      <Layout>
        <SideBar></SideBar>
        <Layout style={{ marginLeft: "15%" }}>
          <Header_></Header_>
          <Content_></Content_>
          <Footer_></Footer_>
        </Layout>
      </Layout>
    </div>
  );
}
};

export default AdminPlugin;

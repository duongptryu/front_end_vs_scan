import { Layout, notification, Spin } from "antd";
import SideBar from "./components/sidebar";
import Header_ from "./components/header";
import Footer_ from "./components/footer";
import { Redirect } from "react-router-dom";
import Content_ from "./components/content"
// import { useEffect, useState } from "react";
// import config from "../../config";
// const axios = require("axios").default;

const AdminDashboard = () => {
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

export default AdminDashboard;

import "antd/dist/antd.css";
import { Layout } from "antd";
import SideBar from "./components/sideBar";
import Header_ from "./components/header";
import Footer_ from "./components/footer";
import Content_ from "./components/content";
import "./index.css";
import { Redirect } from "react-router-dom";
import UserContext from "../../contexts/user/userContext";
import { useContext, useEffect, useState } from "react";
import config from "../../config"

const axios = require("axios").default;




const DashBoard = () => {
  useEffect(() => {
    document.title = "Dashboard"
  },[])

  const token = localStorage.getItem("accessToken")
  if(token == null || !token){
    return <Redirect to="/signin"/>
  }

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
};

export default DashBoard;

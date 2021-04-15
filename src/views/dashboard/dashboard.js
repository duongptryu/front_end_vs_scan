import "antd/dist/antd.css";
import { Layout } from "antd";
import SideBar from "./components/sideBar";
import Header_ from "./components/header";
import Footer_ from "./components/footer";
import Content_ from "./components/content";
import "./index.css"

const DashBoard = () => {
  return (
    <div>
      <Layout>
        <SideBar></SideBar>
        <Layout>
          <Header_></Header_>
          <Content_></Content_>
          <Footer_></Footer_>
        </Layout>
      </Layout>
    </div>
  );
};

export default DashBoard;

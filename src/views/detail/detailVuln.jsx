import { Layout } from "antd";
import SideBar from "../dashboard/components/sideBar";
import Header_ from "../dashboard/components/header";
import Footer_ from "../dashboard/components/footer";
import  { Redirect } from 'react-router-dom'

const DetailVuln = () => {
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
          <Footer_></Footer_>
        </Layout>
      </Layout>
    </div>
  );
};

export default DetailVuln;

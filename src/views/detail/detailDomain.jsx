import { Layout } from "antd";
import SideBar from "../dashboard/components/sideBar";
import Header_ from "../dashboard/components/header";
import Footer_ from "../dashboard/components/footer";
import ContentDomain from "./components/contentDomain";
import { Redirect, useParams } from "react-router-dom";
import detailDomainContext from "../../contexts/detailDomain/detailDomainContext"


const DetailDomain = () => {
  let { id, time } = useParams();
  const token = localStorage.getItem("accessToken");
  if (token == null || !token) {
    return <Redirect to="/signin" />;
  }

  return (
    <div>
      <Layout>
        <SideBar></SideBar>
        <Layout style={{ marginLeft: "15%" }}>
          <Header_></Header_>
          <detailDomainContext.Provider value={{id, time}}>
            <ContentDomain id={id} time={time}></ContentDomain>
          </detailDomainContext.Provider>
          <Footer_></Footer_>
        </Layout>
      </Layout>
    </div>
  );
};

export default DetailDomain;

import { Layout, Row, Col, Button } from "antd";
import SideBar from "../dashboard/components/sideBar";
import Header_ from "../dashboard/components/header";
import Footer_ from "../dashboard/components/footer";
import { Redirect, useParams } from "react-router-dom";
import VulDetail from "./components/vulDetail";
import Detail from "./components/detail";
import RightSide from "./components/rightSide"
import detailDomainContext from "../../contexts/detailDomain/detailDomainContext"

const DetailVuln = () => {
  let { vulnID, id } = useParams();
  console.log(vulnID)
  const token = localStorage.getItem("accessToken");
  if (token == null || !token) {
    return <Redirect to="/signin" />;
  }

  const { Content } = Layout;
  return (
    <div>
      <Layout>
        <SideBar></SideBar>
        <Layout style={{ marginLeft: "15%" }}>
          <Header_></Header_>
          <div style={{ marginRight: "10px", marginLeft: "20px" }}>
            <div style={{ marginTop: "20px" }}>
              <Row>
                <Col span={24}>Quản lý domain / Thông tin chi tiết </Col>
              </Row>
            </div>

            <Content
              style={{
                marginTop: "20px",
                backgroundColor: "white",
                padding: "20px",
              }}
            >
              <div style={{ marginBottom: "20px" }}>
                <Row>
                  <Col span={16}>
                    <VulDetail id={vulnID}></VulDetail>
                  </Col>
                  <Col span={7} style={{ marginLeft: "20px" }}>
                    {id && (
                      <detailDomainContext.Provider value={{ id }}>
                        <Detail></Detail>
                      </detailDomainContext.Provider>
                    )}
                    {
                      id==undefined && (<RightSide/>)
                    }
                  </Col>
                </Row>
              </div>
            </Content>
          </div>
          <Footer_></Footer_>
        </Layout>
      </Layout>
    </div>
  );
};

export default DetailVuln;

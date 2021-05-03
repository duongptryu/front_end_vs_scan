import { useEffect, useState } from "react";
import { Navigation } from "../../components/navigation";
import BodySignIn from "./components/body";
import config from "../../config";
import { Spin } from "antd";

const axios = require("axios").default;

const data = {
  title: "V SCANNER",
  paragraph: "Hệ thống cảnh báo điểm yếu và rà soát lỗ hổng bảo mật tự động",
};

const SignIn = () => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = "Đăng nhập";
    checkUser();
  },[]);

  const checkUser = () => {
    const token = localStorage.getItem("accessToken");
    if (token == null || token == "") {
      return false;
    }
    setLoading(true)
    axios({
      method: "GET",
      url: config.API_URL + config.API_VR + "tasks/user/profile",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        window.location = "/dashboard";
        return false;
      })
      .catch((err) => {
        setLoading(false)
        return false;
      });
  };

  return (
    <Spin spinning={false}>
      <div>
        <Navigation></Navigation>
        <BodySignIn data={data}></BodySignIn>
      </div>
    </Spin>
  );
};

export default SignIn;

import { Navigation } from "../../components/navigation";
import BodySignUp from "./components/body";
import { useEffect, useState } from "react";
import config from "../../config";
import { Spin } from "antd";

const axios = require("axios").default;

const data = {
  title: "V SCANNER",
  paragraph: "Hệ thống cảnh báo điểm yếu và rà soát lỗ hổng bảo mật tự động",
};

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Đăng ký";
    checkUser();
  });

  const checkUser = () => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (token == null || token == "") {
      return false;
    }
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
        console.log(res);
        window.location = "/dashboard";
        return false;
      })
      .catch((err) => {
        setLoading(false);
        return false;
      });
  };

  return (
    <Spin spinning={loading}>
      <div>
        <Navigation style={{ zIndex: 0 }}></Navigation>
        <BodySignUp data={data}></BodySignUp>
      </div>
    </Spin>
  );
};

export default SignUp;

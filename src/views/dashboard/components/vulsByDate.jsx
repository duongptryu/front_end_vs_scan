import { Row, Col, Space, DatePicker } from "antd";
import {
  WarningOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import NumberCard from "./card";
import { useEffect, useState } from "react";
import config from "../../../config";
import moment from "moment";
const axios = require("axios").default;

const { RangePicker } = DatePicker;

const dateFormat = "YYYY/MM/DD";

const VulsByDate = (props) => {
  const [time, setTime] = useState({
    timeStart: props.time.timeStart,
    timeEnd: props.time.timeEnd,
  });
  const [overview, setOverview] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(time);
  }, []);


  const convertDate = (second) => {
    var curdate = new Date(null);
    curdate.setTime(second*1000);
    let x = curdate.toLocaleString().split(",")[0]
    const x_split = x.split("/")
    return x_split[2] + "/" + x_split[0] + "/" + x_split[1];
  }

  const fetch = (params = {}) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (token == null || token == "") {
      window.location = "/signin";
      return false;
    }

    axios({
      method: "GET",
      url:
        config.API_URL +
        config.API_VR +
        `tasks/vulns/overviews?timeStart=${params.timeStart}&timeEnd=${params.timeEnd}`,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setOverview(res.data.overviews.overview);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // window.location = "/signin";
        // return false;
      });
  };

  return (
    <div>
      <Row>
        {/* <Col span={24}>
          <div
            style={{ float: "right", marginRight: "10%", marginBottom: "20px" }}
          >
            <Space direction="vertical" size={150}>
              <RangePicker
                defaultValue={[
                  moment(convertDate(time.timeStart), dateFormat),
                  moment(convertDate(time.timeEnd), dateFormat),
                ]}
                format={dateFormat}
              />
            </Space>
          </div>
        </Col> */}
      </Row>
      <Row gutter={[16, 48]}>
        <Col span={6}>
          <NumberCard
            icon={<WarningOutlined />}
            color="blue"
            title="Cao"
            backgroundColor={config.HIGH}
            number={overview.high}
            loading={loading}
          ></NumberCard>
        </Col>
        <Col span={6}>
          <NumberCard
            icon={<ExclamationCircleOutlined />}
            color="blue"
            title="Trung bình"
            backgroundColor={config.MEDIUM}
            number={overview.medium}
            loading={loading}
          ></NumberCard>
        </Col>
        <Col span={6}>
          <NumberCard
            icon={<MinusCircleOutlined />}
            color="blue"
            title="Thấp"
            backgroundColor={config.LOW}
            number={overview.low}
            loading={loading}
          ></NumberCard>
        </Col>
        <Col span={6}>
          <NumberCard
            icon={<QuestionCircleOutlined />}
            color="blue"
            title="Thông tin"
            backgroundColor={config.INFO}
            number={overview.info}
            loading={loading}
          ></NumberCard>
        </Col>
      </Row>
    </div>
  );
};

export default VulsByDate;

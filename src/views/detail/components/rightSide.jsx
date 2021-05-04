import { Space, Typography, notification } from "antd"

import { useState, useEffect,useContext } from "react";
import config from "../../../config";
const axios = require("axios").default;

const { Title } = Typography

const RightSide = (props) => {
    const [count, setCount] = useState({});
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetch();
    }, []);

    const fetch = (params = {}) => {
        setLoading(true)
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
                `tasks/vulns/detail?pluginId=${props.id}`,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        })
            .then((res) => {
                console.log(res)
                setLoading(false)
                if (res.data.status_code == 1) {
                    setCount(res.data.vulnDetails.count);
                } else {
                    setCount({});
                    notification.open({
                        message: "Thông báo lỗi",
                        description: "Không có dữ liệu",
                    });
                }
            })
            .catch((err) => {
                setLoading(false)
                setCount({});
                notification.open({
                    message: "Thông báo lỗi",
                    description: "Vui lòng thử lại sau",
                });
            });
    };

    return (
        <div>
            <Space direction="vertical">
                <Title level={1}>Thông tin chi tiết</Title>
                <Title level={5}><b>Số domain: </b> {count.numberDomains}</Title>
                <Title level={5}><b>Số endpoint: </b> {count.numberEndpoints}</Title>
            </Space>
        </div>
    )
}

export default RightSide
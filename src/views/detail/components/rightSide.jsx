import {Space, Typography} from "antd"

const {Title} = Typography

const RightSide = () => {
    return (
        <div>
            <Space direction="vertical">
            <Title level={1}>Thông tin chi tiết</Title>
            <Title level={5}><b>Số domain</b></Title>
            <Title level={5}><b>Số endpoint</b></Title>
            </Space>
        </div>
    )
}

export default RightSide
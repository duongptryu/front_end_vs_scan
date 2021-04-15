import { Card } from 'antd'
import { Children } from 'react'
import styles from '../css/numberCard.less'


function NumberCard(props) {
  const { icon, color, title } = props
  return (
    <Card
    hoverable
      bordered={false}
      bodyStyle={{ padding: 35 }}
    >
      <span style={{ color, fontSize:"54px", float: "left" }}>
        {icon}
      </span>
      <div style={{ width: "100%", paddingLeft:"78px"}}>
        <p style={{ lineHeight: "16px", fontSize:"16px", marginBottom:"8px", height:"16px"}}>{title || 'No Title'}</p>
        <p style={{ lineHeight: "32px", fontSize:"24px", marginBottom:"0px", height:"32px"}}>
          1000
        </p>
      </div>
    </Card>
  )
}

export default NumberCard
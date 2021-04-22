import { Card } from 'antd'
import { Children } from 'react'
import styles from '../css/numberCard.less'


function NumberCard(props) {
  const { icon, color, title, backgroundColor, loading, number } = props
  return (
    <Card
    hoverable
      bordered={false}
      bodyStyle={{ padding: 50, height:"170px", backgroundColor:backgroundColor }}
      loading={loading}
    >
      <span style={{ color:"white", fontSize:"54px", float: "left" }}>
        {icon}
      </span>
      <div style={{ width: "100%", paddingLeft:"78px"}}>
        <p style={{ lineHeight: "16px", fontSize:"16px", marginBottom:"8px", height:"16px", color:"white"}}>{title || 'No Title'}</p>
        <p style={{ lineHeight: "32px", fontSize:"24px", marginBottom:"0px", height:"32px", color:"white"}}>
          {number} 
        </p>
      </div>
    </Card>
  )
}

export default NumberCard
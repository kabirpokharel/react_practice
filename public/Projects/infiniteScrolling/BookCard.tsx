import { Card } from 'antd'
import React from 'react'

interface CardType{
  id:number,
  title:string
}

const BookCard = (props:CardType) => {
  const {id,title} = props;
  return (
    <Card style={{ width: 340 }}>
      <h6>{`${id+1}: ${title}`}</h6>
    </Card>
  )
}

export default BookCard;
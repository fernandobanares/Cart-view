import React from 'react'
import { Link } from 'react-router-dom'
import './Item.css'

function Item({ img, name, category, price, stock, id }) {

  return (
    <div className='itemContainer'>
      <img className='itemImg' src={img} alt='Foto de producto'></img>
      <h2 className='itemName'>{name}</h2>
      <p className='itemCategory'>{category}</p>
      <p className='itemPrice'>${price}</p>
      <Link className='itemLink' to={`/detail/${id}`}>Ver Detalle</Link>
      <p className='itemStock'> Stock disponible: {stock} </p>
    </div>
  )
}

export default Item
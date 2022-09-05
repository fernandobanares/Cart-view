import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import "./CartItem.css"

function CartItem({ img, name, price, amount, removeItemCart, id, stock, plusItem, subItem }) {
  return (
    <div className='itemCart-container'>
      <img className='cartImg' src={img} alt={`imagen de: ${name}`}></img>
      <div className='description-container'>
        <h2 className='cartName'>{name}</h2>
        <h3 className='cartAmount'>Cantidad: {amount}</h3>
        <h3 className='cartSubtotal'> Subtotal: ${price}</h3>
        <h3 className='cartStock'>Stock Disponible: {stock}</h3>
        <h3 className='cartQuestion'>¿Desea agregar/quitar productos?</h3>
        <div className="buttonsContaier">
          <button className='products-buttons' onClick={() => subItem(id)}>-</button>
          <h2>{amount}</h2>
          <button className='products-buttons' onClick={() => plusItem(id)}>+</button>
        </div>
        <FontAwesomeIcon className='cartDeleteItem' onClick={() => removeItemCart(id)} icon={faTrashCan}></FontAwesomeIcon>
      </div>
    </div>
  )
}

export default CartItem
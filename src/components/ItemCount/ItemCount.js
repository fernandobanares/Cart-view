import React, { useState } from 'react'
import "./ItemCount.css"

function ItemCount({ stock, min, onAdd}) {
    const [amount, setAmount] = useState(1)
    function countPlus() {
        if (amount < stock) {
            setAmount(amount + 1)
        }
    }
    function countSub() {
        if (amount > min) {
            setAmount(amount - 1)
        }
    }
    return (
        <div className='count-container'>
            <p className='text-stock'>Elije la Cantidad</p>
            <div className='product-display'>
                <div className='product-amount'>
                    <h2 className='product-buy datail-buy'>{amount}</h2>
                </div>
                <div className='products-buttonPlus'>
                    <button className='product-buttonCount' onClick={countPlus}>+</button>
                </div>
                <div className='products-buttonSub'>
                    <button className='product-buttonCount' onClick={countSub}>-</button>
                </div>
            </div>
            <button onClick={() => onAdd(amount)} className='product-addCart'>Agregar al Carrito</button> 
            
        </div>
    )
}

export default ItemCount
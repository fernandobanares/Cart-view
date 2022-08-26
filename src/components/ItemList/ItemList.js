import React from 'react'
import Item from '../Item/Item'
import './ItemList.css'

function ItemList({ data }) {
    return (
        data.map((product) => {
            return (
                <Item
                    key={product.id}
                    id={product.id}
                    img={product.img}
                    name={product.name}
                    category={product.category}
                    price={product.price}
                    stock ={product.stock}
                />
            )
        })
    )
}

export default ItemList
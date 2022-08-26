import React, { useState } from 'react'
import ItemCount from '../ItemCount/ItemCount'
import './ItemDetail.css'
import { Link } from "react-router-dom"
import { useContext } from "react";
import { cartContext } from "../../store/cartContext";
import Swal from 'sweetalert2' 

function ItemDetail({ data }) {
    const { addToCart } = useContext(cartContext);
    const [countCart, setCountCart] = useState(0)
    function onAdd(amount) {
        addToCart(data, amount);
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: `Has agregado ${amount}, de ${data.name} al carrito`,
            showConfirmButton: false,
            timer: 1500
        })
        // set que tiene en cuenta la cantidad del contador en caso de que sea mayor a 1 cuando agregamos un producto al carrito cambia el boton de agregar al carrito, por ver al carrito.
        setCountCart(amount)
    }

    return (
        <>
            <section className='sectionDetail'>
                <div className='sectionContainer'>
                    <div className='imgContainer'>
                        <img className='detailImg' src={data.img} alt='Foto de remera'></img>
                    </div>
                    <div className='detailContainer'>
                        <h3 className='detailCategory'>{data.category}</h3>
                        <h2 className='detailName'>{data.name}</h2>
                        <p className='detailDescription'>{data.description}</p>
                        <p className='detailPrice'>${data.price}</p>
                        {countCart === 0 ?
                            <ItemCount stock={data.stock} min={1} onAdd={onAdd}/> :
                            <>
                            <ItemCount stock={data.stock} min={1} onAdd={onAdd}/>
                            <Link  className="showCart" to={"/cart"}>Ver Carrito</Link>
                            </>
                            }
                        <p className='detailStock'> Stock disponible: {data.stock} </p>
                        <Link className='link-categoria' to={`/category/${data.category}`}>Volver a Categoría: {data.category}</Link>
                        <Link className='link-inicio' to={"/"}>Volver al inicio</Link>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ItemDetail
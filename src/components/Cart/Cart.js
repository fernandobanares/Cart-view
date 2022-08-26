import CartItem from "../CartItems/CartItem"
import ItemData from "../../data/data";
import { useContext, useEffect } from 'react'
import { cartContext } from '../../store/cartContext';
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown, faFaceSadTear } from '@fortawesome/free-solid-svg-icons'


import "./Cart.css"

function Cart() {
    const { cart, removeItem, removeAll, totalPrice, totalAmount, plusItemsCart, subItemsCart} = useContext(cartContext);
    function removeItemCart(id) {
        removeItem(id)
    }
    function plusItem(id){
        plusItemsCart(id)
    }
    function subItem(id){
        subItemsCart(id)
    }

    useEffect(() => {
        console.log("cambie")
    }, [cart])
    
    if (cart.length === 0) {
        return (
            <main>
                <div className="emptyCartContainer">
                    <div className="titleEmptyContainer">
                        <h1>Carrito Vacío</h1>
                        <FontAwesomeIcon className="emptyCartFace" icon={faFaceSadTear} />
                    </div>
                    <span><FontAwesomeIcon className="emptyCart" icon={faCartArrowDown} /></span>
                    <Link to={"/"}><button className="cartResumeButtons">Ir a Comprar </button></Link>
                </div>
            </main>
        )
    }
    else {
        return (
            <main className="mainCart">
                <section className="sectionCartItem">
                    {cart.map((item, index) => {
                        return (
                            <CartItem
                                key={item.id + item.name}
                                id={index}
                                img={item.img}
                                name={item.name}
                                price={item.price * item.amount}
                                amount={item.amount}
                                stock={ item.stock}
                                plusItem={plusItem}
                                subItem={subItem}
                                removeItemCart={removeItemCart}
                            />
                        )
                    })}
                    <button className="cartDeleteAll" onClick={removeAll}> Vaciar Carrito </button>
                </section>
                <section className="cartResume">
                    <h1 className="titleResume">Resumen del Pedido</h1>
                    <h3 className="resume">Cantidad de Productos: {totalAmount()} x ${ItemData[0].price}</h3>
                    <h3 className="resume">Subtotal: ${totalPrice()}</h3>
                    <h3 className="resume">IVA(21%): ${totalPrice() * 0.19}</h3>
                    <h3 className="resume">Envío: Gratuito</h3>
                    <h2 className="totalResume">Total: $ {totalPrice() * 1.19}</h2>
                    <div className="containerButtonsResume">
                        <Link to={"/"}><button className="cartResumeButtons">Seguir Comprando </button></Link>
                        <Link to={"/checkout"}><button className="cartResumeButtons">Finalizar Compra </button></Link>
                    </div>
                    <img className="paymentResume" src="https://res.cloudinary.com/dveku4pvl/image/upload/v1661110744/mercadopago_logos1_rld5ya.jpg" alt="Medios de Pago"></img>
                </section>
            </main>
        )
    }
}

export default Cart
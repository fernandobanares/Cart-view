import ItemCount from '../ItemCount/ItemCount'
import './ItemDetail.css'
import { Link } from "react-router-dom"
import { useContext } from "react";
import { cartContext } from "../../store/cartContext";

function ItemDetail({ data }) {
    const { cart, addToCart, totalStock } = useContext(cartContext);
    function onAdd(amount) {
        addToCart(data, amount);
    }

    return (
        <>
            <section className='sectionDetail'>
                <div className='sectionContainer'>
                    <div className='imgContainer'>
                        <img className='detailImg' src={data.img} alt='Foto de producto'></img>
                    </div>
                    <div className='detailContainer'>
                        <h3 className='detailCategory'>{data.category}</h3>
                        <h2 className='detailName'>{data.name}</h2>
                        <p className='detailDescription'>{data.description}</p>
                        <p className='detailPrice'>${data.price}</p>
                        {cart.lenght  === 0 ?
                            <ItemCount stock={totalStock(data)} min={1} onAdd={onAdd}/> :
                            <>
                            <ItemCount stock={totalStock(data)} min={1} onAdd={onAdd}/>
                            <Link  className="showCart" to={"/cart"}>Ver Carrito</Link>
                            </>
                            }
                        <p className='detailStock'> Stock disponible: {totalStock(data)} </p>
                        <Link className='link-categoria' to={`/category/${data.category}`}>Volver a Categoría: {data.category}</Link>
                        <Link className='link-inicio' to={"/"}>Volver al inicio</Link>
                    </div>
                </div>
            </section>
        </>
    )
}
export default ItemDetail
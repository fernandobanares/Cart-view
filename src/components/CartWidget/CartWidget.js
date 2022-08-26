import "./CartWidget.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useContext } from "react"
import { cartContext } from "../../store/cartContext";
function CartWidget() {
   const { cart, totalAmount } = useContext(cartContext)
   return (
      <Link to={"/cart"}> <FontAwesomeIcon className="cart-widget" icon={faCartShopping} />
         {cart.length === 0 ?
            <span></span> :
            <span className="totalAmount">{totalAmount()}</span>}
      </Link>
   )
}

export default CartWidget
import "./NavBar.css";
import CartWidget from "../CartWidget/CartWidget";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.jpg"
function NavBar() {
  return (
    <header className='header'>
      <nav className='header-nav'>
        <ul className='nav-ul'>
        <NavLink to ={"/"}><img className="ul-img" alt="imagen Creaciones Janita" src={logo}></img></NavLink>
        <NavLink to={`category/carteras`} className='ul-li'><li>Carteras</li></NavLink>
        <NavLink to={`category/monederos`} className='ul-li'><li>Monederos</li></NavLink>
        <NavLink to={`category/bolsos`} className='ul-li'><li>Bolsos</li></NavLink>
        <NavLink to={`category/neceseres`} className='ul-li'><li>Neceseres</li></NavLink>
        <CartWidget />
      </ul>
    </nav>
    </header >
  )
}
export default NavBar
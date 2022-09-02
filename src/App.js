import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import { CartProvider } from './store/cartContext'
import Checkout from './components/Checkout/Checkout';

import firestoreDB from './services/firebase';

function App() {
  // console.log(firestoreDB)
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path='/' element={<ItemListContainer />}/>
            <Route path='category/:idCategory' element={<ItemListContainer />}/>
            <Route path='detail/:id' element={<ItemDetailContainer />}/>
            <Route path='cart' element={<Cart/>}/>
            <Route path='checkout' element={<Checkout/>}/>
            <Route path='thankyou' element={<h1>Gracias por tu Compra</h1>}/>
            <Route path='*' element={<h1>PAGE NOT FOUND</h1>}/>
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

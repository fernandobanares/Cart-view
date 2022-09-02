import React, { useState } from "react";
import Button from "../Button/Button";
import "../Checkout/Checkout.css"
import { getDocs, collection, addDoc, query, where, writeBatch, documentId } from "firebase/firestore";
import { cartContext } from "../../store/cartContext";
import { useContext }from 'react';
import firestoreDB from "../../services/firebase";
import { Navigate, useNavigate } from 'react-router-dom'

function Checkout() {
  const { cart, totalPrice, clearCart } = useContext(cartContext)
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    telefono: "",
  });

  let navigate = useNavigate()
  const[orderId, setOrderId] = useState(false)


  //Estado orden de compra
  const [orderFirebase, setOrderFirebase] = useState({
    id: '',
    complete: false,
  });

  /* { buyer: { name, phone, email }, items: [{id, title, price}], total  } */

//Información que se va a almacenar en el estado de orden de compra
  const ordenDeCompra = {
    buyer: { ...userData },
    items: [...cart],
    total: totalPrice(),
    date: new Date(),
  };

  //cargar los datos a firebase
  async function handleSubmit(evt) {
    evt.preventDefault();    

    const collectionRef = collection(firestoreDB, "orders");
    const order = await addDoc(collectionRef, ordenDeCompra);
    setOrderFirebase({id: order.id, complete: true});
    clearCart()
    navigate("/thankyou")

    /* Control de Stock . . .  */
   /*  
    const collectionMoviesRef = collection(firestoreDB, "movies");
    const arrayIds = cart.map((item) => item.id);
    const q = query(collectionMoviesRef, where(documentId(), "in", arrayIds));
    let batch = writeBatch(firestoreDB);
    getDocs(q).then((response) => {
      response.docs.forEach((doc) => {
        const itemToUpdate = cart.find((prod) => prod.id === doc.id);
        if (doc.data().stock >= itemToUpdate.quantity) {
          batch.update(doc.ref, {
            stock: doc.data().stock - itemToUpdate.quantity,
          });
        }
        batch.commit();
        console.log("commit")
      });
    });     */
  }

  function inputChangeHandler(evt) {
    const input = evt.target;

    const value = input.value;
    const inputName = input.name;

    let copyUserData = { ...userData };

    copyUserData[inputName] = value;
    setUserData(copyUserData);
  }

  function handleReset(evt) {
    setUserData({
      name: "",
      email: "",
      telefono: "",
    });
  }

  if (orderFirebase.complete === true) {
    return (
      <div>
        <h1>Gracias por tu compra!</h1>
        <p>El id de seguimiento de tu compra es: {orderFirebase.id}</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <form onReset={handleReset} onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="name">Nombre</label>
          <input
            value={userData.name}
            onChange={inputChangeHandler}
            name="name"
            type="text"
            placeholder="Nombre"
            required
          />
        </div>

        <div className="form-item">
          <label htmlFor="telefono">Telefono</label>
          <input
            value={userData.telefono}
            onChange={inputChangeHandler}
            name="telefono"
            type="text"
            placeholder="Telefono"
            required
          />
        </div>

        <div className="form-item">
          <label htmlFor="email">Email</label>
          <input
            value={userData.email}
            onChange={inputChangeHandler}
            name="email"
            type="text"
            placeholder="Correo"
            required
          />
        </div>

        <div>
          <Button type="submit" onTouch={handleSubmit}>
            Finalizar Compra
          </Button>
          <Button type="reset">Vaciar Carrito</Button>
        </div>
      </form>
    </div>
  );
}


export default Checkout
import { createContext, useState } from "react";
import Swal from 'sweetalert2'
import { useEffect } from "react";
export const cartContext = createContext();

export function CartProvider({ children }) {
    const storageCart = JSON.parse(localStorage.getItem("setStorage")) || []
    const [cart, setCart] = useState(storageCart);
    let copyCart = [...cart];
    useEffect(() => {
        localStorage.setItem("setStorage", JSON.stringify(cart))
    }, [cart])
    function addToCart(data, amount) {
        if (totalStock(data) > 0) {
            let IndexCart = findItem(data.id)
            if (isInCart(data.id)) {
                IndexCart.amount += amount;
                IndexCart.stock -= amount;
                data.stock -= amount;
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    iconColor: 'var(--main-color)',
                    background: 'var(--black)',
                    color: 'var(--white)',
                    title: `Has agregado ${amount}, de ${data.name} al carrito`,
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    
                })
                setCart(copyCart);
            }
            else {
                data.stock -= amount;
                copyCart.push({ ...data, amount });
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    iconColor: 'var(--main-color)',
                    background: 'var(--black)',
                    color: 'var(--white)',
                    title: `Has agregado ${amount}, de ${data.name} al carrito`,
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                })
                setCart(copyCart);
            }
        }
        else {
            Swal.fire({
                position: 'top',
                icon: 'error',
                background: 'var(--black)',
                color: 'var(--white)',
                title: `No se puede agregar más de ${data.stock}, de ${data.name} ya que no hay más en stock`,
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            })
        }
    }
    function removeItem(id) {
        const itemRemove = findItem(id);
        console.log(itemRemove)
        const indexItem = copyCart.indexOf(itemRemove);
        Swal.fire({
            title: `¿Estas seguro que deseas eliminar este producto del carrito?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#fb6161',
            background: 'var(--black)',
            color: 'var(--white)',
            cancelButtonColor: 'var(--main-color)',
            confirmButtonText: 'Si, deseo eliminarlo!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                copyCart.splice(indexItem, 1);
                setCart(copyCart);
                Swal.fire({
                    title: 'Eliminado!',
                    text: `El producto ha sido eliminado del carrito.`,
                    icon: 'success',
                    iconColor: 'var(--main-color)',
                    background: 'var(--black)',
                    color: 'var(--white)',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                }
                )
            }
        })
    }
    function removeAll() {
        Swal.fire({
            title: `¿Estas seguro que deseas vaciar el carrito?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#fb6161',
            background: 'var(--black)',
            color: 'var(--white)',
            cancelButtonColor: 'var(--main-color)',
            confirmButtonText: 'Si, deseo eliminarlo!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                copyCart = [];
                setCart(copyCart);
                Swal.fire({
                    title: 'Vaciado!',
                    text: `El carrito ha sido vaciado.`,
                    icon: 'success',
                    iconColor: 'var(--main-color)',
                    background: 'var(--black)',
                    color: 'var(--white)',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                }
                )
            }
        })
    }
    function totalAmount() {
        let amountCart = 0;
        copyCart.map(index => amountCart += index.amount);
        return amountCart;
    }
    function totalPrice() {
        let total = 0;
        copyCart.map((index) => total += index.price * index.amount);
        return total;
    }
    function totalStock(data) {
        let indexStock = findItem(data.id)
        if (indexStock) {
            return indexStock.stock
        }
        else {
            return data.stock
        }
    }
    function isInCart(id) {
        return (copyCart.some(itemInCart => itemInCart.id === id));
    }
    function findItem(id) {
        return (copyCart.find(item => item.id === id));
    }
    function plusItemsCart(id) {
        if (copyCart[id].stock !== 0) {
            copyCart[id].amount += 1;
            copyCart[id].stock -= 1;
            setCart(copyCart)
        }
    }
    function subItemsCart(id) {
        if (copyCart[id].amount !== 1) {
            copyCart[id].amount -= 1;
            copyCart[id].stock += 1;
            setCart(copyCart);
        }
    }
    function clearCart(){
        copyCart = []
        setCart(copyCart)
    }
    return (
        <cartContext.Provider value={{ cart, addToCart, removeItem, removeAll, totalAmount, totalPrice, plusItemsCart, subItemsCart, totalStock, clearCart}}>
            {children}
        </cartContext.Provider>
    );
}
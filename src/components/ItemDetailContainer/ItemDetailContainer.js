import React, { useEffect, useState } from "react"
import ItemData from '../../data/data';
import ItemDetail from "../ItemDetail/ItemDetail";
import './ItemDetailContainer.css'
import { useParams } from "react-router-dom"
// import SpinerLoad from '../SpinerLoad/SpinerLoad';

function ItemDetailContainer() {
    const [data, setData] = useState([])
    const idUrl = useParams().id
    useEffect(() => {
        function getProducto() {
            return new Promise((resolve => {
                let findItem = ItemData.find((element) => element.id === Number(idUrl))
                setTimeout(() => {
                    resolve(findItem)
                }, 2000);
            }))
        }
        getProducto().then(product => {
            setData(product)
        })
    }, [idUrl])

    return (
        <>
            { data.length === 0 ?
                <main className="spinnerMain">
                    {/* <SpinerLoad /> */}
                </main>
                :
                <main>
                    <ItemDetail data={data} />
                </main>
            }
        </>
    )
}
export default ItemDetailContainer
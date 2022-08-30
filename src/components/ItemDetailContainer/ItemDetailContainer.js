import React, { useEffect, useState } from "react"
import ItemDetail from "../ItemDetail/ItemDetail";
import './ItemDetailContainer.css'
import { useParams } from "react-router-dom"

import firestoreDB from '../../services/firebase';
import { getDoc, collection, doc } from 'firebase/firestore';

function ItemDetailContainer() {
    const [data, setData] = useState([])
    const idUrl = useParams().id
    useEffect(() => {
        function getDetail(id) {
            return new Promise((resolve => {

                const productosCollection = collection(firestoreDB, "productos")
                const docRef = doc(productosCollection, id)

                getDoc(docRef).then(snapshot => {
                    resolve(
                        {...snapshot.data(), id: snapshot.id}
                    )
                })
            }))
        }
        getDetail(idUrl).then(product => {
            setData(product)
        })
    }, [idUrl])

    return (
        <>
            { data.length === 0 ?
                <main className="spinnerMain">
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
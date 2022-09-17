import React, { useEffect, useState } from 'react'
import ItemList from '../ItemList/ItemList';
import './ItemListContainer.css'
import { useParams } from "react-router-dom"
import { getDocs, collection, query, where, getFirestore } from 'firebase/firestore';


function ItemListContainer() {
  const [data, setData] = useState([])
  const [greeting, setGreeting] = useState("")
  const idCategory = useParams().idCategory
  useEffect(() => {
    const queryDB = getFirestore();
    const queryCollection = collection(queryDB, 'productos');
    if(idCategory) {
        const queryFilter = query(queryCollection, where('category', '==', idCategory));
        getDocs(queryFilter).then(res => setData(res.docs.map(product => ({...product.data(), id: product.id}))))
        setGreeting(idCategory)
    } else {
        getDocs(queryCollection).then(res => setData(res.docs.map(product => ({ ...product.data(), id: product.id}))))
        setGreeting("Todos nuestros productos")
    }
}, [idCategory]);
   

  return (
    <>
      {data.length === 0 ?
        <main className='spinnerMain'>
        </main>
        :
        <main className='main, products'>
          <h1 className='greeting'>{greeting}</h1>
          <section className='itemsContainer'>
            <ItemList data={data} />
          </section>
        </main>
      }
    </>
  )

}

export default ItemListContainer
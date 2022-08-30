import React, { useEffect, useState } from 'react'
import ItemList from '../ItemList/ItemList';
import './ItemListContainer.css'
import { useParams } from "react-router-dom"

import firestoreDB from '../../services/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';


function ItemListContainer() {
  const [data, setData] = useState([])
  const [greeting, setGreeting] = useState("")
  const idCategory = useParams().idCategory

  
    function getProducto() {
      return new Promise((resolve => {
        
        const productosCollection = collection(firestoreDB, "productos")
        
       getDocs(productosCollection).then( snapshot => {
        const docsData = snapshot.docs.map( doc => {
          return {...doc.data(), id: doc.id }
        })
        resolve(docsData)
       })
      }))
    }
    function getItemsFromDBbyIdCategory(idCategory) {
      return new Promise((resolve) => {
        
        const productosCollection = collection(firestoreDB, "productos");
        const queryProducts = query(productosCollection, where("category", "==", idCategory))
        
        getDocs(queryProducts).then(snapshot => {
          const docsData = snapshot.docs.map(doc => {
            return { ...doc.data(), id: doc.id }
          });
          resolve(docsData);
          console.log(docsData)
        });
      });
    };

    useEffect(() => {
      if (idCategory) {
        getItemsFromDBbyIdCategory(idCategory).then((resolve) => {
          setData(resolve)
          setGreeting(idCategory)
          
        });
  
      } else {
        getProducto().then((resolve) =>{
          setData(resolve)
          setGreeting("Todos Nuestros Productos")
          
        });
      }
    }, [idCategory])
   

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
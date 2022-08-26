import React, { useEffect, useState } from 'react'
import ItemData from '../../data/data';
import ItemList from '../ItemList/ItemList';
import './ItemListContainer.css'
import { useParams } from "react-router-dom"
// import SpinerLoad from '../SpinerLoad/SpinerLoad';

function ItemListContainer() {
  const [data, setData] = useState([])
  const [greeting, setGreeting] = useState("")
  const idCategory = useParams().idCategory

  useEffect(() => {
    function getProducto() {
      return new Promise((resolve => {
        setTimeout(() => {
          resolve(ItemData)
        }, 2000);
      }))
    }
    getProducto().then(products => {
      let itemsFilter = ItemData.filter((element) => element.category === idCategory)
      if (idCategory === undefined) {
        setData(products)
        setGreeting("Creaciones Janita")
      }
      else {
        setData(itemsFilter)
        setGreeting(`${idCategory}`)
      }
    })
  }, [idCategory])

  return (
    <>
      {data.length === 0 ?
        <main className='spinnerMain'>
        {/* <SpinerLoad /> */}
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
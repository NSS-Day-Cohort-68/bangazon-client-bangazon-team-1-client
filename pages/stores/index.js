import { useEffect, useState } from "react"
import Layout from "../../components/layout"
import Navbar from "../../components/navbar"
import { StoreCard } from "../../components/store/card"
import { getStores } from "../../data/stores"
import { getProducts } from "../../data/products"
import { ProductCard } from "../../components/product/card"

export default function Stores() {
  const [stores, setStores] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    getStores().then((data) => {
      if (data) {
        setStores(data)
      }
    })
    getProducts().then((data) => {
      if (data) {
        setProducts(data)
      }
    })
  }, [])

  return (
    <>
      <h1 className="title">Stores</h1>
      <div className="columns is-multiline">
        {stores.map((store) => {
          const filteredProducts = products.filter((product) => product.customer_id === store.seller.id)
          let totalProducts = 0;
          filteredProducts.forEach((product) => {
            totalProducts += product.quantity;
          });
          return (
            <div className="columns is-multiline" key={store.id}>
              <StoreCard store={store} key={store.id} totalProducts={totalProducts} listView={true}/>
              <div className="columns is-multiline">

                {filteredProducts.map((filteredProduct) => (
                  <ProductCard product={filteredProduct} key={filteredProduct.id} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

Stores.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}

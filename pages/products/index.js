import { useEffect, useState } from "react"
import Filter from "../../components/filter"
import Layout from "../../components/layout"
import Navbar from "../../components/navbar"
import { ProductCard } from "../../components/product/card"
import { getCategories, getProducts } from "../../data/products"

export default function Products() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState("Loading products...")
  const [locations, setLocations] = useState([])
  const [categories, setCategories] = useState([])
  const [recentProducts, setRecentProducts] = useState({})
  const [isFiltering, setIsFiltering] = useState(false)

  const getRecentProducts = async () => {
    const out = {}
    for (const category of categories) {
      const data = await getProducts(`category=${category.id}&quantity=5`)
      out[category.id] = data
    }
    setRecentProducts(out)
  }

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (data) {
          const locationData = [...new Set(data.map((product) => product.location))]
          const locationObjects = locationData.map((location) => ({
            id: location,
            name: location,
          }))

          setProducts(data)
          setIsLoading(false)
          setLocations(locationObjects)
        }

        getCategories().then(setCategories)
      })
      .catch((err) => {
        setLoadingMessage(`Unable to retrieve products. Status code ${err.message} on response.`)
      })
  }, [])

  useEffect(() => {
    getRecentProducts()
  }, [categories])

  const searchProducts = (event) => {
    setIsFiltering(!(event === "" || event == "direction=asc&" || event == "direction=desc&"))
    getProducts(event).then((productsData) => {
      if (productsData) {
        setProducts(productsData)
      }
    })
  }

  if (isLoading) return <p>{loadingMessage}</p>

  return (
    <>
      <Filter productCount={products.length} onSearch={searchProducts} locations={locations} categories={categories} />

      {isFiltering ? (
        <>
          <li
            style={{
              listStyle: "None",
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "50px",
              marginBottom: "10px",
            }}>
            Products matching filters
          </li>
          <div className="columns is-multiline">
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          {categories.map((category) => (
            <ul key={"c" + category.id}>
              <li style={{ fontWeight: "bold", marginTop: "50px", marginBottom: "10px" }}>{category.name}</li>

              <li className="columns is-multiline">
                {recentProducts[category.id]?.length > 0 ? (
                  recentProducts[category.id]?.map((product) => (
                    <ProductCard product={product} key={"c" + category.id + "-p" + product.id} />
                  ))
                ) : (
                  <div style={{ marginLeft: "30px" }}>No products with this category yet.</div>
                )}
              </li>
            </ul>
          ))}
        </div>
      )}
    </>
  )
}

Products.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}

import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import CardLayout from "../components/card-layout"
import Layout from "../components/layout"
import Navbar from "../components/navbar"
import CartDetail from "../components/order/detail"
import CompleteFormModal from "../components/order/form-modal"
import { completeCurrentOrder, getCart } from "../data/orders"
import { getPaymentTypes } from "../data/payment-types"
import { removeProductFromOrder, removeAllProductsFromOrder } from "../data/products"

export default function Cart() {
  const [cart, setCart] = useState({})
  const [paymentTypes, setPaymentTypes] = useState([])
  const [showCompleteForm, setShowCompleteForm] = useState(false)
  const router = useRouter()

  const refresh = () => {
    getCart().then((cartData) => {
      if (cartData) {
        setCart(cartData)
      }
    })
  }

  useEffect(() => {
    refresh()
    getPaymentTypes().then((paymentData) => {
      if (paymentData) {
        setPaymentTypes(paymentData)
      }
    })
  }, [])

  const completeOrder = (paymentTypeId) => {
    const payment = { payment_type: paymentTypeId }
    completeCurrentOrder(cart.id, payment).then(() => router.push("/my-orders"))
  }

  const removeProduct = (productId) => {
    removeProductFromOrder(productId).then(refresh)
  }

  const removeAllProduct = () => {
    removeAllProductsFromOrder().then(refresh)
  }

  return (
    <>
      <CompleteFormModal
        showModal={showCompleteForm}
        setShowModal={setShowCompleteForm}
        paymentTypes={paymentTypes}
        completeOrder={completeOrder}
      />
      {cart.products && cart.products.length > 0 ? (
        <CardLayout title="Your Current Order">
          <CartDetail cart={cart} removeProduct={removeProduct} />
          <>
            <a className="card-footer-item" onClick={() => setShowCompleteForm(true)}>
              Complete Order
            </a>
            <a className="card-footer-item" onClick={() => removeAllProduct()}>
              Delete Order
            </a>
          </>
        </CardLayout>
      ) : (
        <div className="columns is-centered is-vcentered">
          <div className="column is-6">
            <div className="card">
              <header className="card-header">
                <h3 className="card-header-title">Your Current Order Is Empty</h3>
              </header>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

Cart.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section className="container">{page}</section>
    </Layout>
  )
}

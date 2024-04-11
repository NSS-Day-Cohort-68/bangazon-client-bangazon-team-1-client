import { useEffect, useState } from "react"
import CardLayout from "../components/card-layout"
import Layout from "../components/layout"
import Navbar from "../components/navbar"
import Table from "../components/table"
import { getOrders } from "../data/orders"
import { fetchWithResponse } from "../data/fetcher"

export default function Orders() {
  const [orders, setOrders] = useState([])
  const headers = ["Order Date", "Total", "Payment Method"]

  useEffect(() => {
    getOrders().then((ordersData) => {
      if (ordersData) {
        const fetchPaymentTypes = ordersData.map(async (order) => {
          try {
            const paymentTypeRes = await fetch(order.payment_type)
            if (!paymentTypeRes.ok) {
              throw new Error(`Failed to fetch payment type for order ${order.id}`)
            }
            const paymentTypeData = await paymentTypeRes.json()
            return { ...order, payment_type: paymentTypeData }
          } catch (error) {
            return { ...order, payment_type: null } // or handle error differently
          }
        })

        Promise.all(fetchPaymentTypes).then((ordersWithData) => {
          const ordersWithPaymentTypes = ordersWithData.filter((order) => order.paymentType !== null)
          const ordersDataTotal = ordersWithPaymentTypes.map((order) => {
            let total = 0
            if (order.lineitems) {
              for (const lineItem of order.lineitems) {
                total += lineItem.product.price
              }
            }
            return {
              ...order,
              total: total.toFixed(2),
            }
          })
          setOrders(ordersDataTotal)
        })
      }
    })
  }, [])

  return (
    <>
      <CardLayout title="Your Orders">
        <Table headers={headers}>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.created_date}</td>
              <td>${order.total}</td>
              <td>{order.payment_type.merchant_name}</td>
            </tr>
          ))}
        </Table>
        <></>
      </CardLayout>
    </>
  )
}

Orders.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section className="container">{page}</section>
    </Layout>
  )
}

import { useEffect, useState } from "react"
import Modal from "../modal"

export default function CompleteFormModal({ showModal, setShowModal, paymentTypes, completeOrder }) {
  const [selectedPayment, setSelectedPayment] = useState("0")
  const [showError, setShowError] = useState(false)

  return (
    <Modal showModal={showModal} setShowModal={setShowModal} title="Complete Order">
      <div className="select" style={{ height: showError ? "50px" : "" }}>
        <select
          value={selectedPayment}
          onChange={(event) => {
            setSelectedPayment(event.target.value)
            if (event.target.value != "0") {
              setShowError(false)
            }
          }}>
          <option value="0">Select a payment type to complete your order</option>
          {paymentTypes.map((pt) => (
            <option key={pt.id} value={pt.id}>
              {pt.merchant_name} {pt.obscured_num}
            </option>
          ))}
        </select>
        {showError && <p className="help is-danger">Please select a payment type</p>}
      </div>
      <>
        <button
          className="button is-success"
          onClick={() => {
            if (selectedPayment != "0") {
              completeOrder(selectedPayment)
            } else {
              setShowError(true)
            }
          }}>
          Complete Order
        </button>
        <button className="button" onClick={() => setShowModal(false)}>
          Cancel
        </button>
      </>
    </Modal>
  )
}

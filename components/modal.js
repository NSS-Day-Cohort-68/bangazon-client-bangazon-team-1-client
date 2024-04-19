export default function Modal({
  showModal = undefined,
  setShowModal = undefined,
  title = undefined,
  children = undefined,
}) {
  const [body, footer] = children
  return (
    <div className={showModal ? "modal is-active" : "modal"}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" aria-label="close" onClick={() => setShowModal(false)}></button>
        </header>
        <section className="modal-card-body">{body}</section>

        <footer className="modal-card-foot">{footer}</footer>
      </div>
    </div>
  )
}

import Link from "next/link"

export function StoreCard({ favorite, width = "is-half", totalProducts }) {
  return (
    <div className={`column ${width}`}>
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">{favorite.store.name}</p>
        </header>
        <div className="card-content">
          <p className="content">
            Owner: {favorite.seller.first_name} {favorite.seller.last_name}
          </p>
          <div className="content">{favorite.store.description}</div>
          {/*//TODO: <p>Total Products: {totalProducts}</p> */}
        </div>
        <footer className="card-footer">
          <Link href={`stores/${favorite.store.id}`}>
            <a className="card-footer-item">View Store</a>
          </Link>
        </footer>
      </div>
    </div>
  )
}

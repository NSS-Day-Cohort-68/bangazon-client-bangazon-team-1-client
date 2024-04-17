import Link from "next/link"

export function StoreCard({ store, favorite, width = "is-half", totalProducts, listView }) {
  if (listView) {
    return (
      <div className={`column ${width}`}>
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">{store.name}</p>
          </header>
          <div className="card-content">
            <p className="content">
              Owner: {store.seller.first_name} {store.seller.last_name}
            </p>
            <div className="content">{store.description}</div>
            {totalProducts && <p>Total Products: {totalProducts}</p>}
          </div>
          <footer className="card-footer">
            <Link href={`stores/${store.id}`} legacyBehavior>
              <a className="card-footer-item">View Store</a>
            </Link>
          </footer>
        </div>
      </div>
    )
  }

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
          {totalProducts && <p>Total Products: {totalProducts}</p>}
        </div>
        <footer className="card-footer">
          <Link href={`stores/${favorite.store.id}`} legacyBehavior>
            <a className="card-footer-item">View Store</a>
          </Link>
        </footer>
      </div>
    </div>
  )
}

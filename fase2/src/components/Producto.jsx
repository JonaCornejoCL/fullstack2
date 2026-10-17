import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { agregarItemAlCarrito } from '../data/database'

function Producto({ id, nombre, precio, imagen, stockInicial = 5, enOferta = false, precioOferta }) {
  const [stock, setStock] = useState(() => {
    const stockGuardado = localStorage.getItem(nombre)
    return stockGuardado !== null ? Number(stockGuardado) : Number(stockInicial)
  })

  useEffect(() => {
    localStorage.setItem(nombre, stock)
  }, [stock, nombre])

  const disminuirStock = () => {
    if (stock > 0) {
      setStock(stock - 1)
    }
  }

  const handleAgregarCarrito = () => {
    if (stock <= 0) {
      alert('Sin stock disponible para este producto.')
      return
    }
    const precioNumerico = Number(String(precio).replace(/\./g, ''))
    agregarItemAlCarrito(
      {
        id: Number(id) || 1,
        nombre,
        precio: precioNumerico,
        enOferta,
        precioOferta: precioOferta ? Number(String(precioOferta).replace(/\./g, '')) : precioNumerico,
        imagen: imagen || 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80'
      },
      1
    )
    setStock(stock - 1)
  }

  return (
    <div className="card h-100 producto-card shadow-sm border-0">
      {imagen && (
        <div className="position-relative">
          <img src={imagen} alt={nombre} className="card-img-top" />
          {enOferta && (
            <span className="badge bg-danger position-absolute top-0 end-0 m-2 fs-6">
              ¡OFERTA!
            </span>
          )}
        </div>
      )}
      <div className="card-body d-flex flex-column text-center">
        <h5 className="card-title fw-bold" style={{ color: '#3E2723' }}>{nombre}</h5>
        <p className="card-text fw-bold text-danger fs-5 mb-1">Precio: ${precio}</p>
        <p className="text-muted mb-3">Stock disponible: {stock}</p>

        <div className="d-flex justify-content-center align-items-center mb-3">
          <button
            className="btn btn-danger me-2"
            onClick={disminuirStock}
          >
            -
          </button>
          <button
            className="btn btn-success"
            onClick={() => setStock(stock + 1)}
          >
            +
          </button>
          <Link
            to={`/producto/${id}`}
            className="btn btn-primary ms-2"
          >
            Ver detalle
          </Link>
        </div>

        <button
          className="btn btn-tipum w-100 mt-auto"
          onClick={handleAgregarCarrito}
          disabled={stock === 0}
        >
          {stock === 0 ? 'Agotado' : 'Añadir al carrito'}
        </button>
      </div>
    </div>
  )
}

export default Producto
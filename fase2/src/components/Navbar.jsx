import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { obtenerCarrito } from '../data/database'

function Navbar() {
  const [totalCarrito, setTotalCarrito] = useState(0)
  const [cantidadItems, setCantidadItems] = useState(0)

  const actualizarResumenCarrito = () => {
    const carrito = obtenerCarrito()
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
    const cant = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    setTotalCarrito(total)
    setCantidadItems(cant)
  }

  useEffect(() => {
    actualizarResumenCarrito()
    window.addEventListener('carritoActualizado', actualizarResumenCarrito)
    window.addEventListener('storage', actualizarResumenCarrito)
    return () => {
      window.removeEventListener('carritoActualizado', actualizarResumenCarrito)
      window.removeEventListener('storage', actualizarResumenCarrito)
    }
  }, [])

  return (
    <header className="bg-white border-bottom py-2 sticky-top shadow-sm">
      <div className="container-fluid px-4 d-flex flex-wrap align-items-center justify-content-between">
        <Link to="/" className="d-flex align-items-center text-decoration-none">
          <img
            src="/img/logo-tipum.png"
            alt="Logo Cafeta TiPum"
            style={{ maxHeight: '50px' }}
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <span className="fw-bold fs-4 ms-2" style={{ color: '#D9381E' }}>Cafeta TiPum</span>
        </Link>

        <nav className="d-flex flex-wrap align-items-center gap-3 my-2 my-lg-0">
          <Link to="/" className="text-dark fw-bold text-decoration-none">Inicio</Link>
          <Link to="/productos" className="text-dark fw-bold text-decoration-none">Productos</Link>
          <Link to="/categorias" className="text-dark fw-bold text-decoration-none">Categorías</Link>
          <Link to="/ofertas" className="text-danger fw-bold text-decoration-none">Ofertas</Link>
          <Link to="/nosotros" className="text-dark fw-bold text-decoration-none">Nosotros</Link>
          <Link to="/blogs" className="text-dark fw-bold text-decoration-none">Blogs</Link>
          <Link to="/contacto" className="text-dark fw-bold text-decoration-none">Contacto</Link>
        </nav>

        <div className="d-flex align-items-center gap-2">
          <Link to="/login" className="btn btn-outline-dark btn-sm fw-bold">
            Iniciar Sesión
          </Link>
          <Link to="/registro" className="btn btn-primary btn-sm fw-bold">
            Crear Cuenta
          </Link>
          <Link to="/carrito" className="btn btn-success btn-sm fw-bold">
            🛒 Carrito ({cantidadItems}) - ${totalCarrito.toLocaleString('es-CL')}
          </Link>
          <Link to="/admin" className="btn btn-dark btn-sm fw-bold">
            ⚙️ Admin
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
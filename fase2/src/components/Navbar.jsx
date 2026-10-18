import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
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

  // Estilo para el enlace activo en el menú
  const obtenerEstiloActivo = ({ isActive }) => ({
    color: isActive ? '#D9381E' : '#333333',
    fontWeight: 'bold',
    textDecoration: 'none'
  })

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
          <NavLink to="/" style={obtenerEstiloActivo} end>Inicio</NavLink>
          <NavLink to="/productos" style={obtenerEstiloActivo}>Productos</NavLink>
          <NavLink to="/categorias" style={obtenerEstiloActivo}>Categorías</NavLink>
          <NavLink to="/ofertas" style={obtenerEstiloActivo}>Ofertas</NavLink>
          <NavLink to="/nosotros" style={obtenerEstiloActivo}>Nosotros</NavLink>
          <NavLink to="/blogs" style={obtenerEstiloActivo}>Blogs</NavLink>
          <NavLink to="/contacto" style={obtenerEstiloActivo}>Contacto</NavLink>
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
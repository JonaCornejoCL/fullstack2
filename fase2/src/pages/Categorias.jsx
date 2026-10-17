import { useState } from 'react'
import Producto from '../components/Producto'
import { obtenerProductos } from '../data/database'

function Categorias() {
  const [catActiva, setCatActiva] = useState('cafe')
  const productos = obtenerProductos().filter((p) => p.categoria === catActiva)

  const categorias = [
    { id: 'cafe', titulo: '☕ Cafetería de Especialidad' },
    { id: 'pasteleria', titulo: '🧁 Pastelería Artesanal' },
    { id: 'merchandising', titulo: '🎁 Merchandising TiPum' }
  ]

  return (
    <main className="container my-5">
      <h2 className="text-center fw-bold mb-4" style={{ color: '#3E2723' }}>Explorar por Categorías</h2>

      <div className="d-flex justify-content-center flex-wrap gap-3 mb-5">
        {categorias.map((c) => (
          <button
            key={c.id}
            onClick={() => setCatActiva(c.id)}
            className={`btn btn-lg fw-bold ${catActiva === c.id ? 'btn-tipum' : 'btn-outline-dark'}`}
          >
            {c.titulo}
          </button>
        ))}
      </div>

      <div className="row g-4">
        {productos.map((prod) => (
          <div className="col-12 col-md-6 col-lg-4" key={prod.id}>
            <Producto
              id={prod.id}
              nombre={prod.nombre}
              precio={prod.precio}
              imagen={prod.imagen}
              stockInicial={prod.stock}
              enOferta={prod.enOferta}
              precioOferta={prod.precioOferta}
            />
          </div>
        ))}
      </div>
    </main>
  )
}

export default Categorias
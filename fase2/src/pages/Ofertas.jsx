import Producto from '../components/Producto'
import { obtenerProductos } from '../data/database'

function Ofertas() {
  const enOferta = obtenerProductos().filter((p) => p.enOferta)

  return (
    <main className="container my-5">
      <div className="text-center mb-5">
        <span className="badge bg-danger fs-6 mb-2">PROMOCIONES ESPECIALES</span>
        <h2 className="fw-bold" style={{ color: '#3E2723' }}>Ofertas de la Semana en Cafeta TiPum</h2>
        <p className="text-muted">Aprovecha descuentos exclusivos para la comunidad Duoc UC y clientes TiPum.</p>
      </div>

      <div className="row g-4">
        {enOferta.map((prod) => (
          <div className="col-12 col-md-6 col-lg-4" key={prod.id}>
            <Producto
              id={prod.id}
              nombre={prod.nombre}
              precio={prod.precioOferta || prod.precio}
              imagen={prod.imagen}
              stockInicial={prod.stock}
              enOferta={true}
              precioOferta={prod.precioOferta}
            />
          </div>
        ))}
      </div>
    </main>
  )
}

export default Ofertas
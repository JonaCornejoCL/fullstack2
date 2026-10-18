import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { obtenerCarrito, guardarCarrito, DATOS_GEOGRAFICOS, registrarOrden } from '../data/database'

function Checkout() {
  const [carrito, setCarrito] = useState([])
  const [estadoPago, setEstadoPago] = useState(null) // null | 'exito' | 'error'
  const [ordenGenerada, setOrdenGenerada] = useState(null)

  const [cliente, setCliente] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    calle: '',
    depto: '',
    region: 'Región de Valparaíso',
    comuna: 'Quilpué',
    indicaciones: ''
  })

  useEffect(() => {
    setCarrito(obtenerCarrito())
    const userActivo = JSON.parse(localStorage.getItem('usuarioActivoTipum'))
    if (userActivo) {
      setCliente((prev) => ({
        ...prev,
        nombre: userActivo.nombre || '',
        apellidos: userActivo.apellidos || '',
        correo: userActivo.correo || ''
      }))
    }
  }, [])

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
  const comunas = DATOS_GEOGRAFICOS[cliente.region] || []

  const procesarPago = (simularFallo = false) => {
    if (!cliente.nombre || !cliente.correo || !cliente.calle) {
      alert('Por favor completa Nombre, Correo y Calle de entrega.')
      return
    }

    const nuevaOrden = registrarOrden({
      cliente: `${cliente.nombre} ${cliente.apellidos}`,
      correo: cliente.correo,
      direccion: `${cliente.calle} ${cliente.depto}, ${cliente.comuna}, ${cliente.region}`,
      indicaciones: cliente.indicaciones,
      monto: total,
      estado: simularFallo ? 'Fallido' : 'Completado',
      items: carrito
    })

    setOrdenGenerada(nuevaOrden)

    if (simularFallo) {
      setEstadoPago('error')
    } else {
      guardarCarrito([])
      setEstadoPago('exito')
    }
  }

  // Vista Figura 7 (Compra Exitosa) o Figura 8 (Pago con Error)
  if (estadoPago && ordenGenerada) {
    const esExito = estadoPago === 'exito'
    return (
      <main className="container my-5">
        <div className="bg-white p-4 p-md-5 rounded shadow-sm border mx-auto" style={{ maxWidth: '800px' }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className={`fw-bold ${esExito ? 'text-success' : 'text-danger'}`}>
              {esExito
                ? `✅ Se ha realizado la compra. nro #${ordenGenerada.id}`
                : `❌ No se pudo realizar el pago. nro #${ordenGenerada.id}`}
            </h3>
            <span className="badge bg-dark">Código: {ordenGenerada.codigo}</span>
          </div>

          {!esExito && (
            <div className="text-center my-3">
              <button className="btn btn-success fw-bold px-4 py-2" onClick={() => setEstadoPago(null)}>
                VOLVER A REALIZAR EL PAGO
              </button>
            </div>
          )}

          <h5 className="fw-bold mt-4">Datos del cliente y entrega</h5>
          <p className="mb-1"><strong>Cliente:</strong> {ordenGenerada.cliente} ({ordenGenerada.correo})</p>
          <p className="mb-1"><strong>Dirección:</strong> {ordenGenerada.direccion}</p>
          {ordenGenerada.indicaciones && <p className="mb-3"><strong>Indicaciones:</strong> {ordenGenerada.indicaciones}</p>}

          <div className="table-responsive mt-3">
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {ordenGenerada.items.map((it, idx) => (
                  <tr key={idx}>
                    <td>{it.nombre}</td>
                    <td>${it.precio.toLocaleString('es-CL')}</td>
                    <td>{it.cantidad}</td>
                    <td>${(it.precio * it.cantidad).toLocaleString('es-CL')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="alert alert-secondary text-center fs-4 fw-bold mt-3">
            Total {esExito ? 'pagado' : 'a pagar'}: ${ordenGenerada.monto.toLocaleString('es-CL')}
          </div>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <button className="btn btn-danger" onClick={() => window.print()}>Imprimir boleta en PDF</button>
            <Link to="/productos" className="btn btn-primary">Seguir comprando</Link>
          </div>
        </div>
      </main>
    )
  }

  // Vista Figura 6 (Formulario de Checkout)
  return (
    <main className="container my-5">
      <div className="bg-white p-4 p-md-5 rounded shadow-sm border mx-auto" style={{ maxWidth: '850px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-0">Carrito de compra - Checkout</h2>
            <small className="text-muted">Completa la información para el envío de tu pedido TiPum</small>
          </div>
          <span className="btn btn-primary fw-bold fs-5">Total a pagar: ${total.toLocaleString('es-CL')}</span>
        </div>

        <h5 className="fw-bold mb-3">Información del cliente</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <label className="form-label">Nombre*</label>
            <input type="text" className="form-control" value={cliente.nombre} onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Apellidos*</label>
            <input type="text" className="form-control" value={cliente.apellidos} onChange={(e) => setCliente({ ...cliente, apellidos: e.target.value })} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Correo*</label>
            <input type="email" className="form-control" value={cliente.correo} onChange={(e) => setCliente({ ...cliente, correo: e.target.value })} />
          </div>
        </div>

        <h5 className="fw-bold mb-3">Dirección de entrega de los productos</h5>
        <div className="row g-3 mb-4">
          <div className="col-md-8">
            <label className="form-label">Calle y número*</label>
            <input type="text" className="form-control" placeholder="Ej: Av. Los Carrera 450" value={cliente.calle} onChange={(e) => setCliente({ ...cliente, calle: e.target.value })} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Departamento (opcional)</label>
            <input type="text" className="form-control" placeholder="Ej: Depto 603" value={cliente.depto} onChange={(e) => setCliente({ ...cliente, depto: e.target.value })} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Región*</label>
            <select className="form-select" value={cliente.region} onChange={(e) => setCliente({ ...cliente, region: e.target.value, comuna: DATOS_GEOGRAFICOS[e.target.value][0] })}>
              {Object.keys(DATOS_GEOGRAFICOS).map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Comuna*</label>
            <select className="form-select" value={cliente.comuna} onChange={(e) => setCliente({ ...cliente, comuna: e.target.value })}>
              {comunas.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="col-12">
            <label className="form-label">Indicaciones para la entrega (opcional)</label>
            <textarea className="form-control" rows="2" placeholder="Ej: Conserjería, timbre..." value={cliente.indicaciones} onChange={(e) => setCliente({ ...cliente, indicaciones: e.target.value })} />
          </div>
        </div>

        <div className="d-flex justify-content-end gap-3">
          <button className="btn btn-outline-danger" onClick={() => procesarPago(true)}>
            Simular Pago con Error
          </button>
          <button className="btn btn-success btn-lg fw-bold" onClick={() => procesarPago(false)}>
            Pagar ahora ${total.toLocaleString('es-CL')}
          </button>
        </div>
      </div>
    </main>
  )
}

export default Checkout
import { useState } from 'react'
import {
  obtenerProductos,
  crearProducto,
  eliminarProductoDB,
  obtenerUsuarios,
  guardarUsuarioDB,
  eliminarUsuarioDB,
  obtenerOrdenes
} from '../data/database'

function AdminPanel() {
  const [pestana, setPestana] = useState('dashboard')
  const [productos, setProductos] = useState(obtenerProductos())
  const [usuarios, setUsuarios] = useState(obtenerUsuarios())
  const [ordenes] = useState(obtenerOrdenes())
  const [soloCriticos, setSoloCriticos] = useState(false)

  // Estado formulario Nuevo Producto
  const [nuevoProd, setNuevoProd] = useState({ nombre: '', precio: '', categoria: 'cafe', stock: '', stockCritico: 5, enOferta: false })
  const [msgProd, setMsgProd] = useState('')

  // Estado formulario Nuevo Usuario
  const [nuevoUser, setNuevoUser] = useState({ run: '', nombre: '', correo: '', comuna: 'Quilpué', rol: 'Cliente' })

  const handleCrearProducto = (e) => {
    e.preventDefault()
    if (!nuevoProd.nombre || novoPrecioInvalido(nuevoProd.precio)) return
    const actualizados = crearProducto(nuevoProd)
    setProductos(actualizados)
    setMsgProd('¡Producto guardado exitosamente en el catálogo!')
    setNuevoProd({ nombre: '', precio: '', categoria: 'cafe', stock: '', stockCritico: 5, enOferta: false })
  }

  const novoPrecioInvalido = (p) => p === '' || Number(p) < 0

  const handleEliminarProd = (id) => {
    setProductos(eliminarProductoDB(id))
  }

  const handleGuardarUsuario = (e) => {
    e.preventDefault()
    if (!nuevoUser.run || !nuevoUser.nombre || !nuevoUser.correo) return
    setUsuarios(guardarUsuarioDB(nuevoUser))
    setNuevoUser({ run: '', nombre: '', correo: '', comuna: 'Quilpué', rol: 'Cliente' })
  }

  const productosMostrados = soloCriticos
    ? productos.filter((p) => p.stock <= (p.stockCritico || 5))
    : productos

  return (
    <main className="container my-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <h2 className="fw-bold mb-0" style={{ color: '#3E2723' }}>⚙️ Panel Administrador - Cafeta TiPum</h2>
        <div className="d-flex flex-wrap gap-2 mt-2 mt-md-0">
          <button className={`btn ${pestana === 'dashboard' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setPestana('dashboard')}>Dashboard</button>
          <button className={`btn ${pestana === 'productos' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setPestana('productos')}>Productos ({productos.length})</button>
          <button className={`btn ${pestana === 'ordenes' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setPestana('ordenes')}>Órdenes / Boletas ({ordenes.length})</button>
          <button className={`btn ${pestana === 'usuarios' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setPestana('usuarios')}>Usuarios ({usuarios.length})</button>
        </div>
      </div>

      {/* PESTAÑA 1: DASHBOARD */}
      {pestana === 'dashboard' && (
        <section>
          <div className="row g-4 mb-5">
            <div className="col-md-3">
              <div className="card shadow-sm border-0 bg-primary text-white p-3">
                <h6 className="text-uppercase fw-bold">Compras / Órdenes</h6>
                <h3 className="mb-0">{ordenes.length}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm border-0 bg-success text-white p-3">
                <h6 className="text-uppercase fw-bold">Productos Registrados</h6>
                <h3 className="mb-0">{productos.length}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm border-0 bg-warning text-dark p-3">
                <h6 className="text-uppercase fw-bold">Usuarios Activos</h6>
                <h3 className="mb-0">{usuarios.length}</h3>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow-sm border-0 bg-danger text-white p-3">
                <h6 className="text-uppercase fw-bold">Stock Crítico</h6>
                <h3 className="mb-0">{productos.filter((p) => p.stock <= (p.stockCritico || 5)).length}</h3>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PESTAÑA 2: GESTIÓN DE PRODUCTOS Y STOCK CRÍTICO */}
      {pestana === 'productos' && (
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="card shadow-sm border-0 p-4">
              <h5 className="fw-bold mb-3">Nuevo Producto</h5>
              <form onSubmit={handleCrearProducto}>
                <div className="mb-2">
                  <label className="form-label fw-bold">Nombre:</label>
                  <input type="text" className="form-control" required value={nuevoProd.nombre} onChange={(e) => setNuevoProd({ ...nuevoProd, nombre: e.target.value })} />
                </div>
                <div className="mb-2">
                  <label className="form-label fw-bold">Categoría:</label>
                  <select className="form-select" value={nuevoProd.categoria} onChange={(e) => setNuevoProd({ ...nuevoProd, categoria: e.target.value })}>
                    <option value="cafe">Cafetería</option>
                    <option value="pasteleria">Pastelería</option>
                    <option value="merchandising">Merchandising</option>
                  </select>
                </div>
                <div className="row">
                  <div className="col-6 mb-2">
                    <label className="form-label fw-bold">Precio ($):</label>
                    <input type="number" className="form-control" required value={nuevoProd.precio} onChange={(e) => setNuevoProd({ ...nuevoProd, precio: e.target.value })} />
                  </div>
                  <div className="col-6 mb-2">
                    <label className="form-label fw-bold">Stock:</label>
                    <input type="number" className="form-control" required value={nuevoProd.stock} onChange={(e) => setNuevoProd({ ...nuevoProd, stock: e.target.value })} />
                  </div>
                </div>
                <div className="form-check my-2">
                  <input type="checkbox" className="form-check-input" id="chkOferta" checked={nuevoProd.enOferta} onChange={(e) => setNuevoProd({ ...nuevoProd, enOferta: e.target.checked })} />
                  <label className="form-check-label" htmlFor="chkOferta">Producto en Oferta</label>
                </div>
                <button type="submit" className="btn btn-dark w-100 mt-2">Guardar Producto</button>
                {msgProd && <p className="text-success fw-bold mt-2 mb-0 small">{msgProd}</p>}
              </form>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card shadow-sm border-0 p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Inventario de Productos</h5>
                <button
                  className={`btn btn-sm ${soloCriticos ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={() => setSoloCriticos(!soloCriticos)}
                >
                  {soloCriticos ? 'Ver Todos' : '⚠️ Filtrar Stock Crítico'}
                </button>
              </div>
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Nombre</th>
                      <th>Categoría</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productosMostrados.map((p) => (
                      <tr key={p.id}>
                        <td className="fw-bold">{p.nombre}</td>
                        <td>{p.categoria}</td>
                        <td>${p.precio}</td>
                        <td>
                          <span className={`badge ${p.stock <= (p.stockCritico || 5) ? 'bg-danger' : 'bg-success'}`}>
                            {p.stock} u.
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-danger btn-sm" onClick={() => handleEliminarProd(p.id)}>Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA 3: ÓRDENES Y BOLETAS */}
      {pestana === 'ordenes' && (
        <div className="card shadow-sm border-0 p-4">
          <h5 className="fw-bold mb-3">Listado de Órdenes y Boletas</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th># Boleta</th>
                  <th>Código</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Monto</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {ordenes.map((o) => (
                  <tr key={o.id}>
                    <td>#{o.id}</td>
                    <td>{o.codigo}</td>
                    <td>{o.cliente}</td>
                    <td>{o.fecha}</td>
                    <td className="fw-bold">${o.monto.toLocaleString('es-CL')}</td>
                    <td>
                      <span className={`badge ${o.estado === 'Completado' ? 'bg-success' : 'bg-danger'}`}>
                        {o.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PESTAÑA 4: GESTIÓN DE USUARIOS */}
      {pestana === 'usuarios' && (
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="card shadow-sm border-0 p-4">
              <h5 className="fw-bold mb-3">Agregar Usuario</h5>
              <form onSubmit={handleGuardarUsuario}>
                <div className="mb-2">
                  <label className="form-label">RUN:</label>
                  <input type="text" className="form-control" required value={nuevoUser.run} onChange={(e) => setNuevoUser({ ...nuevoUser, run: e.target.value })} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Nombre Completo:</label>
                  <input type="text" className="form-control" required value={nuevoUser.nombre} onChange={(e) => setNuevoUser({ ...nuevoUser, nombre: e.target.value })} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Correo:</label>
                  <input type="email" className="form-control" required value={nuevoUser.correo} onChange={(e) => setNuevoUser({ ...nuevoUser, correo: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Rol:</label>
                  <select className="form-select" value={nuevoUser.rol} onChange={(e) => setNuevoUser({ ...nuevoUser, rol: e.target.value })}>
                    <option value="Cliente">Cliente</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-success w-100">Guardar Usuario</button>
              </form>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card shadow-sm border-0 p-4">
              <h5 className="fw-bold mb-3">Usuarios Registrados</h5>
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>RUN</th>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>Rol</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((u) => (
                      <tr key={u.run}>
                        <td>{u.run}</td>
                        <td>{u.nombre} {u.apellidos || ''}</td>
                        <td>{u.correo}</td>
                        <td><span className={`badge ${u.rol === 'Administrador' ? 'bg-danger' : 'bg-primary'}`}>{u.rol}</span></td>
                        <td>
                          <button className="btn btn-danger btn-sm" onClick={() => setUsuarios(eliminarUsuarioDB(u.run))}>Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default AdminPanel
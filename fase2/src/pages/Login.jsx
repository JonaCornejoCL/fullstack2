import { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [mensajeExito, setMensajeExito] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setMensajeExito('')

    if (!email.includes('@')) {
      setError('El correo electrónico no es válido')
      return
    }

    if (password.length < 4) {
      setError('La contraseña debe tener al menos 4 caracteres')
      return
    }

    setError('')
    console.log('Email:', email)
    console.log('Password:', password)

    if (email === 'admin@duoc.cl' && password === 'admin123') {
      localStorage.setItem('usuarioActivoTipum', JSON.stringify({ nombre: 'Admin', apellidos: 'Master', correo: email, rol: 'Administrador' }))
      setMensajeExito('¡Bienvenido Administrador! Puedes ir al Panel Admin desde el menú superior.')
    } else {
      localStorage.setItem('usuarioActivoTipum', JSON.stringify({ nombre: 'Cliente', apellidos: 'TiPum', correo: email, rol: 'Cliente' }))
      setMensajeExito('¡Ingreso exitoso a Cafeta TiPum!')
    }
  }

  return (
    <main className="container my-5 d-flex justify-content-center">
      <section className="w-100" style={{ maxWidth: '500px' }}>
        <article className="formulario-contenedor">
          <h1 className="text-center fw-bold mb-2" style={{ color: '#3E2723' }}>Iniciar Sesión</h1>
          <p className="text-center text-muted mb-4">Bienvenido de vuelta a Cafeta TiPum</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">
                Correo electrónico
              </label>
              <input
                id="email"
                type="text"
                className="form-control"
                placeholder="Ej: usuario@duoc.cl (Admin: admin@duoc.cl)"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Mínimo 4 caracteres (Admin: admin123)"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            {mensajeExito && (
              <div className="alert alert-success text-center fw-bold">
                {mensajeExito}
              </div>
            )}

            <button type="submit" className="btn btn-tipum w-100 py-2">
              Ingresar
            </button>
          </form>
        </article>
      </section>
    </main>
  )
}

export default Login
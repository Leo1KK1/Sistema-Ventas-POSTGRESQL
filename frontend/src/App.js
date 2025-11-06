import { useEffect, useState } from 'react';
import { apiFetch } from './api';

const API_BASE = 'http://127.0.0.1:5000';

function App(){
  const [view, setView] = useState('login');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [rol, setRol] = useState(localStorage.getItem('rol'));
  const [showPassword, setShowPassword] = useState(false);
  

  useEffect(()=>{
    if(token){
      setView(rol === 'admin' ? 'admin' : 'user');
    }
  },[])

  const handleLogin = async (e)=>{
    e.preventDefault();
    try{
      const form = new FormData(e.target);
      const usernameInput = form.get('username');
      const res = await fetch(API_BASE + '/login', {method:'POST', body: form, mode: 'cors'});
      console.log('fetch status', res.status, res.statusText);
      const text = await res.text();
      try{
        const j = JSON.parse(text);
        if(res.ok){
          localStorage.setItem('token', j.token);
          localStorage.setItem('rol', j.rol);
          if(usernameInput) localStorage.setItem('username', usernameInput);
          setToken(j.token);
          setRol(j.rol);
          setView(j.rol === 'admin' ? 'admin' : 'user');
        } else {
          alert(j.message || j.error || 'Error');
        }
      }catch(err){
        console.error('Respuesta no JSON:', text);
        alert('Respuesta inesperada del servidor. Ver consola.');
      }
    }catch(err){
      console.error('Fetch error:', err);
      alert('Error de red: ' + err.message);
    }
  }

  const handleRegister = async (e)=>{
    e.preventDefault();
    const form = new FormData(e.target);
    const res = await fetch(API_BASE + '/crear_usuario', {method:'POST', body: form});
    const j = await res.json();
    if(res.ok){
      alert('Usuario creado');
      setView('login');
    }else{
      alert(j.error || 'Error');
    }
  }

  if(view === 'login'){
    return (
      <div className="login-page">
        {/* Navegación superior */}
        <nav className="login-nav">
          <a href="#home">INICIO</a>
          <a href="#about">ACERCA DE</a>
          <a href="#service">SERVICIO</a>
          <a href="#contact">CONTACTO</a>
        </nav>

        {/* Formulario de login */}
        <div className="login-container">
          <div className="login-card">
            <h1 className="login-title">INICIAR SESIÓN</h1>
            
            <form onSubmit={handleLogin}>
              {/* Email Input */}
              <div className="login-input-group">
                <input 
                  name="username" 
                  type="text"
                  placeholder="Usuario"
                  className="login-input"
                  required
                />
                <span className="login-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
              </div>

              {/* Password Input */}
              <div className="login-input-group">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  name="password" 
                  placeholder="Contraseña"
                  className="login-input"
                  required
                />
                <button
                  type="button"
                  className="login-icon"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                  title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                  style={{ background:'transparent', border:'none', cursor:'pointer', padding:0, pointerEvents:'auto' }}
                  onMouseDown={()=>setShowPassword(true)}
                  onMouseUp={()=>setShowPassword(false)}
                  onMouseLeave={()=>setShowPassword(false)}
                  onTouchStart={()=>setShowPassword(true)}
                  onTouchEnd={()=>setShowPassword(false)}
                >
                  {showPassword ? (
                    // Icono ojo tachado (ocultar)
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 1 12 1 12a20.29 20.29 0 0 1 5.06-6.94"/>
                      <path d="M10.58 10.58A3 3 0 0 0 12 15a3 3 0 0 0 3-3 3 3 0 0 0-.41-1.59"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    // Icono ojo (ver)
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
                <a href="#forgot" className="forgot-password"></a>
              </div>

              

              {/* Login Button */}
              <button type="submit" className="login-button">
                ENTRAR
              </button>

              {/* Register Link */}
              <div className="register-link">
                No tienes una cuenta?{' '}
                <button type="button" onClick={()=>setView('register')} className="register-btn">
                  Registrarse
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  if(view === 'register'){
    return (
      <div className="app-shell">
      <div className="page-card">
        <div className="d-flex align-items-center gap-2 mb-2">
          <img src="/images/icons8-crear-48.png" alt="Registro" className="icon icon-title-md" />
          <h2 className="m-0">Registro</h2>
        </div>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <img src="/images/icons8-usuario-40.png" alt="Usuario" className="icon icon-input" />
              </span>
              <input name="username" className="form-control" />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <img src="/images/icons8-panel-de-control-80.png" alt="Clave" className="icon icon-input" />
              </span>
              <input type="password" name="password" className="form-control" />
            </div>
          </div>
          <button className="btn btn-primary">
            <img src="/images/icons8-crear-48.png" alt="Crear" className="icon icon-btn icon-me" />
            Crear cuenta
          </button>
          <button type="button" className="btn btn-link" onClick={()=>setView('login')}>Volver</button>
        </form>
      </div>
      </div>
    )
  }

  if(view === 'admin'){
    return <AdminView token={token} onLogout={()=>{localStorage.removeItem('token'); localStorage.removeItem('rol'); localStorage.removeItem('username'); setToken(null); setView('login')}} />
  }

  return <UserView token={token} onLogout={()=>{localStorage.removeItem('token'); localStorage.removeItem('rol'); localStorage.removeItem('username'); setToken(null); setView('login')}} />
}

function AdminView({token, onLogout}){
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('usuarios');
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({username: '', password: ''});
  const [ventasUsername, setVentasUsername] = useState('');
  const [ventas, setVentas] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [searchUsername, setSearchUsername] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [headerSearch, setHeaderSearch] = useState('');
  
  useEffect(()=>{fetchUsers();},[])
  
  const fetchUsers = async ()=>{
    const res = await fetch('http://localhost:5000/usuarios');
    const j = await res.json();
    if(res.ok) setUsers(j);
  }
  
  const handleDelete = async (id)=>{
    if(!confirm('¿Eliminar este usuario?')) return;
  const res = await apiFetch(`http://localhost:5000/usuario/${id}`, {method:'DELETE', token});
    if(res.ok) {
      alert('Usuario eliminado');
      fetchUsers();
    } else alert('Error al eliminar');
  }
  
  const handleCreateUser = async (e)=>{
    e.preventDefault();
    const form = new FormData();
    form.append('username', newUser.username);
    form.append('password', newUser.password);
    const res = await fetch('http://localhost:5000/crear_usuario', {method:'POST', body: form});
    const j = await res.json();
    if(res.ok){
      alert('Usuario creado');
      setNewUser({username: '', password: ''});
      fetchUsers();
    } else {
      alert(j.error || 'Error al crear usuario');
    }
  }
  
  const handleUpdateUser = async (e)=>{
    e.preventDefault();
    const form = new FormData();
    if(editingUser.username) form.append('username', editingUser.username);
    if(editingUser.password) form.append('password', editingUser.password);
    const res = await apiFetch(`http://localhost:5000/usuario/${editingUser.id}`, { method:'PUT', body: form, token });
    const j = await res.json();
    if(res.ok){
      alert('Usuario actualizado');
      setEditingUser(null);
      fetchUsers();
    } else {
      alert(j.error || 'Error al actualizar');
    }
  }
  
  const handleSearchUser = async ()=>{
    if(!searchId && !searchUsername){
      alert('Ingresa ID o Nombre de usuario');
      return;
    }
    let lista = users;
    if(!lista || lista.length === 0){
      const r = await fetch('http://localhost:5000/usuarios');
      lista = await r.json();
    }
    const idNum = searchId ? Number(searchId) : null;
    let encontrado = null;
    if(idNum){
      encontrado = lista.find(u=> Number(u.id) === idNum);
    }
    if(!encontrado && searchUsername){
      const term = searchUsername.trim().toLowerCase();
      encontrado = lista.find(u=> (u.username||'').toLowerCase() === term);
    }
    if(!encontrado){
      alert('Usuario no encontrado');
      return;
    }
    setEditingUser({id:encontrado.id, username:encontrado.username, password:''});
  }
  
  const handleGetVentas = async ()=>{
    if(!ventasUsername){
      alert('Ingrese un nombre de usuario');
      return;
    }
    const res = await apiFetch('http://localhost:5000/obtener_ventas', { method:'POST', json:true, body:{ username: ventasUsername }, token });
    const j = await res.json();
    if(res.ok){
      setVentas(j.ventas || []);
    } else {
      alert(j.error || j.message || 'Error');
    }
  }
  
  return (
    <div className={`admin-shell ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <i className="bi bi-grid-1x2-fill" style={{fontSize:22}}></i>
          <span>Panel</span>
        </div>
        <nav className="admin-nav">
          <button className={`admin-nav-item ${activeTab==='usuarios'?'active':''}`} onClick={()=>setActiveTab('usuarios')}>
            <span className="nav-icon"><i className="bi bi-people-fill"></i></span>
            <span className="nav-text">Usuarios</span>
          </button>
          <button className={`admin-nav-item ${activeTab==='crear'?'active':''}`} onClick={()=>setActiveTab('crear')}>
            <span className="nav-icon"><i className="bi bi-person-plus-fill"></i></span>
            <span className="nav-text">Crear usuario</span>
          </button>
          <button className={`admin-nav-item ${activeTab==='obtener'?'active':''}`} onClick={()=>setActiveTab('obtener')}>
            <span className="nav-icon"><i className="bi bi-person-vcard"></i></span>
            <span className="nav-text">Obtener/Editar</span>
          </button>
          <button className={`admin-nav-item ${activeTab==='ventas'?'active':''}`} onClick={()=>setActiveTab('ventas')}>
            <span className="nav-icon"><i className="bi bi-cash-coin"></i></span>
            <span className="nav-text">Ventas</span>
          </button>
        </nav>
        <div className="admin-sidebar-footer">
          <button className="admin-logout" onClick={onLogout}>Cerrar sesión</button>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <button className="sidebar-toggle" aria-label="Alternar menú" onClick={()=>setSidebarOpen(v=>!v)}>
            <i className="bi bi-list"></i>
          </button>
          <div className="header-search">
            <input placeholder="Buscar (usuarios o contenido visible)" value={headerSearch} onChange={e=>setHeaderSearch(e.target.value)} />
            <button onClick={()=>{/* botón decorativo, filtramos en vivo */}}><i className="bi bi-search"></i></button>
          </div>
          <div className="header-actions">
            <span className="user-pill">
              <i className="bi bi-person-circle"></i> Admin
            </span>
          </div>
        </header>

        {/* Quick actions cards */}
        <section className="admin-cards">
          <button className="admin-card" onClick={()=>setActiveTab('usuarios')}>
            <div className="card-icon"><i className="bi bi-people-fill"></i></div>
            <div className="card-title">Usuarios</div>
            <div className="card-sub">Lista y acciones rápidas</div>
          </button>
          <button className="admin-card" onClick={()=>setActiveTab('crear')}>
            <div className="card-icon"><i className="bi bi-person-plus-fill"></i></div>
            <div className="card-title">Crear usuario</div>
            <div className="card-sub">Alta de usuarios</div>
          </button>
          <button className="admin-card" onClick={()=>setActiveTab('obtener')}>
            <div className="card-icon"><i className="bi bi-person-vcard"></i></div>
            <div className="card-title">Obtener/Editar</div>
            <div className="card-sub">Buscar y actualizar</div>
          </button>
          <button className="admin-card" onClick={()=>setActiveTab('ventas')}>
            <div className="card-icon"><i className="bi bi-cash-coin"></i></div>
            <div className="card-title">Ventas</div>
            <div className="card-sub">Consulta por usuario</div>
          </button>
        </section>

        {/* Content */}
        <section className="admin-content">
      
      {/* Contenido según pestaña */}
      {activeTab === 'usuarios' && (
        <div>
          <h4>Lista de Usuarios</h4>
          <button className="btn btn-sm btn-primary mb-3" onClick={fetchUsers}>Recargar</button>
          <div className="table-wrap">
          <table className="table table-striped m-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter(u => u.rol !== 'admin')
                .filter(u => {
                  const term = headerSearch.trim().toLowerCase();
                  if(!term) return true;
                  const idMatch = String(u.id).includes(term);
                  const nameMatch = (u.username||'').toLowerCase().includes(term);
                  const rolMatch = (u.rol||'').toLowerCase().includes(term);
                  return idMatch || nameMatch || rolMatch;
                })
                .map(u=> (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.rol || 'usuario'}</td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={()=>handleDelete(u.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
      
      {activeTab === 'crear' && (
        <div>
          <h4>Crear Nuevo Usuario</h4>
          <form onSubmit={handleCreateUser}>
            <div className="mb-3">
              <label className="form-label">Usuario</label>
              <input 
                className="form-control" 
                value={newUser.username} 
                onChange={e=>setNewUser({...newUser, username:e.target.value})}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input 
                type="password"
                className="form-control" 
                value={newUser.password} 
                onChange={e=>setNewUser({...newUser, password:e.target.value})}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Crear Usuario</button>
          </form>
        </div>
      )}
      
      {activeTab === 'obtener' && (
        <div>
          
          <h4>Buscar y Actualizar Usuario</h4>
          <p>Busca por ID o nombre exacto del usuario. Luego podrás actualizarlo.</p>
          <div className="row g-3 align-items-end">
            <div className="col-sm-3">
              <label className="form-label">ID</label>
              <input type="number" className="form-control" value={searchId} onChange={e=>setSearchId(e.target.value)} placeholder="Ej: 2" />
            </div>
            <div className="col-sm-5">
              <label className="form-label">Nombre de usuario</label>
              <input className="form-control" value={searchUsername} onChange={e=>setSearchUsername(e.target.value)} placeholder="Ej: Leo Gonzalez" />
            </div>
            <div className="col-sm-2">
              <button className="btn btn-primary w-100" onClick={handleSearchUser}>Buscar</button>
            </div>
          </div>

          {editingUser && (
            <div className="card mt-3">
              <div className="card-body">
                <h5>Editar Usuario ID: {editingUser.id}</h5>
                <form onSubmit={handleUpdateUser}>
                  <div className="mb-3">
                    <label className="form-label">Nuevo usuario (dejar vacío para no cambiar)</label>
                    <input 
                      className="form-control" 
                      value={editingUser.username} 
                      onChange={e=>setEditingUser({...editingUser, username:e.target.value})}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nueva contraseña (dejar vacío para no cambiar)</label>
                    <input 
                      type="password"
                      className="form-control" 
                      value={editingUser.password} 
                      onChange={e=>setEditingUser({...editingUser, password:e.target.value})}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary me-2">Guardar cambios</button>
                  <button type="button" className="btn btn-secondary" onClick={()=>setEditingUser(null)}>Cancelar</button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'ventas' && (
        <div>
          <h4>Consultar Ventas de Usuario</h4>
          <div className="mb-3">
            <label className="form-label">Nombre de usuario</label>
            <input 
              className="form-control" 
              value={ventasUsername} 
              onChange={e=>setVentasUsername(e.target.value)}
              placeholder="Ingrese el nombre de usuario"
            />
          </div>
          <button className="btn btn-primary mb-3" onClick={handleGetVentas}>Consultar Ventas</button>
          
          <div>
            {ventas.length === 0 ? (
              <p className="text-muted">No hay ventas para mostrar</p>
            ) : (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Producto</th>
                    <th>Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {ventas.map((v,i)=>(
                    <tr key={i}>
                      <td>{i+1}</td>
                      <td>{v.producto || 'Sin producto'}</td>
                      <td>${v.monto}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
        </section>
      </main>
    </div>
  )
}

function UserView({token, onLogout}){
  const [ventas, setVentas] = useState([]);
  const [username, setUsername] = useState('');
  const [nuevaVenta, setNuevaVenta] = useState('');
  const [nuevoProducto, setNuevoProducto] = useState('');
  const [activeTab, setActiveTab] = useState('ver');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [headerSearch, setHeaderSearch] = useState('');
  
  useEffect(()=>{
    // Cargar el username del usuario autenticado desde localStorage
    const u = localStorage.getItem('username') || '';
    setUsername(u);
  },[])
  
  const fetchVentas = async ()=>{
    if(!username){
      alert('Ingrese su nombre de usuario');
      return;
    }
    const res = await apiFetch('http://localhost:5000/obtener_ventas', { method:'POST', json:true, body:{ username }, token });
    const j = await res.json();
    if(res.ok) setVentas(j.ventas || []);
    else alert(j.message || j.error || 'Error');
  }
  
  const handleRegistrarVenta = async (e)=>{
    e.preventDefault();
    if(!username || nuevaVenta === ''){
      alert('Complete todos los campos');
      return;
    }
    const monto = Number(nuevaVenta);
    if(!Number.isFinite(monto) || !Number.isInteger(monto) || monto < 0){
      alert('El monto debe ser un número entero mayor o igual a 0');
      return;
    }
    // Aquí asumo que existe un endpoint para registrar ventas
    // Si no existe en el backend, se debe crear
    const body = {username, venta: monto};
    if(nuevoProducto.trim()) body.producto = nuevoProducto.trim();
    
    const res = await apiFetch('http://localhost:5000/registrar_venta', { method:'POST', json:true, body, token });
    const j = await res.json();
    if(res.ok){
      alert('Venta registrada');
      setNuevaVenta('');
      setNuevoProducto('');
      fetchVentas();
    } else {
      alert(j.error || j.message || 'Error al registrar venta');
    }
  }
  
  return (
    <div className={`admin-shell ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <i className="bi bi-speedometer2" style={{fontSize:22}}></i>
          <span>Mi Panel</span>
        </div>
        <nav className="admin-nav">
          <button className={`admin-nav-item ${activeTab==='ver'?'active':''}`} onClick={()=>setActiveTab('ver')}>
            <span className="nav-icon"><i className="bi bi-card-list"></i></span>
            <span className="nav-text">Mis ventas</span>
          </button>
          <button className={`admin-nav-item ${activeTab==='registrar'?'active':''}`} onClick={()=>setActiveTab('registrar')}>
            <span className="nav-icon"><i className="bi bi-plus-circle"></i></span>
            <span className="nav-text">Registrar venta</span>
          </button>
        </nav>
        <div className="admin-sidebar-footer">
          <div className="user-pill" style={{marginBottom:'.5rem'}}>
            <img src="/images/icons8-usuario-40.png" alt="Yo" /> {username || 'Usuario'}
          </div>
          <button className="admin-logout" onClick={onLogout}>Cerrar sesión</button>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <button className="sidebar-toggle" aria-label="Alternar menú" onClick={()=>setSidebarOpen(v=>!v)}>
            <i className="bi bi-list"></i>
          </button>
          <div className="header-search">
            <input placeholder="Buscar en mis ventas (producto o monto)" value={headerSearch} onChange={e=>setHeaderSearch(e.target.value)} />
            <button onClick={fetchVentas}><i className="bi bi-search"></i></button>
          </div>
          <div className="header-actions">
            <span className="user-pill">
              <i className="bi bi-person-circle"></i> {username || 'Usuario'}
            </span>
          </div>
        </header>

        {/* Quick actions */}
        <section className="admin-cards">
          <button className="admin-card" onClick={()=>setActiveTab('ver')}>
            <div className="card-icon"><i className="bi bi-card-list"></i></div>
            <div className="card-title">Ver mis ventas</div>
            <div className="card-sub">Consulta y refresca</div>
          </button>
          <button className="admin-card" onClick={()=>setActiveTab('registrar')}>
            <div className="card-icon"><i className="bi bi-plus-circle"></i></div>
            <div className="card-title">Registrar venta</div>
            <div className="card-sub">Agrega una nueva venta</div>
          </button>
        </section>

        {/* Content */}
        <section className="admin-content">
          {activeTab === 'ver' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="m-0">Mis Ventas</h4>
                <button className="btn btn-primary" onClick={fetchVentas}>Cargar/Refrescar</button>
              </div>
              <div className="table-wrap">
                {ventas.filter(v=>{
                    const t = headerSearch.trim().toLowerCase();
                    if(!t) return true;
                    const prod = (v.producto||'').toLowerCase();
                    const monto = String(v.monto||'');
                    return prod.includes(t) || monto.includes(t);
                  }).length === 0 ? (
                  <p className="text-muted">No hay ventas registradas</p>
                ) : (
                  <table className="table table-striped m-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Producto</th>
                        <th>Monto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ventas
                        .filter(v=>{
                          const t = headerSearch.trim().toLowerCase();
                          if(!t) return true;
                          const prod = (v.producto||'').toLowerCase();
                          const monto = String(v.monto||'');
                          return prod.includes(t) || monto.includes(t);
                        })
                        .map((v,i)=>(
                        <tr key={i}>
                          <td>{i+1}</td>
                          <td>{v.producto || 'Sin producto'}</td>
                          <td>${v.monto}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {activeTab === 'registrar' && (
            <div>
              <h4>Registrar Nueva Venta</h4>
              <form onSubmit={handleRegistrarVenta}>
                <div className="mb-3">
                  <label className="form-label">Producto</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nuevoProducto}
                    onChange={e=>setNuevoProducto(e.target.value)}
                    placeholder=""
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Monto de la venta</label>
                  <input
                    type="number"
                    className="form-control"
                    value={nuevaVenta}
                    onChange={e=>setNuevaVenta(e.target.value)}
                    placeholder=""
                    step="1"
                    min="0"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  Registrar Venta
                </button>
              </form>
              <div className="alert alert-info mt-3">
                <strong>Nota:</strong> Para cambiar venta, comunicate con el administrador.
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App;

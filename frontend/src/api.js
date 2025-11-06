// Pequeño helper para llamadas con token y JSON opcional
export async function apiFetch(url, options = {}){
  const {
    method = 'GET',
    headers = {},
    body,
    json = false,
    token,
  } = options;

  const t = token || localStorage.getItem('token');
  const finalHeaders = { ...headers };
  if(t){
    finalHeaders['Authorization'] = 'Bearer ' + t;
  }
  let finalBody = body;
  if(json && body !== undefined && typeof body !== 'string'){
    finalHeaders['Content-Type'] = 'application/json';
    finalBody = JSON.stringify(body);
  }

  const res = await fetch(url, { method, headers: finalHeaders, body: finalBody });

  // Manejo de 401: limpiar credenciales y redirigir a login
  if(res.status === 401){
    try{
      const data = await res.json().catch(()=>({}));
      console.warn('401 Unauthorized:', data && (data.message || data.error));
      alert('Tu sesión expiró o no tienes autorización. Redirigiendo al login...');
    }catch{}
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('username');
    window.location.reload(); // Recarga para mostrar login
  }
  return res;
}

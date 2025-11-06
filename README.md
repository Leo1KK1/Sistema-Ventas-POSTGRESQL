# Sistema de Ventas - PostgreSQL

Sistema de ventas desarrollado con Flask (Backend) y React (Frontend) usando PostgreSQL como base de datos.

## Tecnologías

### Backend
- Python 3.x
- Flask
- PostgreSQL
- SQLAlchemy
- Flask-CORS
- Flasgger (Swagger/OpenAPI)
- PyJWT

### Frontend
- React
- Node.js

## Requisitos Previos

- Python 3.x
- PostgreSQL
- Node.js y npm

## Instalación

### Backend

1. Crear entorno virtual:
```bash
python -m venv env
```

2. Activar entorno virtual:
- Windows: `env\Scripts\activate`
- Linux/Mac: `source env/bin/activate`

3. Instalar dependencias:
```bash
pip install -r requerimientos.txt
```

4. Configurar variables de entorno (crear archivo .env):
```
DATABASE_URL=postgresql://usuario:password@localhost/nombre_db
```

5. Ejecutar la aplicación:
```bash
python app.py
```

### Frontend

1. Instalar dependencias:
```bash
cd frontend
npm install
```

2. Ejecutar la aplicación:
```bash
npm start
```

## Estructura del Proyecto

```
├── app.py              # Aplicación principal Flask
├── models.py           # Modelos de base de datos
├── db.py              # Configuración de base de datos
├── requerimientos.txt # Dependencias Python
├── frontend/          # Aplicación React
│   ├── src/
│   ├── public/
│   └── package.json
└── env/              # Entorno virtual (no se sube a GitHub)
```

## Licencia

Este proyecto es de uso educativo/privado.

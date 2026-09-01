# PlanCity Frontend

Frontend de la prueba de desempeño de TypeScript para PlanCity.

## Stack

- React + TypeScript + Vite
- React Router
- Axios
- Vitest + React Testing Library
- CSS propio, sin dependencia de UI

## Requisitos

- Node.js 20+
- La API `plancity-api` ejecutándose en `http://localhost:3000`

## Instalación

```bash
npm install
copy .env.example .env
npm run dev
```

En Linux/macOS:

```bash
cp .env.example .env
npm install
npm run dev
```

Si la API usa otra URL, cambia `VITE_API_URL` en `.env`.

## Autenticación y sesión

El `accessToken` se guarda en `localStorage` bajo `plancity_access_token`.

Se eligió `localStorage` porque la prueba exige persistencia de sesión al recargar la página mientras el token siga siendo válido. El `AuthContext` recupera el usuario con `GET /users/me` al iniciar la aplicación.

Axios usa un interceptor de request para adjuntar automáticamente:

`Authorization: Bearer <accessToken>`

El interceptor de response detecta `401`, limpia la sesión mediante un evento global y devuelve al usuario al estado de visitante.

## Manejo de errores

Se diferencian:

- Red: no hubo respuesta del servidor.
- 400: validación.
- 401: sesión/token inválido.
- 403: usuario autenticado sin permisos.
- 404: recurso inexistente.
- 409: conflicto, por ejemplo favorito duplicado.

Los errores se muestran en la interfaz y no solo en consola.

## Arquitectura

- `src/types`: interfaces TypeScript.
- `src/services/api.ts`: cliente HTTP, interceptor y errores.
- `src/context/AuthContext.tsx`: sesión, usuario y rol.
- `src/hooks/useFetch.ts`: genérico reutilizable disparado desde `useEffect`.
- `src/components`: componentes reutilizables y control de acceso.
- `src/pages`: pantallas y rutas.
- `src/test`: prueba unitaria e integración.

## Funcionalidades

- Eventos públicos, búsqueda y filtro por categoría.
- Detalle de evento con fecha, lugar, precio, cupo e imágenes.
- Categorías públicas y detalle con sus eventos.
- Registro/login/logout.
- Favoritos con redirección a login para visitantes.
- Manejo de 409 y 404 en favoritos.
- Panel administrativo.
- CRUD de categorías para admin.
- CRUD de eventos para admin.
- Protección real de rutas por autenticación y rol.
- Error Boundary.
- Pruebas unitarias e integración.

## Tests

```bash
npm test
```

## Build

```bash
npm run build
```

## Credenciales de desarrollo

La API del enunciado siembra:

#### ADMIN

- Email: `admin@examen.com`
- Password: `Admin123!`

#### User

- Email: `abc@examen.com`
- Password: `User123!`

No guardar credenciales reales en el repositorio.

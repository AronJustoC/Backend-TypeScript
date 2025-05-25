# **_Instalación ts y express con bun_**

## **Instalación**

1. Instalar [bun](https://bun.sh/install)

   ```bash
   npm install -g bun
   ```

2. iniciar el proyecto

   ```bash
    bun init
   ```

   - Esto creará un archivo `bun.lockb` en el directorio actual.
   - El archivo `bun.lockb` es el archivo que se utiliza para almacenar las dependencias de tu proyecto.

3. instalamos ts y express en nuestro proyecto

   ```bash
    bun add typescript express
   ```

   - Esto añadirá typescript a tu proyecto.

     - Instalamos los tipos de node y express.

       ```bash
       bun add @types/node @types/express
       ```

     - Esto añadirá los tipos de node y express a tu proyecto.

4. Instalar las dependencias

   ```bash
    bun install
   ```

   - Esto instalará las dependencias de tu proyecto en el directorio `node_modules`.

5. Instalaremos prettier para formatear nuestro código, eslint para las reglas de codificacion,
   commitlint para las reglas de commits y husky para hacer commits automáticos.

   ```bash
    bun add prettier
   ```

   - Esto añadirá prettier a tu proyecto.

   ```bash
    bun add eslint
    bun add commitlint
    bun add husky
   ```

   - Esto añadirá eslint, commitlint y husky a tu proyecto.
     Luego de de intalar prettier, se correra este comando:

   ```bash
    bun exec prettier ./src --write
   ```

   - Esto formateará tu código.

- Ahora instalaremos husky para que se ejecute el comando de prettier antes de hacer un commit.

```bash
 bun exec husky add .husky/pre-commit "bun exec prettier ./src --write"
```

- Esto añadirá un hook pre-commit a tu proyecto.

```bash
  npm run format
  npm test
  npm run lint
  npm run build
```

- Esto ejecutará los comandos de formateo, pruebas, linting y build.
- En ves de usar nodemon, podemos usar bun para ejecutar el build y el watch.
- Nuestro package.json en la parte de scripts:

```json
"scripts": {
    "build": "bun build ./src/main.ts --target node --outdir ./dist",
    "test": "echo \"Hola mundo\" ",
    "lint": "eslint \"src/**/*.{ts,tsx}\"",
    "dev": "bun --watch src/main.ts",
    "start": "bun run build && bun run dev",
    "format": "prettier --write \"src/**/*.{ts,tsx}\"",
    "prepare": "husky"
  },
```

- Ahora instalaremos commitlint para que se ejecute el comando hacer
  de commitlint antes de hacer un commit.

```bash
bun exec husky add .husky/commit-msg "bunx commitlint --edit"
```

- Esto añadirá un hook commit-msg a tu proyecto lo que nos servira
  para hacer commits segun el formato de commitlint.

## **Creacion de CRUD**

1. Crearemos un CRUD con express el orm Mongoose:

   ```bash
    bun add express mongoose
   ```

   - Esto añadirá express y mongoose a tu proyecto.

## Consultas HTTP utilizando curl

### 🔐 Autenticación (auth.route.ts)

```bash
# 📝 Registro de usuario

curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"aronchoque727@gmail.com",
    "password":"123456",
    "name":"aron02"
  }' | jq

# 🔐 validate OTP
curl -X POST http://localhost:4000/auth/validate \
  -H "Content-Type: application/json" \
  -d '{
    "email":"aronchoque727@gmail.com",
    "code":"967058"
  }' | jq

# 🔑 Resend OTP
curl -X POST http://localhost:4000/auth/resend_otp \
  -H "Content-Type: application/json" \
  -d '{
    "email":"aronchoque727@gmail.com"
  }' | jq

# 🔑 Login
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"aronchoque727@gmail.com",
    "password": "123456"
  }' | jq

intento de login:

📧 Verificar OTP
curl -X POST http://localhost:3000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "otp": "123456"
  }'

```

### 👤 Usuarios (user.controller.ts)

```bash
# 📋 Obtener todos los usuarios
curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer TU_TOKEN"

# 🔍 Obtener usuario por ID
curl -X GET http://localhost:3000/api/users/:id \
  -H "Authorization: Bearer TU_TOKEN"

# ✏️ Actualizar usuario
curl -X PUT http://localhost:3000/api/users/:id \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN" \
  -d '{
    "firstName": "Juan Actualizado",
    "lastName": "Perez Actualizado"
  }'

# ❌ Eliminar usuario
curl -X DELETE http://localhost:3000/api/users/:id \
  -H "Authorization: Bearer TU_TOKEN"
```

### 📝 Todo List (todo-list.route.ts)

```bash
# 📋 Obtener todas las tareas
curl -X GET http://localhost:3000/api/todo \
  -H "Authorization: Bearer TU_TOKEN"

# ➕ Crear nueva tarea
curl -X POST http://localhost:3000/api/todo \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN" \
  -d '{
    "title": "Nueva tarea",
    "description": "Descripción de la tarea",
    "completed": false
  }'

# 🔄 Actualizar tarea
curl -X PUT http://localhost:3000/api/todo/:id \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN" \
  -d '{
    "title": "Tarea actualizada",
    "completed": true
  }'

# ❌ Eliminar tarea
curl -X DELETE http://localhost:3000/api/todo/:id \
  -H "Authorization: Bearer TU_TOKEN"
```

## Testing

- Librerias necesarias:

```bash
  bun add jest supertest ts-jest @types/jest @types/supertest mongodb-memory-server
```

jest: Es como tu caja de herramientas principal para testing. El framework base que te permite armar todas tus pruebas. Como tener tu maleta de herramientas básicas.

supertest: Es como tu banco de pruebas para APIs. Te permite simular peticiones HTTP sin necesidad de tener el servidor corriendo. Como hacer pruebas en un motor sin tener que instalarlo en el carro.

ts-jest: Es el adaptador que permite que Jest trabaje con TypeScript. Como un convertidor que permite que tus herramientas normales trabajen con materiales especiales.

@types/jest: Son los planos y especificaciones de TypeScript para Jest. Te da el autocompletado y la documentación de tipos.

@types/supertest: Similar al anterior, son los planos pero para Supertest. La documentación de tipos para trabajar con TypeScript.

mongodb-memory-server: Es como tener una base de datos de prueba que vive solo en memoria. Como armar una maqueta temporal para probar - cuando terminas las pruebas, se desmonta todo sin dejar rastro.

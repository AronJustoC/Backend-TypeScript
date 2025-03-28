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

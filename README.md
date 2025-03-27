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

6.

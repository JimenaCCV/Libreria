# Library API

API REST para el control de libros de una biblioteca, construida con **TypeScript** y **Express** siguiendo una **arquitectura en capas** (Router → Controller → Service → Repository).

## Instalación

```bash
npm install
```

## Ejecución

```bash
# Modo desarrollo (recarga automática)
npm run dev

# Compilar a JavaScript
npm run build

# Ejecutar la versión compilada
npm start

# Correr las pruebas
npm test
```

El servidor levanta por defecto en `http://localhost:3000` (configurable con la variable de entorno `PORT`).

## Endpoints disponibles

| Método | Ruta              | Descripción                              |
|--------|-------------------|-------------------------------------------|
| GET    | `/health`         | Verifica que el servidor está activo      |
| GET    | `/api/books`      | Lista todos los libros (admite filtros `author`, `title`, `year` como query params) |
| GET    | `/api/books/:id`  | Obtiene un libro por su id                |
| POST   | `/api/books`      | Crea un libro (`title`, `author`, `year`) |
| PATCH  | `/api/books/:id`  | Actualiza parcialmente un libro           |
| DELETE | `/api/books/:id`  | Elimina un libro                          |

## Preguntas de reflexión

**¿Qué problema intenta resolver una arquitectura en capas?**
Evita mezclar responsabilidades distintas (HTTP, reglas de negocio, acceso a datos) en un mismo lugar. Cada capa tiene una única razón para cambiar, lo que facilita entender, probar y mantener el código.

**¿Qué consecuencias tendría colocar toda la lógica en el Controller?**
El código se volvería difícil de leer, probar y reutilizar. Cualquier cambio en las reglas de negocio o en la forma de guardar datos obligaría a tocar el mismo archivo que maneja las peticiones HTTP, aumentando el riesgo de errores.

**¿Qué ventaja obtienes al separar la lógica de negocio del acceso a datos?**
El Service puede probarse sin depender de una base de datos real, y el mecanismo de almacenamiento (memoria, SQL, NoSQL) puede cambiarse sin tocar las reglas de negocio, siempre que se respete la misma interfaz del Repository.

**Si cambiaras PostgreSQL por MongoDB, ¿qué componentes deberían modificarse?**
Solo la capa de Repository (y su configuración de conexión). El Controller y el Service no deberían cambiar, ya que dependen de la interfaz `BookRepository`, no de una tecnología de base de datos específica.

**¿Existe una arquitectura "perfecta" para cualquier sistema? ¿Por qué?**
No. La arquitectura adecuada depende del tamaño del proyecto, del equipo y de sus necesidades de escalabilidad. Una solución que funciona bien para un sistema grande puede ser excesiva para uno pequeño, y viceversa.

**¿En qué momento agregar más capas puede comenzar a generar complejidad innecesaria?**
Cuando el proyecto es pequeño o simple y las capas adicionales no aportan valor real, solo agregan indirección: más archivos, más código repetitivo y más tiempo para entender un flujo que podría resolverse de forma directa.

### 💭 Pregunta adicional

Pedir comida a domicilio puede pensarse en capas similares a un backend:

- **Router/Controller**: la app o el mesero que recibe el pedido del cliente.
- **Service**: la cocina, que decide cómo preparar el pedido según las reglas del negocio (recetas, disponibilidad de ingredientes).
- **Repository**: la bodega/almacén, que provee los ingredientes sin importarle cómo se cocinan ni quién los pidió.
- **Repartidor**: equivalente a la respuesta HTTP, entrega el resultado final al cliente.

Cada responsabilidad puede cambiar de forma independiente (cambiar de repartidora, cambiar de proveedor de ingredientes, cambiar el menú) sin afectar a las demás.

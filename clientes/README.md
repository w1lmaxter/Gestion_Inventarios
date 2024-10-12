# Nombre del Proyecto

**Gestión de Inventarios**

## Descripción

Este proyecto es una aplicación web de gestión de inventarios que permite a los usuarios gestionar órdenes de compra y venta, así como los detalles de cada transacción. Los usuarios pueden agregar, editar y eliminar productos y órdenes, proporcionando una interfaz fácil de usar para el control de inventarios.

### Funcionalidades:

- Visualizar detalles de órdenes de compra y venta.
- Agregar, editar y eliminar productos.
- Actualizar la cantidad de productos en las órdenes.
- Confirmación de acciones de eliminación para evitar errores.
- Interfaz intuitiva para facilitar la navegación.

## Instalación

Para instalar y ejecutar el proyecto localmente, sigue estos pasos:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/w1lmaxter/Gestion_Inventarios.git
   cd Gestion_Inventarios


2. **Instalar dependencias:**:Asegúrate de tener Node.js y npm instalados en tu sistema. Luego, ejecuta:

bash

npm install

3. **Configurar la base de datos::**

Asegúrate de tener MySQL instalado y ejecutándose.
Crea una base de datos y tablas necesarias según la estructura de tu proyecto.
Configura los datos de conexión en el backend según tus necesidades.

4. **Ejecutar el servidor backend:**:


bash
npm run start

5. **Ejecutar la aplicación React:**:

 En otra terminal, dentro del directorio del proyecto, ejecuta:

bash
npm start


**Uso**
Abre tu navegador y ve a http://localhost:3000 para acceder a la aplicación.
Navega a través de las diferentes secciones para gestionar los productos y órdenes.
Utiliza los formularios para agregar o editar detalles según sea necesario.
Confirma las acciones al eliminar registros.
Desarrollo de Componentes
Componentes Principales
Los componentes principales de la aplicación incluyen:

TablaDetalleOrdenCompra: Componente que gestiona la visualización, edición y eliminación de los detalles de las órdenes de compra.
TablaDetalleOrdenVenta: Componente que gestiona la visualización, edición y eliminación de los detalles de las órdenes de venta.
FormularioProducto: Componente para agregar y editar información de productos.
Componentes Funcionales
Los componentes funcionales se centran en la lógica y el comportamiento de la aplicación. Algunos de ellos son:

Componente de Carga: Muestra un indicador de carga mientras se obtienen datos del servidor.
Notificaciones: Utiliza SweetAlert2 para mostrar mensajes de éxito o error al realizar acciones.
Gestión de Estados
La gestión de estados se realiza utilizando useState y useEffect de React:

useState: Se utiliza para manejar el estado de los detalles de las órdenes de compra y venta, así como para el manejo del formulario de edición.

Ejemplo:

**javascript**:

const [detallesCompra, setDetallesCompra] = useState([]);
const [formData, setFormData] = useState({
  id_orden_compra: "",
  id_producto: "",
  cantidad: "",
  ide: null,
});

**javascript**:
useEffect(() => {
  obtenerDetallesCompra();
}, []);


**Contribuciones**
¡Contribuciones son bienvenidas! Si deseas contribuir al proyecto, sigue estos pasos:

Fork el repositorio.
Crea una nueva rama (git checkout -b nueva-caracteristica).
Realiza tus cambios y haz un commit (git commit -m 'Añadida nueva característica').
Envía tu rama (git push origin nueva-caracteristica).
Crea un nuevo Pull Request.


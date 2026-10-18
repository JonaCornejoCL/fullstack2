# Especificación de Requisitos de Software (ERS v2) - Cafeta TiPum
**Asignatura:** Desarrollo Fullstack II (DSY1104)  
**Estudiante:** Jonathan Alejandro Cornejo Ponce  
**Institución:** Duoc UC  

## 1. Introducción y Descripción del Proyecto
Cafeta TiPum es una plataforma web de comercio electrónico desarrollada para la gestión de una cafetería de especialidad y pastelería artesanal. En esta segunda etapa (Evaluación 2), el proyecto ha evolucionado desde una estructura estática basada en HTML, CSS y JavaScript vainilla hacia un framework moderno de frontend (**React + Vite**)[cite: 23, 30, 42, 56], incorporando diseño responsivo con **Bootstrap / React-Bootstrap**, enrutamiento dinámico con **React Router DOM**[cite: 3], formularios controlados con validación avanzada[cite: 10, 43], persistencia de datos mediante **localStorage**[cite: 5, 43], y un entorno de pruebas automatizadas con **Vitest**[cite: 14].

## 2. Requisitos Funcionales Actualizados
* **Catálogo y Filtrado:** Visualización de productos organizados por categorías (Cafetería, Pastelería, Merchandising) y filtrado en tiempo real mediante barra de búsqueda y parámetros de URL (`useLocation` / `useParams`)[cite: 9, 43].
* **Control de Stock y Carrito:** Sistema interactivo de adición de productos al carro con sincronización en tiempo real del stock disponible y cálculo del monto total.
* **Proceso de Compra (Checkout):** Formulario de datos de envío autocompolatado para usuarios registrados, con simulación de pasarela de pago exitosa y de pago con error (generación de boleta/orden con número identificador)[cite: 45, 47, 48].
* **Panel de Administración:** Módulo exclusivo para administradores con métricas de ventas y control CRUD completo (Crear, Leer, Actualizar, Eliminar) de productos, gestión de stock crítico y control de usuarios[cite: 43, 51].

## 3. Arquitectura Tecnológica
* **Frontend:** React 18, Vite, React Router DOM, React-Bootstrap, Bootstrap CSS.
* **Testing:** Vitest, jsdom, React Testing Library, user-event[cite: 13, 14].
* **Persistencia:** localStorage sincronizado con un archivo de base de datos simulada en JavaScript (`database.js`)[cite: 5, 42, 43].
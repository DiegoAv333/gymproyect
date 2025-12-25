<div align="center">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="React" width="100" height="100"/>
  <h1>
    <b>GymProject - Sistema de Gestión de Gimnasios</b>
  </h1>
  <p>
    Una aplicación web completa para la administración de gimnasios, construida con React y Firebase.
  </p>
</div>

---

## 📋 Descripción del Proyecto

**GymProject** es un sistema de gestión integral (SaaS) diseñado para optimizar las operaciones diarias de un gimnasio. La plataforma cuenta con diferentes roles de usuario (Administrador, Ventas y Usuario final), cada uno con un panel de control y funcionalidades específicas para sus tareas.

El objetivo es centralizar la gestión de miembros, clases, suscripciones, productos y finanzas en una interfaz moderna, intuitiva y reactiva.

## ✨ Características Principales

El sistema está dividido en módulos según el rol del usuario, garantizando seguridad y una experiencia de usuario enfocada.

### 👑 Panel de Administración (`/admin`)
- **Dashboard Principal:** Visualización de métricas clave como nuevos miembros, asistencia diaria y clases agendadas.
- **Gestión de Miembros:** Administración completa de los usuarios del gimnasio.
- **Gestión de Clases:** Creación y manejo de horarios de clases.
- **Gestión de Suscripciones y Planes:** Administración de los diferentes planes de membresía.
- **Gestión de Productos:** Control de inventario de productos (suplementos, ropa, etc.).
- **Módulo de Finanzas:** Seguimiento de ingresos y gastos.
- **Generación de Reportes:** Creación de informes para la toma de decisiones.
- **Configuración del Sistema:** Ajustes generales de la plataforma.

### 💰 Panel de Ventas (`/ventas`)
- **Dashboard de Ventas:** Resumen de actividad de ventas y productos.
- **Gestión de Productos (CRUD):** Funcionalidad completa para crear, leer, actualizar y eliminar productos del inventario, con modales de confirmación para operaciones críticas.

### 👤 Portal de Usuario (`/usuario`)
- **Gestión de Perfil:** Los usuarios pueden actualizar su información personal.
- **Seguridad de la Cuenta:** Funcionalidad para solicitar el restablecimiento de contraseña.

### 🚀 Características Generales
- **Autenticación Segura:** Sistema de inicio de sesión, registro y cierre de sesión basado en Firebase Authentication.
- **Control de Acceso Basado en Roles (RBAC):** La interfaz y las rutas se adaptan dinámicamente según el rol del usuario (`Admin`, `Ventas`, `Usuario`).
- **Diseño Responsivo:** Interfaz optimizada para funcionar tanto en dispositivos de escritorio como móviles.
- **Componentes Reutilizables:** Creación de componentes de UI modulares como modales de error y confirmación para una experiencia de usuario consistente.
- **Manejo de Estado con Hooks:** Uso extensivo de hooks de React (`useState`, `useEffect`) y hooks personalizados (`useAuth`, `useProductManagement`) para una lógica de estado limpia y desacoplada.

## 🛠️ Tecnologías Utilizadas

- **Frontend:**
  - **React.js:** Biblioteca principal para la construcción de la interfaz.
  - **React Router:** Para la gestión de rutas y navegación en la aplicación.
  - **Tailwind CSS:** Framework CSS para un diseño rápido y personalizable.
  - **React Icons:** Para la inclusión de iconografía de alta calidad.
- **Backend & Autenticación:**
  - **Firebase:** Utilizado para la autenticación de usuarios y como base de datos (Firestore) para la gestión de productos, miembros, etc.
- **Herramientas de Desarrollo:**
  - **Create React App:** Para el andamiaje inicial del proyecto.
  - **ESLint:** Para mantener la calidad y consistencia del código.

## 🚀 Instalación y Puesta en Marcha

Sigue estos pasos para ejecutar el proyecto en tu entorno local.

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/TU_USUARIO/gymproyect.git
    cd gymproyect
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto y añade tus credenciales de Firebase.
    ```
    REACT_APP_FIREBASE_API_KEY="TU_API_KEY"
    REACT_APP_FIREBASE_AUTH_DOMAIN="TU_AUTH_DOMAIN"
    REACT_APP_FIREBASE_PROJECT_ID="TU_PROJECT_ID"
    REACT_APP_FIREBASE_STORAGE_BUCKET="TU_STORAGE_BUCKET"
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID="TU_SENDER_ID"
    REACT_APP_FIREBASE_APP_ID="TU_APP_ID"
    ```

4.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm start
    ```
    La aplicación se abrirá en http://localhost:3000.

## 📜 Scripts Disponibles

- `npm start`: Inicia la aplicación en modo de desarrollo.
- `npm run build`: Compila la aplicación para producción en la carpeta `build`.
- `npm test`: Ejecuta las pruebas en modo interactivo.
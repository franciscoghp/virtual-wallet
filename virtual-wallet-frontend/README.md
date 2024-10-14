# Frontend - Billetera Virtual

![React](https://img.shields.io/badge/React-17.0.2-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-2.2.19-blue.svg)
![React Router DOM](https://img.shields.io/badge/React%20Router%20DOM-6.0-blue.svg)

## Descripción

Este es el frontend de la **Billetera Virtual**, encargado de la interfaz gráfica y la interacción con los microservicios de Cliente y Base de Datos. La aplicación está construida en **React** con **Tailwind CSS** para el estilo, y **React Router DOM** para la navegación.

## Características

- **Interfaz Moderna**: Usamos Tailwind CSS para construir una interfaz atractiva y responsiva.
- **Navegación Fluida**: Implementación de navegación entre vistas con **React Router DOM**.
- **Funciones Principales**:
  - Registrar clientes.
  - Recargar billetera.
  - Realizar pagos.
  - Consultar el saldo disponible.

## Tabla de Contenidos

- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)
- [Contacto](#contacto)

## Tecnologías Utilizadas

- **React**: Biblioteca JavaScript para construir interfaces de usuario.
- **React Router DOM**: Para manejar la navegación dentro de la aplicación.
- **Tailwind CSS**: Framework de CSS para estilos rápidos y personalizables.
- **Vite**: Herramienta para el desarrollo y construcción del proyecto.

## Instalación

Sigue estos pasos para ejecutar el frontend en tu entorno local:

3. Instala las dependencias necesarias:

    ```bash
    npm install
    ```

5. Inicia el servidor de desarrollo:

    ```bash
    npm start
    ```

6. Abre tu navegador en [http://localhost:3000](http://localhost:3000) para ver la aplicación en funcionamiento.

## Uso

### Navegación Principal

- **Inicio**: Página de bienvenida con enlaces a las funciones principales de la billetera.
- **Registrar Cliente**: Formulario para agregar un nuevo cliente al sistema.
- **Recargar Billetera**: Permite recargar saldo a una cuenta de usuario.
- **Hacer Pago**: Realiza pagos de un cliente a otro.
- **Consultar Saldo**: Consulta el saldo disponible en la cuenta del cliente.

### Footer

El footer muestra el mensaje:

> **Developed with Love ❤️ By Francisco Herrera**

## Estructura del Proyecto

```bash
frontend/
├── public/
│   ├── analisis.png               # Imagen usada para la tarjeta de Registrar Cliente
│   ├── billetera.png              # Imagen usada para la tarjeta de Recargar Billetera
│   ├── compensacion-de-trabajadores.png  # Imagen usada para la tarjeta de Hacer Pago
│   ├── prestamo.png               # Imagen usada para la tarjeta de Consultar Saldo
│   └── favicon.ico                # Ícono de la página
├── src/
│   ├── components/
│   │   ├── ClientRegister.jsx      # Componente para registrar un cliente
│   │   ├── WalletRecharge.jsx      # Componente para recargar la billetera
│   │   ├── MakePayment.jsx         # Componente para hacer pagos
│   │   ├── CheckBalance.jsx        # Componente para consultar el saldo
│   ├── App.jsx                    # Componente principal de la aplicación
│   └── index.js                   # Punto de entrada del frontend
├── tailwind.config.js             # Configuración de Tailwind CSS
├── postcss.config.js              # Configuración de PostCSS
├── package.json                   # Dependencias del proyecto
└── README.md                      # Este archivo

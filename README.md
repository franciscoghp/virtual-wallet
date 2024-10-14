# Billetera Virtual - Aplicación de Gestión Financiera

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-17.0.2-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-2.2.19-blue.svg)

## Descripción

Este proyecto es una **Billetera Virtual** que permite a los usuarios gestionar sus finanzas personales de manera sencilla y eficiente. La aplicación incluye funciones para registrar clientes, recargar billeteras, realizar pagos y consultar saldos, todo en un entorno visualmente atractivo y fácil de usar.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)
- [Contacto](#contacto)

## Características

- **Registrar Clientes**: Añade nuevos clientes a la base de datos con facilidad.
- **Recargar Billetera**: Los usuarios pueden recargar su billetera virtual.
- **Realizar Pagos**: Realiza pagos de una cuenta a otra de manera segura.
- **Consultar Saldo**: Verifica el saldo disponible en la cuenta de los usuarios.
- **Interfaz Amigable**: Diseño moderno con **Tailwind CSS** para una mejor experiencia de usuario.
- **Navegación**: Rápida y eficiente gracias a **React Router DOM**.

## Tecnologías Utilizadas

- **React** - Biblioteca de JavaScript para construir interfaces de usuario.
- **React Router DOM** - Navegación en aplicaciones SPA.
- **Tailwind CSS** - Framework CSS para crear interfaces rápidas y responsivas.
- **NestJS** - Framework de NodeJS para desarrollar el backend.
- **Mongo** - Base de datos no relacional para almacenar información.

## Instalación

Sigue estos pasos para poner en funcionamiento el proyecto de manera local.

1. Clona el repositorio:

    ```bash
    git clone https://github.com/franciscoghp/virtual-wallet.git
    ```

## Microservicios y Frontend

### Frontend

El frontend es la interfaz gráfica que interactúa con los microservicios para proporcionar una experiencia de usuario fluida y responsiva. Para más detalles sobre el frontend, consulta su README:

[**Frontend**](./virtual-wallet-frontend\README.md)

### Microservicio de Cliente

Este microservicio es responsable de comunicarse y servir como puente entre el usuario y la base de datos.

[**Microservicio del Cliente**](./client-service\README.md)

### Microservicio de Base de Datos

Este microservicio gestiona las operaciones financieras, como recargas, pagos, y consultas de saldo. Consulta su README para más información sobre su instalación y uso:

[**Microservicio de la Base de Datos**](./db-service\README.md)

## Uso

Recomendamos primero iniciar el servidor del [**Frontend**](./virtual-wallet-frontend\README.md), luego el servicio del [**Microservicio del Cliente**](./client-service\README.md), y por ultimo el servicio de [**Microservicio de la Base de Datos**](./db-service\README.md) en este orden especifico.

### Navegación Principal

- **Inicio**: Página de bienvenida con tarjetas interactivas para navegar hacia las funciones de la billetera.
- **Registrar Cliente**: Permite añadir nuevos clientes al sistema.
- **Recargar Billetera**: Los usuarios pueden realizar recargas a sus cuentas.
- **Hacer Pago**: Realiza pagos entre usuarios registrados.
- **Consultar Saldo**: Permite verificar el saldo actual de la cuenta.

### Footer

El footer muestra el mensaje:

> **Developed with Love ❤️ By Francisco Herrera**

## Estructura del Proyecto

```bash
├── public/
│   ├── analisis.png           # Imagen de la sección Registrar Cliente
│   ├── billetera.png          # Imagen de la sección Recargar Billetera
│   ├── compensacion-de-trabajadores.png  # Imagen de la sección Hacer Pago
│   ├── prestamo.png           # Imagen de la sección Consultar Saldo
├── src/
│   ├── components/
│   │   ├── ClientRegister.js   # Componente para registrar clientes
│   │   ├── WalletRecharge.js   # Componente para recargar billetera
│   │   ├── MakePayment.js      # Componente para hacer pagos
│   │   ├── CheckBalance.js     # Componente para consultar saldo
│   ├── App.js                 # Componente principal de la aplicación
│   ├── index.css              # Estilos globales
│   ├── main.jsx               # Punto de entrada principal
└── README.md                  # Este archivo

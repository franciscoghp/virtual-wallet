# Microservicio de Cliente

![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)
![NestJS]

## Descripción

Este microservicio es responsable de comunicarse y servir como puente entre el usuario y la base de datos.

## Características

- **Registro de Clientes**
- **Recargar billetera**
- **Realizar pagos**
- **Consultar el saldo disponible**
  
## Tabla de Contenidos

- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Uso](#uso)
- [Rutas API](#rutas-api)
- [Contribuciones](#contribuciones)
- [Contacto](#contacto)

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el backend.
- **NestJS**: Framework para crear servidores web.
- **MongoDB**: Base de datos utilizada para almacenar la información de los clientes.

## Instalación

Sigue estos pasos para ejecutar el microservicio de cliente en tu entorno local:

1. Asegurate de accedor a la carpeta del client-service:

    ```bash
    cd client-service
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Ejecuta el servidor:

    ```bash
    npm run dev
    ```
    o
    ```bash
    npm start
    ```

El servidor estará disponible en [http://localhost:3001](http://localhost:3001).

## Uso

El microservicio de cliente proporciona las siguientes rutas:

### Rutas API

- **POST /wallet/register**: Crea un nuevo cliente.
  - Cuerpo de la solicitud:
    ```json
    {
        "document": "25359383",
        "name": "Francisco Herrera",
        "email": "francisco9mil@gmail.com",
        "phone": "04141452293"
    }
    ```
  - Respuesta:
    ```json
    {
        "success": true, 
        "message": 'Client registration emitted successfully' 
    }
    ```

- **POST /wallet/recharge**: Recarga una billetera.
  - Cuerpo de la solicitud:
    ```json
    {
        "document": "25359383",
        "phone": "04141452293",
        "amount": "9000"
    }
    ```
  - Respuesta:
    ```json
    { "success": true, 
      "message": 'Wallet recharged successfully' 
    };
    ```
- **POST /wallet/payment**: Realiza un pago.
  - Cuerpo de la solicitud:
    ```json
    {
        "document": "25359383",
        "phone": "04141452293",
        "amount": "2000"
    }
    ```
  - Respuesta:
    ```json
    {
        "message": "Se ha enviado un correo con el token de confirmación",
        "sessionId": "73b918d8-33ba-40e2-9074-8c3ed249dd84"
    }
    ```

- **POST /wallet/payment/confirm**: Confirma un pago.
  - Cuerpo de la solicitud:
    ```json
    {
        "token": "354587",
        "sessionId": "73b918d8-33ba-40e2-9074-8c3ed249dd84"
    }
    ```
  - Respuesta:
    ```json
    { "message":"Compra confirmada y saldo descontado" }
    ```

- **GET /wallet/balance/25359383/04141452293**: Consulta el saldo de una billetera.
  - Respuesta:
    ```json
     { "balance": 9000 }
    ```

## Contribuciones

Las contribuciones son bienvenidas. Sigue los pasos habituales para contribuir:

1. Haz un fork del repositorio.
2. Crea una rama nueva: `git checkout -b feature/nueva-funcionalidad`.
3. Realiza los cambios: `git commit -m 'Agregar nueva funcionalidad'`.
4. Haz push: `git push origin feature/nueva-funcionalidad`.
5. Abre un pull request.


## Contacto

- **Francisco Herrera** - [francisco9mil@gamil.com](mailto:francisco9mil@gamil.com)

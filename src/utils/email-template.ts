export const emailHtml = `
<!DOCTYPE html>
<html lang="es">


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido a Uniendo Culturas</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        body {
            font-family: 'Poppins', Arial, sans-serif;
            background-color: #fafafa;
            color: #333333;
            margin: 0;
            padding: 0;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fafafa;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #A435F0;
            color: white;
            text-align: center;
            padding: 20px;
        }

        .content {
            padding: 20px;
            line-height: 1.6;
        }

        .footer {
            text-align: center;
            font-size: 12px;
            color: #777777;
            padding: 10px;
            border-top: 1px solid #eeeeee;
        }

        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 16px;
            font-weight: 600;
            color: white;
            background-color: #A435F0;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="header">
            <h1>¡Bienvenido a Uniendo Culturas!</h1>
        </div>
        <div class="content">
            <p>Hola, <strong>{{userName}}</strong>,</p>
            <p>Estamos encantados de tenerte a bordo. Nuestro objetivo es proporcionarte la mejor experiencia posible.
            </p>
            <p>Haz clic en el siguiente botón para explorar nuestras funcionalidades y empezar:</p>
            <a href="{{welcomeLink}}" class="button">Explorar Ahora</a>
            <p>Si tienes alguna pregunta, no dudes en responder a este correo o visitar nuestra página de soporte.</p>
            <p>¡Gracias por elegirnos!</p>
            <p>El equipo de Uniendo Culturas</p>
        </div>
        <div class="footer">
            <p>© 2024 Uniendo Culturas. Todos los derechos reservados.</p>
            <p><a href="#">Política de privacidad</a> | <a href="#">Términos de servicio</a></p>
        </div>
    </div>
</body>

</html>
`;

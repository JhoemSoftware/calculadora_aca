<p align='center'>
    <img src='./typescript/public/cun.png' width='300'>
</p>
<h1 align='center'>Proyecto ACA</h1>

Proyecto de Calculadora la cual fue construída en las siguientes tecnologías:
<div>
    <img src='./typescript/public/rustLogo.png' width='50'>
    <b>Rust</b>: Lenguage de programación del Backend<br><br>
    <img src='./typescript/public/actix.png' width='55'>
    <b>Actix</b>: Framework de Rust para servidores web<br><br>
    <img src='./typescript/public/TS.png' width='48'>
    <b>TypeScript</b>: Lenguage de programación del typescript<br><br>
    <img src='./typescript/public/react.png' width='50'>
    <b>React</b>: Librería de JavaScript para el typescript<br><br>
    <img src='./typescript/public/bootstrap.png' width='48'>
    <b>Bootstrap</b>: Framework de CSS para el typescript<br><br>
</div>
<hr>

### Despliegue 🌎

El proyecto está desplegado en 2 servidores gratuitos (Render para el backend y Netlify para el frontend), a causa de esto la plataforma inicialmente puede presentar demoras ya que estos servicios se inactivan automáticamente cada 15 minutos de no uso. [Link sitio](https://calculadora-aca.netlify.app/)

<p align='center'>
<img src='./typescript/public/imagen.png' width='350'>
</p>

>[!NOTE]
> Es necesario iniciar o encender la calculadora para su funcionamiento

### Especificaciones Técnicas 👨🏻‍🏫

Aplicación backend en <b>Rust</b> responde a peticiones de tipo POST en el endpont: <code>https://backend-calculadora-m2nh.onrender.com/calcular</code>, requiere un body en la petición de la siguiente manera:
```json
{
    "num1":5,
    "num2":0,
    "operador":"/"
}
```
Y esta responde de la siguiente manera:
```json
{
    "error":"División por cero no es permitida"
}
```

> Podemos hacer una petición previa al servidor backend antes de iniciar el frontend para una mejor experiencia de usuario <code>curl -X POST https://backend-calculadora-m2nh.onrender.com/calcular -H "Content-Type: application/json" -d '{"num1":5, "num2":2, "operador":"*"}'</code> lo que nos respondería: <code>{"resultado":10.0}</code>
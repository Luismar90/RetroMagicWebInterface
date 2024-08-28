require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Ruta para manejar el acceso a la raíz ("/")
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Reemplaza 'index.html' con tu archivo HTML
});

// Configura Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Ruta para manejar el envío del formulario
app.post('/submit', (req, res) => {
  const { nombre, email, mensaje } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // Tu correo como destinatario
    subject: `Comentario de ${nombre}`,
    text: mensaje,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).send('Error al enviar el correo.');
    } else {
      console.log('Correo enviado:', info.response);
      res.status(200).send('Comentario enviado con éxito.');
    }
  });
});

// Inicia el servido
app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});

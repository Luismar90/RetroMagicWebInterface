document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('comentario-form');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Previene el envío del formulario por defecto
  
      // Validación adicional
      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const mensaje = document.getElementById('mensaje').value;
  
      if (nombre === '' || email === '' || mensaje === '') {
        alert('Todos los campos son obligatorios.');
        return;
      }
  
      // Enviar datos al servidor
      fetch('http://localhost:3000/submit', { // Asegúrate de usar la URL correcta
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre,
          email: email,
          mensaje: mensaje
        }),
      })
      .then(response => response.text())
      .then(data => {
        console.log('Success:', data);
        alert('Gracias por tu comentario, ' + nombre + '!');
        form.reset();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    });
    
  });
  
  
  
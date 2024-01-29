function crearTarjeta(producto) {
    var tarjeta = document.createElement('div');
    tarjeta.className = 'cuadrante';

    var imagen = document.createElement('img');
    imagen.src = producto.imagen + ".webp"; 
    imagen.alt = producto.titulo;

    imagen.onclick = function() {
        window.location.href = producto.pages;
    };

    var precio = document.createElement('h2');
    precio.textContent = 'PRECIO: $' + producto.precio

    var descripcion = document.createElement('p');
    descripcion.textContent = producto.titulo;


    tarjeta.appendChild(imagen);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(descripcion);

    return tarjeta;
}

var contenedorProductos = document.getElementById('contenedor-productos');

fetch('../base-de-datos/productos.json')
    .then(response => response.json())
    .then(data => {
        // Crear y agregar tarjetas al contenedor
        data.productos.forEach(function(producto) {
            contenedorProductos.appendChild(crearTarjeta(producto));
        });
    })
    .catch(error => console.error('Error al obtener datos:', error));

document.addEventListener('DOMContentLoaded', function () {
    var carritoLista = document.getElementById('carrito-lista');
    var totalElemento = document.getElementById('total');
    var vaciarCarritoBtn = document.getElementById('vaciar-carrito-btn');
    var finalizarCompraBtn = document.getElementById('finalizar-compra-btn');
    var total = 0;
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];


    window.addEventListener('message', function (event) {
        if (event.origin !== 'https://tu-dominio.com') {
            return;
        }

        var data = event.data;
        if (data.action === 'agregarAlCarrito') {
            agregarAlCarrito(data.producto);
        }
    });

    vaciarCarritoBtn.addEventListener('click', function () {
        vaciarCarrito();
    });

    finalizarCompraBtn.addEventListener('click', function () {
        finalizarCompra();
    });

    renderizarCarrito();

    function agregarAlCarrito(producto) {
        carrito.push(producto);

        localStorage.setItem('carrito', JSON.stringify(carrito));

        renderizarCarrito();

        Swal.fire({
            icon: 'success',
            title: 'Producto agregado al carrito',
            showConfirmButton: false,
            timer: 1500
        });
    }

    function vaciarCarrito() {
        carrito = [];
        localStorage.setItem('carrito', JSON.stringify(carrito));

        renderizarCarrito();
    }

    function finalizarCompra() {
        vaciarCarrito();

        Swal.fire({
            icon: 'success',
            title: 'Compra realizada con éxito',
            showConfirmButton: false,
            timer: 5000
        }).then(function () {
            window.location.href = '../index.html';
        });
    }

    function renderizarCarrito() {
        total = carrito.reduce(function (sum, producto) {
            return sum + producto.precio;
        }, 0);

        carritoLista.innerHTML = '';
        carrito.forEach(function (producto) {
            var productoElemento = document.createElement('li');
            productoElemento.classList.add('producto-en-carrito');

            var imagen = document.createElement('img');
            imagen.src = producto.imagen;
            imagen.alt = producto.nombre;
            imagen.classList.add('producto-imagen');
            productoElemento.appendChild(imagen);

            var nombreElemento = document.createElement('p');
            nombreElemento.textContent = producto.nombre;
            productoElemento.appendChild(nombreElemento);

            var precioElemento = document.createElement('p');
            precioElemento.textContent = `Precio: $${producto.precio.toFixed(2)}`;
            productoElemento.appendChild(precioElemento);

            carritoLista.appendChild(productoElemento);
        });

        totalElemento.textContent = `Total: $${total.toFixed(2)}`;
    }
});

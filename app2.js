document.addEventListener('DOMContentLoaded', function () {
    const productosContainer = document.getElementById('productos');
    const carritoContainer = document.getElementById('carrito');
    let carrito = [];
    

    // Obtener el carrito desde localStorage al cargar la página
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];


    if ((carritoGuardado.length >= 1)) {
        alert("Guardamos tu compra en el local storage, puedes agregar más productos!");
        carrito = carritoGuardado;
        actualizarCarrito();
    } else {
        alert("No tienes productos agregados");
    }

    // Resto de tu código ...

    const productos = [
        { nombre: "Call of Duty Modern Warfare 1 reboot", valor: 10000, descripcion: "Nuevo", img: "./imagen/mw1.jpg" },
        { nombre: "Call of Duty Modern Warfare 2 reboot", valor: 20000, descripcion: "Nuevo", img: "./imagen/mw2.jpg" },
        { nombre: "Call of Duty Modern Warfare 3 reboot", valor: 30000, descripcion: "Nuevo", img: "./imagen/mw3.jpg" },
    ];

    // Función para agregar productos al contenedor
    function mostrarProductos() {
        productos.forEach(producto => {
            const productoElement = document.createElement('div');
            productoElement.classList.add('producto');

            const precioFormateado = producto.valor.toLocaleString('es-ES', { style: 'currency', currency: 'CLP' });

            productoElement.innerHTML = `
                <h2>${producto.nombre}</h2>
                <p>${producto.descripcion}</p>
                <p>Precio: ${precioFormateado}</p>
                <img src="${producto.img}" alt="${producto.nombre}">
                <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.valor})">Agregar al carrito</button>
            `;

            productosContainer.appendChild(productoElement);
        });
    }
    
    // Función para agregar al carrito      // windows pa ra destinarl a al ambito global
    window.agregarAlCarrito = function (nombre, valor) {
        const productoEnCarrito = carrito.find(item => item.nombre === nombre);

        if (productoEnCarrito) {
            productoEnCarrito.cantidad += 1;
        } else {
            carrito.push({ nombre, valor, cantidad: 1 });
        }



    // Guardar carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));





        actualizarCarrito();
        alert(`¡${nombre} agregado al carrito por $${valor}!`);
    };

    // Función para eliminar un producto del carrito
    window.eliminarDelCarrito = function (nombre) {
        const productoIndex = carrito.findIndex(item => item.nombre === nombre);

        if (productoIndex !== -1) {
            carrito.splice(productoIndex, 1);



        // Guardar carrito en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));



            actualizarCarrito();
            alert(`¡${nombre} eliminado del carrito!`);
        }
    };

    // Función para actualizar la visualización del carrito
    function actualizarCarrito() {
        carritoContainer.innerHTML = '<h2>Carrito de Compras</h2>';

        let totalCarrito = 0;
        let numProductosCarrito = 0; // Nueva variable para contar el número de productos en el carrito




        carrito.map(item => {
            const itemElement = document.createElement('div');
            const subtotal = item.valor * item.cantidad;
            totalCarrito += subtotal;
            numProductosCarrito += item.cantidad; // Incrementar el contador


            //subtotal a cl
            const subtotalFormateado = subtotal.toLocaleString('es-ES', { style: 'currency', currency: 'CLP' });

            itemElement.innerHTML = `
                <p>${item.nombre} x${item.cantidad} - Subtotal: ${subtotalFormateado}
                <button onclick="eliminarDelCarrito('${item.nombre}')">Eliminar</button></p>
            `;
            carritoContainer.appendChild(itemElement);
        });

        //tranformar a cl
        const totalCarritoFormateado = totalCarrito.toLocaleString('es-ES', { style: 'currency', currency: 'CLP' });

        const totalElement = document.createElement('div');
        totalElement.innerHTML = `<p>Total del Carrito: ${totalCarritoFormateado}</p>`;

        carritoContainer.appendChild(totalElement);



   // Actualizar el número de productos en el carrito
   const numProductosCarritoElement = document.getElementById('numProductosCarrito');
   numProductosCarritoElement.textContent = ` (${numProductosCarrito})`;




    }

    // Llama a la función para mostrar los productos
    mostrarProductos();
});

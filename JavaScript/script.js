const productos = []

class Producto {
    static id = 1;
    constructor(nombre, precio, img) {
        this.id = Producto.id++;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
    }
}

function agregarProducto(nombre, precio, img) {
    let nuevoProducto = new Producto(nombre, precio, img);
    productos.push(nuevoProducto)
}

const contProductos = document.querySelector(".cont-productos")

const mostrarProductos = (listaProductos) => {
    listaProductos.forEach(producto => {
        const tarjetaProducto = document.createElement("article");
        tarjetaProducto.setAttribute("class", "tarjeta-prod")
        tarjetaProducto.innerHTML = `
            <img class="img-prod" src="${producto.img}" alt="${producto.nombre}">
            <div class="texto-prod">
                <h3 class="nombre-prod">${producto.nombre}</h3>
                <h3 class="precio-prod">$${producto.precio}</h3>
                <button id="${producto.id}" class="boton-prod">Agregar al carrito</button>
            </div>
        `;
        contProductos.appendChild(tarjetaProducto);
    })

    const botonProd = document.querySelectorAll(".boton-prod")

    botonProd.forEach(btn =>
        btn.addEventListener("click", (event) =>
            agregarCarrito(event.target.id),
        )
    )

    botonProd.forEach(btn =>
        btn.addEventListener("click", () => {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                showConfirmButton: false,
                timer: 1200,
                title: "¡Agregado al carrito con éxito!"
            })
        }))
}

const productosPreexistentes = async () => {
    if (productos.length === 0) {
        try {
            const URLProductos = "./productos.JSON";
            const productosBase = await fetch(URLProductos);
            const productosBaseJSON = await productosBase.json()
            productosBaseJSON.forEach(producto => {
                agregarProducto(producto.nombre, producto.precio, producto.img)
            })
        } catch (err) {
            console.error("Se produjo un error al obtener los productos:", err)
        } finally {
            mostrarProductos(productos)
        }
    }
}

let carrito = []

const convertirCarrito = (lista) => {
    const carritoJSON = JSON.stringify(lista);
    localStorage.setItem("carritoJSON", carritoJSON);
}

const encontrarCarrito = () => {
    const carritoLocal = localStorage.getItem("carritoJSON");
    if (carritoLocal === "" || carritoLocal === null) { } else {
        carrito = JSON.parse(carritoLocal);
    }
}

const mostrarCarrito = document.querySelector(".texto-carrito")
const finCompra = document.querySelector(".fin-compra");
const verCarrito = document.querySelector(".ver-carrito")

function totalCarrito() {
    let total = 0;
    if (carrito !== null || carrito !== "") {
        for (i = 0; i < carrito.length; i++) {
            total += carrito[i].precio * carrito[i].cantidad
        }
    }
    mostrarCarrito.innerText = `El total de tu carrito es $${total}`;
}

function agregarCarrito(id) {
    let productoCarrito = productos.find(prod => prod.id === parseInt(id));
    if (carrito.some(prod => prod.id === parseInt(id))) {
        productoCarrito.cantidad++
    } else {
        productoCarrito.cantidad = 1;
        carrito.push(productoCarrito);
    }
    convertirCarrito(carrito)
    totalCarrito()
}

const contenidoCarrito = () => {
    if (carrito.length > 0) {
        let listaCarrito = "";
        carrito.forEach(prod => {
            listaCarrito += `${prod.nombre}: ${prod.cantidad} <br>`
        })
        return listaCarrito
    } else {
        return "El carrito de compras está vacío"
    }
}

finCompra.addEventListener("click", () => {
    if (carrito.length > 0) {
        Swal.fire({
            title: "¡Muchas gracias por tu compra!",
            icon: "success",
            confirmButtonColor: "#6e85a3"
        });
        carrito = [];
        localStorage.setItem("carritoJSON", "")
        totalCarrito();
    } else {
        Swal.fire({
            html: contenidoCarrito(),
            confirmButtonColor: "#6e85a3",
            confirmButtonText: "Aceptar",
        })
    }
})

verCarrito.addEventListener("click", () => {
    if (carrito.length > 0) {
        Swal.fire({
            html: contenidoCarrito(),
            showCancelButton: true,
            reverseButtons: true,
            cancelButtonColor: "#6e85a3",
            cancelButtonText: "Volver",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Vaciar",
        }).then((result) => {
            if (result.isConfirmed) {
                carrito = [];
                localStorage.setItem("carritoJSON", "");
                totalCarrito()
            }
        });
    } else {
        Swal.fire({
            html: contenidoCarrito(),
            confirmButtonColor: "#6e85a3",
            confirmButtonText: "Aceptar",
        })
    }
})

const app = () => {
    productosPreexistentes()
    encontrarCarrito()
    convertirCarrito(carrito)
    totalCarrito()
}

app()
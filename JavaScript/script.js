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
    let nuevoProducto = new Producto(nombre, precio, img)
    productos.push(nuevoProducto)
}

agregarProducto("Remera", 15000, "https://cdn.pixabay.com/photo/2023/05/06/01/34/t-shirt-7973404_1280.jpg")
agregarProducto("Gorra", 5000, "https://cdn.pixabay.com/photo/2017/07/21/14/28/hat-2525910_1280.png")
agregarProducto("Jean", 20000, "https://cdn.pixabay.com/photo/2018/10/10/14/23/pants-3737399_1280.jpg")
agregarProducto("Medias", 3000, "https://cdn.pixabay.com/photo/2015/04/09/19/56/sock-715024_960_720.jpg")
agregarProducto("Campera", 40000, "https://cdn.pixabay.com/photo/2017/09/07/04/54/khaki-2723896_1280.jpg")
agregarProducto("Zapatillas", 35000, "https://cdn.pixabay.com/photo/2020/07/15/18/24/footwear-5408640_960_720.png")

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
}

mostrarProductos(productos)

const botonProd = document.querySelectorAll(".boton-prod")

botonProd.forEach(btn =>
    btn.addEventListener("click", (event) =>
        agregarCarrito(event.target.id)
    )
)

let carrito = []

function agregarCarrito(id) {
    let productoCarrito = productos.find(prod => prod.id === parseInt(id));
    if (carrito.some(prod => prod.id == parseInt(id))) {
        productoCarrito.cantidad++
    } else {
        productoCarrito.cantidad = 1;
        carrito.push(productoCarrito);
    }
    totalCarrito()
}

const mostrarCarrito = document.querySelector(".texto-carrito")

const totalCarrito = () => {
    let total = 0
    for (i = 0; i < carrito.length; i++) {
        total += carrito[i].precio * carrito[i].cantidad
    }
    mostrarCarrito.innerText = `El total de tu carrito es $${total}`;
}

const finCompra = document.querySelector(".fin-compra");
finCompra.addEventListener("click", () => {
    alert("Muchas gracias por tu compra!")
    carrito = [];
    totalCarrito();
} )
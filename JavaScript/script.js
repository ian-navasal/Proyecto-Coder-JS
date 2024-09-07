const productos = [
    { nombre: "remera", precio: 15000 },
    { nombre: "buzo", precio: 25000 },
    { nombre: "jean", precio: 20000 },
    { nombre: "medias", precio: 3000 }
]

const carrito = []

let listaProductos = "Estos son nuestros productos: \n"
for (let i = 0; i < productos.length; i++) {
    listaProductos += `\n ${productos[i].nombre} - $ ${productos[i].precio}`
}

let cantidad = ""

const agregarCarrito = () => {
    let item = prompt("Que producto desea añadir al carrito? \n \n" + listaProductos).toLowerCase()
    switch (item) {
        case "remera":
            cantidad = parseInt(prompt("Cuantas unidades desea añadir?"))
            carrito.push({ nombre: productos[0].nombre, precio: productos[0].precio, unidades: cantidad })
            break;
        case "buzo":
            cantidad = parseInt(prompt("Cuantas unidades desea añadir?"))
            carrito.push({ nombre: productos[1].nombre, precio: productos[1].precio, unidades: cantidad })
            break;
        case "jean":
            cantidad = parseInt(prompt("Cuantas unidades desea añadir?"))
            carrito.push({ nombre: productos[2].nombre, precio: productos[2].precio, unidades: cantidad })
            break;
        case "medias":
            cantidad = parseInt(prompt("Cuantas unidades desea añadir?"))
            carrito.push({ nombre: productos[3].nombre, precio: productos[3].precio, unidades: cantidad })
            break;
        default: alert("No encontramos ese producto, intenta nuevamente.")
            agregarCarrito()
    }
}

const totalCarrito = () => {
    let total = 0
    for (i = 0; i < carrito.length; i++) {
        total += carrito[i].precio * carrito[i].unidades
    }
    return total
}

const app = () => {
    let bienvenida = confirm("Bienvenido a nuestra tienda! \n\nDesea agregar productos a su carrito de compras?")
    if (bienvenida) {
        let loop = true
        while (loop) {
            agregarCarrito()
            loop = confirm("Quiere agregar otro producto al carrito?")
        }
        totalCarrito()
        alert("El valor total de su carrito es de $" + totalCarrito() + ". Gracias por tu compra!")
    } else {
        alert("Gracias por visitarnos, hasta pronto!")
    }
}

app()
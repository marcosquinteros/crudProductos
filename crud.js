let productos = [];

const listaProductos = document.getElementById("listaProductos");
const agregarProductos = document.getElementById("agregarProductosForm");
const nombreProducto = document.getElementById("nombreProducto");
const precioProducto = document.getElementById("precio");
const descripcion = document.getElementById("descripcion");
// const codigo = document.getElementById("codigo");
const addButton = document.getElementById("addProductosButton");

//Funcion para agregar o actualizar los productos

addButton.addEventListener("click", (e) => {
  e.preventDefault();

  const name = nombreProducto.value;
  const price = precioProducto.value;
  const desc = descripcion.value;
  const mode = addButton.dataset.mode;
  const editId = addButton.dataset.editId;

  if (mode === "add") {
    const id = uuidv4();
    const producto = { id, name, price, desc };
    productos.push(producto);
  } else if (mode === "editar") {
    const index = productos.findIndex((producto) => producto.id === editId);
    if (index !== -1) {
      const product = productos[index];
      product.name = name;
      product.price = price;
      product.desc;
    }

    agregarProductos.reset(); // reseteamos el formulario
    addButton.dataset.mode = "add";
    addButton.textContent = "Agregar";

    //Agrear funcion para actualizar la lista de productos
    mostrarProductos();
    localStorage.setItem("productos", JSON.stringify(productos));
  }
});

// Funcion para editar los productos
listaProductos.addEventListener("click", (e) => {
  if (e.target.classList.conains("editar")) {
    const id = e.target.dataset.id; //obtenemos el producto a editar
    const producto = productos.find((producto) => producto.id === id);
    if (producto) {
      document.getElementById("nombreProducto").value = product.name;
      document.getElementById("precioProducto").value = product.price;
      document.getElementById("descripcion").value = product.desc;

      agregarProductos.dataset.mode = "editar";
      agregarProductos.dataset.editId = id;
      addButton.textContent = "Editar";
    }
  }
  mostrarProductos();
});

//Funcion para eliminar los productos
listaProductos.addEventListener("click", (e) => {
  if (e.target.classList.contains("eliminar")) {
    const id = e.target.dataset.id;
    const index = productos.findIndex((producto) => producto.id === id);
    if (index !== -1) {
      productos.splice(index, 1);
    }
  }
});
//Funcion para generar id unico
function uuidv4() {
  return crypto.randomUUID();
}

//Funcion para guardar los productos en el localStorage

function mostrarProductos() {
  listaProductos.querySelector("tbody").innerHTML = "";

  productos.forEach((producto) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${producto.name}</td>
    <td>${producto.price}</td>
    <td>${producto.desc}</td>
    <td>
    <button class="editar" data-id="${producto.id}">Editar</button>
    <button class="eliminar" data-id="${producto.id}">Eliminar</button>;
    </td>`;
    listaProductos.querySelector("tbody").appendChild(tr);
  });
  //Funcion que obtiene los productos del localStorage
  // localStorage.setItem("productos", JSON.stringify(productos));
}

//Funcion que muestra los productos del DOM
const obtenerProductos = localStorage.getItem("productos");
if (obtenerProductos) {
  productos = JSON.parse(obtenerProductos);
}

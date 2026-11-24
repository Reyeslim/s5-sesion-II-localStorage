const submenu = document.querySelector(".submenu-sticky")

if (submenu) {
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY // devuelve los píxeles que un documento ha scrolleado desde arriba
    // console.log(currentScroll)

    if (currentScroll > 100) {
      submenu.classList.add("scrolled")
    } else {
      submenu.classList.remove("scrolled")
    }
  })
}

const btnModoOscuro = document.querySelector("#btnModoOscuro")
const body = document.body

function aplicarModoOscuro(activar) {
  if (activar) {
    body.classList.add("modo-oscuro")
    localStorage.setItem("modoOscuro", "true")
  } else {
    body.classList.remove("modo-oscuro")
    localStorage.setItem("modoOscuro", "false")
  }
}

btnModoOscuro.addEventListener("click", () => {
  const isDarkMode = body.classList.contains("modo-oscuro") // SI ES CLARO ME LLEGA FALSE
  console.log(isDarkMode)
  aplicarModoOscuro(!isDarkMode)
})

function cargarPrefereciaTema() {
  const temaGuardado = localStorage.getItem("modoOscuro") // true o false

  if (temaGuardado === "true") {
    aplicarModoOscuro(true)
  }
}

function renderizarProductosPorCategoria() {
  const categorias = [
    { nombre: "Portatiles", idContenedor: "portatiles-container" },
    { nombre: "Accesorios", idContenedor: "accesorios-container" },
    { nombre: "Monitores", idContenedor: "monitores-container" },
  ]

  categorias.forEach((categoria) => {
    const container = document.getElementById(categoria.idContenedor)
    if (!container) {
      return
    }

    const productosCategoria = productos.filter(
      (producto) => producto.categoria === categoria.nombre,
    )

    if (productosCategoria.length === 0) {
      container.innerHTML = `<p class="mensaje-vacio">No hay productos para esta categoría</p>`
      return
    }

    container.innerHTML = productosCategoria
      .map(({ nombre, precio, descripcion, stock }) => {
        return `
          <div class="producto-card">
            <h4>${nombre}</h4>
            <p class="producto-descripcion">${descripcion}</p>
            <div class="producto-footer">
              <span class="producto-precio">${precio.toFixed(2)}€</span>
              <span class="producto-stock">Stock: ${stock}</span>
            </div>
          </div>
      `
      })
      .join("")
  })
}

// Render con Object.keys

// function renderizarConObject() {
//   const categorias = {
//     Portatiles: "portatiles-container",
//     Accesorios: "accesorios-container",
//     Monitores: "monitores-container",
//   }

//   Object.keys(categorias).forEach((categoria) => {
//     const container = document.getElementById(categorias[categoria])
//     if (!container) {
//       return
//     }

//     const productosCategoria = productos.filter(
//       (producto) => producto.categoria === categoria,
//     )

//     if (productosCategoria.length === 0) {
//       container.innerHTML = `<p class="mensaje-vacio">No hay productos para esta categoría</p>`
//       return
//     }

//     container.innerHTML = productosCategoria
//       .map(({ nombre, precio, descripcion, stock }) => {
//         return `
//           <div class="producto-card">
//             <h4>${nombre}</h4>
//             <p class="producto-descripcion">${descripcion}</p>
//             <div class="producto-footer">
//               <span class="producto-precio">${precio.toFixed(2)}€</span>
//               <span class="producto-stock">Stock: ${stock}</span>
//             </div>
//           </div>
//       `
//       })
//       .join("")
//   })
// }

cargarPrefereciaTema()
renderizarProductosPorCategoria()

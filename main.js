const container = document.getElementById("container")
const btnPrev = document.querySelector(".anterior")
const btnNext = document.querySelector(".siguiente")
let paginaActual = 1
let totalPages = 0
//let totalDePersonajes = 0
const todosBtn = document.getElementById("todos")
const mujeresBtn = document.getElementById("mujeres")
const hombresBtn = document.getElementById("hombres")
const sinGerenoBtn = document.getElementById("sinGenero")
const desconocidoBtn = document.getElementById("desconocido")
let filterParam = ""
let valueParam = ""
const ultimaPaginaBtn = document.getElementById("ultimaPaginaBtn")
const primeraPaginaBtn = document.getElementById("primeraPaginaBtn")
//const containerCantidadDePersonajes = document.getElementById("containerCantidadDePersonajes")
const paginas = document.getElementById("totalPaginas")



function getCharacters(paginaActual, filterParam, valueParam) {
  fetch(`https://rickandmortyapi.com/api/character?page=${paginaActual}&${filterParam}=${valueParam}`)
    .then(res => res.json())
    .then((data) => {
      renderCharacters(data)
      totalPages = data.info.pages
      paginas.innerHTML =
        `<p>Total de páginas: ${totalPages}</p>
      <label for="pageSelect">Selecciona una página: </label>
    <select id="pageSelect"></select>`
    
    })
}



getCharacters()



function renderCharacters(data) {
  // totalDePersonajes = data.info.count
  // containerCantidadDePersonajes.innerHTML = 
  // `<p>Cantidad total de personajes:${totalDePersonajes}</p>`
  container.innerHTML = ""
  data.results.forEach(character => {
    container.innerHTML +=
      `<div class="card">
   <img src="${character.image}" alt="">
   <div class="nombre">
   <h2>${character.name}</h2>
   <button class="button" onclick=verDescripcion("${character.url}")>Ver más</button>
</div></div>`
    btnPrev.classList.remove("oculto")
    btnNext.classList.remove("oculto")
    ultimaPaginaBtn.classList.remove("oculto")
    primeraPaginaBtn.classList.remove("oculto")
    paginas.classList.remove("oculto")
    todosBtn.classList.remove("oculto")
    mujeresBtn.classList.remove("oculto")
    hombresBtn.classList.remove("oculto")
    sinGerenoBtn.classList.remove("oculto")
    desconocidoBtn.classList.remove("oculto")


  })
}

const verDescripcion = (characterUrl) => {
  container.innerHTML = ""
  fetch(characterUrl)
    .then(res => res.json())
    .then((character) => {
      container.innerHTML =
        `<div class="card-detalles">
    <img src="${character.image}" alt="">
    <div class="card-detalles_descripcion">
    <h2>${character.name}</h2>
    <p>Estado: ${character.status}</p>
    <p>Especie: ${character.species}</p>
    <p>Género: ${character.gender}</p>
    <p>Origen: ${character.origin.name}</p>
    <p>Locación: ${character.location.name}</p>
    <button class="button" onclick=getCharacters()>Volver</button>
    </div></div>`
      btnPrev.classList.add("oculto")
      btnNext.classList.add("oculto")
      ultimaPaginaBtn.classList.add("oculto")
      primeraPaginaBtn.classList.add("oculto")
      paginas.classList.add("oculto")
      todosBtn.classList.add("oculto")
      mujeresBtn.classList.add("oculto")
    hombresBtn.classList.add("oculto")
    sinGerenoBtn.classList.add("oculto")
    desconocidoBtn.classList.add("oculto")
    })

}



btnPrev.addEventListener("click", () => {
  paginaActual -= 1
  if (paginaActual <= 1) {
    btnPrev.setAttribute("disabled", true)
  }
  if (paginaActual <= totalPages) {
    btnNext.removeAttribute("disabled", true)

  }


  getCharacters(paginaActual, filterParam, valueParam)
})

btnNext.addEventListener("click", () => {
  paginaActual += 1

  getCharacters(paginaActual, filterParam, valueParam)
  if (paginaActual >= 1) {
    btnPrev.removeAttribute("disabled", true)
  }
  if (paginaActual >= totalPages) {
    btnNext.setAttribute("disabled", true)

  }

})



todosBtn.addEventListener("click", () => {
  filterParam = ""
  valueParam = ""
  getCharacters(paginaActual, filterParam, valueParam)
  btnNext.removeAttribute("disabled", true)
})
mujeresBtn.addEventListener("click", () => {
  filterParam = "gender"
  valueParam = "female"
  getCharacters(paginaActual, filterParam, valueParam)
  btnNext.removeAttribute("disabled", true)
})

hombresBtn.addEventListener("click", () => {
  filterParam = "gender"
  valueParam = "male"
  getCharacters(paginaActual, filterParam, valueParam)
  btnNext.removeAttribute("disabled", true)
})
sinGerenoBtn.addEventListener("click", () => {
  filterParam = "gender"
  valueParam = "genderless"
  getCharacters(paginaActual, filterParam, valueParam)
  btnNext.setAttribute("disabled", true)
})

desconocidoBtn.addEventListener("click", () => {
  filterParam = "gender"
  valueParam = "unknown"
  getCharacters(paginaActual, filterParam, valueParam)
  btnNext.removeAttribute("disabled", true)
})

ultimaPaginaBtn.addEventListener("click", () => {
  paginaActual = totalPages
  getCharacters(paginaActual, filterParam, valueParam)
  btnNext.setAttribute("disabled", true)
  btnPrev.removeAttribute("disabled", true)

})

primeraPaginaBtn.addEventListener("click", () => {
  paginaActual = 1
  getCharacters(paginaActual, filterParam, valueParam)
  btnPrev.setAttribute("disabled", true)
  btnNext.removeAttribute("disabled", true)
})









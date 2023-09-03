const container = document.getElementById("container")
const btnPrev = document.querySelector(".anterior")
const btnNext = document.querySelector(".siguiente")
let paginaActual = 1
let totalPages = 0
const todosBtn = document.getElementById("todos")
const mujeresBtn = document.getElementById("mujeres")
const hombresBtn = document.getElementById("hombres")
const sinGerenoBtn = document.getElementById("sinGenero")
const desconocidoBtn = document.getElementById("desconocido")
let filterParam = ""
let valueParam = ""

const getCharacters = (paginaActual, filterParam, valueParam) => {
  fetch(`https://rickandmortyapi.com/api/character?page=${paginaActual}&${filterParam}=${valueParam}`)
    .then(res => res.json())
    .then((data) => {
      renderCharacters(data)
      totalPages = data.info.pages

    })
}

getCharacters()

const renderCharacters = (data) => {
  container.innerHTML = ""
  data.results.forEach(character => {
    container.innerHTML +=
      `<div class="card">
   <img src="${character.image}" alt="">
   <div class="nombre">
   <h2>${character.name}</h2>
   <button class="button" onclick=verDescripcion("${character.url}")>Ver más</button>
</div></div>`
  });
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
})
mujeresBtn.addEventListener("click", () => {
  filterParam = "gender"
  valueParam = "female"
  getCharacters(paginaActual, filterParam, valueParam)
})

hombresBtn.addEventListener("click", () => {
  filterParam = "gender"
  valueParam = "male"
  getCharacters(paginaActual, filterParam, valueParam)
})
sinGerenoBtn.addEventListener("click", () => {
  filterParam = "gender"
  valueParam = "genderless"
  getCharacters(paginaActual, filterParam, valueParam)
  
})

desconocidoBtn.addEventListener("click", () => {
  filterParam = "gender"
  valueParam = "unknown"
  getCharacters(paginaActual, filterParam, valueParam)
})









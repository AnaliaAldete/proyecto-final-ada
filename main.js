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
const ultimaPaginaBtn = document.getElementById("ultimaPaginaBtn")
const primeraPaginaBtn = document.getElementById("primeraPaginaBtn")
const paginas = document.getElementById("totalPaginas")
const totalPersonajes = document.getElementById("totalPersonajes")
const navegador = document.getElementById("navegador")
const labelPageSelect = document.getElementById("labelPageSelect")


function getCharacters(paginaActual, filterParam, valueParam) {

  fetch(`https://rickandmortyapi.com/api/character?page=${paginaActual}&${filterParam}=${valueParam}`)
    .then(res => res.json())
    .then((data) => {
      renderCharacters(data)
      totalPages = data.info.pages
      paginas.innerHTML =
        `<p>Total de páginas: ${totalPages}</p>`
      totalPersonajes.innerHTML = `<p>Cantidad total de personajes: ${data.info.count}</p><p>Cantidad de personajes por página: ${data.results.length}</p>`


      cargarOpcionesDePagina()
    })
}

getCharacters()

function renderCharacters(data) {
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
    navegador.classList.remove("oculto")
    totalPersonajes.classList.remove("oculto")
    pageSelect.classList.remove("oculto")
    labelPageSelect.classList.remove("oculto")
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
      navegador.classList.add("oculto")
      totalPersonajes.classList.add("oculto")
      pageSelect.classList.add("oculto")
      labelPageSelect.classList.add("oculto")

    })
}


btnPrev.addEventListener("click", () => {
  paginaActual -= 1;

  if (paginaActual <= 1) {
    btnPrev.setAttribute("disabled", true);
    primeraPaginaBtn.setAttribute("disabled", true);
  } else {
    btnPrev.removeAttribute("disabled");
    primeraPaginaBtn.removeAttribute("disabled");
  }

  if (paginaActual < totalPages) {
    btnNext.removeAttribute("disabled");
    ultimaPaginaBtn.removeAttribute("disabled");
  }
  getCharacters(paginaActual, filterParam, valueParam);
});

btnNext.addEventListener("click", () => {
  paginaActual += 1;

  if (paginaActual >= totalPages) {
    btnNext.setAttribute("disabled", true);
    ultimaPaginaBtn.setAttribute("disabled", true);
  } else {
    btnNext.removeAttribute("disabled");
    ultimaPaginaBtn.removeAttribute("disabled");
  }

  if (paginaActual > 1) {
    btnPrev.removeAttribute("disabled");
    primeraPaginaBtn.removeAttribute("disabled");
  }

  getCharacters(paginaActual, filterParam, valueParam);
});

ultimaPaginaBtn.addEventListener("click", () => {
  paginaActual = totalPages;
  getCharacters(paginaActual, filterParam, valueParam);
  btnNext.setAttribute("disabled", true);
  btnPrev.removeAttribute("disabled");
  ultimaPaginaBtn.setAttribute("disabled", true);
  if (paginaActual === 1) {
    primeraPaginaBtn.setAttribute("disabled", true);
  } else {
    primeraPaginaBtn.removeAttribute("disabled");
  }
});



primeraPaginaBtn.addEventListener("click", () => {
  paginaActual = 1;
  getCharacters(paginaActual, filterParam, valueParam);
  btnPrev.setAttribute("disabled", true);
  btnNext.removeAttribute("disabled");
  primeraPaginaBtn.setAttribute("disabled", true);
  ultimaPaginaBtn.removeAttribute("disabled");
});




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


function cargarOpcionesDePagina() {
  const pageSelect = document.getElementById("pageSelect")
  pageSelect.innerHTML = ""
  for (let i = 1; i <= totalPages; i++) {
    const option = document.createElement("option")
    option.value = i
    option.innerHTML = `${i}`
    pageSelect.appendChild(option)
  }
  pageSelect.value = paginaActual;
}

const pageSelect = document.getElementById("pageSelect");
pageSelect.addEventListener("change", () => {
  paginaActual = pageSelect.value;
  getCharacters(paginaActual, filterParam, valueParam);
  cargarOpcionesDePagina();

  if (paginaActual == totalPages) {
    ultimaPaginaBtn.setAttribute("disabled", true);
    btnNext.setAttribute("disabled", true);
  } else {
    ultimaPaginaBtn.removeAttribute("disabled");
    btnNext.removeAttribute("disabled");
  }

  if (paginaActual == 1) {
    primeraPaginaBtn.setAttribute("disabled", true);
    btnPrev.setAttribute("disabled", true);
  } else {
    primeraPaginaBtn.removeAttribute("disabled");
    btnPrev.removeAttribute("disabled");
  }
});








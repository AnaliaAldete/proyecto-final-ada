const container = document.getElementById("container");
const btnPrev = document.querySelector(".anterior");
const btnNext = document.querySelector(".siguiente");
let paginaActual = 1;
let totalPages = 0;
const todos = document.getElementById("todos");
const mujeres = document.getElementById("mujeres");
const hombres = document.getElementById("hombres");
const sinGereno = document.getElementById("sinGenero");
const desconocido = document.getElementById("desconocido");
const vivos = document.getElementById("vivos");
const muertos = document.getElementById("muertos");
const estadoDesconocido = document.getElementById("estadoDesconocido");
let filterParam = "";
let valueParam = "";
const ultimaPaginaBtn = document.getElementById("ultimaPaginaBtn");
const primeraPaginaBtn = document.getElementById("primeraPaginaBtn");
const paginas = document.getElementById("totalPaginas");
const totalPersonajes = document.getElementById("totalPersonajes");
const navegador = document.getElementById("navegador");
const labelPageSelect = document.getElementById("labelPageSelect");

const getCharacters = (paginaActual, filterParam, valueParam) => {
  fetch(`https://rickandmortyapi.com/api/character?page=${paginaActual}&${filterParam}=${valueParam}`)
    .then((res) => res.json())
    .then((data) => {
      renderCharacters(data);
      totalPages = data.info.pages;
      paginas.innerHTML = `<p>Total de páginas: ${totalPages}</p>`;
      totalPersonajes.innerHTML = `<p>Cantidad total de personajes: ${data.info.count}</p><p>Cantidad de personajes por página: ${data.results.length}</p>`;

      cargarOpcionesDePagina();
      actualizarBotones();
    });
};

getCharacters();

const renderCharacters = (data) => {
  container.innerHTML = "";
  data.results.forEach((character) => {
    container.innerHTML += `<div class="card">
   <img src="${character.image}" alt="">
   <div class="nombre">
   <h2>${character.name}</h2>
   <button class="button" onclick=verDescripcion("${character.url}")>Ver más</button>
</div></div>`;
    btnPrev.classList.remove("oculto");
    btnNext.classList.remove("oculto");
    ultimaPaginaBtn.classList.remove("oculto");
    primeraPaginaBtn.classList.remove("oculto");
    paginas.classList.remove("oculto");
    navegador.classList.remove("oculto");
    totalPersonajes.classList.remove("oculto");
    pageSelect.classList.remove("oculto");
    labelPageSelect.classList.remove("oculto");
  });
};

const verDescripcion = (characterUrl) => {
  const paginaAnterior = paginaActual;
  container.innerHTML = "";
  fetch(characterUrl)
    .then((res) => res.json())
    .then((character) => {
      container.innerHTML = `<div class="card-detalles">
    <img src="${character.image}" alt="">
    <div class="card-detalles_descripcion">
    <h2>${character.name}</h2>
    <p>Estado: ${character.status}</p>
    <p>Especie: ${character.species}</p>
    <p>Género: ${character.gender}</p>
    <p>Origen: ${character.origin.name}</p>
    <p>Locación: ${character.location.name}</p>
    <button class="button" onclick="getCharacters('${paginaAnterior}', '${filterParam}', '${valueParam}')">Volver</button>
    </div></div>`;
      btnPrev.classList.add("oculto");
      btnNext.classList.add("oculto");
      ultimaPaginaBtn.classList.add("oculto");
      primeraPaginaBtn.classList.add("oculto");
      paginas.classList.add("oculto");
      navegador.classList.add("oculto");
      totalPersonajes.classList.add("oculto");
      pageSelect.classList.add("oculto");
      labelPageSelect.classList.add("oculto");
    });
};

btnPrev.addEventListener("click", () => {
  paginaActual -= 1;
  getCharacters(paginaActual, filterParam, valueParam);
});

btnNext.addEventListener("click", () => {
  paginaActual += 1;
  getCharacters(paginaActual, filterParam, valueParam);
});

ultimaPaginaBtn.addEventListener("click", () => {
  paginaActual = totalPages;
  getCharacters(paginaActual, filterParam, valueParam);
});

primeraPaginaBtn.addEventListener("click", () => {
  paginaActual = 1;
  getCharacters(paginaActual, filterParam, valueParam);
});

const actualizarBotones = () => {
  if (paginaActual <= 1) {
    btnPrev.disabled = true;
    primeraPaginaBtn.disabled = true;
  } else {
    btnPrev.disabled = false;
    primeraPaginaBtn.disabled = false;
  }
  if (paginaActual === totalPages) {
    btnNext.disabled = true;
    ultimaPaginaBtn.disabled = true;
  } else {
    btnNext.disabled = false;
    ultimaPaginaBtn.disabled = false;
  }
};
actualizarBotones();

todos.addEventListener("click", () => {
  filterParam = "";
  valueParam = "";
  paginaActual = 1;
  getCharacters(paginaActual, filterParam, valueParam);
});
mujeres.addEventListener("click", () => {
  filterParam = "gender";
  valueParam = "female";
  paginaActual = 1;
  getCharacters(paginaActual, filterParam, valueParam);
});

hombres.addEventListener("click", () => {
  filterParam = "gender";
  valueParam = "male";
  paginaActual = 1;
  getCharacters(paginaActual, filterParam, valueParam);
});

sinGereno.addEventListener("click", () => {
  filterParam = "gender";
  valueParam = "genderless";
  paginaActual = 1;
  getCharacters(paginaActual, filterParam, valueParam);
});

desconocido.addEventListener("click", () => {
  filterParam = "gender";
  valueParam = "unknown";
  paginaActual = 1;
  getCharacters(paginaActual, filterParam, valueParam);
});

vivos.addEventListener("click", () => {
  filterParam = "status";
  valueParam = "alive";
  paginaActual = 1;
  getCharacters(paginaActual, filterParam, valueParam);
});

muertos.addEventListener("click", () => {
  filterParam = "status";
  valueParam = "dead";
  paginaActual = 1;
  getCharacters(paginaActual, filterParam, valueParam);
});

estadoDesconocido.addEventListener("click", () => {
  filterParam = "status";
  valueParam = "unknown";
  paginaActual = 1;
  getCharacters(paginaActual, filterParam, valueParam);
});

const cargarOpcionesDePagina = () => {
  const pageSelect = document.getElementById("pageSelect");
  pageSelect.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.innerHTML = `${i}`;
    pageSelect.appendChild(option);
  }
  pageSelect.value = paginaActual;
};

pageSelect.addEventListener("change", () => {
  paginaActual = parseInt(pageSelect.value);
  getCharacters(paginaActual, filterParam, valueParam);
});

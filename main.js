const container = document.getElementById("container")
const btnPrev= document.querySelector(".anterior")
const btnNext= document.querySelector(".siguiente")
let elements=1
const totalDePaginas=42

const todosBtn= document.getElementById("todos")
const mujeresBtn= document.getElementById("mujeres")
const hombresBtn= document.getElementById("hombres")
const desconocidoBtn= document.getElementById("desconocido")

const getCharacters=(elements)=>{
    fetch (`https://rickandmortyapi.com/api/character?page=${elements}`)
    .then(res=>res.json())
    .then((data)=>renderCharacters(data)) 
  }

getCharacters()



const renderCharacters=(data)=>{
    container.innerHTML=""
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

const verDescripcion= (characterUrl)=>{
    container.innerHTML=""
    fetch(characterUrl)
    .then(res=>res.json())
    .then((character)=>{ 
    container.innerHTML=
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
 </div>
    </div>`


})

}

btnPrev.addEventListener("click", ()=>{
  elements -=1
 if(elements<=0){
   btnPrev.setAttribute("disabled",true)
  }
  if(elements<=totalDePaginas){
    btnNext.removeAttribute("disabled",true) 
   
   }
  
  
  getCharacters(elements)
})

btnNext.addEventListener("click",()=>{
  elements +=1
  
  getCharacters(elements)
  if(elements>=0){
   btnPrev.removeAttribute("disabled",true)
  }
  if(elements>=totalDePaginas){
   btnNext.setAttribute("disabled",true) 
  
  }

})
const filterCharacters= (filterParam,valueParam)=>{
  fetch(`https://rickandmortyapi.com/api/character/?${filterParam}=${valueParam}`).then(res=>res.json()).then(data=>renderCharacters(data))

}
mujeresBtn.addEventListener("click",()=>filterCharacters("gender","female"))
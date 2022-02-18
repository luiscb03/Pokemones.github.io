const appDiv = document.getElementById('app');
const id = Math.floor((Math.random() * (898 - 1 + 1)) + 1);
const carts = Math.floor((Math.random() * (30 - 1 + 1)) + 1);



const opt = {
  method: 'GET',
};

const pantalla = document.getElementById('nombre');
const imagen = document.getElementById('imagen-principal');
const $back = document.getElementById('back');
const $front = document.getElementById('front');
const $shiny = document.getElementById('shiny');
const nombreInfo = document.getElementById('nombreInfo');
const tipo = document.getElementById('tipo');
const modal = document.getElementById('modal');
const historia = document.getElementById('historia');
const subtipo = document.getElementById('subTipo');
const canvas = document.getElementById('estadisticas').getContext("2d");
const altura = document.getElementById('altura');

//Consulta para imprimir habilidades
fetch(`https://pokeapi.co/api/v2/ability/${id}/`, opt)
  .then((resp) => resp.json())
  .then((data) => (
      vec = data.flavor_text_entries,
      console.log(data.flavor_text_entries),
      vec.forEach(element => {
        if (element.language.name == "es") {
          historia.innerHTML = element.flavor_text;
        }
      })
    )
  )
  .catch(error => (historia.innerHTML = 'Sus habilidades no son importantes',
      console.log(error)
  ));

//consulta para imprimir estadisticas
fetch(`https://pokeapi.co/api/v2/characteristic/${carts}/`, opt)
  .then((resp) => resp.json())
  .then((data) => (
      vec = data.possible_values,
      console.log(vec[0], vec[1], vec[2], vec[3], vec[4], vec[5]),
      chart = new Chart(canvas,{
        type: "bar",
        data:{
          labels:["Puntos de golpe", "Ataque", "Defensa", "Velocidad", "Ataque especial", "Defensa especial"],
          datasets:[{
              label:"Caracteristicas de batallas",
              fill: true,
              backgroundColor:[
                  'rgb(35, 35, 255)',
                  '#369AD9',
                  '#F2B705',
                  '#F2762E',
                  '#D95448',
                  '#285F9D',
                  '#72F2EB'
                ],
              data:[vec[0], vec[1], vec[2], vec[3], vec[4], vec[5]]
          }]
        }
      })
    )
  );

//consulta para imprimir datos generales
fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, opt)
  .then((resp) => resp.json())
  .then((data) =>
      (pantalla.innerHTML = data.name,
        imagen.setAttribute("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`),
        $back.setAttribute("src", data.sprites.back_shiny),
        $front.setAttribute("src", data.sprites.front_default),
        $shiny.setAttribute("src", data.sprites.back_default),
        nombreInfo.innerHTML = `${data.name} -  N.° ${id}`,
        tipo.innerHTML = `Peso: ${data.weight}G`,
        subtipo.innerHTML = data.types[0].type.name,
        // altura.innerHTML = `Altura: ${data.height}M`
        tipo.innerHTML += `<br> Altura: ${data.height}Cm`, 
        tipo.innerHTML += `<br> Habilidad: ${data.abilities[1].ability.name}`, 
        tipo.innerHTML += `<br> Movimiento: ${data.moves[0].move.name}`, 
        tipo.innerHTML += `<br> Porcentaje: ${data.stats[0].base_stat}% de victorias` 
      )
  );


  function metodoBuscar(buscar) {
    buscar = getElementById('search').value;
    alert(buscar)
  }
  

  const masInfo = document.getElementById('mas-info');
  masInfo.addEventListener('click', ()=>{
    modal.classList.toggle("mostrar")
  })
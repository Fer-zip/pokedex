window.addEventListener('load', () => {

    let submit = document.getElementById('submit');
    let listaPokemon = document.getElementById('listaPokemon');
    let URL = 'https://pokeapi.co/api/v2/pokemon/';
    let botonesTipo = document.querySelectorAll('li[id="typePoke"]');
    let regiones = document.querySelectorAll('#regiones');
    let barra = document.getElementById('barra');
    let cajaModo = document.getElementById('cajaModo');

    // cajaModo.addEventListener('change',()=>{
    //     fondoOscuro('ul');
    //     fondoOscuro('div');
    //     fondoOscuro('img');
    //     fondoOscuro('body');
    //     fondoOscuro('input');
    //     fondoOscuro('a');
        
    // });

    // function fondoOscuro(etiqueta) {
    //     let cambiar = document.querySelectorAll(etiqueta);
    //     cambiar.forEach(elemento => {
    //         if (cajaModo.checked) {
    //             elemento.style.backgroundColor = 'white';
    //         }else{
    //             elemento.style.backgroundColor = 'black';
    //         }
    //     });
    // }

    barra.addEventListener('click', () => {
        regiones.forEach((region) => {
            if (region.style.display === 'none' || region.style.display === '') {
                region.style.display = 'block';
            } else {
                region.style.display = 'none';
            }
        });
    });


    submit.addEventListener('click', () => {
        let buscador = document.getElementById('buscador').value.toLowerCase();
        listaPokemon.innerHTML = '';

        for (let i = 1; i <= 151; i++) {
            fetch(`${URL}${i}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.name.includes(buscador)) {
                        mostrarTodosPokemon(data);
                    }
                }
            );
        }
    });
    
    botonesTipo.forEach((button) => {
        button.addEventListener('click', () => {
            let tipoPokemon = button.textContent;
            
            listaPokemon.innerHTML = '';

            for (let i = 1; i <= 151; i++) {
                fetch(`${URL}${i}`)
                    .then((response) => response.json())
                    .then((data) => {
                        const tipos = data.types.map(type => type.type.name);
                        if (tipos.some(tipo => tipo.includes(tipoPokemon))) {
                            mostrarTodosPokemon(data);
                        }
                    }
                );
            }
        });
    });

    for (let i = 1; i <= 151; i++) {
        fetch(`${URL}${i}`)
            .then((response) => response.json())
            .then((data) => mostrarTodosPokemon(data));
    }

    function mostrarTodosPokemon(data) {
        let tipos = data.types.map((type)=>
            `<p class = '${type.type.name}'>${type.type.name}</p>`
        );

        tipos = tipos.join(' ');

        let pokemon = document.createElement('div');
        pokemon.classList.add('pokemon');
        pokemon.innerHTML = 
            `<img src="${data.sprites.front_default}" alt="imagen ${data.name}">
            <div class="datos">
                <p id = 'parrafo'>#${data.id}</p>
                <p id = 'parrafo'>${data.name}</p>
            </div>
            <div class="datos">
                ${tipos}
            </div>
            <div class="datos">
                <p id = 'parrafo'>${data.height}m</p>
                <p id = 'parrafo'>${data.weight}kg</p>
            </div>`;
        listaPokemon.appendChild(pokemon);
    }
});

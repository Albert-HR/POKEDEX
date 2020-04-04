var pokemsA;

function InitPage() {
    let type = 't';
    types();
    cargarPkms(type);
}

function deleteCrad(){
    let card = '';
    card += `
        <div style="height: 2.1em;"><button id="x">x</button></div>
    `
    document.getElementById('card').innerHTML = card;
}

function showCard(IDe,no) {
    window.scrollTo(0, 100); 
    IDe.preventDefault();
    
    let pok = '';
        //Recorrer
        pokemsA.pokemons.forEach(function(pk) {
                if(pk.id.toString() === no.toString())
                {
                    pok += `
                    <button onclick="deleteCrad()" id="x">x</button>

                    <div class="tpkm">
    
                        <div style="padding: 0.5em;">
                            <div style="font-size: 2em;" class="txt">CP ${pk.cp}</div>
        
                            <img src=${pk.sprite} class="pimg">
        
                            <div style="font-size: 1.5em;" class="txt">${pk.name}</div>
        
                            <div style="margin: 1em 4em 0 4em;" class="linegreen"></div>
                            
                            <div style="margin: 0.5em 0 0 0; font-size: 1em; font-family:'Courier New', Courier, monospace;" class="txt">${pk.hp} / ${pk.hp} HP</div>
    
                            <div class="power">`;

                    pk.type.forEach(function(tp) {
                            pok += `
                                <div style="background-color: ${pokemsA.types[tp-1].color};" class="pw">${pokemsA.types[tp-1].name}</div>                            
                            `;
                    })                    
                    pok += `
                            </div>
                            
                            <div style="font-size: 1em;" class="txt">Attack ${pk.attack} / Defense ${pk.defense} </div>
                            
                        </div>
                    </div>
                    `;
                }
        })
        document.getElementById('card').innerHTML = pok;
}

function cargarPkms(type){
    // Conectar con ajax
    // Iniciar XMLHTTPRequest
    const xhr = new XMLHttpRequest();

    // Abrimos la conexion
    xhr.open('GET', 'pokedex.json', true);
    
    // Datos e impresion del template
    xhr.onload = function() {
        if(this.status === 200) {
            const pkms = JSON.parse( this.responseText ) ;
            pokemsA = pkms;

            // Generar el HTML
            let types = '';

            console.log(type);
            if(type.toString() === ('t').toString())
            {
                //Recorrer
                pkms.pokemons.forEach(function(pk) {
                        types += `
                        <div onclick="showCard(event,${pk.id})" style="padding: 0.5em;" class="pkmn-m pkmn-s">

                            <div style="font-size: 1.2em;" class="txt">CP ${pk.cp}</div>

                            <div > <img src= ${pk.sprite} class="pimg"> </div>

                            <div style="font-size: 1em;" class="txt">${pk.name}</div>

                            <div class="linegreen"></div>

                        </div>
                        `;
                })
            }else{
                    pkms.pokemons.forEach(function(pk) {
                        pk.type.forEach(function(pki) {
                            if(pki.toString() === type.toString())
                            {
                                types += `
                                <div onclick="showCard(event,${pk.id})" style="padding: 0.5em;" class="pkmn-m pkmn-s">

                                    <div style="font-size: 1.2em;" class="txt">CP ${pk.cp}</div>

                                    <div > <img src= ${pk.sprite} class="pimg"> </div>

                                    <div style="font-size: 1em;" class="txt">${pk.name}</div>

                                    <div class="linegreen"></div>

                                </div>
                                `;
                            }
                        })                        
                })
                    
            }

            document.getElementById('lista').innerHTML = types;
        }
    }
    
    // Enviar el Request
    xhr.send();
}

function types() {

    // Conectar con ajax
    // Iniciar XMLHTTPRequest
    const xhr = new XMLHttpRequest();

    // Abrimos la conexion
    xhr.open('GET', 'pokedex.json', true);
    
    // Datos e impresion del template
    xhr.onload = function() {
        if(this.status === 200) {
            const pkms = JSON.parse( this.responseText ) ;
            
            // Generar el HTML
            let types = '';

            types += `
                <option value="t" selected>TODOS</option>
                `;

            //Recorrer
            pkms.types.forEach(function(tp) {
                    types += `
                        <option value="${tp.id}">${tp.name}</option>
                    `;
            })

            document.getElementById('fsel').innerHTML = types;
        }
    }
    
    // Enviar el Request
    xhr.send();

}


function selceted(type) {
    document.getElementById('lista').innerHTML = `
    `;
    cargarPkms(type);
}
/*animacion inicial */
globalThis.addEventListener('load', () => {
    document.body.innerHTML = "<img draggable='false'src='img/borderlands-science.avif'class='img-animacion-inicio'>";
    setTimeout(() => { menu_inicio() }, 1500);
})

/*menus */
function menu_inicio() {
    document.body.innerHTML = `<img draggable="false"src='img/fondo.avif'class='fondo'><div style="position:absolute;display:flex;justify-content:center;top: 13%;right: 0%;width:100%;max-height:35%;"><img draggable="false" src='img/text.avif'class='title'></div><div class='power-div'><h3 class='marca-power'>0</h3><img draggable="false" src='img/power.avif'class='power-img'></div>
    <div class="menu-bt-opciones">
    <div class='div-menu-bt'><input type='button'class='bt-menu'value='PLAY'id="jugar"></div>
    </div>
    <div style="position:absolute;display:flex;justify-content:center;bottom: 5%;right: 0%;width:100%;">
    <div class="lo-sabias">
    <font>¿Lo sabías?</font><br>
    <span>Los bloques de ADN se llaman nucleótidos, y hay cuatro variedades diferentes, cada una representada por placas de cuatro colores distintos.</span>
    </div>`;
    document.querySelector('#jugar').addEventListener('click', () => {
        iniciar_partida(1)
    })
}

/*juego */
let fichas_comodin_usuario = 0;
let casillas_partida = []
function iniciar_partida(dificultadPartida) {
    //numeros casilla--> 0:vacia; 1: azul; 2:rosa; 3:morado; 4:verde; 5:ficha usuario
    //numero fichas fila-->0: ninguna;...
    let datosPartida = generar_datos_partida(dificultadPartida)
    casillas_partida = datosPartida.ficha_casillas_partida
    fichas_comodin_usuario = datosPartida.total_fichas_comodin_usuario
    //mostrar la estructura de los objetos de la partida
    document.body.innerHTML = `
    <img draggable="false"src='img/fondo.avif'class='fondo'>
    <img draggable="false" src='img/volver.avif'class='img-volver'>
    <section class='puntuaciones'>
    <div class='puntuacion-objetiva'>
    <span>TARGET SCORE<br><font>${datosPartida.total_puntos_minimos_terminar}</font></span>
    </div>
    <div class='puntuacion-usuario'>
    <span>YOUR SCORE<br><font>0</font></span>
    </div>
    </section>
    <section class='partida'>
    <div id='fichas-puntos-filas'></div>
    <div id='div-casillas-partida'></div>
    <div id='div-fichas-usuario'>
    <div id="seccion-fichas-bonus-usuario"></div>
    <div id="numero-fichas-restantes-usuario"></div>
    </div>
    </section>
    <section class='div-abajo'>
    <div class="contenedor-barra-progreso"><div id='barra-progreso'></div></div>
    <div class='div-bonus'>
    <span id='text-bonus-total'>BONUS<br><font>0</font></span>
    </div>
    </section>
    <section class="div-bt-terminar">
    <img src="img/fin-partida.avif" alt="fin partida" id="bt-terminar-partida" draggable="false"disabled>
    </section>
    `;
    let codigo_html = "";
    for (let i = 0; i < datosPartida.tipo_ficha_fila_partida.length; i++) {
        codigo_html += "<div class='fila'>";
        for (let j = 0; j < datosPartida.tipo_ficha_fila_partida[i].length; j++) {
            if (datosPartida.tipo_ficha_fila_partida[i][j] === 1) {//azul
                codigo_html += "<img draggable='false'class='ficha-fila'src='img/ficha-azul-fila.avif'>";
            }
            else if (datosPartida.tipo_ficha_fila_partida[i][j] === 2) {//rosa
                codigo_html += "<img  draggable='false'class='ficha-fila'src='img/ficha-rosa-fila.avif'>";
            }
            else if (datosPartida.tipo_ficha_fila_partida[i][j] === 3) {//morado
                codigo_html += "<img draggable='false'class='ficha-fila'src='img/ficha-morada-fila.avif'>";
            }
            else if (datosPartida.tipo_ficha_fila_partida[i][j] === 4) {//verde
                codigo_html += "<img draggable='false'class='ficha-fila'src='img/ficha-verde-fila.avif'>";
            }
        }
        codigo_html += "</div>";
    }
    document.querySelector("#fichas-puntos-filas").innerHTML = codigo_html;
    document.querySelector("#div-casillas-partida").style.width = 50 * datosPartida.total_fichas_fila + "px";
    //mostrar las fichas y filas y actualizar datos
    //const puntuan_casillas_partida=calcular_puntos_casillas(datosPartida);
    actualizar_datos_casillas_partida(datosPartida);

    document.querySelector('.img-volver').addEventListener('click', () => {
        finPartida(-1)
    })
}
function generar_datos_partida(dificultad) {
    let ficha_casillas_partida,
        tipo_ficha_fila_partida,
        total_fichas_comodin_usuario,
        total_fichas_comodin_usuario_totales,
        total_puntos_minimos_terminar,
        total_fichas_fila;
    if (dificultad == 1) {
        const cantidadTablerosDisponibles = 1
        switch (Math.floor(Math.random() * cantidadTablerosDisponibles + 1)) {
            case 1:
                ficha_casillas_partida = [
                    0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0,
                    2, 2, 3, 0, 2, 2,
                    2, 2, 3, 2, 1, 4,
                    3, 4, 1, 3, 2, 3,
                    2, 2, 3, 2, 1, 2,
                    4, 3, 3, 3, 3, 2
                ];
                tipo_ficha_fila_partida = [
                    [0],
                    [1],
                    [2, 3],
                    [2, 3],
                    [3, 4],
                    [2, 3],
                    [3, 4],
                    [1, 3]
                ];
                total_fichas_comodin_usuario = 7;
                total_puntos_minimos_terminar = 21;
                total_fichas_fila = 6;
                break;
        }
    }
    total_fichas_comodin_usuario_totales = total_fichas_comodin_usuario
    return ({
        ficha_casillas_partida,
        tipo_ficha_fila_partida,
        total_fichas_comodin_usuario,
        total_fichas_comodin_usuario_totales,
        total_puntos_minimos_terminar,
        total_fichas_fila
    })
}
function actualizar_datos_casillas_partida(datosPartida) {
    const ficha_casillas_partida = casillas_partida
    const puntos_conseguidos = calcular_puntos_casillas([ficha_casillas_partida, datosPartida.tipo_ficha_fila_partida, datosPartida.total_fichas_fila])
    const bonus_conseguido = (puntos_conseguidos[0] > datosPartida.total_puntos_minimos_terminar) ? (puntos_conseguidos[0] - datosPartida.total_puntos_minimos_terminar) : 0;
    //casillas
    let codigo_html = "";
    for (let i = 0; i < ficha_casillas_partida.length; i++) {
        if (casillas_partida[i] == 0) {//vacia
            codigo_html += `<div class='casilla'style='background-image: url(img/casilla-vacia.avif)'id="${i}"></div>`;
        }
        else if (ficha_casillas_partida[i] == 1) {//azul
            if (puntos_conseguidos[1][i] == 0) {
                codigo_html += `<div class='casilla'style='background-image: url(img/ficha-azul.avif)'id="${i}"></div>`;
            }
            else {
                codigo_html += `<div class='casilla'style='background-image: url(img/ficha-azul-brillante.avif)'id="${i}"></div>`;
            }
        }
        else if (ficha_casillas_partida[i] == 2) {//rosa
            if (puntos_conseguidos[1][i] == 0) {
                codigo_html += `<div class='casilla'style='background-image: url(img/ficha-rosa.avif)'id="${i}"></div>`;
            }
            else {
                codigo_html += `<div class='casilla'style='background-image: url(img/ficha-rosa-brillante.avif)'id="${i}"></div>`;
            }
        }
        else if (ficha_casillas_partida[i] == 3) {//morado
            if (puntos_conseguidos[1][i] == 0) {
                codigo_html += `<div class='casilla'style='background-image: url(img/ficha-morada.avif)'id="${i}"></div>`;
            }
            else {
                codigo_html += `<div class='casilla'style='background-image: url(img/ficha-morada-brillante.avif)'id="${i}"></div>`;
            }
        }
        else if (ficha_casillas_partida[i] == 4) {//verde
            if (puntos_conseguidos[1][i] == 0) {
                codigo_html += `<div class='casilla'style='background-image: url(img/ficha-verde.avif)'id="${i}"></div>`;
            }
            else {
                codigo_html += `<div class='casilla'style='background-image: url(img/ficha-verde-brillante.avif)'id="${i}"></div>`;
            }
        }
        else if (ficha_casillas_partida[i] == 5) {//usuario
            codigo_html += `<div class='casilla'style='background-image: url(img/ficha-usuario.avif)'id="${i}"></div>`;
        }
    }
    document.querySelector("#div-casillas-partida").innerHTML = codigo_html;
    //barra progreso 
    const rellenoBarraProgreso = (puntos_conseguidos[0] >= datosPartida.total_puntos_minimos_terminar) ? 100 : ((100 * puntos_conseguidos[0]) / datosPartida.total_puntos_minimos_terminar)
    document.querySelector("#barra-progreso").style.background = `linear-gradient(to right, #fb4003 ${(rellenoBarraProgreso >= 13) ? 13 : rellenoBarraProgreso}%, #fc5602 ${(rellenoBarraProgreso >= 25) ? 25 : rellenoBarraProgreso}%, #ff6905 ${(rellenoBarraProgreso >= 38) ? 38 : rellenoBarraProgreso}%, #f86f00 ${(rellenoBarraProgreso >= 50) ? 50 : rellenoBarraProgreso}%, #ff9600 ${(rellenoBarraProgreso >= 62.5) ? 62.5 : rellenoBarraProgreso}%)`;
    //puntos
    document.querySelector(".puntuacion-usuario").innerHTML = `<span>YOUR SCORE<br><font>${puntos_conseguidos[0]}</font></span>`;
    //bonus
    document.querySelector("#text-bonus-total").innerHTML = `BONUS<br><font>+${bonus_conseguido}</font>`;
    //comodines 
    document.querySelector("#numero-fichas-restantes-usuario").innerHTML = `${datosPartida.total_fichas_comodin_usuario}/${datosPartida.total_fichas_comodin_usuario_totales}`
    document.querySelector("#seccion-fichas-bonus-usuario").innerHTML = ""
    for (let i = datosPartida.tipo_ficha_fila_partida.length; i >= 0; i--) {
        if (i >= datosPartida.total_fichas_comodin_usuario) {
            document.querySelector("#seccion-fichas-bonus-usuario").innerHTML += `<img src="img/casilla-vacia.avif" alt="comodin" class="ficha-comodin-barra">`
        }
        else {
            document.querySelector("#seccion-fichas-bonus-usuario").innerHTML += `<img src="img/ficha-usuario.avif" alt="comodin" class="ficha-comodin-barra">`
        }
    }
    //boton finalizar partida activar
    if (puntos_conseguidos[0] >= datosPartida.total_puntos_minimos_terminar) {
        document.querySelector(".div-bt-terminar").style.display = "flex"
        document.querySelector('#bt-terminar-partida').disabled = "false"
        document.querySelector('#bt-terminar-partida').addEventListener('click', () => {
            if (puntos_conseguidos[0] >= datosPartida.total_puntos_minimos_terminar) {//valido
                finPartida(puntos_conseguidos[0], bonus_conseguido, datosPartida.total_puntos_minimos_terminar)
            }
        })
    }
    else {
        document.querySelector('#bt-terminar-partida').disabled = "true"
        document.querySelector(".div-bt-terminar").style.display = "none"
    }
    document.querySelectorAll('.casilla').forEach((item) => {
        item.addEventListener('click', () => {
            poner_ficha(item.id, datosPartida)
        })
    })
}

function poner_ficha(n_casilla_seleccionada = -1, datosPartida) {
    if (n_casilla_seleccionada != -1 && (n_casilla_seleccionada >= datosPartida.total_fichas_fila) && datosPartida.ficha_casillas_partida[n_casilla_seleccionada] != 0) {//recibida y esta por debajo de la primera fila
        if (datosPartida.ficha_casillas_partida[n_casilla_seleccionada] == 5) {//quitar comodin
            let terminar = false
            let indiceSiguiente = n_casilla_seleccionada
            while (!terminar) {
                const indiceActual = indiceSiguiente
                if (indiceActual >= 0 && (indiceActual < datosPartida.total_fichas_fila)) {
                    casillas_partida[indiceActual] = 0
                    terminar = true
                }
                else {
                    indiceSiguiente -= datosPartida.total_fichas_fila
                    casillas_partida[indiceActual] = casillas_partida[indiceSiguiente]
                }
            }
            datosPartida.total_fichas_comodin_usuario += 1
            actualizar_datos_casillas_partida(datosPartida)
        }
        else if (datosPartida.ficha_casillas_partida[n_casilla_seleccionada] != 5 && datosPartida.total_fichas_comodin_usuario > 0) {//poner comodin
            //comprobar si hai fichas en la primera fila
            let permitido = true
            let terminar = false
            let indice = n_casilla_seleccionada
            while (!terminar) {
                indice -= datosPartida.total_fichas_fila
                if (indice >= 0 && indice < datosPartida.total_fichas_fila) {
                    if (casillas_partida[indice] != 0) {
                        permitido = false
                    }
                    terminar = true
                }
            }
            if (permitido) {
                let fichaSubir = datosPartida.ficha_casillas_partida[n_casilla_seleccionada]
                datosPartida.ficha_casillas_partida[n_casilla_seleccionada] = 5
                indice = n_casilla_seleccionada
                terminar = false
                while (!terminar) {
                    indice -= datosPartida.total_fichas_fila
                    if (indice >= 0) {
                        const fichaPoner = fichaSubir
                        fichaSubir = datosPartida.ficha_casillas_partida[indice]
                        casillas_partida[indice] = fichaPoner
                    }
                    else {
                        terminar = true
                    }
                }
                datosPartida.total_fichas_comodin_usuario -= 1
                actualizar_datos_casillas_partida(datosPartida)
            }
        }
    }
}

function calcular_puntos_casillas(datosCasillas) {
    //organizar casillas filas
    let casillasOrganizadas = []
    let casillaActual = 0
    for (let i = 0; i < datosCasillas[1].length; i++) {
        let numeros = []
        for (let j = 0; j < datosCasillas[2]; j++) {
            numeros.push(datosCasillas[0][casillaActual])
            casillaActual++
        }
        casillasOrganizadas.push(numeros)
    }
    //calcular puntos
    let casillasPuntuan = []
    let puntos = 0
    for (let i = 0; i < datosCasillas[1].length; i++) {
        for (let j = 0; j < datosCasillas[2]; j++) {
            if (casillasOrganizadas[i][j] != 0 && casillasOrganizadas[i][j] != 5) {
                const puntosMomento = puntos
                for (let k = 0; k < datosCasillas[1][i].length; k++) {
                    if (casillasOrganizadas[i][j] == datosCasillas[1][i][k]) {
                        puntos++
                        casillasPuntuan.push(1)//puntua
                        break
                    }
                }
                if (puntosMomento == puntos) {//no puntua
                    casillasPuntuan.push(0)
                }
            }
            else {
                casillasPuntuan.push(0)
            }
        }
    }
    return [puntos, casillasPuntuan]
}
function finPartida(puntos_conseguidos = 0, bonus = 0, puntos_minimos = 0) {
    if (puntos_conseguidos >= puntos_minimos) {//partida terminada
        const monedasAñadir = (15) + (bonus * 4)
        actualizarMonedas(monedasAñadir)
    }
    else if (puntos_conseguidos == -1) {//cerrar partida sin terminar
        menu_inicio()
    }
}
function actualizarMonedas(monedasAñadir=0) {
    const rutaGuardado = 'MonedasGuardadas'
    const monedasActuales = (Number(localStorage.getItem(rutaGuardado)) >= 0) ? Number(localStorage.getItem(rutaGuardado)) : 0;
    localStorage.setItem(rutaGuardado, (monedasAñadir + monedasActuales))
    menu_inicio()
    try {
        document.querySelector('.marca-power').innerHTML = monedasAñadir + monedasActuales
    }
    catch { }
    return (monedasAñadir + monedasActuales)
}
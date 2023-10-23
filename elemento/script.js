const elemento = window.location.search.split("=")[1];
console.log(elemento)

fetch(`http://localhost:5000/elementos/simbolo/${elemento}`)
.then((response) => {
    if (response.ok) {
        return response.json();
    } else {
        console.error("Error fetching data:", response.status);
    }
}).then((data) => {
    console.log(data)
    const configuracao = data.configuracao;
    const info = document.querySelector("#info");

    document.querySelector("title").innerHTML = data.nome[0].toUpperCase()+data.nome.substring(1)+" | Elemento";
    document.querySelector("#titulo h1").innerHTML = data.nome[0].toUpperCase()+data.nome.substring(1);

    for (var nivel in configuracao){
        const n = document.querySelector(`.${nivel}`);
        console.log(nivel)
        for (let index = 0; index < configuracao[nivel]; index++) {
            n.innerHTML += `<div class="eletons" style="rotate: ${(360/configuracao[nivel])*index}deg;"><div class="ball"></div></div>`;
        }
    }

    info.querySelectorAll("li").forEach(element => {
        element.querySelector("span").innerHTML = data[element.classList.item(0)]
    });


});
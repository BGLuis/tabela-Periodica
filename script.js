const elementos = document.querySelectorAll(".element") 
const tabela = document.querySelector("#tabela") 

fetch("http://localhost:5000/tabela")
.then((response) => {
    if (response.ok) {
        return response.json();
    } else {
        console.error("Error fetching data:", response.status);
    }
}).then((data) => {
    elementos.forEach(elemento => {
        const numero = elemento.getAttribute("data-element")
        if(data[numero]){
            if(data[numero]['classificacao']){
                elemento.classList.add(data[numero]['classificacao'].replace(" ","-"))
                elemento.dataset.class = `${data[numero]['classificacao'].replace(" ","-")}`
            }
            else{
                elemento.classList.add("Desconhecido")
                elemento.dataset.class = `Desconhecido`
            }
            elemento.href = `../elemento/?E=${data[numero]['simbolo']}`
            elemento.innerHTML = 
            `
                <div>
                    <li class="numero">${data[numero]['numero']}</li>
                    <li class="massa">${data[numero]['massa']}</li>
                </div>
                <li class="simbolo">${data[numero]['simbolo']}</li>
                <li class="nome">${data[numero]['nome']}</li> 
            `
        }
    });
});

elementos.forEach(element => {
    element.addEventListener("mouseenter",()=> {
        tabela.classList.add(element.dataset.class)
    })
    element.addEventListener("mouseleave",()=> {
        tabela.classList.remove(element.dataset.class)
    })
});
const lista = ["Jhean Monteiro", "Ros", "Zé da Manga", "Jheliandrisson", "Caneta Azul"]

const buscarMembrosPorNome = (lista, trecho) => {
    // Busca parcial por trecho do nome [cite: 63]
    return lista.filter(m => m.toLowerCase().includes(trecho.toLowerCase()));
}

const vari = buscarMembrosPorNome(lista, "Jhea")

console.log(vari)

// ====== testando o splice ======

const salvaIndice = (lista, nome) => {
    const index = lista.indexOf(nome)
    return index
}

const index = salvaIndice(lista, "Caneta Azul")
lista.splice(index, 1)
console.log(lista)

lista.forEach(item => console.log(item))
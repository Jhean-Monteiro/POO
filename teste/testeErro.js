class ErroNome extends Error {
    constructor(message) {
        super(message)
        this.name = "ErroNome"
    }
}

class Lucius {
    #nome
    #sobrenome
    #armas

    constructor(nome, sobrenome) {
        this.#nome = nome;
        this.#sobrenome = sobrenome

        if ((this.#nome) + ' ' + (this.#sobrenome) !== "Lucius Zeraphia") {
            throw new ErroNome("O nome precisa ser Lucius Zeraphia")
        }

        this.#armas = []
    }

    get nome() {return this.#nome}
    get sobrenome() {return this.#sobrenome}
    get armas() {return this.#armas}

    adicionarArma(arma) {
        this.#armas.push(arma)
    }
}

const lucius = new Lucius("Lucius", "Zeraphia")
lucius.adicionarArma("Espada")
lucius.adicionarArma("Escudo")

console.log(lucius.nome)
console.log(lucius.armas)
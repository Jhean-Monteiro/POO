class Politico {
    #nome
    constructor(nome) {
        if (new.target === Politico) {
            throw new Error("Não se intancia classe abstrata, burro")
        }
        this.#nome = nome
    }

    get nome() {return this.#nome}

    casaLegislativa() {
        throw new Error("Método casaLegislativa deve ser implementado nas subclasses")
    }
}

class Deputado extends Politico {
    #casa
    constructor(nome, casa) {
        super(nome)
        this.#casa = casa
    }

    casaLegislativa() {
        return `${this.nome} é um deputado na ${this.#casa}`
    }
}

class Senador extends Politico {
    #casa
    constructor(nome, casa) {
        super(nome)
        this.#casa = casa
    }

    casaLegislativa() {
        return `${this.nome} é um senador no ${this.#casa}`
    }
}


const d = new Deputado("Luizinho", "AleSP")
const f = new Deputado("Zé da Manga", "AleRJ")

console.log(d.casaLegislativa())
console.log(f.casaLegislativa())

const s = new Senador("Zézinho", "Senado Federal")
console.log(s.casaLegislativa())
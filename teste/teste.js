// Questão 1: Classes com encapsulamento

class Habilidade {
    #nome
    #nivel
    #tipo

    constructor(nome, nivel, tipo) {
        this.#nome = nome;
        this.#nivel = nivel;
        this.#tipo = tipo;
    }

    toString() {
        return `Habilidade: ${this.#nome} / Nível: ${this.#nivel} / Tipo: ${this.#tipo}`
    }
}

class Personagem {
    #nome
    #nivel
    #habilidades

    constructor(nome, nivel) {
        this.#nome = nome
        this.#nivel = nivel
        this.#habilidades = []
    }

    adicionarHabilidade(hab) {
        this.#habilidades.push(hab)
    }

    listarHabilidade(hab) {
        this.#habilidades.forEach(h => console.log(h.toString()))
    }

    // questão 2 - método abstrato
    atacar() {
        throw new Error("Método atacar() deve ser implementado pela subclasse")
    }

    toString() {
        return `Personagem: ${this.#nome} / Nível: ${this.#nivel}`
    }
}

// questão 2: herança e polimorfismo

class Guerreiro extends Personagem {
    #forca

    constructor(nome, nivel, forca) {
        super(nome, nivel)
        this.#forca = forca
    }

    atacar() {
        console.log(`${this.toString()} ataca com força ${this.#forca}`)
    }
}

class Mago extends Personagem {
    #mana

    constructor(nome, nivel, mana) {
        super(nome, nivel) 
        this.#mana = mana
    }

    atacar() {
        console.log(`${this.toString()} lança magia com ${this.#mana} de mana`)
    }
}

class Guilda {
    #nome;
    #membros;

    constructor(nome) {
        this.#nome = nome;
        this.#membros = [] // agregação
    }

    adicionarMembro(p) {
        this.#membros.push(p)
    }

    removerMembro(p) {
        this.#membros = this.#membros.filter(m => m !== p)
    }

    listarMembros() {
        this.#membros.forEach(m => console.log(m.toString()))
    }
}
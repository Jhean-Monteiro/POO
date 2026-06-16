class ErroRPG extends Error {
    constructor(message) {
        super(message) 
        this.name = "ErroRPG"
    }
}

class ErroTipoInvalido extends ErroRPG {
    constructor(message) {
        super(message)
        this.name = "ErroTipoInvalido"
    }
}

class ErroMembroNaoEncontrado extends ErroRPG {
    constructor(message) {
        super(message)
        this.name = "ErroMembroNaoEncontrado"
    }
}

class ErroAbstracao extends ErroRPG {
    constructor(message) {
        super(message)
        this.name = "ErroAbstracao"
    }
}



// ================== // =====================

class Habilidade {
    #nome
    #nivel
    #tipo

    constructor(nome, nivel, tipo) {
        this.#nome = nome;
        this.#nivel = nivel;
        this.#tipo = tipo;
    }

    get nome () {return this.#nome}

    toString() {return `[Habilidade] Nome: ${this.#nome}, Nível: ${this.#nivel}, Tipo: ${this.#tipo}`;}
}

class Personagem {
    #nome
    #nivel
    #habilidades

    constructor(nome, nivel) {
        // classe abstrata não pode ser instanciado
        if (new.target === Personagem) {
            throw new ErroAbstracao("A classe Personagem é abstrata e não pode ser instanciada")
        }
        this.#nome = nome
        this.#nivel = nivel
        this.#habilidades = [] // composição: a lista é criada junto ao objeto

    }

    get nome() {
        return this.#nome
    }
    get habilidades() {
        return this.#habilidades
    }

    adicionarHabilidade(hab) {
        if (!(hab instanceof Habilidade)) {
            throw new ErroTipoInvalido("O objeto fornecido não é uma instância de Habilidade")
        }
        this.#habilidades.push(hab)
    }

    listarHabilidades() {
        if (this.#habilidades.length === 0) return "Nenhuma habilidade cadastrada.";

        const habili = this.#habilidades.map(hab => hab.toString())
        console.log(habili)
    }

    atacar() {
        // método que impede chamada direta na classe base
        throw new ErroAbstracao("O método atacar() deve ser implementado nas subclasses.")
    }

    toString() {
        // representação textual do Personagem
        return `[Personagem] Nome: ${this.#nome}, Nível: ${this.#nivel}`;

    }

}
/*
const x = new Habilidade("Andar", 10, "10")
const y = new Habilidade("correr", 10, "10")
const personagem = new Personagem("pedro", 20)
personagem.adicionarHabilidade(x)
personagem.adicionarHabilidade(y)
personagem.listarHabilidades()
*/



class Guerreiro extends Personagem {
    #forca

    constructor(nome, nivel, forca) {
        super(nome, nivel)
        this.#forca = forca
    }

    atacar() {
        // Polimorfismo: Ataque com base na força 
        return `${this.nome} realiza um ataque físico com força de ${this.#forca}`
    }
}

const g = new Guerreiro("art", 10, 100)

try {
    console.log(g.atacar())
} catch (e) {
    console.log(`erro esperado: ${e.name}: `, e.message)
}

class Mago extends Personagem {
    #mana

    constructor(nome, nivel, mana) {
        super(nome, nivel);
        this.#mana = mana
    }

    atacar() {
        return `${this.nome} lança um feitiço de ataque mágico consumindo ${this.#mana} pontos de mana`
    }
}

const m = new Mago("tra", 10, 100)

try {
    console.log(m.atacar())
} catch (e) {
    console.log(`erro esperado: ${e.name}: `, e.message)
}
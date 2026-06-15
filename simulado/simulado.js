// Questão 4: Hierarquia de exceções

class ErroRPG extends Error{
    constructor(mensagem) {
        super(mensagem)
        this.name = "ErroRPG"
    }
}

class ErroTipoInvalido extends ErroRPG {
    constructor(mensagem) {
        super(mensagem)
        this.name = "ErroTipoInvalido"
    }
}

class ErroMembroNaoEncontrado extends ErroRPG {
    constructor(mensagem) {
        super(mensagem)
        this.name = "ErroMembroNaoEncontrado"
    }
}

class ErroAbstracao extends ErroRPG {
    constructor(mensagem) {
        super(mensagem) 
        this.name = "ErroAbstracao"
    }
}


// Questão 1: Cinco classes no diagrama

class Habilidade {
    #nome
    #nivel
    #tipo

    constructor(nome, nivel, tipo) {
        this.#nome = nome
        this.#nivel = nivel
        this.#tipo = tipo
    }

    get nome() {return this.#nome}
    get nivel() {return this.#nivel}
    get tipo() {return this.#tipo}

    toString() {
        return `Habilidade ${this.#nome} / Nível: ${this.#nivel} / Tipo: ${this.#tipo}`
    }
}

class Personagem {
    #nome
    #nivel
    #habilidades

    constructor(nome, nivel) {
        if (new.target === Personagem) {
            throw new ErroAbstracao("Personagem é uma classe abstrata e não pode ser instanciada diretamente.")
        }
        this.#nome = nome
        this.#nivel = nivel
        this.#habilidades = [] // composição
    }

    get nome() {return this.#nome}
    get nivel() {return this.#nivel}

    adicionarHabilidade(hab) {
        if (!(hab instanceof Habilidade)) {
            throw new ErroTipoInvalido("O parâmetro deve ser uma instância de Habilidade.")
        }
        this.#habilidades.push(hab)
    }

    listarHabilidades() {
        this.#habilidades.forEach(h => console.log(h.toString()))
    }

    // questão 2: método abstrato

    atacar() {
        throw new ErroAbstracao("Método atacar() deve ser implementado pea subclasse.");
    }

    toString() {
        return `[${this.constructor.name}] ${this.#nome} / Nível: ${this.#nivel}`;

    }
}

// Questão 2: Herança e polimorfismo
class Guerreiro extends Personagem {
    #forca

    constructor(nome, nivel, forca) {
        super(nome,nivel) 
        this.#forca = forca
    }

    get forca() {return this.#forca}

    atacar() {
        console.log(`${this.nome} ataca fisicamente com força ${this.#forca}`)
    }
}

class Mago extends Personagem {
    #mana

    constructor(nome, nivel, forca) {
        super(nome,nivel) 
        this.#mana = forca
    }

    get mana() {return this.#mana}

    atacar() {
        console.log(`${this.nome} lança magia com ${this.#mana} de mana!`)
    }
}



class Guilda {
    #nome
    #membros

    constructor(nome) {
        this.#nome = nome;
        this.#membros = [] // agregação
    }

    get nome() {return this.#nome}

    adicionarMembro(p) {
        if (!(p instanceof Personagem)) {
            throw new ErroTipoInvalido("O membro deve ser uma instância de Personagem")
        }
        this.#membros.push(p)
    }

    removerMembro(p) {
        const index = this.#membros.indexOf(p)
        if (index === -1) {
            throw new ErroMembroNaoEncontrado(`Personagem "${p.nome}" não é membro dessa guilda`)
        }

        this.#membros.splice(index, 1)
    }

    listarMembros() {
        this.#membros.forEach(m => console.log(m.toString()))
    }

    // Questão 3: busca parcial por trecho do nome
    buscarMembro(trecho) {
        const resultado = this.#membros.filter(m => m.nome.toLowerCase().includes(trecho.toLowerCase()))

        if (resultado.length === 0) {
            console.log(`Nenhum membro encontrado com "${trecho}"`)
        } else {
            resultado.forEach(m => console.log(m.toString()))
        }
    }

    // Questão 3: listar habilidades de um membro pelo nome completo
    listarHabilidadesDeMembro(nomeCompleto) {
        const membro = this.#membros.find(m =>
        m.nome.toLowerCase() === nomeCompleto.toLowerCase()
        )
        if (!membro) {
            console.log(`Membro "${nomeCompleto}" não encontrado na guilda.`)
            return;
        }
        console.log(`Habilidades de ${membro.nome}:`)
        membro.listarHabilidades()
    }
}


// Questão 5: Demonstração completa

console.log("----- Criando personagens e habilidades -----")

const guerreiro = new Guerreiro("Arthur", 10, 80)
const mago = new Mago("Morgana", 12, 150)
const guerreiro2 = new Guerreiro("Arthas", 8, 60)

mago.adicionarHabilidade(new Habilidade("Bola de Fogo", 5, "Magico"))
mago.adicionarHabilidade(new Habilidade("Destruir", 50, "Magico"))
guerreiro.adicionarHabilidade(new Habilidade("Golpe Pesado", 4, "Física"))
guerreiro.adicionarHabilidade(new Habilidade("Defender", 5, "Defesa"))
guerreiro2.adicionarHabilidade(new Habilidade("Defender", 8, "Defesa"))

console.log("\n--- Q2: Polimorfismo - atacar() ---");
[guerreiro, mago, guerreiro2].forEach(p => p.atacar())

console.log("\n--- Criando guilda e adicionando membros ---")
const guilda = new Guilda("Messier 45")
guilda.adicionarMembro(guerreiro)
guilda.adicionarMembro(mago)
guilda.adicionarMembro(guerreiro2)
guilda.listarMembros()

console.log("\n--- Q3: Busca parcial por 'art' ---");
guilda.buscarMembro("art")

console.log("\n--- Q3: Habilidades de Morgana ---");
guilda.listarHabilidadesDeMembro("Morgana");

console.log("\n--- Q5: Removendo Arthur (agregação) ---")
guilda.removerMembro(guerreiro)
console.log("Guilda após remoção:")
guilda.listarMembros();
console.log("Arthur ainda existe fora da guilda:", guerreiro.toString())


// Questão 4: Testando cada exceção

console.log("\n--- Q4: Testando ErroAbstracao ---")
try {
    const p = new Personagem("Teste", 1)
} catch (erro) {
    console.log(`${erro.name}: ${erro.message}`)
}

console.log("\n--- Q4: Testando ErroTipoInvalido em adicionarHabilidade ---")
try {
    guerreiro.adicionarHabilidade("texto inválido")
} catch (e) {
    console.log(`${e.name}: ${e.message}`)
}

console.log("\n--- Q4: Testando ErroTipoInvalido em adicionarMembro ---")
try {
    guilda.adicionarMembro(123);
} catch (e) {
    console.log(`${e.name}: ${e.message}`)
}

console.log("\n--- Q4: Testando ErroMembroNaoEncontrado ---")
try {
    guilda.removerMembro(guerreiro) // já removido
} catch (e) {
    console.log(`${e.name}: ${e.message}`)
}
class ErroPolitico extends Error {
    constructor(message) {
        super(message)
        this.name = "ErroPolitico"
    }
}

class ErroTipoInvalido extends ErroPolitico {
    constructor(message) {
        super(message)
        this.name = "ErroTipoInvalido"
    }
}

class ErroPoliticoNaoEncontrado extends ErroPolitico {
    constructor(message) {
        super(message)
        this.name = "ErroPoliticoNaoEncontrado"
    }
}

class ErroAbstracao extends ErroPolitico {
    constructor(message) {
        super(message)
        this.name = "ErroAbstracao"
    }
}


class PropostaDeLei {
    #titulo
    #ano
    #tipo

    constructor(titulo, ano, tipo) {
        this.#titulo = titulo 
        this.#ano = ano
        this.#tipo = tipo
    }

    get titulo() {
        return this.#titulo
    }

    toString() {
        return `[Proposta] "${this.#titulo}" (${this.#ano}) - Tipo ${this.#tipo}`
    }

}

class Politico {
    #nome
    #registro
    #propostas

    constructor(nome, registro) {
        if (new.target === Politico) {
            throw new ErroAbstracao("A classe Politico é abstrata e não pode ser instanciada diretamente")
        }

        this.#nome = nome
        this.#registro = registro
        this.#propostas = [] // Composição: criada e mantida pelo político
    }

    get nome() {
        return this.#nome
    }

    get registro() {
        return this.#registro
    }

    adicionarProposta(proposta) {
        if (!(proposta instanceof PropostaDeLei)) {
            throw new ErroTipoInvalido("O objeto fornecido não é uma PropostaDeLei válida")
        }
        this.#propostas.push(proposta)
    }

    listarPropostas() {
        if (this.#propostas.length === 0) return "Nenhuma proposta protocolada"

        return this.#propostas.map(p => p.toString()).join("\n")
    }

    discursar() {
        throw new ErroAbstracao("O método discursar() deve ser implementado pelas subclasses.")
    }

    toString() {
        return `[Politico] Nome: ${this.#nome} / Registro: ${this.#registro}`
    }
}

class Deputado extends Politico {
    #bancadaTematica

    constructor(nome, registro, bancadaTematica) {
        super(nome, registro)
        this.#bancadaTematica = bancadaTematica
    }

    discursar() {
        // Polimorfismo
        return `O Deputado ${this.nome} subiu à tribuna defendendo veementemente os interesses da ${this.#bancadaTematica}`
    }
}

class Senador extends Politico {
    #estadoRepresentado

    constructor(nome, registro, estadoRepresentado) {
        super(nome, registro)
        this.#estadoRepresentado = estadoRepresentado
    }

    discursar() {
        return `O senador ${this.nome} proferiu um discurso focado no pacto federativo e no desenvolvimento do estado de ${this.#estadoRepresentado}`
    }
}

class Partido {
    #nome
    #sigla
    #filiados

    constructor(nome, sigla) {
        this.#nome = nome
        this.#sigla = sigla
        this.#filiados = []
    }

    get filiados() {
        return this.#filiados
    }

    filiarPolitico(politico) {
        if (!(politico instanceof Politico)) {
            throw new ErroTipoInvalido("Apenas instâncias da classe Politico podem ser filiadas.")
        }
        this.#filiados.push(politico)
    }

    desfiliarPolitico(politico) {
        const index = this.#filiados.indexOf(politico)
        if (index === -1) {
            throw new ErroPoliticoNaoEncontrado`O político ${politico.nome} não está filiado ao ${this.sigla}`
        }

        this.#filiados.splice(index, 1)
    }

    listarFiliados() {
        if (this.#filiados.length === 0) return `O partido ${this.#sigla} não possui filiados`
        return this.#filiados.map(f => f.toString()).join("\n")
    }

    buscarFiliadosPorNome(trecho) {
        // busca parcial por trecho do nome
        return this.#filiados.filter(f => f.nome.toLowerCase().includes(trecho.toLowerCase()))
    }

    listarPropostasDeFiliado(nomeCompleto) {
        const politico = this.#filiados.find(f => f.nome === nomeCompleto)
        if (!politico) {
            throw new ErroPoliticoNaoEncontrado(`Político ${nomeCompleto} não foi encontrado neste partido`)
        }
        return politico.listarPropostas()
    }
}



console.log("======== TESTE DE ERROS ========")

try {
    // tentativa de instanciar classe abstrata
    const politicoInvalido = new Politico("Alguém", "123")
} catch (e) {
    console.log(`Erro Capturado: [${e.name}] -> ${e.message}`)
}

try {
    const partidoFicticio = new Partido("Partido de Teste", "PTST")
    // Tentativa de filiar um tipo incorreto
    partidoFicticio.filiarPolitico({nome: "Impostor"})
} catch (e) {
    console.log(`Erro Capturado: [${e.name}] -> ${e.message}`)
}


console.log("\n========== DEMONSTRAÇÃO DO SISTEMA POLÍTICO ==========")

// 1- Criando os Políticos
const dep1 = new Deputado("Deputado Silva", "DEP5501", "Bancada da Educação")
const dep2 = new Deputado("Deputada Moreira", "DEP5502", "Bancada da Tecnologia")
const sen1 = new Senador("Senador Oliveira", "SEN1101", "Hell de Janeiro")

// 2- Adicionando Propostas de lei (composição)
dep1.adicionarProposta(new PropostaDeLei("Internet nas escolas", 2026, "Projeto de Lei"))
dep1.adicionarProposta(new PropostaDeLei("Aumento do Piso dos Professores", 2026, "PEC"))

dep2.adicionarProposta(new PropostaDeLei("Incentivo a Startups Nacionais", 2026, "Projeto de Lei"))
dep2.adicionarProposta(new PropostaDeLei("Lei Geral de IA Responsável", 2026, "Projeto de Lei"))

sen1.adicionarProposta(new PropostaDeLei("Fundo de Apoio aos Municipios Fluminenses", 2026, "Emenda"))
sen1.adicionarProposta(new PropostaDeLei("Reforma Tributária Estadual", 2026, "PEC"))

// 3- Criando o Partido e Filiando (agregação)
const partido = new Partido("Partido do Futuro", "PFUT")
partido.filiarPolitico(dep1)
partido.filiarPolitico(dep2)
partido.filiarPolitico(sen1)


// 4- Listando membros e suas respectivas composições (propostas)

console.log("--- Filiados Atuais e suas Propostas ---")
partido.filiados.forEach(filiado => {
    console.log(`\nFiliado: ${filiado.nome}`)
    console.log(filiado.listarPropostas())
})

// 5- Demonstração de Busca Parcial
console.log("\n--- Busca Parcial por 'Silva' ---")

const resultadoBusca = partido.buscarFiliadosPorNome("dep")
resultadoBusca.forEach(p => console.log(p.toString()))

// 6- Demonstração da Agregação (Remoção sem destruição do objeto)
console.log("\n==== Desfiliação (Agregação) ====")
partido.desfiliarPolitico(dep2)
console.log(`Filiados restantes no partido:\n${partido.listarFiliados()}`)
console.log(`\nA Deputada removida continua existindo no sistema de forma independente: ${dep2.toString()}`)

// 7- Demonstração do Polimorfismo
console.log("\n=== Chamada Polimórfica (Discursos) ===")
// dep1 continua no partido, sem1 também
partido.filiados.forEach(filiado => {
    console.log(filiado.discursar())
})
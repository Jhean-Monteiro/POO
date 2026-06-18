class ErroEspacial extends Error {
    constructor(message) {
        super(message)
        this.name = "ErroEspacial"
    }
}

class ErroTipoInvalido extends ErroEspacial {
    constructor(message) {
        super(message)
        this.name = "ErroTipoInvalido"
    }
}

class ErroNaveNaoEncontrada extends ErroEspacial {
    constructor(message) {
        super(message)
        this.name = "ErroNaveNaoEncontrada"
    }
}

class ErroAbstracao extends ErroEspacial {
    constructor(message) {
        super(message)
        this.name = "ErroAbstracao"
    }
}


// Composição
class Modulo {
    #nome
    #potencia
    #tipo // Ex: "Propulsão", "Armamento", "Sensores"

    constructor(nome, potencia, tipo) {
        this.#nome = nome
        this.#potencia = potencia
        this.#tipo = tipo
    }

    get nome() {
        return this.#nome
    }

    toString() {
        return `[Módulo] ${this.#nome} / Tipo: ${this.#tipo} / Potência: ${this.#potencia}W`
    }
}

// Classe Base (Abstrata)
class Nave {
    #nome
    #registroID
    #modulos

    constructor(nome, registroID) {
        if (new.target === Nave) {
            throw new ErroAbstracao("A classe Nave é um projeto base (abstrato) e não pode sair do estaleiro diretamente.")
        }
        this.#nome = nome
        this.#registroID = registroID
        this.#modulos = [] // composição: Os módulos nascem com a nave
    }

    get nome() {
        return this.#nome
    }

    get registro() {
        return this.#registroID
    }

    instalarModulo(modulo) {
        if (!(modulo instanceof Modulo)) {
            throw new ErroTipoInvalido("Apenas peças do tipo Modulo podem ser instaladas na Nava.")
        }
        this.#modulos.push(modulo)
    }

    listarModulos() {
        if (this.#modulos.length === 0) return "A nave está sem módulos instalados"
        return this.#modulos.map(m => m.toString()).join("\n")
    }

    // Método Abstrato a ser implementado
    executarDiretriz() {
        throw new ErroAbstracao("Toda nave precisa ter uma diretriz específica de execução.")
    }

    toString() {
        return `[Nave] ${this.#nome} (Registro: ${this.#registroID})`
    }
}

try {
    const nave = new Nave("nome", "nome2", "nome3")
} catch (e) {
    console.log(`[Erro] ${e.name}: ${e.message}`)
}

class NaveDeCombate extends Nave {
    #armamentoPrincipal

    constructor(nome, registroID, armamentoPrincipal) {
        super(nome, registroID)
        this.#armamentoPrincipal = armamentoPrincipal
    }

    executarDiretriz() {
        // polimorfismo
        return `Aviso de Combate! A nave ${this.nome} ativou o sistema bélico focado em ${this.#armamentoPrincipal}.`
    }
}

class NaveCientifica extends Nave {
    #areaDePesquisa

    constructor(nome, registroID, areaDePesquisa) {
        super(nome, registroID)
        this.#areaDePesquisa = areaDePesquisa
    }

    executarDiretriz() {
        // polimorfismo dnv
        return `Varredura Iniciada! A nave ${this.nome} está utilizando sensores de longo alcance para focar em ${this.#areaDePesquisa}`
    }
}

// agregação
class FrotaEstelar {
    #nomeDaFrota;
    #navesFiliadas

    constructor(nomeDaFrota) {
        this.#nomeDaFrota = nomeDaFrota
        this.#navesFiliadas = []
    }

    get naves() {
        return this.#navesFiliadas
    }

    adicionarNave(nave) {
        if (!(nave instanceof Nave)) {
            throw new ErroTipoInvalido("O radar indica um objeto não identificado. Apenas instâncias de Nave podem entrar na frota.")
        }
        this.#navesFiliadas.push(nave)
    }

    removerNave(nave) {
        const index = this.#navesFiliadas.indexOf(nave)
        if (index === -1) {
            throw new ErroNaveNaoEncontrada(`A nave ${nave.nome} não foi localizada nos reegistros desta frota`)
        }
        this.#navesFiliadas.splice(index, 1)
    }

    listarFrota() {
        if (this.#navesFiliadas.length === 0) return `A frota ${this.#nomeDaFrota} não possui naves no momento.`
        return this.#navesFiliadas.map(n => n.toString()).join("\n")
    }

    buscarNavesPorTrecho(trecho) {
        return this.#navesFiliadas.filter(m => n.nome.toLowerCase().includes(trecho.toLowerCase()))
    }

    inspecionarNave(nomeCompleto) {
        const nave = this.#navesFiliadas.find(n => n.nome === nomeCompleto)
        if (!nave) {
            throw new ErroNaveNaoEncontrada(`Nave ${nomeCompleto} não encontrada nos registros da frota`)
        }
        return nave.listarModulos()
    }
}

console.log("======= TESTE DE INTEGRIDADE (TRY/CATCH =========")

try {
    // testando bloqueio de classe abstrata
    const naveFantasma = new Nave("USS Invalida", "000")
} catch (e) {
    console.log(`[ALERTA DO SISTEMA] -> ${e.message}`)
}

try {
    const frotaTeste = new FrotaEstelar("Frota Beta")

    // Testando adição de tipo incorreto
    frotaTeste.adicionarNave("Cometa")
} catch (e) {
    console.log(`[ALERTA DO SISTEMA] -> ${e.message}`)
}


console.log("======== DEMONSTRAÇÂO DO SISTEMA ESPACIAL =========")

// criando instâncias
const nave1 = new NaveDeCombate("Ares Vanguard", "CB-77", "Laser Focado")
const nave2 = new NaveDeCombate("Star Destroyer", "CB-99", "Canhões de Plasma")
const nave3 = new NaveDeCombate("Horizon Seeker", "SC-01", "Analise de Buracos Negros")

nave1.instalarModulo(new Modulo("Motor de Dobra", 5000, "Propulsão"))
nave1.instalarModulo(new Modulo("Escudo Defletor", 2000, "Defesa"))

nave3.instalarModulo(new Modulo("Radar Taquiônico", 1500, "Sensores"))
nave3.instalarModulo(new Modulo("Laboratório Botânico", 500, "Pesquisa"))


// Agrupando na frota (Agregação)
const frotaAlfa = new FrotaEstelar("Primeira Frota de Exploração")
frotaAlfa.adicionarNave(nave1)
frotaAlfa.adicionarNave(nave2)
frotaAlfa.adicionarNave(nave3)


// listagem e inspeção
console.log("\n----- Manifesto da Frota e Módulos ------")

frotaAlfa.naves.forEach(nave => {
    console.log(`\nInspecionando: ${nave.nome}`)
    console.log(nave.listarModulos())
})

// Destacamento de nave (Agregação: a nave não é destruída ao sair)
console.log("\n--- Destacamento de Unidade (Agregação) ---")

frotaAlfa.removerNave(nave2)

console.log(`Naves restantes na frota: \n${frotaAlfa.listarFrota()}`)
console.log(`\nA nave destacada segue em missão solo pelo espaço: ${nave2.toString()}`)

// polimorfismo
console.log("\n----- Executando Diretrizes (Polimorfismo) -----")
frotaAlfa.naves.forEach(nave => console.log(nave.executarDiretriz()))
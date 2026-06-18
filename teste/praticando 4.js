class ErroRestaurante extends Error {
    constructor(message) {
        super(message)
        this.name = "ErroRestaurante"
    }
}

class ErroTipoInvalido extends ErroRestaurante {
    constructor(message) {
        super(message)
        this.name = "ErroTipoInvalido"
    }
}

class ErroFuncionarioNaoEncontrado extends ErroRestaurante {
    constructor(message) {
        super(message)
        this.name = "ErroFuncionarioNaoEncontrado"
    }
}

class ErroAbstracao extends ErroRestaurante {
    constructor(message) {
        super(message)
        this.name = "ErroAbstracao"
    }
}


// composição

class Tarefa {
    #descricao
    #tempoEstimado
    #prioridade

    constructor(descricao, tempoEstimado, prioridade) {
        this.#descricao = descricao
        this.#tempoEstimado = tempoEstimado
        this.#prioridade = prioridade
    }

    get descricao() {
        return this.#descricao
    }

    toString() {
        return `[Tarefa - ${this.#prioridade}] ${this.#descricao} (${this.#tempoEstimado})` 
    }
}

// classe base (abstrada)
class Funcionario {
    #nome;
    #matricula;
    #tarefas;
    constructor(nome, matricula) {
        if (new.target === Funcionario) {
            throw new ErroAbstracao("A classe Funcionario é abstrata. Contrate cargo específico (Cozinheiro ou Atendente)")
        }
        this.#nome = nome
        this.#matricula = matricula
        this.#tarefas = [] // composição: as tarefas nascem e morrem com o funcionário
    }

    get nome() {
        return this.#nome
    }

    get matricula() {
        return this.#matricula
    }

    atribuirTarefa(tarefa) {
        if (!(tarefa instanceof Tarefa)) {
            throw new ErroTipoInvalido("O item atribuido não é uma tarefa válida")
        }
        return this.#tarefas.push(tarefa)
    }

    listarTarefas() {
        if (this.#tarefas.length === 0) return "Nenhuma tarefa atribuida hoje."
        return this.#tarefas.map(t => t.toString()).join("\n")
    }

    // Método Abstrato (implementar nas subclasses)
    trabalhar() {
        throw new ErroAbstracao ("Todo funcionário precisa ter uma rotina de trabalho definida.")
    }

    toString() {
        return `[Matricula: ${this.#matricula}] ${this.#nome}`
    }
}

// Subclasse 1 (herança)
class Cozinheiro extends Funcionario {
    #especialidade

    constructor(nome, matricula, especialidade) {
        super(nome, matricula)
        this.#especialidade = especialidade
    }

    trabalhar() {
        // polimorfismo
        return `Cozinheiro(a) ${this.nome} está na cozinha preparando pratos focados em ${this.#especialidade}`
    }
}

// Subclasse 2 (herança)
class Atendente extends Funcionario {
    #setor

    constructor(nome, matricula, setor) {
        super(nome, matricula)
        this.#setor = setor
    }

    trabalhar() {
        // Polimorfismo
        return `Atendente ${this.nome} está anotando pedidos e servindo as mesas no setor ${this.#setor}`
    }
}

// Agregação
class Restaurante {
    #nome
    #equipe

    constructor(nome) {
        this.#nome = nome
        this.#equipe = []
    }

    get equipe() {
        return this.#equipe
    }

    contratar(funcionario) {
        if (!(funcionario instanceof Funcionario)) {
            throw new ErroTipoInvalido("Apenas objetos do tipo Funcionario podem integrar a equipe.")
        }
        this.#equipe.push(funcionario)
    }

    demitir(funcionario) {
        const index = this.#equipe.indexOf(funcionario)
        if (index === -1) {
            if (funcionario.nome) {
                throw new ErroFuncionarioNaoEncontrado(`O funcionário ${funcionario.nome} não consta na folha de pagamento`)
            } else {
                throw new ErroFuncionarioNaoEncontrado(`O funcionário ${funcionario} não consta na folha de pagamento`)
            }
        }
        this.#equipe.splice(index, 1)
    }

    listarEquipe() {
        if (this.#equipe.length == 0) return "O restaurante não possui funcionários no momento"
        return this.equipe.map(f => f.toString()).join('\n')
    }

    buscarPorNome(trecho) {
        return this.#equipe.filter(f => f.nome.toLowerCase().includes(trecho.toLowerCase()))
    }

    verificarTarefasDoFuncionario(nomeCompleto) {
        const funcionario = this.#equipe.find(f => f.nome === nomeCompleto)
        if (!funcionario) {
            throw new ErroFuncionarioNaoEncontrado(`Funcionário ${nomeCompleto} não encontrado`)
        }
        return funcionario.listarTarefas()
    } 
}

const funcionario = new Cozinheiro("João da silva")

console.log("\n===== TESTANDO PROTEÇÕES (TRY/CATCH ======")

const marisco = new Restaurante("Marisco")
try {
    marisco.demitir("João")
} catch (e) {
    console.log(e.message)
}
try {
    marisco.demitir(funcionario)
} catch (e) {
    console.log(e.message)
}

try {
    const funcGenerico = new Funcionario("João Base", "000")
} catch (e) {
    console.log(`[ERRO CAPTURADO] -> ${e.message}`)
}

try {
    const meuRestaurante = new Restaurante("Sabor do Mar")
    meuRestaurante.demitir(new Cozinheiro("Inexistente", "999", "Massas"))
} catch (e) {
    console.log(`[ERRO CAPTURADO] -> ${e.message}`)
}


console.log("\n==== Demonstração do Sistema ====")

// 1- instanciando a Equipe (Objetos)
const chef = new Cozinheiro("Paola", "COZ-001", "Culinária Italiana")

const sousChef = new Cozinheiro("Henrique", "COZ-002", "Carnes e Grelhados")

const garcom = new Atendente("Carlos", "ATD-001", "Varanda Externa")

// 2- Adicionando Tarefas (Composição)
chef.atribuirTarefa(new Tarefa("Preparar molho pomodoro base", 45, "Alta"))
chef.atribuirTarefa(new Tarefa("Revisar estoque de massas", 15, "Média"))

sousChef.atribuirTarefa(new Tarefa("Temperar os cortes de carne", 30, "Alta"))

garcom.atribuirTarefa(new Tarefa("Limpar as mesas da varanda", 29, "Alta"))
garcom.atribuirTarefa(new Tarefa("Dobrar guardanapos", 15, "Baixa"))

// 3- Formando o restaurante (agregação)
const bistro = new Restaurante("Bistrô POO")
bistro.contratar(chef)
bistro.contratar(sousChef)
bistro.contratar(garcom)

// 4- Listando Equipe e suas Tarefas Embutidas
console.log("\n==== Equipe Ativa e Atribuições ====")
bistro.equipe.forEach(membro => {
    console.log(`\nColaborador: ${membro.nome}`)
    console.log(membro.listarTarefas())
})


// 5- Demissão (Testando a Agregação - Objeto não é destruído)
console.log("\n==== Alteração de Quadro de Funcionários ====")
bistro.demitir(sousChef)

console.log(`Equipe atualizada:\n${bistro.listarEquipe()}`);
console.log(`\nO funcionário demitido continua existindo fora do restaurante (Agregação): ${sousChef.toString()}`);

// 6- Polimorfismo em Ação
console.log("\n--- (Polimorfismo) ---");
bistro.equipe.forEach(membro => {
  console.log(membro.trabalhar());
});
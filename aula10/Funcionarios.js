const {SalarioInvalidoError} = require("./Erros");

// ---------------------------------
// CLASSE BASE ABSTRATA: Funcionario
// ---------------------------------

class Funcionario {
    constructor(nome, matricula, salarioBase) {
        // bloqueia a instanciação direta da classe abstrata.
        // "new.target" contém a classe que está sendo instanciada.
        // se for a própria Funcionario (e não uma subclasse), reclamamos.
        if (new.target === Funcionario) {
            throw new Error("Funcionario é uma classe abstrata e não pode ser instanciada diretamente.")
        }

        // Validação do salário - regra de negócio que vale para todos os funcionarios.
        // feita aqui uma unica vez, na classe pai
        if (salarioBase < 0) {
            throw new SalarioInvalidoError(
                `Salário base não pode ser negativo. recebido: ${salarioBase}`
            )
        }

        // Atributos "privados" por convenção (prefixo _).
        // o _ avisa outros desenvolvedores: "não acesse isso diretamente"
        this._nome = nome;
        this._matricula = matricula;
        this._salarioBase = salarioBase;
    }

    // ------------------------
    // Getters (encapsulamento)
    // ------------------------

    // em JS, "get" cria uma propriedade de leitura. 
    // Ao escrever funcionario.nome, o JS chama esse getter automaticamente

    get nome() {return this._nome}
    get matricula() {return this._matricula}
    get salarioBase() {return this._salarioBase}


    // setter com validação.
    // centraliza a regra de negócio em um só lugar.
    set salarioBase(valor) {
        if (valor < 0) {
            throw new SalarioInvalidoError(
                `Salário base não pode ser negativo. Recebido: ${valor}`
            )
        }
        this._salarioBase = valor
    }


    // ------------------------------------------------------------------
    // Métodos Abstratos (devem ser sobrescritos pelas subclasses)
    // ------------------------------------------------------------------

    // Esses métodos existem aqui só para deixar claro que toda subclasse PRECISA implementar sua própria versão. Se uma subclasse esquecer, o erro aparece na hora de chamar o método
    calcularSalario() {
        throw new Error(`${this.constructor.name} precisa implementar calcularSalario().`)
    }

    descricao() {
        throw new Error(`${this.constructor.name} precisa implementar descricao().`)
    }

    //-------------------------------------------------------
    // toString(): como o objeto aparece quando impresso 
    // --------------------------------------------------------

    toString() {
        return (
            `[${this.descricao()}] ${this._nome} ` +
            `(Matrícula: ${this._matricula} | ` +
            `Salário: R$ ${this.calcularSalario().toFixed(2)})`
        )
    }
}

// --------------------
// SUBCLASSE: Analista
// --------------------

// "extends Funcionario" significa: Analista herda tudo de Funcionario.
// Herdar significa que Analista ganha automaticamente:
//   - os atributos _nome, _matricula, _salarioBase
//   - os getters nome, matricula, salarioBase
//   - o setter salarioBase (com validação)
//   - o toString()
// A única obrigação é implementar calcularSalario() e descricao(),
// que foram declarados como "abstratos" na classe pai.

class Analista extends Funcionario {

    calcularSalario() {
        return this._salarioBase
    }

    descricao() {
        return "Analista"
    }
}

const analista = new Analista()
let teste = analista.descricao()
console.log(teste)


// ---------------------------
// SUBCLASSE: Desenvolvedor
// ---------------------------

// desenvolvedor tem um atributo a mais: a lista  de linguagens que domina. Por isso precisa de um construtor proprio

class Desenvolvedor extends Funcionario {
    // constante de classe: um valor  fixo que pertence à classe, não ao objeto. 
    // "static" significa que é compartilhado por todos os Desenvolvedores
    // não faz sentido cada um ter seu próprio valor de bonus.
    // se o bonus mudar, alteramos só aqui e afeta todos automaticamente
    static BONUS_POR_LINGUAGEM = 300;

    constructor(nome, matricula, salarioBase, linguagens = []) {

        // "super()" chama o constructor da classe pai (Funcionario). 
        // é obrigatório em toda subclasse que tem constructor.
        // precisa vir antes do this
        super(nome, matricula, salarioBase)

        // o "..." antes de linguagens é o spread operator - ele copia todos os elementos do array para um novo array.
        // fazemos isso para guardar referência ao array original:
        // se alguém estragar o array lá fora, não afeta o objeto aqui dentro
        this._linguagens = [...linguagens]
    }

    // Getter de linguagens: também retorna uma cópia pelo mesmo motivo. para que ninguém modifique o array interno fazendo dev.linguagens.push(...)
    get linguagens() {
        return [...this._linguagens]
    }

    // array method includes verifica se o elemento já existe no array
    adicionarLinguagem(linguagem) {
        if (!this._linguagens.includes(linguagem)) {
            this._linguagens.push(linguagem)
        }
    }

    calcularSalario() {
        const bonus = this._linguagens.length * Desenvolvedor.BONUS_POR_LINGUAGEM;
        return this._salarioBase + bonus;
    }

    descricao() {
        return "Desenvolvedor"
    }
}

const dev = new Desenvolvedor("Jhean", 2222222, 1000)
dev.adicionarLinguagem("Python")
dev.adicionarLinguagem("Java")
console.log(dev.calcularSalario())


// -------------------
// SUBCLASSE: Gerente
// -------------------

class Gerente extends Funcionario {
    static BONUS_LIDERANCA = 0.25

    // Calcula: salario base x 1.25
    // Exemplo: salario 8000 -> 8000 x 1.25 = 10000
    calcularSalario() {
        return this._salarioBase * (1 + Gerente.BONUS_LIDERANCA)
    }

    descricao() {
        return "Gerente"
    }
}

// -----------------------
// SUBCLASSE: Estagiario
// -----------------------

// apenas com 60% do salário

class Estagiario extends Funcionario {
    static PERCENTUAL_SALARIO = 0.60 // 60%

    calcularSalario() {
        return this._salarioBase * Estagiario.PERCENTUAL_SALARIO
    }

    descricao() {
        return "Estagiário"
    }
}


module.exports = { Funcionario, Analista, Desenvolvedor, Gerente, Estagiario };

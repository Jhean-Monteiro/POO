// --------------------------------
// Classe Departamento (Composição)
// --------------------------------

// Composição:
// Departamento *contém* Funcionarios (relação "tem um")

// regra para escolher entre herança e composição:
//   - Herança quando a relação é "é um"  → Gerente É UM Funcionario
//   - Composição quando é "tem um/muitos"→ Departamento TEM Funcionarios

// ========================================================================================

const {FuncionarioNaoEncontradoError} = require("./Erros")




class Departamento {
    constructor(nome) {
        this._nome = nome;
        this._funcionarios = []
    }

    get nome() {
        return this._nome
    }

    // retorna a quantidade de funcionarios
    get tamanho() {
        return this._funcionarios.length
    }

    // -----------
    // CONTRATAR:
    // adiciona um funcionario no departamento
    // ----------------------------------------

    contratar(funcionario) {
        this._funcionarios.push(funcionario)
    }

    // ---------------------------------------------
    // Demitir: remove um funcionario pela matricula
    // ---------------------------------------------

    demitir(matricula) {
        const indice = this._funcionarios.findIndex(f => f.matricula === matricula)

        if (indice === -1) {
            throw new FuncionarioNaoEncontradoError(
                `Nenhum funcionário com matrícula '${matricula}' no departamento '${this._nome}'.`   
            )
        }

        this._funcionarios.splice(indice, 1)
    }

    // ----------------------------------------------
    // Buscar: retorna o funcionário com a matrícula informada
    // ----------------------------------------------

    buscar(matricula) {
        const encontrado = this._funcionarios.find(f => f.matricula === matricula)

        if (!encontrado) {
            throw new FuncionarioNaoEncontradoError(
                `Nenhum funcionário com matrícula '${matricula}' no departamento '${this._nome}'.`
            )
        }
        return encontrado;
    }

    // ----------------------------------------------------------------
    // Folha de pagamento: soma os salários de todos os funcionários
    // ----------------------------------------------------------------
    folhaDePagamento() {
        return this._funcionarios.reduce((total, f)=> total + f.calcularSalario(), 0)
    }

    // ----------------------------------------------
    // funcionarioMaisBemPago 
    // ----------------------------------------------
    // retorna o funcionario com o maior salario calculado
    // usa Math.max + map para encontrar o maior valor, depois busca o funcionário correspondente. não precisa de bibliotecas em javascript.
    // retorna null se o departamento estiver vazio

    funcionarioMaisBemPago() {
        if (this._funcionarios.length === 0) {
            return null;
        }

        // Reduzimos o array comparando salarios, guardando sempre o maior.
        // "acumulador" começa como o primeiro funcionário e vai sendo
        // substituido sempre que encontramos alguém com salário maior.

        return this._funcionarios.reduce((maisRico, atual) => {
            return atual.calcularSalario() > maisRico.calcularSalario() ? atual : maisRico;
        })
    }

    toString() {
        return `Departamento: ${this._nome} (${this.tamanho} funcionário(s))`;
    }

}

module.exports = {Departamento}
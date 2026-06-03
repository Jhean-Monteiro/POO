// -------------------------------------------------
// Classe Empresa (Agregação + Tratamento de Erros)
// -------------------------------------------------

// Conceitos:
// Agregação -> Empresa referencia Departamentos independentes
// Tratamento por camada -> todos os try/catch vivem aqui

// Diferença entre Composição e Agregação:
// - Composição: o objeto filho não existe sem o pai
//     (um Funcionario dentro de Departamento não faz sentido sozinho)
// - Agregação: o objeto filho pode existir de forma independente
//     (um Departamento pode existir sem estar em nenhuma Empresa)

// Padrão de tratamento de erros por camada:
// - Funcionario e Departamento *lançam* erros
// - Empresa *captura* esses erros e decide o que fazer
// - O código que usa Empresa não precisa se preocupar com detalhes internos



const { SalarioInvalidoError, FuncionarioNaoEncontradoError } = require("./Erros")

class Empresa {
    constructor(razaoSocial) {
        this._razaoSocial = razaoSocial;

        // a chave é o nome do departamento, o valor é o objeto departamento
        this._departamentos = {}
    }

    get razaoSocial() {
        return this._razaoSocial;
    }

    // retorna o total de funcionários somando todos os departamentos
    get tamanho() {
        return Object.values(this._departamenos).reduce((total, dep) => total + dep.tamanho, 0)
    }

    // ----------------------------------
    // Adicionar departamento à empresa
    // ----------------------------------

    adicionarDepartamento(dep) {
        this._departamentos[dep.nome] = dep
    }

    // -------------------------------------------------------------
    // Admitir: cria e contrata um funcionário em um departamento.
    // O try/catch aqui protege contra dois erros:
    //   - SalarioInvalidoError: dados inválidos na criação do objeto
    //   - Departamento inexistente (chave não encontrada no dicionário)
    // -------------------------------------------------------------

    admitir(nomeDep, ClasseFuncionario, nome, matricula, salario, extras = {}) {
        try {
            // padrão factory: a instanciação acontece dentro do try.
            // "extras permite passar argumentos adicionais como linguagens para desenvolvedor"
            const funcionario = new ClasseFuncionario(nome, matricula, salario, ...Object.values(extras));

            // se o departameto não existir, essa linha lança typeError.
            this._departamentos[nomeDep].contratar(funcionario);
            return true;
        } catch (erro) {
            if (erro instanceof SalarioInvalidoError) {
                console.log(`  [ADMISSÃO RECUSADA] ${erro.message}`);
            } else if (erro instanceof TypeError) {
                // typeError acontece quando tentamos chamar .contratar() em undefined.
                // (ou seja, quando o departamento não existe no dicionario)
                console.log(`  [ERRO] Departamento '${nomeDep}' não existe na empresa.`);

            } else {
                throw erro; // Erros inesperados são relançados. não silenciamos o que não conhecemos
            }

            return false;
        }
    }

    // ----------------------------------------------------------------------
    // Ajustar salário: localiza o funcionério e aplica o novo valor
    // ----------------------------------------------------------------------

    ajustarSalario(matricula, novoValor) {
        try {
            const funcionario = this._localizar(matricula);
            funcionario.salarioBase = novoValor;
            console.log(` [OK] Salário atualizado: ${funcionario}`)
        } catch (erro) {
            if (erro instanceof FuncionarioNaoEncontradoError) {
                console.log(` [ERRO] ${erro.message}`)
            } else if (erro instanceof SalarioInvalidoError) {
                console.log(` [ERRO] ${erro.message}`)
            } else {
                throw erro
            }
        }
    }

    // ------------------------------------------------------------------------
    // DEMITIR: remove um funcionario de um departamento específico
    // ------------------------------------------------------------------------

    demitir(nomeDep, matricula) {
        try {
            this._departamenos[nomeDep].demitir(matricula)
            console.log(`  [OK] Matrícula '${matricula}' demitida de '${nomeDep}'.`);
        } catch (erro) {
            if (erro instanceof FuncionarioNaoEncontradoError) {
                console.log(`  [ERRO] ${erro.message}`);
            } else {
                throw erro
            }
        }
    }

    // ----------------------------------------------------------
    // Folha total: soma as folhas de todos os departamentos
    // ----------------------------------------------------------
    folhaTotal() {
        return Object.values(this._departamenos).reduce((total, dep) => total + dep.folhaDePagamento(), 0)
    }

    // ----------------------------------------------------------------
    // Relatório geral: exibe todos os departamentos e funcionários 
    // ----------------------------------------------------------------

    relatorio() {
        console.log(`\n========== RELATÓRIO — ${this._razaoSocial} ==========`);

        for (const dep of Object.values(this._razaoSocial)) {
            console.log(`\n  ${dep}`)
            for (const f of dep.listar()) {
                console.log(`  ${f}`)
            }
            console.log(` Folha do departamento: R$ ${dep.folhaDePagamento().toFixed(2)}`)
        }
        console.log(`\n  FOLHA TOTAL: R$ ${this.folhaTotal().toFixed(2)}`)
        console.log("=====================================================\n");
    }

    // ------------------------
    // RelatorioPorCargo
    // ------------------------

    // Agrupa todos os funcionários da empresa pelo tipo (cargo).
    // usa um objeto como dicioonário onde a chave é o cargo e o 
    // valor é um array com todos os funcionários daquele cargo.

    relatorioPorCargo() {
        console.log(`\n===== RELATÓRIO POR CARGO — ${this._razaoSocial} =====`);

        // Montamos o agrupamento percorrendo todos os departamentos e funcionários
        const grupos = {}
        for (const dep of Object.values(this._departamentos)) {
            for (const f of dep.listar()) {
                const cargo = f.descricao() // ex: "Analista", "Gerente"

                if (!grupos[cargo]) {
                    grupos[cargo] = []
                }
                grupos[cargo].push(f)
            }
        }

        // Exibimos os grupos organizados por cargo.
        for (const [cargo, funcionarios] of Object.entries(grupos)) {
        console.log(`\n  ${cargo}s (${funcionarios.length}):`);
        for (const f of funcionarios) {
            console.log(`    ${f}`);
        }
        }
    
        // Se não há nenhum funcionário na empresa.
        if (Object.keys(grupos).length === 0) {
        console.log("  Nenhum funcionário cadastrado.");
        }
    
        console.log("=====================================================\n");

    }

    // ----------------------------------------------------------
    // Método privado (por convenção): localiza um funcionário
    // percorrendo todos os departamentos.
    // ----------------------------------------------------------

    _localizar(matricula) {

    }

}
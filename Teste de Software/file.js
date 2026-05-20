


// TESTE DA AULA

const resultados = []
function testar(nome, fn) {
    try {
        fn()
        resultados.push({ nome, status: "PASSOU" })
    } catch (e) {
        resultados.push({ nome, status: "FALHOU", motivo: e.message })
    }
}

function assertEqual(real, esperado) {
    if (real !== esperado) {
        throw new Error(
            `Esperado: ${JSON.stringify(esperado)} | Recebido: ${JSON.stringify(real)}` 
        )
    }
}

function assertAlmostEqual(real, esperado, casas = 3) {
    const diferenca = Math.abs(real - esperado)
    const tolerancia = Math.pow(10, -casas) / 2
    
    if (diferenca >= tolerancia) {
        throw new Error(
            `Esperadp aproximadamente: ${esperado} | Recebido: ${real}`
        )
    }
}

function assertLancaErro(fn, mensagemEsperada = null) {
    const SENTINELA = "___NÃO_LANÇOU_EXCEÇÃO__"
    try {
        fn()
        throw new Error(SENTINELA)
    } catch (e) {
        if (e.message === SENTINELA) {
            throw new Error(
                "Esperava que uma exceção fosse lançada, mas nenhuma foi lançada"
            )
        }
        if (mensagemEsperada !== null && e.message !== mensagemEsperada) {
            throw new Error(
                `Mensagem esperada: "${mensagemEsperada}" | Recebida: "${e.message}"`
            )
        }
    }
}

function imprimirResultados(titulo) {
    let passaram = 0;
    let falharam = 0;

    console.log(`\n Suite: ${titulo}`);
    console.log(" " + "-".repeat(titulo.length + 7))

    for (const r of resultados) {
        if (r.status === "PASSOU") {
            console.log(`  [OK ] ${r.nome}`)
            passaram++
        } else {
            console.log(`  [OK ] ${r.nome}`)
            console.log(`    ${r.motivo}`)
            falharam++
        }
    }

    console.log(`\n  Resultado: ${passaram} passaram | ${falharam} falharam`);
    console.log("  " + "=".repeat(40));

    resultados.length = 0;
}



console.log("---------- EXERCICIOS AULA 9 ---------")

// EX 1: RAIZ QUADRADA

class Calculadora {
    somar(a, b) {
        return a + b
    }
    subtrair(a, b) {
        return a - b
    }
    multiplicar(a, b) {
        return a * b
    }
    dividir(a, b) {
        if (b === 0) {
            throw new Error("Não é possível dividir por zero.")
        }
        return a / b
    }
    potencia(base, expoente) {
        return base ** expoente
    }
    raizQuadrada(n) {
        if (n < 0) {
            throw new Error("Não é possivel calcular a raiz de número negativo")
        }
        return n ** 0.5
    }

    // EXERCICIO 2
    restoDivisao(a, b) {
        if (b === 0) throw new Error("Não é possível calcular o resto da divisão por zero")
        return a % b
    }
}

// === TESTE: raizQuadrada ===

testar("raizQuadrada: número positivo perfeito", () => {
    const calc = new Calculadora()
    const resultado = calc.raizQuadrada(9)
    assertEqual(resultado, 3)
})

testar("raizQuadrada: numero positivo não perfeito (aproximado)", () => {
    const calc = new Calculadora()
    assertAlmostEqual(calc.raizQuadrada(2), 1.414, 3)
})

testar("raizQuadrada: zero retorna zero", () => {
    const calc = new Calculadora()
    assertEqual(calc.raizQuadrada(0), 0)
})

testar("raizQuadrada: negativo lança exceção", () => {
    const calc = new Calculadora()
    assertLancaErro(() => calc.raizQuadrada(-4), "Não é possivel calcular a raiz de número negativo")
})



imprimirResultados("Exercicio 1 - raizQuadrada")



// EXERCICIO 2: restoDivisao(a,b)
testar("restoDivisao: 10 % 3 é 1", () => {
    const calc = new Calculadora()
    assertEqual(calc.restoDivisao(10, 3), 1)
})

testar("restoDivisao: divisao exata retorna 0", () => {
    const calc = new Calculadora()
    assertEqual(calc.restoDivisao(12, 4), 0)
})
 
// nota: isso me fez lembrar da lógica da fila circular, onde o dividendo vai icrementando em 1, e quando ele é igual ao divisor, volta pra zero (o inicio da fila)
testar("restoDivisao: dividendo menor que divisor retorna o proprio dividendo", ()=> {
    const calc = new Calculadora()
    assertEqual(calc.restoDivisao(3, 10), 3)
})

testar("restoDivisao: divisão por zero lança exceção", ()=> {
    const calc = new Calculadora()
    assertLancaErro(
        () => calc.restoDivisao(5, 0)
    )
})


imprimirResultados("Exercício 2 — restoDivisao");



// ====== NIVEL 2 ======

// EXERCICIO: ContaBancaria

// atributos: titular (str), saldo (num)
// métodos:
// - depositar(valor): aumenta o saldo
// - sacar(valor): diminui o saldo ou lança erro se o saldo for insuficiente

class ContaBancaria {
    constructor(titular, saldoInicial) {
        if (saldoInicial < 0) {
            throw new Error("Saldo inicial não pode ser negativo")
        }
        this.titular = titular;
        this.saldo = saldoInicial
    }

    depositar = (valor)=> {
        if (valor <= 0) throw new Error("O valor deve ser posotivo!")
        this.saldo += valor;
    }

    sacar = (valor) => {
        if (valor <= 0) throw new Error("O valor do depósito deve ser positivo.")
        
        if (valor >= this.saldo) throw new Error("Saldo Insuficiente")

        this.saldo -= valor;
    }
}

// TESTES: ContaBancaria

testar("ContaBancaria: saldo inicial é definido corretamente", () => {
    const conta = new ContaBancaria("Ana", 1000)
    assertEqual(conta.saldo, 1000)
})

testar("ContaBancaria: titular é definido corretamente", () => {
    const conta = new ContaBancaria("Regina", 500)
    assertEqual(conta.titular, "Regina")
})

testar("ContaBancaria: depositar aumenta o saldo", () => {
    const conta = new ContaBancaria("Jhean", 1000)
    conta.depositar(500)
    assertEqual(conta.saldo, 1500)
})

imprimirResultados("Exercício 3 — ContaBancaria");
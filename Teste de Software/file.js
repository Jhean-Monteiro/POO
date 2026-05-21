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


// EXERCICIO 4 -- Pilha (TDD)
// Nivel 2 -- Intermediário

// Ciclo TDD completo:
//  Red -> escrever os testes antes da implementação
//  Green -> implementar o mínimo para passar
//  Refactor -> (feito na implementação abaixo)

// FASE RED: os testes abaixo seriam escritos antes da classe existir.

// FASE GREEN: implementação mínima para fazer os testes passarem

class Pilha {
    constructor() {
        this.itens = []
    }

    empilhar(item) {
        this.itens.push(item)
    }

    desempilhar() {
        if (this.itens.length === 0) throw new Error("A pilha está vazia.")
        return this.itens.pop()
    }

    estaVazia() {
        return this.itens.length === 0
    }
}


// ---- TESTES: PILHA -----
testar("Pilha: nova pilha começa vazia", ()=> {
    const pilha = new Pilha()
    assertEqual(pilha.estaVazia(), true)
})

testar("Pilha: após empilhar, não está mais vazia", () => {
    const pilha = new Pilha();
    pilha.empilhar("A")
    assertEqual(pilha.estaVazia(), false)
})

testar("Pilha: desempilhar retorna o último item inserido", () => {
    const pilha = new Pilha()
    pilha.empilhar("A")
    pilha.empilhar("B")
    assertAlmostEqual(pilha.desempilhar(), "B")
})

testar("Pilha: desempilhar na ordem inversa da inserção (LIFO", () => {
    const pilha = new Pilha()
    pilha.empilhar(1)
    pilha.empilhar(2)
    pilha.empilhar(3)
    assertEqual(pilha.desempilhar(), 3)
    assertEqual(pilha.desempilhar(), 2)
    assertEqual(pilha.desempilhar(), 1)
})

testar("Pilha: após desempilhar todos os itens, fica vazia", () => {
    const pilha = new Pilha()
    pilha.empilhar(1)
    pilha.desempilhar()
    assertEqual(pilha.estaVazia(), true)
})

testar("Pilha: desempilhar pilha vazia lança exceção", () => {
    const pilha = new Pilha()
    assertLancaErro(() => pilha.desempilhar(), "A pilha esta vazia.")
})


imprimirResultados("Exercício 4 - Pilha (TDD)")


// EXERCICIO 5 -- Validador de CPF (TDD - Desafio)
// Nivel 3 - Desafio

// Regras do enunciado
//   - CPF válido tem exatamente 11 dígitos numéricos.
//   - CPFs com letras são inválidos.
//   - CPFs com formatação "111.111.111-11" são inválidos
//     (pois contêm caracteres não numéricos).

// FASE RED: testes escritos antes da implementação.

// FASE GREEN: implementação.

class Validador {
    validarCpf(cpf) {
        if (typeof cpf !== "string") return false;
        return /^\d{11}$/.test(cpf);
    }
}

// --- Testes: Validador

testar("Validador: CPF com 11 dígitos numéricos é válido", () => {
    const v = new Validador()
    assertEqual(v.validarCpf("12345678901"), true)
})

testar("Validador: outro CPF com 11 dígitos numérico é válido", () => {
    const v = new Validador()
    assertEqual(v.validarCpf("00000000000"), true)
})

testar("Validador: CPF com menos de 11 dígitos é inválido", () => {
    const v = new Validador();
    assertEqual(v.validarCpf("1234567890"), false);   // 10 dígitos
});
 
testar("Validador: CPF com mais de 11 dígitos é inválido", () => {
    const v = new Validador();
    assertEqual(v.validarCpf("123456789012"), false);  // 12 dígitos
});
 
testar("Validador: CPF com letras é inválido", () => {
    const v = new Validador();
    assertEqual(v.validarCpf("1234567890A"), false);
});
 
testar("Validador: CPF com pontuação (111.111.111-11) é inválido", () => {
    const v = new Validador();
    assertEqual(v.validarCpf("111.111.111-11"), false);
});
 
testar("Validador: CPF com espaços é inválido", () => {
    const v = new Validador();
    assertEqual(v.validarCpf("123 456 789 01"), false);
});
 
testar("Validador: string vazia é inválida", () => {
    const v = new Validador();
    assertEqual(v.validarCpf(""), false);
});
 
testar("Validador: número em vez de string é inválido", () => {
    const v = new Validador();
    assertEqual(v.validarCpf(12345678901), false);
});


imprimirResultados("EXERCICIO 5 -- Validador de CPF (TDD)")

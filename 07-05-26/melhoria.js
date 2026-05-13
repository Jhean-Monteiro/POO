class BankOperationError extends Error {
  constructor(erro) {
    super(erro);
  }
}

class ContaBase {
  constructor(saldoInicial) {
    this.saldo = saldoInicial;
  }
}

class ContaCorrente extends ContaBase {
  sacar(valor) {
    try {
      if (typeof valor !== "number" || Number.isNaN(valor)) {
        throw new BankOperationError("INPUT INVÁLIDO! INSIRA UM NÚMERO.");
      }

      if (this.saldo < valor) {
        throw new BankOperationError("ERRO: CRASH. SALDO INSUFICIENTE");
      }

      this.saldo -= valor;
      console.log(`Sucesso: ${valor}R$ sacado. | saldo atual: ${this.saldo}`);
    } catch (err) {
      console.error(`[Error Log]: ${err.message}`);
    }
  }
}

const user = new ContaCorrente(1000);
user.sacar(1100);
user.sacar(99);
user.sacar("99");

import { ContaBase } from "./ContaBase.js";
import { BankOperationError } from "../error/BankOperationError.js";

export class ContaCorrente extends ContaBase {
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

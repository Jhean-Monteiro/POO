import { ContaCorrente } from "./models/ContaCorrente.js";

const user = new ContaCorrente(1000);

user.sacar(1100);
user.sacar(99);
user.sacar("99");
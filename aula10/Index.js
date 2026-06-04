// =============================================================
// index.js — Uso do Sistema
// =============================================================
// Este arquivo é o único lugar onde código fica fora de uma classe.
// Sua única responsabilidade é criar objetos, chamar métodos e
// exibir resultados. Nenhuma lógica de negócio aqui.
// Todos os erros são tratados internamente pela Empresa.
// =============================================================

const { Analista, Desenvolvedor, Gerente, Estagiario } = require("./Funcionarios");
const { Departamento } = require("./Departamento");
const { Empresa } = require("./Empresa");


// ---- Configuração da empresa ----
const empresa = new Empresa("Tech Solutions Ltda.");

const ti = new Departamento("Tecnologia da Informação");
const rh = new Departamento("Recursos Humanos");
empresa.adicionarDepartamento(ti);
empresa.adicionarDepartamento(rh);


// ---- Admissões válidas ----
console.log("--- Admissões válidas ---");
empresa.admitir("Tecnologia da Informação", Analista,      "Carla",   "A001", 4000);
empresa.admitir("Tecnologia da Informação", Desenvolvedor, "Bruno",   "D002", 5000,
  { linguagens: ["Python", "JavaScript", "SQL"] });
empresa.admitir("Recursos Humanos",         Gerente,       "Fernanda","G003", 8000);
empresa.admitir("Tecnologia da Informação", Estagiario,    "Lucas",   "E001", 2000);


// ---- Admissão com salário inválido — erro capturado dentro de Empresa ----
console.log("\n--- Admissão com salário inválido ---");
empresa.admitir("Tecnologia da Informação", Analista, "Teste", "X999", -1000);


// ---- Departamento inexistente — capturado dentro de Empresa ----
console.log("\n--- Admissão em departamento inexistente ---");
empresa.admitir("Financeiro", Analista, "Paulo", "F001", 3500);


// ---- Ajuste de salário válido ----
console.log("\n--- Ajuste de salário ---");
empresa.ajustarSalario("A001", 4500);


// ---- Ajuste com valor inválido ----
console.log("\n--- Ajuste com valor inválido ---");
empresa.ajustarSalario("A001", -500);


// ---- Matrícula inexistente ----
console.log("\n--- Ajuste em matrícula inexistente ---");
empresa.ajustarSalario("Z999", 5000);


// ---- Funcionário mais bem pago por departamento ← ITEM 2 ----
console.log("\n--- Funcionário mais bem pago por departamento ---");
const maisBemPagoTI = ti.funcionarioMaisBemPago();
console.log(`  TI: ${maisBemPagoTI}`);

const maisBemPagoRH = rh.funcionarioMaisBemPago();
console.log(`  RH: ${maisBemPagoRH}`);


// ---- Relatório geral ----
empresa.relatorio();


// ---- Relatório por cargo ← ITEM 3 ----
empresa.relatorioPorCargo();


console.log(`${empresa}`);
console.log(`Total de funcionários: ${empresa.tamanho}`);
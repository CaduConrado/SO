const fs = require("fs");
const path = require("path");

const processes = [
  { PID: 0, TP: 0, CP: 0, EP: "PRONTO", NES: 0, N_CPU: 0, totalTime: 10000 },
  { PID: 1, TP: 0, CP: 0, EP: "PRONTO", NES: 0, N_CPU: 0, totalTime: 5000 },
  { PID: 2, TP: 0, CP: 0, EP: "PRONTO", NES: 0, N_CPU: 0, totalTime: 7000 },
  { PID: 3, TP: 0, CP: 0, EP: "PRONTO", NES: 0, N_CPU: 0, totalTime: 3000 },
  { PID: 4, TP: 0, CP: 0, EP: "PRONTO", NES: 0, N_CPU: 0, totalTime: 3000 },
  { PID: 5, TP: 0, CP: 0, EP: "PRONTO", NES: 0, N_CPU: 0, totalTime: 8000 },
  { PID: 6, TP: 0, CP: 0, EP: "PRONTO", NES: 0, N_CPU: 0, totalTime: 2000 },
  { PID: 7, TP: 0, CP: 0, EP: "PRONTO", NES: 0, N_CPU: 0, totalTime: 5000 },
  { PID: 8, TP: 0, CP: 0, EP: "PRONTO", NES: 0, N_CPU: 0, totalTime: 4000 },
  { PID: 9, TP: 0, CP: 0, EP: "PRONTO", NES: 0, N_CPU: 0, totalTime: 10000 },
];

const quantum = 1000;

function executeProcess(process) {
  process.EP = "EXECUTANDO";
  process.N_CPU += 1;

  for (let i = 0; i < quantum; i++) {
    process.TP += 1;
    process.CP += 1;

    // 5% de chances de realizar E/S
    if (Math.random() < 0.05) {
      process.EP = "BLOQUEADO";
      process.NES += 1;

      // 30% de chances de voltar para PRONTO na próxima vez
      if (Math.random() < 0.3) {
        process.EP = "PRONTO";
      }

      saveProcessData(process);
      return;
    }

    // Verificar se o processo terminou
    if (process.TP >= process.totalTime) {
      process.EP = "TERMINADO";
      saveProcessData(process);
      return;
    }
  }

  // Quantum terminou sem E/S, Troca de Contexto
  process.EP = "PRONTO";
  saveProcessData(process);
}

function saveProcessData(process) {
  const data = `PID: ${process.PID}, TP: ${process.TP}, CP: ${process.CP}, EP: ${process.EP}, NES: ${process.NES}, N_CPU: ${process.N_CPU}\n`;

  // Obtenha o caminho absoluto do arquivo no mesmo diretório que este script
  const filePath = path.join(__dirname, "process_data.txt");

  fs.appendFileSync(filePath, data);
}

function main() {
  // Limpar o arquivo de dados antes de começar a simulação
  const filePath = path.join(__dirname, "process_data.txt");
  fs.writeFileSync(filePath, "");

  for (let time = 0; time < 10000; time += quantum) {
    for (const process of processes) {
      if (process.EP === "PRONTO") {
        executeProcess(process);
      }
    }
  }
}

main();

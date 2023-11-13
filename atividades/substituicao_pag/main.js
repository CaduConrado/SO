class Page {
  constructor(N, I, D, R, M, T) {
    this.N = N;
    this.I = I;
    this.D = D;
    this.R = R;
    this.M = M;
    this.T = T;
  }
}

class MemoryManager {
  constructor(size, pageSize) {
    this.pageSize = pageSize;
    this.ramSize = size;
    this.swapSize = size * 10;
    this.ram = this.initializeMemory(size);
    this.swap = this.initializeMemory(size * 10);
  }

  initializeMemory(size) {
    const memory = [];
    for (let i = 0; i < size; i++) {
      memory.push(
        new Page(
          i,
          0,
          Math.floor(Math.random() * 50) + 1,
          0,
          0,
          Math.floor(Math.random() * 9900) + 100
        )
      );
    }
    return memory;
  }

  executeInstruction(algorithm) {
    const instructionNumber = Math.floor(Math.random() * 100) + 1;
    const pageInRam = this.ram.find((page) => page.I === instructionNumber);

    if (pageInRam) {
      this.accessPage(pageInRam);
    } else {
      algorithm.call(this, this.ram, this.swap, instructionNumber);
    }

    if (this.instructionCounter % 10 === 0) {
      this.resetAccessBits();
    }

    this.instructionCounter++;
  }

  accessPage(page) {
    page.R = 1;
    if (Math.random() < 0.3) {
      page.D = page.D + 1;
      page.M = 1;
    }
  }

  resetAccessBits() {
    this.ram.forEach((page) => (page.R = 0));
  }

  saveModifiedPages() {
    const modifiedPages = this.ram.filter((page) => page.M === 1);
    modifiedPages.forEach((page) => {
      page.M = 0;
      this.swap.push({ ...page });
    });
  }

  printMatrices() {
    console.log("Matriz RAM:");
    console.table(this.ram);

    console.log("\nMatriz SWAP:");
    console.table(this.swap);
  }
}

// ... (código anterior)

// Algoritmo de substituição de página: NRU
function nruAlgorithm(ram, swap, instructionNumber) {
  const candidatePages = ram.filter((page) => page.R === 0 && page.M === 0);
  if (candidatePages.length > 0) {
    const selectedPage =
      candidatePages[Math.floor(Math.random() * candidatePages.length)];
    this.accessPage(selectedPage);
    return;
  }

  const nonModifiedPages = ram.filter((page) => page.R === 0 && page.M === 1);
  if (nonModifiedPages.length > 0) {
    const selectedPage =
      nonModifiedPages[Math.floor(Math.random() * nonModifiedPages.length)];
    this.accessPage(selectedPage);
    return;
  }

  const modifiedPages = ram.filter((page) => page.R === 1 && page.M === 0);
  if (modifiedPages.length > 0) {
    const selectedPage =
      modifiedPages[Math.floor(Math.random() * modifiedPages.length)];
    this.accessPage(selectedPage);
    return;
  }

  const selectedPage = ram[Math.floor(Math.random() * ram.length)];
  this.accessPage(selectedPage);
}

// Algoritmo de substituição de página: FIFO
function fifoAlgorithm(ram, swap, instructionNumber) {
  const oldestPage = ram.shift();
  const newPage = swap.find((page) => page.I === instructionNumber);
  ram.push({ ...newPage });
  this.accessPage(newPage);
}

// Algoritmo de substituição de página: FIFO-SC
function fifoScAlgorithm(ram, swap, instructionNumber) {
  const candidatePages = ram.filter((page) => page.R === 0);
  if (candidatePages.length > 0) {
    const selectedPage = candidatePages.shift();
    this.accessPage(selectedPage);
    return;
  }

  const oldestPage = ram.shift();
  const newPage = swap.find((page) => page.I === instructionNumber);
  ram.push({ ...newPage });
  this.accessPage(newPage);
}

// Algoritmo de substituição de página: Relógio (Clock)
function clockAlgorithm(ram, swap, instructionNumber) {
  let hand = 0;
  while (true) {
    const page = ram[hand];
    if (page.R === 0) {
      this.accessPage(page);
      return;
    } else {
      page.R = 0;
    }
    hand = (hand + 1) % ram.length;
  }
}

// Algoritmo de substituição de página: WS-Clock
function wsClockAlgorithm(ram, swap, instructionNumber) {
  let hand = 0;
  while (true) {
    const page = ram[hand];
    if (page.R === 0 && page.T > Math.floor(Math.random() * 9900) + 100) {
      this.accessPage(page);
      return;
    } else {
      page.R = 0;
    }
    hand = (hand + 1) % ram.length;
  }
}

// ... (código posterior)

// Example usage
const memoryManager = new MemoryManager(10, 6);

console.log("Antes da execução:");
memoryManager.printMatrices();

memoryManager.executeInstruction(nruAlgorithm);
memoryManager.executeInstruction(fifoAlgorithm);
memoryManager.executeInstruction(fifoScAlgorithm);
memoryManager.executeInstruction(clockAlgorithm);
memoryManager.executeInstruction(wsClockAlgorithm);

console.log("\nApós a execução:");
memoryManager.printMatrices();

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
    for (let i = 0; i < 1000; i++) {
      const instructionNumber = Math.floor(Math.random() * 100) + 1;
      const page = this.ram.find((page) => page.I === instructionNumber);

      if (page) {
        this.accessPage(page);
      } else {
        algorithm(this.ram, this.swap, instructionNumber);
      }

      if (i % 10 === 0) {
        this.resetAccessBits();
      }

      if (i % this.pageSize === 0) {
        this.saveModifiedPages();
      }
    }
  }

  accessPage(page) {
    page.R = 1;

    if (Math.random() < 0.3) {
      page.D += 1;
      page.M = 1;
    }
  }

  resetAccessBits() {
    this.ram.forEach((page) => (page.R = 0));
  }

  saveModifiedPages() {
    this.ram.forEach((page) => {
      if (page.M === 1) {
        page.M = 0;
        this.swap[page.N] = { ...page };
      }
    });
  }

  printMatrices() {
    console.log("MATRIZ RAM:");
    this.printMatrix(this.ram);
    console.log("\nMATRIZ SWAP:");
    this.printMatrix(this.swap);
  }

  printMatrix(matrix) {
    matrix.forEach((page) => {
      console.log(
        `${page.N}\t${page.I}\t${page.D}\t${page.R}\t${page.M}\t${page.T}`
      );
    });
  }
}

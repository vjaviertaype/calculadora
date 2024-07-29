export class ManagerMemory {
  public memory: string[];

  constructor() {
    this.memory = [];
    this.loadAll();
  }

  appendOne(value: string) {
    this.memory.push(value);
  }

  removeOne(index: number) {
    this.memory.splice(index, 1);
  }

  getOne(index: number) {
    return this.memory[index];
  }

  getLast() {
    return this.memory[this.memory.length - 1];
  }

  setOne(index: number, value: string) {
    this.memory[index] = value;
  }

  saveAll() {
    localStorage.setItem("memory", JSON.stringify(this.memory));
  }

  loadAll() {
    this.memory = JSON.parse(localStorage.getItem("memory") || "[]");
    this.saveAll();
  }

  clearAll() {
    this.memory = [];
    this.saveAll();
  }
}

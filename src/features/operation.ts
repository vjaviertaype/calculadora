export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export function divide(a: number, b: number): number {
  if (b === 0) {
    return Infinity;
  }

  return a / b;
}

export function sqrt(a: number): number {
  return Math.sqrt(a);
}

export function percent(a: number): number {
  return a / 100;
}

export function module(a: number, b: number): number {
  return a % b;
}

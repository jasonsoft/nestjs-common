interface ToNumberOptions {
  default?: number;
  min?: number;
  max?: number;
}

export function toNumber(value: string, opts: ToNumberOptions = {}): number {
  let newValue: number = Number.parseInt(value || String(opts.default), 10);

  if (Number.isNaN(newValue) && opts.default) {
    newValue = opts.default;
  }

  if (opts.min) {
    if (newValue < opts.min) {
      newValue = opts.min;
    }

    if (opts.max && newValue > opts.max) {
      newValue = opts.max;
    }
  }
  return newValue;
}

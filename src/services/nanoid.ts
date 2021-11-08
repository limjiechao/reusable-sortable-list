//REF: https://zelark.github.io/nano-id-cc/
import { customAlphabet } from 'nanoid';

const ALPHABET =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const SIZE = 10;

export class NanoIdService {
  nanoid: () => string;

  constructor(
    private alphabet: string = ALPHABET,
    private size: number = SIZE
  ) {
    this.nanoid = customAlphabet(this.alphabet, this.size);
  }
  // NOTE: Using arrow function to preserve `this`
  generate = (): string => this.nanoid();
}

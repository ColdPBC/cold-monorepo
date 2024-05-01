import { init, isCuid } from '@paralleldrive/cuid2';
import { Injectable } from '@nestjs/common';
import * as os from 'os';

/**
 * CUID2 class!
 */
@Injectable()
export class Cuid2Generator {
  id: string | undefined;
  scopedId: string = '';
  createId: any;
  prefix: string | undefined;

  constructor(prefix?: string) {
    this.createId = init({
      length: 16,
      fingerprint: os.hostname(),
    });

    this.setId(prefix);

    return this;
  }

  static getProvider(prefix?: string) {
    const cuid2 = new Cuid2Generator();

    return {
      provide: 'Cuid2Generator',
      useExisting: prefix ? cuid2.setPrefix(prefix) : cuid2,
    };
  }

  setPrefix(prefix: string) {
    if (prefix.length < 2) throw new Error('Prefix must at least 3 characters');
    this.prefix = prefix;
    this.generate(this.prefix);

    return this;
  }

  /**
   * Generate a new cuid2
   * @param prefix - Optional scope prefix to prepend to the generated id
   */
  generate(prefix?: string) {
    this.id = this.createId();
    if (prefix || this.prefix) this.scopedId = `${prefix || this.prefix}_${this.id}`;

    return this;
  }

  /**
   * Set the id and scopedId properties
   */
  setId(prefix?: string) {
    if (prefix) return this.setPrefix(prefix);
    else return this.generate();
  }

  /**
   * Check if a string is a cuid2
   * @param id
   */
  isColdCUID2(id: string) {
    // If the id is a scoped id, remove the prefix
    if (id.includes('_')) {
      return id.split('_')[0].length > 3 && id.split('_')[0].length < 6 && isCuid(id.split('_')[1]);
    }

    return isCuid(id);
  }
}

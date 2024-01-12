import {init, isCuid} from '@paralleldrive/cuid2';
import {BaseWorker} from './worker';
import {Injectable} from '@nestjs/common';

/**
 * CUID2 class!
 */
@Injectable()
export class Cuid2Generator extends BaseWorker {
  id: string | undefined;
  scopedId: string | undefined;
  createId: any;
  prefix: string | undefined;

  constructor(prefix?: string) {
    super('Cuid2Generator');

    this.createId = init({
      length: 16,
      fingerprint: this.details.host_name,
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
    if (prefix.length > 5) throw new Error('Prefix must be between 3 and 6 characters');
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
    else this.scopedId = undefined;

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

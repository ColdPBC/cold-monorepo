import { Global } from '@nestjs/common';
import { unset, mapKeys } from 'lodash';
import { BaseWorker } from '../worker';

@Global()
export class ObjectUtils extends BaseWorker {
  constructor() {
    super(ObjectUtils.name);
  }
  /**
   * @description This action flattens a deeply nested definition
   * @param obj the object to flatten
   * @param roots keeps previous parent properties as they will be added as a prefix for each prop
   * @param {string} sep delimiter
   */
  flatten(obj: any, roots: any = [], sep: string = '.'): any {
    return (
      Object
        // find props of given object
        .keys(obj)
        // return an object by iterating props
        .reduce(
          (memo, prop) =>
            Object.assign(
              // create a new object
              {}, // include previously returned object
              memo,
              Object.prototype.toString.call(obj[prop]) === '[object Object]' // keep working if value is an object
                ? this.flatten(obj[prop], roots.concat([prop]), sep) // include current prop and value and prefix prop with the roots
                : { [roots.concat([prop]).join(sep)]: obj[prop] },
            ),
          {},
        )
    );
  }

  /**
   * function that deletes keys from the srouce object based on the value passed in
   * @param source source object
   * @param val keys that have a value matching this will be removed from the object
   * @returns {any}
   */
  deleteKeys(source: any, val: any): any {
    const flat = this.flatten(source);
    mapKeys(flat, function (value, key) {
      if (value === val) {
        unset(source, key);
      }
    });

    return source;
  }
}

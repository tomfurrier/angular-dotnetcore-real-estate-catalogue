import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    const keys = [];
    for (const key of Object.keys(value)) {
      //keys.push({ key: key, value: value[key] });
      keys.push({ key: key, value: value[key] });
      // Uncomment if you want log
      console.log('enum  key', key);
      console.log('enum member: ', value[key]);
    }
    return keys;
  }
}

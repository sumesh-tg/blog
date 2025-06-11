import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {
  static toBool(val:any) {
    if (val === undefined || val === null || val === '' || val === 'false' || val === 'False') {
      return false;
    } else {
      return true;
    }
  }

  static shuffle(array:any) {
    let currentIndex = array.length, temp, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  }
  static extend<T extends object, U extends object[]>(out: T, ...args: U): T & U[number] {
    out = out || {} as T;

    for (let i = 0; i < args.length; i++) {
      if (!args[i]) {
        continue;
      }

      for (const key in args[i]) {
        if (Object.prototype.hasOwnProperty.call(args[i], key)) {
          (out as any)[key] = (args[i] as any)[key];
        }
      }
    }
    return out as T & U[number];
  }
}

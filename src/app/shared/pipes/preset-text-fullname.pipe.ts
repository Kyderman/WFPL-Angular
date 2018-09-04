import { Pipe, PipeTransform } from '@angular/core';
import { PresetText } from '../../preset-text/preset-text';

@Pipe({
  name: 'presetTextFullname'
})
export class PresetTextFullnamePipe implements PipeTransform {

  constructor() {

  }

  transform(value: any, args?: any): any {

    const presetText = new PresetText;
    return presetText.getTypeString(value);

  }

}

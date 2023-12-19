import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class UpperCaseAndFusionPipe implements PipeTransform {
  transform(entry: {data: string[]}, metadata: ArgumentMetadata) {
    if(metadata.type === 'body'){
       return entry.data.map((elt) => elt.toUpperCase()).join('-');

      // Join the elements with a hyphen

    }

    return entry;
  }
}

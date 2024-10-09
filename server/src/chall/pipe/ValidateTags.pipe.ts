import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateTagsPipe implements PipeTransform {
  transform(value: any) {
    console.log(value);
    if (!Array.isArray(value.tags)) {
      value.tags = JSON.parse(value.tags);
      if (!Array.isArray(value.tags)) {
        throw new BadRequestException('Tags must be an array');
      }
    }

    value.tags.forEach((tag) => {
      if (typeof tag !== 'string' && typeof tag !== 'object') {
        throw new BadRequestException(
          'Each tag must be either a string or an object',
        );
      }
      if (typeof tag === 'object' && !('tagName' in tag)) {
        throw new BadRequestException(
          'Each object tag must have a tagName property',
        );
      }
    });

    return value;
  }
}

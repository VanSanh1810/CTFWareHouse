import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ValidateTagsUpdatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!Array.isArray(value.newtags) || !Array.isArray(value.removetags)) {
      throw new BadRequestException('Must be an array');
    }

    value.newtags.forEach((tag) => {
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

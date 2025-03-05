import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';
import type { Paramtype, ArgumentMetadata } from '@nestjs/common';

/**
 * A validation pipe using Zod for schema validation.
 *
 * This pipe implements NestJS's `PipeTransform` interface and validates
 * incoming data against a provided Zod schema. If validation fails,
 * it throws a BadRequestException.
 *
 * @example
 * ```typescript
 * @Post()
 * createUser(@Body(new ZodValidationPipe(userSchema)) user: User) {
 *   // user is guaranteed to be valid
 *   return this.usersService.create(user);
 * }
 * ```
 */
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    const metadataType: Paramtype[] = ['body', 'param', 'query'];

    // Only validate body, param, and query data
    if (!metadataType.includes(metadata.type)) return value;

    try {
      // Parse and validate the value using the Zod schema
      const result = this.schema.parse(value);
      return result;
    } catch (error) {
      if (error instanceof ZodError) {
        // Convert to a simplified error format
        const simplifiedErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: this.getSimplifiedErrorMessage(err),
        }));

        throw new BadRequestException({
          message: 'Validation failed',
          errors: simplifiedErrors,
          statusCode: 400,
        });
      }
      throw error;
    }
  }

  private getSimplifiedErrorMessage(error: any) {
    // Handle common error codes with friendlier messages
    switch (error.code) {
      case 'too_small':
        return `${this.getFieldName(error.path)} must be at least ${error.minimum} characters`;
      case 'invalid_type':
        if (error.received === 'undefined') {
          return `${this.getFieldName(error.path)} is required`;
        }
        return `${this.getFieldName(error.path)} must be a ${error.expected}`;
      case 'invalid_string':
        if (error.validation === 'email') {
          return 'Please enter a valid email address';
        }
        break;
      default:
        return error.message;
    }
    return error.message;
  }

  private getFieldName(path: (string | number)[]) {
    // Convert camelCase to Title Case with spaces
    const field = String(path[path.length - 1]);
    return field
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';

import { CategoriesService } from './categories.service';
import {
  CreateCategoriesDto,
  UpdateCategoriesDto,
  CreateCategoriesSchema,
  UpdateCategoriesSchema,
} from './dto/categories.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(201)
  create(
    @Body(new ZodValidationPipe(CreateCategoriesSchema))
    createCategoriesDto: CreateCategoriesDto,
  ) {
    return this.categoriesService.create(createCategoriesDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @HttpCode(200)
  update(
    @Body(new ZodValidationPipe(UpdateCategoriesSchema))
    updateCategoriesDto: UpdateCategoriesDto,
  ) {
    return this.categoriesService.update(updateCategoriesDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}

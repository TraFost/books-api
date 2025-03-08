import { Injectable, HttpStatus } from '@nestjs/common';

import {
  CreateCategoriesDto,
  UpdateCategoriesDto,
} from 'src/categories/dto/categories.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoriesDto: CreateCategoriesDto) {
    const { categories } = createCategoriesDto;

    const createdCategories = await this.prisma.category.createMany({
      data: categories.map((name) => ({ name })),
      skipDuplicates: true,
    });

    return {
      categories: createdCategories,
      message: 'Categories succesfully created',
      statusCode: HttpStatus.CREATED,
    };
  }

  async findAll() {
    const categories = await this.prisma.category.findMany();

    return {
      categories,
      message: 'Success',
      statusCode: HttpStatus.OK,
    };
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    return {
      category,
      message: 'Success',
      statusCode: HttpStatus.OK,
    };
  }

  async update(updateCategoriesDto: UpdateCategoriesDto) {
    const { categories } = updateCategoriesDto;

    const updatedCategories = await Promise.all(
      categories.map((category) =>
        this.prisma.category.update({
          where: { id: category.id },
          data: { name: category.name },
        }),
      ),
    );

    return {
      categories: updatedCategories,
      message: 'Categories updated successfully',
      statusCode: HttpStatus.OK,
    };
  }

  async remove(id: string) {
    await this.prisma.category.delete({
      where: { id },
    });

    return {
      message: `Category with id ${id} has been deleted`,
      statusCode: HttpStatus.OK,
    };
  }
}

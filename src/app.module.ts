/* 
 Think of modules like toy boxes. Each toy box contains specific toys that belong together.
In Express, you might have all your toys (routes, functions) scattered around. But in NestJS, we organize them into neat toy boxes (modules).
simplified version: Modules organize your code into logical units.
*/

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [AuthModule, PrismaModule, ConfigModule.forRoot(), CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

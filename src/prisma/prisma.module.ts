import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/* If global are not defined @Global(), 
then the module is available only in the scope of the module where it is defined. */
@Global()
@Module({
  providers: [PrismaService], // 👈 Providers are services that can be injected into other parts of the app.
  exports: [PrismaService], // 👈 Allows other modules to use the PrismaService. without this other modules can't access the prisma services
})
export class PrismaModule {}

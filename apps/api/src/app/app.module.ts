import { Module } from '@nestjs/common';
import { MaintenanceRequestModule } from '../maintenance-request/maintenance-request.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [MaintenanceRequestModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

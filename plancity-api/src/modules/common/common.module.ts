import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';

@Module({
  imports: [PassportModule],
  providers: [RolesGuard],
  exports: [RolesGuard],
})
export class CommonModule {}

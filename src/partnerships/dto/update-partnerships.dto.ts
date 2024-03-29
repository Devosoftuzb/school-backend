import { PartialType } from '@nestjs/swagger';
import { CreatePartnershipsDto } from './create-partnershipsdto';

export class UpdatePartnershipsDto extends PartialType(CreatePartnershipsDto) {}

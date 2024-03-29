import { PartialType } from '@nestjs/swagger';
import { CreateLessonDto } from './create-lessons.dto';

export class UpdateLessonDto extends PartialType(CreateLessonDto) {}

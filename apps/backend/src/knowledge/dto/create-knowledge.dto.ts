import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

enum EntryType {
  PROBLEM = 'PROBLEM',
  SOLUTION = 'SOLUTION',
  GUIDE = 'GUIDE',
  ARCHITECTURE = 'ARCHITECTURE',
  CONFIGURATION = 'CONFIGURATION',
  REFERENCE = 'REFERENCE',
}

enum EntryStatus {
  DRAFT = 'DRAFT',
  VERIFIED = 'VERIFIED',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

enum VerificationStatus {
  UNVERIFIED = 'UNVERIFIED',
  OBSERVED = 'OBSERVED',
  TESTED = 'TESTED',
  CONFIRMED = 'CONFIRMED',
}

export class CreateKnowledgeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  @IsOptional()
  summary?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  content: string;

  @IsString()
  @IsOptional()
  problem?: string;

  @IsString()
  @IsOptional()
  cause?: string;

  @IsString()
  @IsOptional()
  solution?: string;

  @IsString()
  @IsOptional()
  technicalDetails?: string;

  @IsEnum(EntryType)
  @IsOptional()
  entryType?: EntryType;

  @IsEnum(EntryStatus)
  @IsOptional()
  status?: EntryStatus;

  @IsEnum(VerificationStatus)
  @IsOptional()
  verificationStatus?: VerificationStatus;

  @IsString()
  @IsOptional()
  categoryId?: string;
}

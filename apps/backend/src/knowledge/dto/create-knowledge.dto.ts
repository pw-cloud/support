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
  NEW = 'NEW',
  CONFIRMED = 'CONFIRMED',
  ARCHIVED = 'ARCHIVED',
}

enum VerificationStatus {
  UNVERIFIED = 'UNVERIFIED',
  OBSERVED = 'OBSERVED',
  TESTED = 'TESTED',
  CONFIRMED = 'CONFIRMED',
}

enum KnowledgeCategory {
  PC = 'PC',
  PRINTER = 'PRINTER',
  MDE = 'MDE',
  NETWORK = 'NETWORK',
  OTHER = 'OTHER',
}

export class CreateKnowledgeDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  title?: string;

  @IsString()
  @IsOptional()
  summary?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsEnum(KnowledgeCategory)
  @IsOptional()
  category?: KnowledgeCategory;

  @IsString()
  @IsOptional()
  manufacturer?: string;

  @IsString()
  @IsOptional()
  model?: string;

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

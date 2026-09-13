-- Bring the existing knowledge-entry schema in line with the current Prisma model.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'KnowledgeCategory'
  ) THEN
    CREATE TYPE "KnowledgeCategory" AS ENUM ('PC', 'PRINTER', 'MDE', 'NETWORK', 'OTHER');
  END IF;
END $$;

ALTER TABLE "KnowledgeEntry"
  ADD COLUMN IF NOT EXISTS "category" "KnowledgeCategory" DEFAULT 'PC',
  ADD COLUMN IF NOT EXISTS "manufacturer" TEXT,
  ADD COLUMN IF NOT EXISTS "model" TEXT;

ALTER TABLE "KnowledgeEntry"
  ALTER COLUMN "title" DROP NOT NULL,
  ALTER COLUMN "content" DROP NOT NULL,
  ALTER COLUMN "status" DROP DEFAULT;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'EntryStatus' AND e.enumlabel = 'DRAFT'
  ) AND NOT EXISTS (
    SELECT 1 FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'EntryStatus' AND e.enumlabel = 'NEW'
  ) THEN
    ALTER TYPE "EntryStatus" RENAME VALUE 'DRAFT' TO 'NEW';
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'EntryStatus' AND e.enumlabel = 'VERIFIED'
  ) AND NOT EXISTS (
    SELECT 1 FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'EntryStatus' AND e.enumlabel = 'CONFIRMED'
  ) THEN
    ALTER TYPE "EntryStatus" RENAME VALUE 'VERIFIED' TO 'CONFIRMED';
  END IF;
END $$;

ALTER TABLE "KnowledgeEntry"
  ALTER COLUMN "status" SET DEFAULT 'NEW';
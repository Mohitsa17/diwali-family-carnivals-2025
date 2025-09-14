-- First, create the Contest enum if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'Contest') THEN
        CREATE TYPE "Contest" AS ENUM ('NONE', 'SUPERMOM', 'CUTESTBABY', 'SENIORCITIZEN', 'GENERAL');
    END IF;
END $$;

-- Create the registrations table
CREATE TABLE IF NOT EXISTS "registrations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER,
    "whatsapp" TEXT NOT NULL,
    "email" TEXT,
    "contest" "Contest" NOT NULL DEFAULT 'NONE',
    "message" TEXT,
    "numberOfChildren" INTEGER,
    "photoUrl" TEXT,
    "videoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,

    CONSTRAINT "registrations_pkey" PRIMARY KEY ("id")
);

-- Create indexes for better performance (only if they don't exist)
CREATE INDEX IF NOT EXISTS "registrations_contest_idx" ON "registrations"("contest");
CREATE INDEX IF NOT EXISTS "registrations_createdAt_idx" ON "registrations"("createdAt");
CREATE INDEX IF NOT EXISTS "registrations_whatsapp_idx" ON "registrations"("whatsapp");

-- Create the Contest enum
CREATE TYPE "Contest" AS ENUM ('NONE', 'SUPERMOM', 'CUTESTBABY', 'SENIORCITIZEN', 'GENERAL');

-- Create the registrations table
CREATE TABLE "registrations" (
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

-- Create indexes for better performance
CREATE INDEX "registrations_contest_idx" ON "registrations"("contest");
CREATE INDEX "registrations_createdAt_idx" ON "registrations"("createdAt");
CREATE INDEX "registrations_whatsapp_idx" ON "registrations"("whatsapp");

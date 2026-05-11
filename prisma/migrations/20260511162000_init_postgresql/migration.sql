-- CreateEnum
CREATE TYPE "ContactStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "SubscriberStatus" AS ENUM ('ACTIVE', 'UNSUBSCRIBED', 'BOUNCED');

-- CreateTable
CREATE TABLE "ContactSubmission" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'en',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ContactStatus" NOT NULL DEFAULT 'NEW',

    CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingRequest" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "preferredDate" TIMESTAMP(3),
    "preferredTime" TEXT,
    "message" TEXT,
    "locale" TEXT NOT NULL DEFAULT 'en',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "BookingRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsletterSubscriber" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'en',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "SubscriberStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',
    "image" TEXT NOT NULL DEFAULT '',
    "category" TEXT NOT NULL DEFAULT '',
    "author" TEXT NOT NULL DEFAULT '',
    "readTime" TEXT NOT NULL DEFAULT '5 min',
    "locale" TEXT NOT NULL DEFAULT 'en',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreatmentCategory" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TreatmentCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreatmentCategoryTranslation" (
    "id" UUID NOT NULL,
    "categoryId" UUID NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "TreatmentCategoryTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Treatment" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" TEXT,
    "duration" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" UUID NOT NULL,

    CONSTRAINT "Treatment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreatmentTranslation" (
    "id" UUID NOT NULL,
    "treatmentId" UUID NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "howItWorks" TEXT,
    "aftercare" TEXT,

    CONSTRAINT "TreatmentTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreatmentBenefit" (
    "id" UUID NOT NULL,
    "treatmentId" UUID NOT NULL,
    "locale" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TreatmentBenefit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TreatmentFAQ" (
    "id" UUID NOT NULL,
    "treatmentId" UUID NOT NULL,
    "locale" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TreatmentFAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "service" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "timeSlot" TEXT NOT NULL,
    "message" TEXT,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ContactSubmission_status_createdAt_idx" ON "ContactSubmission"("status", "createdAt");

-- CreateIndex
CREATE INDEX "ContactSubmission_email_idx" ON "ContactSubmission"("email");

-- CreateIndex
CREATE INDEX "BookingRequest_status_createdAt_idx" ON "BookingRequest"("status", "createdAt");

-- CreateIndex
CREATE INDEX "BookingRequest_email_idx" ON "BookingRequest"("email");

-- CreateIndex
CREATE INDEX "BookingRequest_preferredDate_idx" ON "BookingRequest"("preferredDate");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON "NewsletterSubscriber"("email");

-- CreateIndex
CREATE INDEX "NewsletterSubscriber_status_createdAt_idx" ON "NewsletterSubscriber"("status", "createdAt");

-- CreateIndex
CREATE INDEX "BlogPost_published_createdAt_idx" ON "BlogPost"("published", "createdAt");

-- CreateIndex
CREATE INDEX "BlogPost_category_locale_idx" ON "BlogPost"("category", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_locale_key" ON "BlogPost"("slug", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "TreatmentCategory_slug_key" ON "TreatmentCategory"("slug");

-- CreateIndex
CREATE INDEX "TreatmentCategory_slug_idx" ON "TreatmentCategory"("slug");

-- CreateIndex
CREATE INDEX "TreatmentCategory_active_sortOrder_idx" ON "TreatmentCategory"("active", "sortOrder");

-- CreateIndex
CREATE INDEX "TreatmentCategoryTranslation_locale_idx" ON "TreatmentCategoryTranslation"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "TreatmentCategoryTranslation_categoryId_locale_key" ON "TreatmentCategoryTranslation"("categoryId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "Treatment_slug_key" ON "Treatment"("slug");

-- CreateIndex
CREATE INDEX "Treatment_slug_idx" ON "Treatment"("slug");

-- CreateIndex
CREATE INDEX "Treatment_categoryId_idx" ON "Treatment"("categoryId");

-- CreateIndex
CREATE INDEX "Treatment_active_sortOrder_idx" ON "Treatment"("active", "sortOrder");

-- CreateIndex
CREATE INDEX "TreatmentTranslation_locale_idx" ON "TreatmentTranslation"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "TreatmentTranslation_treatmentId_locale_key" ON "TreatmentTranslation"("treatmentId", "locale");

-- CreateIndex
CREATE INDEX "TreatmentBenefit_treatmentId_locale_idx" ON "TreatmentBenefit"("treatmentId", "locale");

-- CreateIndex
CREATE INDEX "TreatmentBenefit_sortOrder_idx" ON "TreatmentBenefit"("sortOrder");

-- CreateIndex
CREATE INDEX "TreatmentFAQ_treatmentId_locale_idx" ON "TreatmentFAQ"("treatmentId", "locale");

-- CreateIndex
CREATE INDEX "TreatmentFAQ_sortOrder_idx" ON "TreatmentFAQ"("sortOrder");

-- CreateIndex
CREATE INDEX "Booking_date_status_idx" ON "Booking"("date", "status");

-- CreateIndex
CREATE INDEX "Booking_status_createdAt_idx" ON "Booking"("status", "createdAt");

-- CreateIndex
CREATE INDEX "Booking_email_idx" ON "Booking"("email");

-- AddForeignKey
ALTER TABLE "TreatmentCategoryTranslation" ADD CONSTRAINT "TreatmentCategoryTranslation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TreatmentCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TreatmentCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatmentTranslation" ADD CONSTRAINT "TreatmentTranslation_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatmentBenefit" ADD CONSTRAINT "TreatmentBenefit_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreatmentFAQ" ADD CONSTRAINT "TreatmentFAQ_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE CASCADE ON UPDATE CASCADE;


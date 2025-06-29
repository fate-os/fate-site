-- CreateEnum
CREATE TYPE "AccountProvider" AS ENUM ('EMAIL', 'GOOGLE');

-- CreateEnum
CREATE TYPE "UserAccountType" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'USER');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "password" TEXT,
    "email" TEXT NOT NULL,
    "photo_url" TEXT,
    "birthday" TIMESTAMP(3),
    "country_name" TEXT,
    "phone_number" TEXT,
    "zip_code" TEXT,
    "reset_password_pin" INTEGER,
    "reset_password_expire_date" TIMESTAMP(3),
    "verify_pin" INTEGER,
    "verify_pin_expire_date" TIMESTAMP(3),
    "verify_status" BOOLEAN NOT NULL DEFAULT false,
    "super_admin" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "last_login_at" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "size" DOUBLE PRECISION NOT NULL,
    "meme_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

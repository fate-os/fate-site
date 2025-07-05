-- CreateEnum
CREATE TYPE "Direction" AS ENUM ('up', 'down', 'left', 'right');

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

-- CreateTable
CREATE TABLE "payment_history" (
    "id" TEXT NOT NULL,
    "stripe_payment_id" TEXT,
    "stripe_session_id" TEXT,
    "year_count" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "fate_quote_id" TEXT NOT NULL,

    CONSTRAINT "payment_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fate_quote" (
    "id" TEXT NOT NULL,
    "year_count" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "gender" TEXT,
    "quote_parameter_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "fate_quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quote_parameter" (
    "id" TEXT NOT NULL,
    "straight_left" "Direction",
    "straight_right" "Direction",
    "top_number" INTEGER,
    "right_side_number" INTEGER,
    "bottom_right_number" INTEGER,
    "bottom_left_number" INTEGER,
    "left_side_number" INTEGER,
    "right_side_arrow" "Direction",
    "left_side_arrow" "Direction",
    "bottom_arrow" "Direction",
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "quote_parameter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "payment_history" ADD CONSTRAINT "payment_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_history" ADD CONSTRAINT "payment_history_fate_quote_id_fkey" FOREIGN KEY ("fate_quote_id") REFERENCES "fate_quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fate_quote" ADD CONSTRAINT "fate_quote_quote_parameter_id_fkey" FOREIGN KEY ("quote_parameter_id") REFERENCES "quote_parameter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

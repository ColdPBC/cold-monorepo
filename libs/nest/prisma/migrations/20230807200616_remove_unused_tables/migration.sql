/*
  Warnings:

  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `climate_action_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `climate_actions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `company_climate_actions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `emission_measurements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_states` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification_tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "climate_actions" DROP CONSTRAINT "climate_actions_climate_action_category_id_fkey";

-- DropForeignKey
ALTER TABLE "company_climate_actions" DROP CONSTRAINT "company_climate_actions_climate_action_id_fkey";

-- DropForeignKey
ALTER TABLE "company_climate_actions" DROP CONSTRAINT "company_climate_actions_company_id_fkey";

-- DropForeignKey
ALTER TABLE "emission_measurements" DROP CONSTRAINT "emission_measurements_company_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_states" DROP CONSTRAINT "user_states_user_id_fkey";

-- DropTable
DROP TABLE "accounts";

-- DropTable
DROP TABLE "climate_action_categories";

-- DropTable
DROP TABLE "climate_actions";

-- DropTable
DROP TABLE "company_climate_actions";

-- DropTable
DROP TABLE "emission_measurements";

-- DropTable
DROP TABLE "sessions";

-- DropTable
DROP TABLE "user_states";

-- DropTable
DROP TABLE "verification_tokens";

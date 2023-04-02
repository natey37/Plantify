/*
  Warnings:

  - You are about to drop the column `name` on the `Plant` table. All the data in the column will be lost.
  - You are about to drop the column `wateringFrequency` on the `Plant` table. All the data in the column will be lost.
  - Added the required column `commonName` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fertilizerRequirements` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `funInterestingFact` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lightRequirements` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `other` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pestsAndDiseases` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propagation` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `soilRequirements` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `species` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toxicity` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waterRequirements` to the `Plant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wateringSchedule` to the `Plant` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Plant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "species" TEXT NOT NULL,
    "commonName" TEXT NOT NULL,
    "lightRequirements" TEXT NOT NULL,
    "waterRequirements" TEXT NOT NULL,
    "wateringSchedule" TEXT NOT NULL,
    "soilRequirements" TEXT NOT NULL,
    "fertilizerRequirements" TEXT NOT NULL,
    "propagation" TEXT NOT NULL,
    "pestsAndDiseases" TEXT NOT NULL,
    "toxicity" TEXT NOT NULL,
    "other" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "funInterestingFact" TEXT NOT NULL,
    "categoryId" INTEGER,
    "imageUrl" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Plant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Plant_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Plant" ("categoryId", "createdAt", "id", "imageUrl", "updatedAt", "userId") SELECT "categoryId", "createdAt", "id", "imageUrl", "updatedAt", "userId" FROM "Plant";
DROP TABLE "Plant";
ALTER TABLE "new_Plant" RENAME TO "Plant";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

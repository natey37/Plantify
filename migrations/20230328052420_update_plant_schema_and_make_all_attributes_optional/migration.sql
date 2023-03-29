-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Plant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "species" TEXT,
    "commonName" TEXT,
    "lightRequirements" TEXT,
    "waterRequirements" TEXT,
    "wateringSchedule" TEXT,
    "soilRequirements" TEXT,
    "fertilizerRequirements" TEXT,
    "propagation" TEXT,
    "pestsAndDiseases" TEXT,
    "toxicity" TEXT,
    "other" TEXT,
    "note" TEXT,
    "funInterestingFact" TEXT,
    "categoryId" INTEGER,
    "imageUrl" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Plant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Plant_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Plant" ("categoryId", "commonName", "createdAt", "fertilizerRequirements", "funInterestingFact", "id", "imageUrl", "lightRequirements", "note", "other", "pestsAndDiseases", "propagation", "soilRequirements", "species", "toxicity", "updatedAt", "userId", "waterRequirements", "wateringSchedule") SELECT "categoryId", "commonName", "createdAt", "fertilizerRequirements", "funInterestingFact", "id", "imageUrl", "lightRequirements", "note", "other", "pestsAndDiseases", "propagation", "soilRequirements", "species", "toxicity", "updatedAt", "userId", "waterRequirements", "wateringSchedule" FROM "Plant";
DROP TABLE "Plant";
ALTER TABLE "new_Plant" RENAME TO "Plant";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

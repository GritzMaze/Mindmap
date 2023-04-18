-- CreateTable
CREATE TABLE "Mindmap" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mindmap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "mindmap_user_id_index" ON "Mindmap"("user_id");

-- AddForeignKey
ALTER TABLE "Mindmap" ADD CONSTRAINT "Mindmap_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

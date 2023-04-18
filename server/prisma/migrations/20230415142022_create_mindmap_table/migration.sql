-- CreateTable
CREATE TABLE "Node" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "x_pos" INTEGER NOT NULL,
    "y_pos" INTEGER NOT NULL,
    "mindmap_id" INTEGER NOT NULL,
    "parent_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "node_mindmap_id_index" ON "Node"("mindmap_id");

-- CreateIndex
CREATE INDEX "node_parent_id_index" ON "Node"("parent_id");

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_mindmap_id_fkey" FOREIGN KEY ("mindmap_id") REFERENCES "Mindmap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Node"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "Connection" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "source_node_id" INTEGER NOT NULL,
    "target_node_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "connection_source_id_index" ON "Connection"("source_node_id");

-- CreateIndex
CREATE INDEX "connection_target_id_index" ON "Connection"("target_node_id");

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_source_node_id_fkey" FOREIGN KEY ("source_node_id") REFERENCES "Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_target_node_id_fkey" FOREIGN KEY ("target_node_id") REFERENCES "Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

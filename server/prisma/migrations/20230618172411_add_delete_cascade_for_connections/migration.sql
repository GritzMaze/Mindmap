-- DropForeignKey
ALTER TABLE "Connection" DROP CONSTRAINT "Connection_source_node_id_fkey";

-- DropForeignKey
ALTER TABLE "Connection" DROP CONSTRAINT "Connection_target_node_id_fkey";

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_source_node_id_fkey" FOREIGN KEY ("source_node_id") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_target_node_id_fkey" FOREIGN KEY ("target_node_id") REFERENCES "Node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

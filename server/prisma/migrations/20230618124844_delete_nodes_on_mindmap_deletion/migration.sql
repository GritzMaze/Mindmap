-- DropForeignKey
ALTER TABLE "Connection" DROP CONSTRAINT "Connection_mindmap_id_fkey";

-- DropForeignKey
ALTER TABLE "Mindmap" DROP CONSTRAINT "Mindmap_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Node" DROP CONSTRAINT "Node_mindmap_id_fkey";

-- AddForeignKey
ALTER TABLE "Mindmap" ADD CONSTRAINT "Mindmap_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_mindmap_id_fkey" FOREIGN KEY ("mindmap_id") REFERENCES "Mindmap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connection" ADD CONSTRAINT "Connection_mindmap_id_fkey" FOREIGN KEY ("mindmap_id") REFERENCES "Mindmap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

import { PrismaClient } from '@prisma/client';
import { Node } from '@prisma/client';

const prisma = new PrismaClient(); 
async function main() {
  await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        username: 'admin',
        email: 'admin@admin.net',
        password: '$2a$10$EhUTo57qlj7sy6BlbugnnuUedOJ4HRqLiyYXP8wT46lz3ICKk.k/e'
      }
    });
        
    const mindmap = await tx.mindmap.create({
      data: {
        name: 'Mindmap Seed 1',
        userId: user.id
      }
    });

    const nodes: Node[] = [];
        
    for (let i = 0; i < 10; i++) {
      const node = await tx.node.create({
        data: {
          label: 'Node ' + i.toString(),
          xPos: Math.random() * 1000,
          yPos: Math.random() * 1000,
          color: '#000000',
          shape: 'circle',
          mindmapId: mindmap.id
        }
      });
      nodes.push(
        node
      );
    }
        
        
    for (let i = 0; i < 10; i++) {
      const randomSourceNode = nodes[Math.floor(Math.random() * nodes.length)];
      const randomTargetNode = nodes[Math.floor(Math.random() * nodes.length)];
      await tx.connection.create({
        data: {
          sourceNodeId: randomSourceNode.id,
          targetNodeId: randomTargetNode.id,
          label: '',
          mindmapId: mindmap.id
        }
      });
    }
        
   
  });
}



main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
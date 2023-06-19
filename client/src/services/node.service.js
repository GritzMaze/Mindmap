import { HttpService } from './http.service';

class NodeService extends HttpService {
    async getNodes() {
        return this.get('/node');
    }

    async getNode(id) {
        return this.get(`/node/${id}`);
    }

    async createNode(node) {
        return this.post('/node', node);
    }

    async updateNode(node) {
        return this.put(`/node/${node.id}`, node);
    }

    async deleteNode(id) {
        return this.delete(`/node/${id}`);
    }
}

export const nodeService = new NodeService();
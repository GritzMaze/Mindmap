import { HttpService } from './http.service';

class MindmapService extends HttpService {

    async getMindmaps() {
        return this.get('/mindmap');
    }

    async getMindmap(id) {
        return this.get(`/mindmap/${id}`);
    }

    async createMindmap(mindmap) {
        return this.post('/mindmap', mindmap);
    }

    async updateMindmap(mindmap) {
        return this.put(`/mindmap/${mindmap.id}`, mindmap);
    }

    async deleteMindmap(id) {
        return this.delete(`/mindmap/${id}`);
    }
}

export const mindmapService = new MindmapService();
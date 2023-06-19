import { HttpService } from './http.service';

class ConnectionService extends HttpService {
    async getConnections() {
        return this.get('/connection');
    }

    async getConnection(id) {
        return this.get(`/connection/${id}`);
    }

    async createConnection(connection) {
        return this.post('/connection', connection);
    }

    async updateConnection(connection) {
        return this.put(`/connection/${connection.id}`, connection);
    }

    async deleteConnection(id) {
        return this.delete(`/connection/${id}`);
    }
}

export const connectionService = new ConnectionService();
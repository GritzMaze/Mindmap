export class NodeNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NodeNotFoundError';
    }
}
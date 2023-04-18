import { config } from '../config/config';
import jwt from 'jsonwebtoken';

class JwtService {
    async sign(payload: any): Promise<string> {
        const jwtKey = config.get('jwt.secret');
        const jwtExpiresIn = config.get('jwt.expiresIn');
        return await jwt.sign(payload, jwtKey, { expiresIn: jwtExpiresIn });
    }
}

export const jwtService = new JwtService();
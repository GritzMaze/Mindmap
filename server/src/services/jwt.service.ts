import { config } from '../config/config';
import jwt from 'jsonwebtoken';

class JwtService {
    sign(payload: any): string {
        const jwtKey = config.get('jwt.secret');
        const jwtExpiresIn = config.get('jwt.expiresIn');
        return jwt.sign(payload, jwtKey, { expiresIn: jwtExpiresIn });
    }
}

export const jwtService = new JwtService();
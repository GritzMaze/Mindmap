import { User } from '@prisma/client';
import { jwtService } from './jwt.service';
import { UserCreateInput, userService } from '.';
import bcrypt from 'bcrypt';
import { config } from '../config/config';

class AuthService {
    async login(user: User): Promise<string> {
        const serverUser = await userService.find(user.id);

        if (!serverUser) {
            return null;
        }

        const passwordMatch = await bcrypt.compare(user.password, serverUser.password);

        if (!passwordMatch) {
            return null;
        }

        const payload = { username: user.username, id: user.id };

        return jwtService.sign(payload);
    }

    async validateUser(payload: any): Promise<any> {
        return await userService.find(payload.id);
    }

    async register(user: UserCreateInput): Promise<Partial<User>> {
        const existingUser = await userService.findByUsername(user.username);

        if (existingUser) {
            throw new Error('User already exists');
        }
        const saltRounds = config.get('bcrypt.saltRounds');

        user.password = await bcrypt.hash(user.password, saltRounds);

        return await userService.create(user);
    }
}

export const authService = new AuthService();
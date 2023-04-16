import { User } from '@prisma/client';
import { jwtService } from './jwt.service';
import { UserCreateInput, userService } from '.';

class AuthService {
    async login(user: User): Promise<string> {
        const payload = { username: user.username, id: user.id };
        
        return jwtService.sign(payload);
    }

    async validateUser(payload: any): Promise<any> {
        return await userService.find(payload.id);
    }

    async register(user: UserCreateInput): Promise<User> {
        return await userService.create(user);
    }
}

export const authService = new AuthService();
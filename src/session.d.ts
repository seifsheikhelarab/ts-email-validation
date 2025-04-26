import 'express-session';
import { Types } from 'mongoose';

declare module 'express-session' {
    interface SessionData {
        user: {
            _id: Types.ObjectId;
            email: string;
            username: string;
            password: string;
            isVerified: boolean;
        };
    }
};

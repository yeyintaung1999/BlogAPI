import {rateLimit} from 'express-rate-limit';

export const  LoginLimiter = rateLimit({
    windowMs: 5*60*1000,
    limit: 3,
    standardHeaders: true,
    legacyHeaders: false,
    message:{
        message: 'Too Many Login Attemps. Please try again in 5 minutes.'
    }
});
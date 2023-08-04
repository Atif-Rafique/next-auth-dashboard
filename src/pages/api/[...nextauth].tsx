// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import roles from '../../utils/roles';
import jwt from 'jsonwebtoken';
import { setRefreshTokenCookie } from '@/utils/utils';

export default NextAuth({
    providers: [
        Providers.Credentials({
            // credentials: {
            //     username: { label: "Username", type: "text" },
            //     password: { label: "Password", type: "password" }
            // },
            // async authorize(credentials: any) {
            //     // Implement your authentication logic here.
            //     // For example, check if the credentials are valid.
            //     // If valid, return an object with user details. Otherwise, return null.
            //     const user = { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user' };
            //     return Promise.resolve(user);
            // }
            async authorize(credentials: any) {
                // Your authentication logic here
                // Assuming the user is authenticated, generate access and refresh tokens
                const user = { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user' };
                const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '15m' });
                const refreshToken = jwt.sign({ sub: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

                return Promise.resolve({
                    ...user,
                    accessToken,
                    refreshToken,
                });
            }
        })
    ],
    secret: process.env.JWT_SECRET,
    session: {
        jwt: true,
    },
    // callbacks: {
    //     async jwt(token: any, user: any) {
    //         // Store user data in JWT token
    //         if (user) {
    //             token.id = user.id;
    //             token.name = user.name;
    //             token.email = user.email;
    //             token.role = user.role;
    //         }
    //         return Promise.resolve(token);
    //     },
    //     async session(session: any, token: any) {
    //         // Store user data in session
    //         if (token) {
    //             session.user = token;
    //         }
    //         return Promise.resolve(session);
    //     }
    // }
    callbacks: {
        async jwt(token: any, user: any) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        async session(session: any, token: any) {
            session.user = token;
            return session;
        },
        async signIn(user: any, account: any, profile: any) {
            // Store the refresh token in an HTTP-only cookie
            setRefreshTokenCookie(user.refreshToken);
            return true;
        },
    },
});


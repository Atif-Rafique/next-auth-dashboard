// pages/api/auth/refresh.js

import jwt from 'jsonwebtoken';

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        const { refreshToken } = req.body;

        try {
            // Verify the refresh token
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

            // Assuming you have the user ID stored in the 'sub' claim of the refresh token
            const userId = decoded.sub;

            // Get the user details from the database based on the user ID

            // Generate a new access token
            const accessToken = jwt.sign({ id: userId, ...userData }, process.env.JWT_SECRET, { expiresIn: '15m' });

            // Send the new access token to the client
            res.status(200).json({ accessToken });
        } catch (error) {
            res.status(401).json({ message: 'Invalid refresh token' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

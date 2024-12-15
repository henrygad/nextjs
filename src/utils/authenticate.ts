import Jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import Users from '../models/userModel';
import { userProps } from '../types';

const authenticate = async (request: NextRequest): Promise<userProps> => {

        const session = request.cookies.get('sessionId')?.value || ''; // Get session cookie
        if (!session) throw ('SessionId not found or expired');

        const data: { jwtToken: string } = JSON.parse(session); // Get Jwt token
        if (!data.jwtToken) throw ('Jwt token not found');

        // Verify jwt token
        const t = Jwt.verify(data.jwtToken, process.env.SECRET_KEY!, (err, decoded) => {
            return { err, decoded }
        }) as unknown

        const { err, decoded} = t as { err: {name: string}, decoded: {_id: string} };

        if (err) { // Check for verification error
            if (err.name === 'TokenExpiredError') {
                throw ('Your login session has expired');
            } else {
                throw ('Invalid Jwt token')
            };
        };

        // Check if user exist and if user is login from the DB
        const user = await Users.findById({ _id: decoded._id }).select('-passWord');
        if (!user) throw ('Unauthenticated user. Please login');

        return user;

};

export default authenticate;

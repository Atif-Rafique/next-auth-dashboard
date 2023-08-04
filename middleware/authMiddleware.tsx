// // middleware/authMiddleware.js

// import { getSession } from 'next-auth/react';

// const authenticate = (handler: any) => async (req: any, res: any) => {
//     const session = await getSession({ req });

//     if (!session) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }

//     req.user = session.user;
//     return handler(req, res);
// };

// export default authenticate;


// middleware/authMiddleware.js

// import { getSession } from 'next-auth/react';

// const authenticate = (requiredRoles: any) => (handler: any) => async (req: any, res: any) => {
//     const session = await getSession({ req });

//     if (!session) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }

//     if (requiredRoles && !requiredRoles.includes(session?.user?.role)) {
//         return res.status(403).json({ message: 'Forbidden' });
//     }

//     req.user = session.user;
//     return handler(req, res);
// };

// export default authenticate;



// middleware/authMiddleware.js

import roles from '@/utils/roles';
import { getSession } from 'next-auth/react';

const authorize = (requiredPermission: any) => (handler: any) => async (req: any, res: any) => {
    const session: any = await getSession({ req });

    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { role }: any = session.user;
    const permissions: any = roles[role]?.permissions || [];

    if (!permissions.includes(requiredPermission)) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    req.user = session.user;
    return handler(req, res);
};

export default authorize;


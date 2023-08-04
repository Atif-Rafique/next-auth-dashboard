// // components/Header.js

// import { signIn, signOut, useSession } from 'next-auth/react';

// const Header = () => {
//     const { data: session }: any = useSession();

//     return (
//         <header>
//             <nav>
//                 {session ? (
//                     <>
//                         <p>Welcome, {session?.user?.name}</p>
//                         <button onClick={() => signOut()}>Sign Out</button>
//                     </>
//                 ) : (
//                     <button onClick={() => signIn()}>Sign In</button>
//                 )}
//             </nav>
//         </header>
//     );
// };

// export default Header;


// components/Header.js

import { useSession } from 'next-auth/react';

const Header = () => {
    const { data: session } = useSession();

    // Function to refresh the access token using the refresh token
    const refreshAccessToken = async () => {
        try {
            const response = await fetch('/api/auth/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken: session?.user?.refreshToken }),
            });
            if (response.ok) {
                const data = await response.json();
                // Update the access token in memory or local storage
                // For example, using Redux or React Context
                // Also, update the session to have the new access token
                // You might need to implement a custom session provider for this
            } else {
                // Handle error: Failed to refresh the token
            }
        } catch (error) {
            // Handle error: Network error or other issues
        }
    };

    return (
        <header>
            <nav>
                {session ? (
                    <>
                        <p>Welcome, {session?.user?.name}</p>
                        <button onClick={() => refreshAccessToken()}>Refresh Access Token</button>
                    </>
                ) : (
          // Your sign-in and sign-out UI
        )}
            </nav>
        </header>
    );
};

export default Header;

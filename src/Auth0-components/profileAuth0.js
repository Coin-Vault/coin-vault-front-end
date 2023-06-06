import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileAuth0 = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [ userAccessToken, setUserAccessToken] = useState('');

    useEffect(() => {
        const getUserMetadata = async () => {
            try {
                const accessToken = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: `http://coinvault.com/`,
                    }
                });

                localStorage.setItem('jwt-coinvault', accessToken);
                setUserAccessToken(accessToken);
            } catch (e) {
                console.log(e.message);
            }
        };

        getUserMetadata();
    }, [getAccessTokenSilently, user?.sub]);

    return (
        isAuthenticated && (
            <div className="mt-5">
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <h3>User Access Token</h3>
                {userAccessToken ? (
                    <pre style={{ maxWidth: '1200px' }}>{ userAccessToken }</pre>
                ) : (
                    "No user accesss token defined"
                )}
            </div>
        )
    );
};

export default ProfileAuth0;

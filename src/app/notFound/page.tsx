"use client";

import { Link } from "@mui/material";
import Button from "@mui/material/Button";
import { FC } from "react";

const NotFound: FC = () => {
    return (
        <>
            <div className="not-found-container"
                style={{
                    backgroundColor: 'white',
                    height: '100%',
                    width: '100%',
                    color: 'black',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <img src="/images/bgplaceholder.jpeg" alt="404 - Page Not Found" style={{ width: '300px', height: '300px', marginTop: '40px' }}/>

                <h1 style={{ margin: '40px 0' }}>404</h1>
                <p style={{ width: '600px', textAlign: 'center', lineHeight: '1.75' }}>The page you&apos;re looking for doesn&apos;t seem to exist. But don&apos;t worry, we&apos;ve got plenty of amazing alternatives for you!</p>

                <div className="alternative-links"
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '40px 0',
                        gap: '20px'
                    }}
                >
                    <Button variant="contained">Go back</Button>
                    <Button variant="outlined">Report a problem</Button>
                </div>

                <p style={{ marginBottom: '40px'}}><span style={{ color: 'red' }}>Need help?</span> Reach out to us at <Link href="mailto:support@example.com">support@example.com</Link></p>
            </div>
        </>
    );
};

export default NotFound;
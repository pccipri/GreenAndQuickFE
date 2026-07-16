"use client";

import { Button, Link, TextField } from "@mui/material";
import { FC } from "react";

const ContactUs: FC = () => {
    return (
        <>
            <div className="contactParentContainer"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    width: '100%',
                    backgroundColor: '#f0f0f0',
                }}
            >
                {/* This container holds the leading text for the contact form; from the left side of the page */}
                <div className="contactLeadTextContainer"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        width: '50%',
                        height: '100%',
                        color: 'black',
                        padding: '50px',
                    }}
                >
                    <h1>Get in touch with us</h1>
                    <p style={{ margin: '40px 0' }}>We&apos;re here to help! Whether you have a question about our services, need assistance with your account,
                        or want to provide feedback, our team is ready to assist you.
                    </p>

                    <h3>Email:</h3>
                    <p style={{ margin: '10px 0 40px 0' }}><span><Link href="mailto:contact@ourcompany.com">contact@ourcompany.com</Link></span></p>
                    <h3>Phone:</h3>
                    <p style={{ margin: '10px 0 40px 0' }}><span><Link href="tel:+1234567890">+1 (234) 567-890</Link></span></p>
                    <h3>Address:</h3>
                    <p style={{ margin: '10px 0 80px 0' }}>1234 Main St, Anytown, Romania</p>

                    <h4>Available Monday to Friday, 9 AM - 6 PM GMT</h4>
                </div>

                {/* This container holds the form the user needs to complete in order to contact; from the right side of the page */}
                <div className="contactFormContainer"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        width: '45%',
                        height: '80%',
                        borderRadius: '20px',
                        padding: '50px',
                        flexWrap: 'wrap',
                        backgroundColor: '#ffffff',
                    }}
                >
                    <form>
                        <TextField
                            fullWidth
                            label="Full Name"
                            placeholder="John Doe"
                            id="fullName"
                            type={'text'}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            sx={{ mb: 2.5, mt: 2.5 }}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            placeholder="johndoe@gmail.com"
                            id="email"
                            type={'email'}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            sx={{ mb: 2.5, mt: 2.5, }}
                        />
                        <TextField
                            fullWidth
                            id="message"
                            label="Multiline"
                            placeholder="Type your message here..."
                            multiline
                            rows={7}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            sx={{ mb: 2.5, mt: 2.5 }}
                        />

                        <Button type="submit" variant="contained" sx={{ mb: 2.5, mt: 2.5, width: '100%' }}>Send Message</Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ContactUs;
"use client";

import { Container, List } from "@mui/material";
import { FC } from "react";
import React from "react";
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import TextField from '@mui/material/TextField';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import Button from '@mui/material/Button';

import CategoriesList from "../components/categoriesList";

const MyAccount: FC = () => {
    const [avatarSrc, setAvatarSrc] = React.useState<string | undefined>(undefined);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Read the file as a data URL
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Container
                maxWidth={false}
                sx={{
                    height: '100vh',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: 'white'
                }}>
                <div className="header-section-account" style={{
                    height: '10%',
                    width: '100%',
                    color: 'black',
                }}>
                    <h1 style={{ padding: '50px' }}>My Account</h1>
                </div>
                <div className="main-container-account" style={{
                    height: '90%',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    color: 'black',
                    padding: '50px 0'
                }}>
                    {/* Side Menu - account information */}
                    <div className="side-menu-account" style={{
                        width: '30%',
                        height: '100%',
                        border: '1px solid black',
                        borderRadius: '20px',
                    }}>
                        <List
                            sx={{ width: '100%' }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                        >
                            <CategoriesList
                                categoryName="Products"
                                icon={<CategoryOutlinedIcon />}
                            />
                            <CategoriesList
                                categoryName="Orders"
                                icon={<ShoppingCartCheckoutOutlinedIcon />}
                            />
                            <CategoriesList
                                categoryName="Network"
                                icon={<GroupsOutlinedIcon />}
                            />
                            <CategoriesList
                                categoryName="Test"
                            />
                        </List>
                    </div>

                    {/* Main Menu - user information */}
                    <div className="main-menu-account" style={{
                        width: '70%',
                        height: '100%',
                        padding: '30px',
                    }}>
                        {/* Avatar upload button */}
                        <ButtonBase
                            component="label"
                            role={undefined}
                            tabIndex={-1} // prevent label from tab focus
                            aria-label="Avatar image"
                            sx={{
                                borderRadius: '40px',
                                '&:has(:focus-visible)': {
                                    outline: '2px solid',
                                    outlineOffset: '2px',
                                },
                            }}
                        >
                            <Avatar alt="Upload new avatar" src={avatarSrc} />
                            <input
                                type="file"
                                accept="image/*"
                                style={{
                                    border: 0,
                                    clip: 'rect(0 0 0 0)',
                                    height: '1px',
                                    margin: '-1px',
                                    overflow: 'hidden',
                                    padding: 0,
                                    position: 'absolute',
                                    whiteSpace: 'nowrap',
                                    width: '1px',
                                }}
                                onChange={handleAvatarChange}
                            />
                            <h3 style={{ marginLeft: 15 }}>User</h3>
                        </ButtonBase>

                        <div
                            className="text-field-container"
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '24px',
                                marginTop: '50px',
                            }}
                        >
                            {/* First Name field */}
                            <TextField
                                fullWidth
                                label="First Name"
                                placeholder="John"
                                value="John"
                                id="firstName"
                                type="text"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                sx={{
                                    flex: '1 1 45%',
                                    minWidth: '250px',
                                }}
                            />

                            {/* Last Name field */}
                            <TextField
                                fullWidth
                                label="Last Name"
                                placeholder="Doe"
                                value="Doe"
                                id="lastName"
                                type="text"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                sx={{
                                    flex: '1 1 45%',
                                    minWidth: '250px',
                                }}
                            />

                            {/* Username field */}
                            <TextField
                                fullWidth
                                label="Username"
                                placeholder="johndoe@gmail.com"
                                value="johndoe@gmail.com"
                                id="username"
                                type="text"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                sx={{
                                    flex: '1 1 45%',
                                    minWidth: '250px',
                                }}
                            />

                            {/* Email field */}
                            <TextField
                                fullWidth
                                label="Email"
                                placeholder="johndoe@gmail.com"
                                value="johndoe@gmail.com"
                                id="email"
                                type="email"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                sx={{
                                    flex: '1 1 45%',
                                    minWidth: '250px',
                                }}
                            />

                            {/* Password field */}
                            <TextField
                                fullWidth
                                label="Password"
                                placeholder="••••••••"
                                value="password"
                                id="password"
                                type="text"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                sx={{
                                    flex: '1 1 45%',
                                    minWidth: '250px',
                                }}
                            />

                            {/* Phone Number field */}
                            <TextField
                                fullWidth
                                label="Phone Number"
                                placeholder="+1 (555) 123-4567"
                                value="+1 (555) 123-4567"
                                id="phoneNumber"
                                type="tel"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                sx={{
                                    flex: '1 1 45%',
                                    minWidth: '250px',
                                }}
                            />
                        </div>
                        <Button variant="contained" style={{ marginTop: '50px', marginRight: '10px' }}>Save</Button>
                        <Button variant="outlined" style={{ marginTop: '50px' }}>Cancel</Button>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default MyAccount;
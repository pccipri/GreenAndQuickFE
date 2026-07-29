"use client";

import { Container, List } from "@mui/material";
import { FC } from "react";
import React, { useEffect, useMemo, useState } from "react";
import Avatar from "@mui/material/Avatar";
import ButtonBase from "@mui/material/ButtonBase";
import TextField from "@mui/material/TextField";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Button from "@mui/material/Button";
import CategoriesList from "../components/categoriesList";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/tokenManager";
import { useAuth } from "@/contexts/AuthProvider";
import { notify } from "@/utils/toast";

type ProfileForm = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
    avatarPath: string;
}

const ProfilePage: FC = () => {
    const router = useRouter();
    const { user, refresh } = useAuth();
    const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState<ProfileForm>({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phoneNumber: '',
        avatarPath: '',
    });

    const displayName = useMemo(() => {
        if (form.firstName && form.lastName) return `${form.firstName} ${form.lastName}`;
        if (form.firstName) return form.firstName;
        if (form.lastName) return form.lastName;
        return form.username || 'User';
    }, [form.firstName, form.lastName, form.username]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await authAPI.get('/users/me');
                const profile = data?.user ?? data;

                setForm({
                    firstName: profile?.firstName ?? '',
                    lastName: profile?.lastName ?? '',
                    username: profile?.username ?? '',
                    email: profile?.email ?? '',
                    phoneNumber: profile?.phoneNumber ?? '',
                    avatarPath: profile?.avatarPath ?? profile?.avatarUrl ?? '',
                });

                if (profile?.avatarPath || profile?.avatarUrl) {
                    setAvatarSrc(profile.avatarPath ?? profile.avatarUrl);
                }
            } catch {
                notify('Failed to load profile data', 'error');
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, []);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Read the file as a data URL
            const reader = new FileReader();
            reader.onload = () => {
                const nextAvatar = reader.result as string;
                setAvatarSrc(nextAvatar);
                setForm((prev) => ({ ...prev, avatarPath: nextAvatar }));
            };
            reader.readAsDataURL(file);
        }
    };

    const updateField = (field: keyof ProfileForm, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const saveProfile = async () => {
        setSaving(true);
        try {
            await authAPI.patch('/users/me', {
                firstName: form.firstName || null,
                lastName: form.lastName || null,
                phoneNumber: form.phoneNumber || null,
                avatarPath: form.avatarPath || null,
            });

            await refresh();
            notify('Profile updated successfully', 'success');
        } catch {
            notify('Failed to update profile', 'error');
        } finally {
            setSaving(false);
        }
    };

    const resetToCurrentUser = () => {
        setForm((prev) => ({
            ...prev,
            firstName: user?.firstName ?? '',
            lastName: user?.lastName ?? '',
            username: user?.username ?? prev.username,
            email: user?.email ?? prev.email,
            phoneNumber: user?.phoneNumber ?? '',
            avatarPath: user?.avatarPath ?? user?.avatarUrl ?? '',
        }));

        setAvatarSrc(user?.avatarPath ?? user?.avatarUrl ?? undefined);
    };

    if (loading) {
        return <div className="flex min-h-screen items-center justify-center">Loading profile...</div>;
    }

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
                            <div onClick={() => router.push('/profile/payment-methods')} style={{ cursor: 'pointer' }}>
                                <CategoriesList
                                    categoryName="Payment Methods"
                                    icon={<CreditCardIcon />}
                                />
                            </div>
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
                            <h3 style={{ marginLeft: 15 }}>{displayName}</h3>
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
                                value={form.firstName}
                                id="firstName"
                                type="text"
                                onChange={(e) => updateField('firstName', e.target.value)}
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
                                value={form.lastName}
                                id="lastName"
                                type="text"
                                onChange={(e) => updateField('lastName', e.target.value)}
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
                                value={form.username}
                                id="username"
                                type="text"
                                disabled
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
                                value={form.email}
                                id="email"
                                type="email"
                                disabled
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
                                value={form.phoneNumber}
                                id="phoneNumber"
                                type="tel"
                                onChange={(e) => updateField('phoneNumber', e.target.value)}
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
                        <Button variant="contained" style={{ marginTop: '50px', marginRight: '10px' }} onClick={saveProfile} disabled={saving}>
                            {saving ? 'Saving...' : 'Save'}
                        </Button>
                        <Button variant="outlined" style={{ marginTop: '50px' }} onClick={resetToCurrentUser} disabled={saving}>Cancel</Button>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default ProfilePage;

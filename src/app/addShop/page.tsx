"use client"

import { Box, TextareaAutosize } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation'
import { addShop } from '@/services/shopService';
import { AddShopDTO } from '@/interfaces/Shop';
import { useAuth } from '@/contexts/AuthProvider';

const AddShop: FC = () => {
    const t = useTranslations('AddShop');
    const router = useRouter()
    const [shopData, setShopData] = useState<AddShopDTO>({
        name: '',
        description: '',
        owner: "",
        categories: []
    })
    const { user } = useAuth()
    const createShop = async () => {
        if(user) {
        const response = await addShop({...shopData, owner: user._id})
        
        if (response) {
            router.push("/")
        }

    }

    }

    const handlePropertyUpdate = (propertyName: keyof AddShopDTO, value: string) => {
        setShopData({ ...shopData, [propertyName]: value });
    }

    return (
        <>
            <Container
                maxWidth={false}
                sx={{
                    height: '100vh',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundImage: 'url(./images/bgplaceholder.jpeg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <div style={{
                    height: '100%',
                    width: '40%',
                    textAlign: 'left',
                    backgroundColor: 'white',
                    color: 'black',
                    opacity: 0.9,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{ width: '70%', height: '90%', textAlign: 'center' }}>
                        <h2 style={{ marginBottom: '1.5vw' }}>{t("register")}</h2>
                        <h6>Let s get you started with a shop!</h6>
                        <Box
                            sx={{
                                width: 500,
                                maxWidth: '100%',
                                mt: 6
                            }}
                        >
                            <TextField
                                fullWidth
                                label="name"
                                placeholder="john_doe"
                                id="name"
                                type={'text'}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                onChange={(e) => {
                                    handlePropertyUpdate("name", e.target.value)
                                }}
                                sx={{ mb: 2.5, mt: 2.5 }}
                            />
                            <TextareaAutosize
                            aria-label="Description"
                            minRows={4}
                            placeholder="Your shop description"
                            onChange={(e) => {
                                handlePropertyUpdate("name", e.target.value)
                            }}
                            style={{ marginBottom: 2.5, marginTop: 2.5 }}
                            />
                        </Box>
                        <Button onClick={createShop} variant="contained" fullWidth style={{ marginTop: '4vw', marginBottom: '2vw' }}>Submit</Button>
                    </div>
                </div>

                <div style={{
                    height: '100%',
                    width: '40%',
                    textAlign: 'left',
                    backgroundColor: 'green',
                    opacity: 0.9,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div style={{ width: '80%' }}>
                        <h2>Some lead text about how great our company is, or even our slogan</h2>
                        <br />
                        <h6>Smaller text</h6>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default AddShop;
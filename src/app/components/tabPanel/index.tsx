"use client"

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import StatusList from "@/app/components/statusList";
import OrderDetailsList from "@/app/components/orderDetailsList";
import PaymentDetailsList from "@/app/components/paymentDetailsList";
import { useState } from 'react';
import ConfirmationModal from '../confirmationModal';
import { useTranslations } from 'next-intl';
import { a11yProps } from "@/utils/helpers";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}



export default function BasicTabs() {
    const t = useTranslations('OrderTabs');

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [statuses, setStatuses] = useState([
        { status: t('orderPlaced'), date: "14/09/2023, 13:45" },
        { status: t('orderConfirmed'), date: "14/09/2023, 09:00" },
        { status: t('orderShipped'), date: "15/09/2023, 05:23" },
        { status: t('orderDelivered'), date: "17/09/2023, 03:53" },
    ]);

    // Reverse the statuses to show the most recent update at the top
    const displayedStatuses = [...statuses].reverse();
    const currentStatus = statuses[statuses.length - 1].status;

    const canCancelOrder = currentStatus === t('orderPlaced') || currentStatus === t('orderConfirmed');


    // Confirmation modal before canceling order
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    // Refund process if the payment method was card
    const [paymentDetails, setPaymentDetails] = useState({
        id: "4",
        date: "17/09/2023, 13:53",
        paymentMethod: t('creditCard'),
        paymentStatus: t('paid'),
        refundStatus: "",
        refundMessage: "",
    });

    const handleCancelOrder = () => {
        setStatuses((prev) => [
            ...prev,
            {
                status: t('cancelled'),
                date: new Date().toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            },
        ]);

        if (paymentDetails.paymentMethod === t('creditCard')) {
            setPaymentDetails((prev) => ({
                ...prev,
                paymentStatus: t("refundPending"),
                refundStatus: t("pending"),
                refundMessage:
                    t('refundMessage'),
            }));
        }

        setOpenModal(false);
    };

    return (
        <Box sx={{ width: '100%', marginLeft: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={t('orderStatus')} {...a11yProps(0)} />
                    <Tab label={t('payment')} {...a11yProps(1)} />
                    <Tab label={t('details')} {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {canCancelOrder && (
                    <>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleOpenModal}
                            sx={{ mb: 2 }}
                        >
                            {t('cancelOrder')}
                        </Button>

                        <ConfirmationModal
                            open={openModal}
                            onClose={handleCloseModal}
                            onConfirm={handleCancelOrder}
                            leadText={t('cancelOrder')}
                            explanatoryText={t('explanatoryText')}
                        />
                    </>
                )}

                <ul>
                    {displayedStatuses.map((item) => (
                        <StatusList
                            key={`${item.status}-${item.date}`}
                            status={item.status}
                            date={item.date}
                        />
                    ))}
                </ul>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ul style={{ listStyleType: "none" }}>
                    <PaymentDetailsList
                        id={paymentDetails.id}
                        date={paymentDetails.date}
                        paymentMethod={paymentDetails.paymentMethod}
                        paymentStatus={paymentDetails.paymentStatus}
                    />

                    {paymentDetails.refundStatus && (
                        <li>
                            <h4>{t('refundStatus')}: {paymentDetails.refundStatus}</h4>
                            <p>{paymentDetails.refundMessage}</p>
                        </li>
                    )}
                </ul>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ul style={{ listStyleType: 'none' }}>
                    <OrderDetailsList street="123 Main St" city="City" county="County" country="Country" zipcode={12345} />
                </ul>
            </TabPanel>
        </Box>
    );
}
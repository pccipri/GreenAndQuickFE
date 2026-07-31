"use client"

import { FC, useState } from "react";
import styles from './page.module.css';
import { useTranslations } from 'next-intl';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";


const GroupManagement: FC = () => {
    const t = useTranslations('ManageGroupForm');


    // Sample data for the country autocomplete
    const countries = [
        { id: 1, name: "Romania" },
        { id: 2, name: "Germany" },
        { id: 3, name: "The Netherlands" },
        { id: 4, name: "France" },
        { id: 5, name: "Italy" },
    ];

    // Sample data for the county autocomplete
    const counties = [
        { id: 1, name: "Cluj" },
        { id: 2, name: "Maramures" },
        { id: 3, name: "Timis" },
        { id: 4, name: "Iasi" },
        { id: 5, name: "Constanta" },
    ];

    // Sample data for the city autocomplete
    const cities = [
        { id: 1, name: "Cluj-Napoca" },
        { id: 2, name: "Baia Mare" },
        { id: 3, name: "Timisoara" },
        { id: 4, name: "Iasi" },
        { id: 5, name: "Constanta" },
    ];


    // Sample data for shops
    const shops = [
        { id: "1", name: "Fresh Market", owner: "Maria Popescu" },
        { id: "2", name: "Daily Goods", owner: "Andrei Ionescu" },
        { id: "3", name: "Green Basket", owner: "Elena Pavel" },
        { id: "4", name: "Local Pantry", owner: "Cristian Dobre" },
        { id: "5", name: "Organic Foods", owner: "Ioana Marinescu" }
    ];


    // Sample data for members
    const initialMembers = [
        { id: "1", name: "Fresh Market", owner: "Maria Popescu" },
        { id: "2", name: "Daily Goods", owner: "Andrei Ionescu" },
        { id: "3", name: "Green Basket", owner: "Elena Pavel" },
        { id: "4", name: "Local Pantry", owner: "Cristian Dobre" },
        { id: "5", name: "Organic Foods", owner: "Ioana Marinescu" }
    ];


    // Sample data for invitations
    const initialInvitations = [
        {
            id: "1",
            shopName: "Green Basket",
            status: "Pending",
            sentAt: "30 July 2026",
        },
        {
            id: "2",
            shopName: "Local Pantry",
            status: "Accepted",
            sentAt: "27 July 2026",
        }
    ];

    const [members, setMembers] = useState(initialMembers);
    const [invitations, setInvitations] = useState(initialInvitations);
    const [selectedShop, setSelectedShop] =
        useState<(typeof shops)[number] | null>(null);

    const handleRemoveMember = (memberId: string) => {
        setMembers((currentMembers) =>
            currentMembers.filter((member) => member.id !== memberId)
        );
    };

    const handleSendInvitation = () => {
        if (!selectedShop) return;

        setInvitations((currentInvitations) => [
            ...currentInvitations,
            {
                id: crypto.randomUUID(),
                shopName: selectedShop.name,
                status: "Pending",
                sentAt: "31 July 2026",
            },
        ]);

        setSelectedShop(null);
    };

    return (
        <Box className={styles.managementPage}>
            <Typography
                component="h1"
                variant="h4"
                className={styles.editGroupTitle}
            >
                {t("groupManagement")}
            </Typography>

            <Grid container spacing={3}>
                {/* edit group details */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    <Paper className={styles.sectionCard} elevation={1}>
                        <Typography variant="h6" component="h2">
                            {t("groupDetails")}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5, mb: 3 }}
                        >
                            {t("groupDetailsDescription")}
                        </Typography>

                        <form className={styles.editGroupForm}>
                            <Stack spacing={2.5}>
                                <Box>
                                    <label
                                        htmlFor="groupName"
                                        className={styles.formLabel}
                                    >
                                        {t("groupName")}
                                    </label>

                                    <TextField
                                        id="groupName"
                                        defaultValue="Mihai's Group"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mt: 1 }}
                                    />
                                </Box>

                                <Box>
                                    <label
                                        htmlFor="groupDescription"
                                        className={styles.formLabel}
                                    >
                                        {t("groupDescription")}
                                    </label>

                                    <TextField
                                        id="groupDescription"
                                        defaultValue="We share groceries and household items"
                                        variant="outlined"
                                        multiline
                                        minRows={3}
                                        fullWidth
                                        sx={{ mt: 1 }}
                                    />
                                </Box>

                                <Divider />

                                <Typography variant="subtitle1" fontWeight={600}>
                                    {t("groupAddress")}
                                </Typography>

                                <Grid container spacing={2}>
                                    <Grid size={12}>
                                        <label
                                            htmlFor="groupStreet"
                                            className={styles.formLabel}
                                        >
                                            {t("groupStreet")}
                                        </label>

                                        <TextField
                                            id="groupStreet"
                                            defaultValue="22 Example Street"
                                            variant="outlined"
                                            fullWidth
                                            sx={{ mt: 1 }}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <label
                                            htmlFor="groupCity"
                                            className={styles.formLabel}
                                        >
                                            {t("groupCity")}
                                        </label>

                                        <Autocomplete
                                            options={cities}
                                            defaultValue={cities[1]}
                                            getOptionLabel={(option) => option.name}
                                            isOptionEqualToValue={(option, value) =>
                                                option.id === value.id
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    id="groupCity"
                                                    placeholder={t("selectCity")}
                                                />
                                            )}
                                            sx={{ mt: 1 }}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <label
                                            htmlFor="groupCounty"
                                            className={styles.formLabel}
                                        >
                                            {t("groupCounty")}
                                        </label>

                                        <Autocomplete
                                            options={counties}
                                            defaultValue={counties[1]}
                                            getOptionLabel={(option) => option.name}
                                            isOptionEqualToValue={(option, value) =>
                                                option.id === value.id
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    id="groupCounty"
                                                    placeholder={t("selectCounty")}
                                                />
                                            )}
                                            sx={{ mt: 1 }}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <label
                                            htmlFor="groupCountry"
                                            className={styles.formLabel}
                                        >
                                            {t("groupCountry")}
                                        </label>

                                        <Autocomplete
                                            options={countries}
                                            defaultValue={countries[0]}
                                            getOptionLabel={(option) => option.name}
                                            isOptionEqualToValue={(option, value) =>
                                                option.id === value.id
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    id="groupCountry"
                                                    placeholder={t("selectCountry")}
                                                />
                                            )}
                                            sx={{ mt: 1 }}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <label
                                            htmlFor="groupZipCode"
                                            className={styles.formLabel}
                                        >
                                            {t("groupZipCode")}
                                        </label>

                                        <TextField
                                            id="groupZipCode"
                                            defaultValue="430001"
                                            variant="outlined"
                                            slotProps={{
                                                htmlInput: { maxLength: 10 },
                                            }}
                                            fullWidth
                                            sx={{ mt: 1 }}
                                        />
                                    </Grid>
                                </Grid>

                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button type="submit" variant="contained">
                                        {t("saveChanges")}
                                    </Button>
                                </Box>
                            </Stack>
                        </form>
                    </Paper>
                </Grid>

                {/* invitation panel */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <Paper className={styles.sectionCard} elevation={1}>
                        <Typography variant="h6" component="h2">
                            {t("inviteShop")}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5, mb: 3 }}
                        >
                            {t("inviteShopDescription")}
                        </Typography>

                        <Stack spacing={2}>
                            <Autocomplete
                                options={shops}
                                value={selectedShop}
                                onChange={(_, newValue) => setSelectedShop(newValue)}
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, value) =>
                                    option.id === value.id
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={t("searchShop")}
                                        placeholder={t("searchShopPlaceholder")}
                                    />
                                )}
                            />

                            <Button
                                variant="contained"
                                startIcon={<SendOutlinedIcon />}
                                disabled={!selectedShop}
                                onClick={handleSendInvitation}
                                fullWidth
                            >
                                {t("sendInvitation")}
                            </Button>
                        </Stack>
                    </Paper>
                </Grid>

                {/* member list */}
                <Grid size={12}>
                    <Paper className={styles.sectionCard} elevation={1}>
                        <Box className={styles.sectionHeader}>
                            <Box>
                                <Typography variant="h6" component="h2">
                                    {t("groupMembers")}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    {t("memberCount", { count: members.length })}
                                </Typography>
                            </Box>
                        </Box>

                        <Stack divider={<Divider />} sx={{ mt: 2 }}>
                            {members.map((member) => (
                                <Box key={member.id} className={styles.listRow}>
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        alignItems="center"
                                    >
                                        <Avatar>{member.name.charAt(0)}</Avatar>

                                        <Box>
                                            <Typography fontWeight={600}>
                                                {member.name}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {member.owner}
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Tooltip title={t("removeMember")}>
                                        <IconButton
                                            color="error"
                                            onClick={() =>
                                                handleRemoveMember(member.id)
                                            }
                                            aria-label={`${t("removeMember")} ${member.name
                                                }`}
                                        >
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            ))}
                        </Stack>
                    </Paper>
                </Grid>

                {/* pending invitations */}
                <Grid size={12}>
                    <Paper className={styles.sectionCard} elevation={1}>
                        <Typography variant="h6" component="h2">
                            {t("invitations")}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 0.5 }}
                        >
                            {t("invitationsDescription")}
                        </Typography>

                        <Stack divider={<Divider />} sx={{ mt: 2 }}>
                            {invitations.map((invitation) => (
                                <Box
                                    key={invitation.id}
                                    className={styles.listRow}
                                >
                                    <Box>
                                        <Typography fontWeight={600}>
                                            {invitation.shopName}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {t("invitedOn", {
                                                date: invitation.sentAt,
                                            })}
                                        </Typography>
                                    </Box>

                                    <Chip
                                        label={invitation.status}
                                        color={
                                            invitation.status === "Accepted"
                                                ? "success"
                                                : "warning"
                                        }
                                        variant="outlined"
                                        size="small"
                                    />
                                </Box>
                            ))}
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default GroupManagement;
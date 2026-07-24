"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Chip from "@mui/material/Chip";
import EditIcon from "@mui/icons-material/Edit";
import GroupRemove from "@mui/icons-material/GroupRemove";
import IconButton from "@mui/material/IconButton";
import CrudTable, { CrudColumn } from "../../components/crudTable";
import { ShopGroup } from "@/interfaces/ShopGroup";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { GroupInvitation } from "@/interfaces/GroupInvitation";


// Sample data for pending invitations
const initialInvitations: GroupInvitation[] = [
    {
        _id: "invitation-1",
        groupName: "Group 1",
        invitingShopName: "Green Market",
        pickupAddress: {
            street: "Victoriei Street 12",
            city: "Baia Mare",
            county: "Maramureș",
            country: "Romania",
            zipcode: 430121,
        }
    }
];


// Sample data for shop groups
const initialShopGroups: ShopGroup[] = [
    {
        _id: "1",
        name: "Group 1",
        description: "Weekly grocery delivery",
        shops: ["shop-1", "shop-2"],
        role: "owner",
        deliveryAddress: {
            street: "Main Street 10",
            city: "Bucharest",
            county: "Ilfov",
            country: "Romania",
            zipcode: 100001,
            isDefault: true,
        },
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-02"),
    },
    {
        _id: "2",
        name: "Group 2",
        description: "Shared weekend delivery",
        shops: ["shop-1", "shop-3", "shop-4"],
        role: "member",
        deliveryAddress: {
            street: "Republicii Street 5",
            city: "Cluj-Napoca",
            county: "Cluj",
            country: "Romania",
            zipcode: 400015,
            isDefault: false,
        },
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-02-02"),
    },
];

const MyGroups = () => {
    const router = useRouter();
    const t = useTranslations("MyGroups");

    const [invitations, setInvitations] = useState<GroupInvitation[]>(initialInvitations);
    const [shopGroups, setShopGroups] = useState<ShopGroup[]>(initialShopGroups);

    const handleAccept = (id: string) => {
        setInvitations((previousInvitations) =>
            previousInvitations.filter(
                (invitation) => invitation._id !== id
            )
        );
    };

    const handleDecline = (id: string) => {
        setInvitations((previousInvitations) =>
            previousInvitations.filter(
                (invitation) => invitation._id !== id
            )
        );
    };

    const shopGroupColumns: CrudColumn<ShopGroup>[] = [
        {
            key: "name",
            label: t("tableColumns.name"),
            render: (group) => group.name,
        },
        {
            key: "description",
            label: t("tableColumns.description"),
            render: (group) => group.description,
        },
        {
            key: "shops",
            label: t("tableColumns.shops"),
            render: (group) =>
                t("tableColumns.shopCount", { count: group.shops.length }),
        },
        {
            key: "deliveryAddress",
            label: t("tableColumns.deliveryAddress"),
            render: (group) =>
                `${group.deliveryAddress.street}, ${group.deliveryAddress.city}, ${group.deliveryAddress.county}, ${group.deliveryAddress.country}, ${group.deliveryAddress.zipcode}`,
        },
        {
            key: "role",
            label: t("tableColumns.role"),
            render: (group) => (
                <Chip
                    label={
                        group.role === "owner"
                            ? t("roles.owner")
                            : t("roles.member")
                    }
                    size="small"
                    variant="outlined"
                />
            ),
        },
    ];

    return (
        <>
            {invitations.length > 0 && (
                <Box
                    sx={{
                        mb: 3,
                        p: 2,
                        borderRadius: 2,
                        color: "black",
                        backgroundColor: "#F5F5F5",
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        {t("pendingInvitations")}
                    </Typography>

                    <Stack spacing={2}>
                        {invitations.map((invitation) => (
                            <Box
                                key={invitation._id}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: { xs: "flex-start", md: "center" },
                                    flexDirection: { xs: "column", md: "row" },
                                    gap: 2,
                                    p: 2,
                                    border: "1px solid #E5E7EB",
                                    borderRadius: 2,
                                    backgroundColor: "#FFFFFF",
                                }}
                            >
                                <Box>
                                    <Typography sx={{ fontWeight: 600 }}>
                                        {invitation.groupName}
                                    </Typography>

                                    <Typography variant="body2">
                                        {invitation.pickupAddress.street},{" "}
                                        {invitation.pickupAddress.city},{" "}
                                        {invitation.pickupAddress.county},{" "}
                                        {invitation.pickupAddress.country},{" "}
                                        {invitation.pickupAddress.zipcode}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        {t("invitedBy", {
                                            shop: invitation.invitingShopName,
                                        })}
                                    </Typography>
                                </Box>

                                <Stack direction="row" spacing={1}>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleAccept(invitation._id)}
                                    >
                                        {t("accept")}
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        onClick={() => handleDecline(invitation._id)}
                                    >
                                        {t("decline")}
                                    </Button>
                                </Stack>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            )}

            <CrudTable
                title={t("title")}
                addHref="/dashboard/groups/create"
                data={shopGroups}
                columns={shopGroupColumns}
                getId={(group) => group._id}
                getTitle={(group) => group.name}
                addButtonLabel={t("createGroup")}
                emptyMessage={t("noShopGroups")}
                deleteTitle={t("deleteTitle")}
                deleteMessage={t("deleteMessage")}
                onEdit={(id) => router.push(`/dashboard/groups/${id}`)}
                onDeleteConfirm={(id) =>
                    setShopGroups((previousGroups) =>
                        previousGroups.filter((group) => group._id !== id)
                    )
                }
                renderActions={(group) => (
                    <>
                        {group.role === "owner" && (
                            <IconButton
                                onClick={() =>
                                    router.push(`/dashboard/groups/${group._id}`)
                                }
                                aria-label={`Manage ${group.name}`}
                            >
                                <EditIcon />
                            </IconButton>
                        )}

                        {group.role === "member" && (
                            <IconButton
                                onClick={() =>
                                    setShopGroups((previousGroups) =>
                                        previousGroups.filter(
                                            (item) => item._id !== group._id
                                        )
                                    )
                                }
                                aria-label={`Leave ${group.name}`}
                            >
                                <GroupRemove />
                            </IconButton>
                        )}
                    </>
                )}
            />
        </>
    );
};

export default MyGroups;
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { addCategory } from "@/services/categoryService";
import { notify } from "@/utils/toast";

const AddCategoryPage = () => {
    const router = useRouter();
    const t = useTranslations("CategoryForm");
    const [name, setName] = useState("");
    const [isGlobal, setIsGlobal] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (!name.trim()) {
            setError(t("nameRequired"));
            return;
        }

        setSubmitting(true);

        try {
            await addCategory({ name: name.trim(), isGlobal });
            notify(t("createSuccess"), "success");
            router.push("/admin/categories");
        } catch (err: any) {
            setError(err.message || t("createFailed"));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 720, mx: "auto", p: { xs: 2, md: 4 } }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
                {t("addTitle")}
            </Typography>

            <form onSubmit={handleSubmit}>
                {error ? (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                ) : null}

                <Stack spacing={2}>
                    <TextField
                        label={t("name")}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                        fullWidth
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isGlobal}
                                onChange={(event) => setIsGlobal(event.target.checked)}
                            />
                        }
                        label={t("availableGlobally")}
                    />

                    <Stack direction="row" spacing={2}>
                        <Button type="submit" variant="contained" disabled={submitting}>
                            {submitting ? t("creating") : t("create")}
                        </Button>
                        <Button variant="outlined" onClick={() => router.push("/admin/categories")}>
                            {t("cancel")}
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Box>
    );
};

export default AddCategoryPage;

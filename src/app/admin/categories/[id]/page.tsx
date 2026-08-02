"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Alert, Box, Button, Checkbox, CircularProgress, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { getCategoryById, updateCategory } from "@/services/categoryService";
import { notify } from "@/utils/toast";

const EditCategoryPage = () => {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const t = useTranslations("CategoryForm");
    const [name, setName] = useState("");
    const [isGlobal, setIsGlobal] = useState(true);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCategory = async () => {
            if (!params?.id) {
                return;
            }

            try {
                const category = await getCategoryById(params.id);
                if (category) {
                    setName(category.name || "");
                    setIsGlobal(Boolean(category.isGlobal));
                }
            } catch (err: any) {
                setError(err.message || "Unable to load category.");
            } finally {
                setLoading(false);
            }
        };

        void loadCategory();
    }, [params?.id]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        if (!params?.id) {
            setError("Category id is missing.");
            return;
        }

        if (!name.trim()) {
            setError(t("nameRequired"));
            return;
        }

        setSubmitting(true);

        try {
            await updateCategory(params.id, { name: name.trim(), isGlobal });
            notify(t("updateSuccess"), "success");
            router.push("/admin/categories");
        } catch (err: any) {
            setError(err.message || t("updateFailed"));
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" py={6}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 720, mx: "auto", p: { xs: 2, md: 4 } }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
                {t("editTitle")}
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
                            {submitting ? t("saving") : t("save")}
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

export default EditCategoryPage;

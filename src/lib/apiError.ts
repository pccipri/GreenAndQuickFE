const normalizeMessageValue = (value: unknown): string | null => {
    if (typeof value === 'string') {
        const trimmed = value.trim();
        return trimmed ? trimmed : null;
    }

    if (Array.isArray(value)) {
        for (const item of value) {
            const nested = normalizeMessageValue(item);
            if (nested) {
                return nested;
            }
        }
        return null;
    }

    if (value && typeof value === 'object') {
        const candidate = value as Record<string, unknown>;

        if (typeof candidate.message === 'string') {
            const trimmed = candidate.message.trim();
            if (trimmed) {
                return trimmed;
            }
        }

        if (typeof candidate.error === 'string') {
            const trimmed = candidate.error.trim();
            if (trimmed) {
                return trimmed;
            }
        }

        if (typeof candidate.detail === 'string') {
            const trimmed = candidate.detail.trim();
            if (trimmed) {
                return trimmed;
            }
        }

        if (Array.isArray(candidate.errors)) {
            for (const item of candidate.errors) {
                const nested = normalizeMessageValue(item);
                if (nested) {
                    return nested;
                }
            }
        }

        if (candidate.errors && typeof candidate.errors === 'object') {
            for (const value of Object.values(candidate.errors as Record<string, unknown>)) {
                const nested = normalizeMessageValue(value);
                if (nested) {
                    return nested;
                }
            }
        }
    }

    return null;
};

export const extractApiErrorMessage = (error: unknown, fallback = 'Something went wrong'): string => {
    if (typeof error === 'string') {
        const trimmed = error.trim();
        return trimmed || fallback;
    }

    if (error instanceof Error) {
        const message = error.message?.trim();
        return message || fallback;
    }

    if (error && typeof error === 'object') {
        const candidate = error as Record<string, unknown>;

        const responseData = candidate.response && typeof candidate.response === 'object'
            ? (candidate.response as Record<string, unknown>).data
            : undefined;

        const directMessage = normalizeMessageValue(responseData);
        if (directMessage) {
            return directMessage;
        }

        const message = normalizeMessageValue(candidate.message);
        if (message) {
            return message;
        }
    }

    return fallback;
};

export const unwrapApiPayload = <T>(payload: unknown): T => {
    if (payload && typeof payload === 'object') {
        const candidate = payload as Record<string, unknown>;
        if (candidate.data !== undefined) {
            return candidate.data as T;
        }
    }

    return payload as T;
};

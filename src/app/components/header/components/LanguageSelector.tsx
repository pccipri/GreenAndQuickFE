
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/AuthProvider';
import { updateUserLanguage } from '@/services/userService';
import { notify } from '@/utils/toast';

const LanguageSelector = () => {
  const t = useTranslations('Header');
  const locale = useLocale();
  const { user } = useAuth();

  const setLocaleCookie = (value: string) => {
    document.cookie = `NEXT_LOCALE=${value}; path=/; max-age=31536000`; // 1 year
  };

  const handleChange = async (event: SelectChangeEvent<string>) => {
    const newLocale = event.target.value as 'en' | 'ro';
    
    // If user is authenticated, update language in backend
    if (user?.id) {
      try {
        await updateUserLanguage(user.id, newLocale);
        setLocaleCookie(newLocale);
        window.location.reload(); // reload to apply new locale
      } catch (error: any) {
        notify(error.message || 'Failed to update language', 'error');
      }
    } else {
      // If not authenticated, just set the cookie
      setLocaleCookie(newLocale);
      window.location.reload();
    }
  };

  return (
    <Select
      id="demo-simple-select"
      value={locale}
      onChange={handleChange}
      size="small"
      sx={{ color: 'white', borderColor: 'white' }}
      variant="standard"
    >
      <MenuItem value="en">{t("english")}</MenuItem>
      <MenuItem value="ro">{t("romanian")}</MenuItem>
    </Select>
  );
};

export default LanguageSelector;
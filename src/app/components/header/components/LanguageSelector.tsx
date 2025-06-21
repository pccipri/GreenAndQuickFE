
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';

const LanguageSelector = () => {
  const t = useTranslations('Header');
  const locale = useLocale();

    const setLocaleCookie = (value: string) => {
    document.cookie = `NEXT_LOCALE=${value}; path=/; max-age=31536000`; // 1 year
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newLocale = event.target.value as string;
    setLocaleCookie(newLocale);
    window.location.reload(); // reload to apply new locale
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
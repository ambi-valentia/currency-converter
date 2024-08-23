export function getCountryCodeFromLocale(locale: string): string | null {
    const parts = locale.split('-');
    return parts.length > 1 ? parts[1].toUpperCase() : null;
  }
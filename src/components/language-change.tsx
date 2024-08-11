"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import ReactCountryFlag from "react-country-flag";

export function LanguageChange() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const newLocale = locale === "en" ? "tr" : "en";
    const newPathname = pathname.replace(
      new RegExp(`^/${locale}`),
      `/${newLocale}`
    );
    router.push(newPathname);
  };

  return (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      className="px-2"
      onClick={switchLocale}
    >
      {locale && (
        <ReactCountryFlag countryCode={locale === "en" ? "TR" : "US"} svg />
      )}
    </Button>
  );
}

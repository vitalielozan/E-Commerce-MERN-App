import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from '@heroui/react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher({ className = '' }) {
  const { i18n, t } = useTranslation();
  const language = ['en', 'de', 'ro'].includes(i18n.language)
    ? i18n.language
    : 'en';

  const languageLabelMap = {
    en: 'English',
    de: 'Deutsch',
    ro: 'Română'
  };

  const handleLanguageChange = (selected) => {
    if (selected instanceof Set) {
      const selectedLang = Array.from(selected)[0];
      i18n.changeLanguage(String(selectedLang));
    }
  };

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button className={`capitalize ${className}`} variant="bordered">
          {languageLabelMap[language]}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label={t('nav.language')}
        selectedKeys={new Set([language])}
        selectionMode="single"
        className="bg-transparent!"
        onSelectionChange={handleLanguageChange}
      >
        <DropdownItem key="en">English</DropdownItem>
        <DropdownItem key="de">Deutsch</DropdownItem>
        <DropdownItem key="ro">Română</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default LanguageSwitcher;

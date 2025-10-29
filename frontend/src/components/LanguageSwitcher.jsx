import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";

function LanguageSwitcher({ className = "" }) {
  const [language, setLanguage] = useState("English");

  const handleLanguageChange = (selected) => {
    if (selected instanceof Set) {
      const selectedLang = Array.from(selected)[0];
      setLanguage(String(selectedLang));
    }
  };

  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button className={`capitalize ${className}`} variant="bordered">
          {language}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Language selector"
        selectedKeys={language}
        selectionMode="single"
        className="!bg-transparent"
        onSelectionChange={handleLanguageChange}
      >
        <DropdownItem key="English">English</DropdownItem>
        <DropdownItem key="Deutsch">Deutsch</DropdownItem>
        <DropdownItem key="Română">Română</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default LanguageSwitcher;

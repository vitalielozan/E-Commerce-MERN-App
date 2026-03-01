import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from '@heroui/react';
import { useTranslation } from 'react-i18next';

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery('');
    }
  };

  return (
    <Form
      className="flex w-full max-w-xs flex-row gap-2"
      onSubmit={handleSearch}
    >
      <Input
        type="text"
        placeholder={t('nav.searchPlaceholder')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-xs"
        classNames={{
          inputWrapper:
            'h-10 rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900'
        }}
      />
      <Button
        type="submit"
        radius="md"
        className="h-10 rounded-xl bg-sky-600 px-4 text-white transition-colors hover:bg-sky-700"
      >
        {t('nav.searchGo')}
      </Button>
    </Form>
  );
}

export default SearchBar;

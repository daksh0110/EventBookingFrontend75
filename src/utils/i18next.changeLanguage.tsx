import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
 const navigate = useNavigate();

  const handleLanguage = (lng: string) => {
    i18n.changeLanguage(lng); // Change language in i18next
    localStorage.setItem("language", lng); // Save the selected language in localStorage
    navigate("/");
    // Update the current language state
  };

  return (
    <div>
      <button onClick={() => handleLanguage('en')}>{t('English')}</button>
      <button onClick={() => handleLanguage('hindi')}>{t('हिंदी')}</button>
    </div>
  );
};

export default LanguageSwitcher;

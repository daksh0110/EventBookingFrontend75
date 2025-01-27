import { useTranslation } from "react-i18next";
import Header from "../components/header/Header"
import LanguageSwitcher from "../utils/i18next.changeLanguage"


const ProfilePage = () => {
    const { t } = useTranslation();
  return (
    <>
    <Header />
   
    <h1>{t('Profile')}</h1>
      <LanguageSwitcher />
      
    </>
  )
}

export default ProfilePage
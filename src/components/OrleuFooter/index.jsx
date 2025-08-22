import React, { useState, useRef, useEffect } from 'react';
import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { useIntl, defineMessages } from '@edx/frontend-platform/i18n';
import defaultProfile from '../../assets/default_profile.png';
import defaultLogoWhite from '../../assets/orleu_logo_white.svg';
import nationalBankLogo from '../../assets/National_Bank_of_Kazakhstan_logo.svg.png';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import './OrleuFooter.scss';

const messages = defineMessages({
  profile: {
    id: 'header.menu.profile',
    defaultMessage: 'Profile',
    description: 'Link to user profile page in header menu',
  },
  account: {
    id: 'header.menu.account',
    defaultMessage: 'Account',
    description: 'Link to account settings page in header menu',
  },
  signOut: {
    id: 'header.menu.signOut',
    defaultMessage: 'Sign out',
    description: 'Link to log out from platform',
  },
});

const OrleuFooter = () => {
  const intl = useIntl();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);

  console.log(getConfig());

  const LMS_BASE_URL = getConfig().LMS_BASE_URL;
  const LOGOUT_URL = getConfig().LOGOUT_URL;
  const ACCOUNT_PROFILE_URL = `${getConfig().ACCOUNT_PROFILE_URL}/u/${currentUser}`;
  const ACCOUNT_SETTINGS_URL = getConfig().ACCOUNT_SETTINGS_URL;

  async function getCurrentUser() {
    const httpClient = getAuthenticatedHttpClient();
    const response = await httpClient.get(`${getConfig().LMS_BASE_URL}/api/user/v1/me`);
    console.log(response.data);
    setCurrentUser(response.data.username);
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    getCurrentUser();
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
         <footer className="footer py-4 bg-dark text-white">
      <div className="container-fluid">
                 <div className="row align-items-center">
           <div className="text-center mb-3 d-flex justify-content-center gap-3 w-100" style={{ gap: '16px' }}>
             <img 
               src={nationalBankLogo} 
               alt="Orleu Logo" 
               className="img-fluid"
               style={{ maxHeight: '40px' }}
             />
             <img 
               src={defaultLogoWhite} 
               alt="Orleu Logo" 
               className="img-fluid"
               style={{ maxHeight: '40px' }}
             />
           </div>
         </div>
        <hr className="my-3 bg-secondary" />
        <div className="row">
          <div className="col-12 text-center">
            <small className="text-muted">&copy; 2024 Orleu. All rights reserved.</small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default OrleuFooter;

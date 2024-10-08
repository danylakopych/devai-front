import React from 'react';
import logo from '@/app/assets/logo.png';
import Image from 'next/image';
import styles from "./logo.module.css";

const Logo: React.FC = () => {
  return (
    <div>
      <Image
        src={logo}
        alt="Logo"
        className={styles.logo}
      />
    </div>
  );
};

export default Logo;

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Phone, ExternalLink } from "lucide-react";
import styles from "./StoreProfile.module.scss";

interface StoreInfo {
  name: string;
  logo: string;
  address: string;
  hours: string;
  phones: string[];
  totalListings: number;
}

interface StoreProfileProps {
  storeInfo: StoreInfo;
}

const StoreProfile: React.FC<StoreProfileProps> = ({ storeInfo }) => {
  const handlePhoneClick = (phone: string) => {
    // Remove spaces and format for tel: link
    const cleanPhone = phone.replace(/\s/g, "");
    window.location.href = `tel:${cleanPhone}`;
  };

  return (
    <div className={styles.storeProfile}>
      <div className={styles.profileInfo}>
        {/* Store Header */}
        <div className={styles.store}>
          <div className={styles.storeLogo}>
            <Image
              src={storeInfo.logo}
              alt={`${storeInfo.name} loqosu`}
              width={40}
              height={40}
              className={styles.logoImage}
            />
          </div>
          <div className={styles.storeHeader}>
            <p className={styles.storeName}>{storeInfo.name}</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className={styles.contactInfo}>
          {/* Address */}
          <p className={styles.profileContact}>
            <MapPin size={16} className={styles.contactIcon} />
            {storeInfo.address}
          </p>

          {/* Hours */}
          <p className={styles.profileContact}>
            <Clock size={16} className={styles.contactIcon} />
            {storeInfo.hours}
          </p>

          {/* Phone Numbers */}
          <p className={styles.profileContact}>
            <Phone size={16} className={styles.contactIcon} />
            {storeInfo.phones.map((phone, index) => (
              <span key={phone}>
                <button
                  className={styles.phoneButton}
                  onClick={() => handlePhoneClick(phone)}
                  aria-label={`${phone} nömrəsinə zəng et`}
                >
                  {phone}
                </button>
                {index < storeInfo.phones.length - 1 && (
                  <span className={styles.phoneSeparator}>&nbsp;;&nbsp;</span>
                )}
              </span>
            ))}
          </p>
        </div>

        {/* Store Listings Link */}
        <Link href="#" className={styles.profilePosts}>
          <span>Mağazanın bütün elanları ({storeInfo.totalListings} elan)</span>
          <ExternalLink size={14} className={styles.linkIcon} />
        </Link>
      </div>
    </div>
  );
};

export default StoreProfile;

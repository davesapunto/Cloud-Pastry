/* src/components/DashboardHeader.tsx */

import React from 'react';
import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import './DashboardHeader.css'; // Import styles if needed

interface Props {
  pageTitle: string; // Prop to pass the page title
}

const DashboardHeader: React.FC<Props> = ({ pageTitle }) => {
  return (
    <div className="DashboardScreen-header">
      <h1 className="DashboardScreen-title">{pageTitle}</h1> {/* Use the pageTitle prop */}
      <div className="DashboardScreen-user-profile">
        <Link href="/DashboardProfile" className="DashboardScreen-user-profile"><FaUser size={24} /></Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
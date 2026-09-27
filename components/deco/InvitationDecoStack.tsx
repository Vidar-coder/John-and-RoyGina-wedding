'use client';

import React from 'react';
import './invitation-deco-stack.css';

type InvitationDecoStackProps = {
  coupleAlt: string;
  className?: string;
};

export function InvitationDecoStack({ coupleAlt, className = '' }: InvitationDecoStackProps) {
  return (
    <div className={`invitation-deco-stack ${className}`.trim()}>
      <img
        src="/deco/monogram.png"
        alt=""
        aria-hidden
        className="invitation-deco-monogram"
      />
      <img
        src="/deco/save-the-date.png"
        alt="Save the Date"
        className="invitation-deco-save-the-date"
      />
      <div className="invitation-deco-couple-wrap">
        <img
          src="/deco/couple-name.png"
          alt={coupleAlt}
          className="invitation-deco-couple-name object-center"
        />
      </div>
      <div className="invitation-deco-details">
        <img
          src="/deco/date.png"
          alt="Wedding date and time"
          className="invitation-deco-date"
        />
        <img
          src="/deco/ceremony-location.png"
          alt="Ceremony location"
          className="invitation-deco-location"
        />
      </div>
    </div>
  );
}

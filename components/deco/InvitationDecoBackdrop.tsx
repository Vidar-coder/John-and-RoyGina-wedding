'use client';

import React from 'react';
import './invitation-deco-stack.css';

export function InvitationDecoBackdrop() {
  return (
    <>
      <div className="invitation-deco-bg" aria-hidden />
      <img
        src="/deco/left-top-corner.png"
        alt=""
        aria-hidden
        className="invitation-deco-corner invitation-deco-corner--tl"
      />
      <img
        src="/deco/right-bottom-corner.png"
        alt=""
        aria-hidden
        className="invitation-deco-corner invitation-deco-corner--br"
      />
    </>
  );
}

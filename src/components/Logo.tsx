import React from 'react';
// @ts-ignore
import logoImg from '../../assets/logo.jpg';

interface LogoProps {
  className?: string;
  size?: number; // width and height in px
}

export default function Logo({ className = '', size = 48 }: LogoProps) {
  return (
    <img
      src={logoImg}
      alt="KD AC | Super Cool Projects Logo"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={`inline-block shrink-0 select-none object-contain rounded-full bg-slate-950 ${className}`}
      id="kd-ac-brand-logo"
      referrerPolicy="no-referrer"
    />
  );
}

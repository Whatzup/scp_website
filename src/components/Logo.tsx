import React from 'react';
// @ts-ignore
import logoImg from '../assets/logo.jpeg';

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
      className={`inline-block shrink-0 select-none object-cover rounded-full border-2 border-[#1960a3]/30 bg-[#000a18] shadow-[0_0_15px_rgba(56,189,248,0.15)] ${className}`}
      id="kd-ac-brand-logo"
    />
  );
}




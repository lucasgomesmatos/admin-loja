'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type NavLinkProps = LinkProps & {
  children: React.ReactNode;
};

export const NavLink = ({ children, ...props }: NavLinkProps) => {
  const pathname = usePathname();
  const current = pathname === props.href;

  return (
    <Link
      data-current={current}
      className="flex data-[current=true]:bg-gray-100 items-center gap-3 rounded-lg px-3 py-2 text-gray-800 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      {...props}
    >
      {children}
    </Link>
  );
};

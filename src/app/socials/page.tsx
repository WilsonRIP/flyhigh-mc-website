'use client';

import { useState } from 'react';
import Image from 'next/image';
import Button from '../components/Button';
import { motion } from 'framer-motion';
import { Saira } from 'next/font/google';
import { socialLinks } from '../data/Socials';
import type { SocialLink } from '../data/Socials';

const saira = Saira({
  weight: '400',
  subsets: ['latin'],
});

export default function SocialsPage() {
  const [links] = useState<SocialLink[]>(socialLinks);

  return (
    <div className={`${saira.className} container mx-auto py-10 px-4`}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6 text-center"
      >
        Connect with FlyHighMC
      </motion.h1>

      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {links.map(({ name, icon, url }) => (
          <motion.li
            key={name}
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-4 p-4 bg-blue-900 rounded-lg shadow hover:bg-red-900/80 transition"
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 w-full"
            >
              {/* Replace the raw path with a real image */}
              <img
                src={icon}
                alt={`${name} icon`}
                width={32}
                height={32}
                className="flex-shrink-0"
              />

              {/* If you prefer Next.js Image for optimization: */}
              {/*
              <Image
                src={icon}
                alt={`${name} icon`}
                width={32}
                height={32}
                className="flex-shrink-0"
              />
              */}

              <span className="text-xl font-medium">{name}</span>
            </a>
          </motion.li>
        ))}
      </motion.ul>

      <div className="mt-8 text-center">
        <Button href="/">Back to Home</Button>
      </div>
    </div>
  );
}

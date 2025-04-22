'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Saira } from 'next/font/google'
import { TeamMember, teamMembers } from '../data/team'

const saira = Saira({
  weight: '400',
  subsets: ['latin'],
})

function Avatar({ member }: { member: TeamMember }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm"
    >
      <div className="relative w-32 h-32 mb-4 overflow-hidden rounded-full border-2 border-green-400">
        <Image
          src={member.avatar}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>
      <h3 className={`${saira.className} text-2xl font-bold text-white`}>
        {member.name}
      </h3>
      <p className="text-green-400 mb-2">{member.role}</p>
      <p className="text-gray-300 text-center italic">"{member.quote}"</p>
    </motion.div>
  )
}

export default function TeamPage() {
  return (
    <div className="min-h-screen py-24 px-4">
      <div className="container mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${saira.className} text-4xl md:text-5xl font-bold text-center mb-12 text-white`}
        >
          Meet Our Team
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Avatar key={member.name} member={member} />
          ))}
        </div>
      </div>
    </div>
  )
}

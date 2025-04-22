'use client';

import { motion } from 'framer-motion';
import { Archivo } from 'next/font/google';
import { minecraftRules, discordRules, RuleSet } from '../data/rules';

const archivo = Archivo({
  weight: '400',
  subsets: ['latin'],
});

// Reusable component to render a set of rules
function RulesSection({ ruleSet }: { ruleSet: RuleSet }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-800/70 backdrop-blur-sm rounded-lg p-6 mb-8 shadow-lg"
    >
      <h2 className={`${archivo.className} text-2xl font-bold mb-4 text-green-300`}>
        {ruleSet.title}
      </h2>
      <ul className="space-y-3 list-disc list-inside text-gray-200">
        {ruleSet.rules.map((rule, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: rule.replace(/\*\*(.*?)\*\*/g, '<strong class="text-green-400">$1</strong>') }}></li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function RulesPage() {
  return (
    <section className="container mx-auto py-16 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${archivo.className} text-4xl font-bold mb-12 text-center text-white`}
      >
        Server & Community Rules
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8">
        <RulesSection ruleSet={minecraftRules} />
        <RulesSection ruleSet={discordRules} />
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className={`${archivo.className} text-center text-gray-400 mt-12`}
      >
        Please adhere to these rules to ensure a positive experience for everyone. Failure to comply may result in disciplinary actions.
      </motion.p>
    </section>
  );
}

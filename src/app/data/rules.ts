export interface RuleSet {
  title: string;
  rules: string[];
}

export const minecraftRules: RuleSet = {
  title: 'Minecraft Server Rules',
  rules: [
    '**Respect All Players:** Treat others with respect. Harassment, bullying, or hate speech will result in disciplinary action.',
    '**No Griefing or Stealing:** Do not destroy or steal other players’ builds or resources. Respect all property on the server.',
    '**No Cheating or Exploiting:** Use of hacks, mods that provide unfair advantages, or exploitation of bugs/glitches is strictly prohibited.',
    '**Keep the Chat Friendly:** Maintain a friendly and inclusive atmosphere in chat. Avoid offensive language and spam.',
    '**Follow Admin Instructions:** Listen to and follow the directions of the server’s administrators and moderators.',
    '**Appropriate Skins and Mods:** Use skins and mods that are appropriate for all ages and do not disrupt the gameplay experience of others.',
    '**No Advertising Other Servers:** Do not advertise or promote other Minecraft servers or related content without permission from the server admins.',
    '**Report Rule Violations:** If you notice any rule violations or issues, please report them to a moderator or admin immediately.',
  ],
};

export const discordRules: RuleSet = {
  title: 'Discord Server Rules',
  rules: [
    '**Be Respectful:** Treat everyone with respect. Harassment, hate speech, or any form of bullying will not be tolerated.',
    '**Keep It Clean:** Use appropriate language in all channels. No explicit, NSFW, or offensive content.',
    '**No Spamming or Advertising:** Avoid spam, excessive self-promotion, or sharing irrelevant links without permission. Advertising other servers or content should only be done in designated channels, if any.',
    '**Follow Discord’s Terms of Service:** Ensure all activities comply with Discord’s official guidelines and community standards.',
    '**Channel-Specific Guidelines:** Respect the purpose of each channel. Post content in the appropriate channels as defined by the server’s organization.',
    '**No Impersonation:** Do not impersonate other members, moderators, or administrators.',
    '**Privacy and Safety:** Do not share personal information of yourself or others without consent.',
    '**Moderation Decisions:** Follow moderator instructions. If you disagree with a decision, address it privately and respectfully.',
    '**Report Issues:** If you witness rule violations, report them to the moderation team rather than engaging in public disputes.',
  ],
};

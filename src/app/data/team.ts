// team.ts
export interface TeamMember {
    id: string
    name: string
    role: string
    quote: string
    avatar: string
  }
  
  export const teamMembers: TeamMember[] = [
    {
      id: 'wilson',
      name: 'Wilson',
      role: 'Founder & Lead Developer',
      quote: 'Building experiences that bring people together.',
      avatar: '/team/wilson.png',
    },
  ]
  
  // utility functions in the same file to avoid import errors
  export const getTeamMember = (id: string): TeamMember | undefined => 
    teamMembers.find(member => member.id === id)
  
  export const getTeamMemberByName = (name: string): TeamMember | undefined => 
    teamMembers.find(member => member.name.toLowerCase() === name.toLowerCase())
  
  export const getAllTeamMembers = (): TeamMember[] => teamMembers
  
  export const getRoleMembers = (role: string): TeamMember[] =>
    teamMembers.filter(member => member.role.toLowerCase().includes(role.toLowerCase()))
import { createContext, useContext, useState, ReactNode } from 'react';
import { Team, User, UserRole } from '../models';

// Takım ve Kullanıcıların Scheması
type TeamContextType = {
  teams: Team[];
  users: User[];
  addTeam: (team: { name: string }) => void;
  addUser: (user: {
    name: string;
    teamId: string;
    role: UserRole
  }) => void;
  removeTeam: (id: string) => void;
  removeUser: (id: string) => void;
}

// Context oluşturma ve verileri saklama
const TeamContext = createContext<TeamContextType | undefined>(undefined);

export function TeamProvider({ children }: { children: ReactNode }) {
  const [teams, setTeams] = useState<Team[]>([]); // Takımların listesi
  const [users, setUsers] = useState<User[]>([]); // Kullanıcıların listesi

  const addTeam = (team: { name: string }) => {
    const newTeam = { ...team, id: crypto.randomUUID() };
    setTeams(prevTeams => [...prevTeams, newTeam]);
  };

  const addUser = (user: {
    name: string;
    teamId: string;
    role: UserRole
  }) => {
    const newUser = { ...user, id: crypto.randomUUID() };
    setUsers(prevUsers => [...prevUsers, newUser as User]);
  };

  const removeTeam = (id: string) => {
    setTeams(prevTeams => prevTeams.filter(team => team.id !== id));
    setUsers(prevUsers => prevUsers.filter(user => user.teamId !== id));
  };

  const removeUser = (id: string) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
  };

  return (
    <TeamContext.Provider value={{ 
      teams,
      users,
      addTeam,
      addUser,
      removeTeam,
      removeUser
    }}>
      {children}
    </TeamContext.Provider>
  );
}


export function useTeamContext(): TeamContextType {
  const context = useContext(TeamContext);
  
  if (!context) {
    throw new Error('useTeamContext must be used within a TeamProvider');
  }
  
  return context;
}
import { useState } from 'react';
import { Team, User } from '../models';
import { Modal } from './Modal';
import { UserForm } from './UserForm';
import { useNavigate } from 'react-router-dom';

const CARD_COLORS = [
  '#FF9F40',
  '#FF6B6B',
  '#FFD93D',
  '#4CAF50',
  '#45B7D1',
  '#4A90E2',
  '#9B59B6'
];

type TeamCardProps = {
  team: Team;
  users: User[];
  index: number;
}

export function TeamCard({ team, users, index }: TeamCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const teamUsers = users.filter(user => user.teamId === team.id);
  const navigate = useNavigate();
  
  //kullanıcı adlarının baş harfini alma
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  const cardColor = CARD_COLORS[index % CARD_COLORS.length];

  // ekipten sadece 5 kişinin gösterimi
  const displayedUsers = teamUsers.slice(0, 5);
  const remainingCount = teamUsers.length - 5;

  return (
    <>
      <div className="team-card" style={{ backgroundColor: cardColor }}>
        <div className="team-header">
          <h3>{team.name}</h3>
          <button 
            className={`menu-button ${isExpanded ? 'expanded' : ''}`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            ⋮
          </button>
        </div>
        <div className="team-users">
          {displayedUsers.map((user) => (
            <div key={user.id} className="user-circle" title={user.name}>
              {getInitials(user.name)}
            </div>
          ))}
          {remainingCount > 0 && (
            <div className="user-circle remaining-count">
              +{remainingCount}
            </div>
          )}
        </div>
        
        {isExpanded && (
          <div className="team-actions">
            <button 
              className="action-button add-user"
              onClick={() => setIsUserFormOpen(true)}
              title="Kullanıcı Ekle"
            >
              Kullanıcı Ekle
            </button>
            <button 
              className="action-button inspect"
              onClick={() => navigate(`/teams/${team.id}`)}
              title="Ekibi İncele"
            >
              İncele
            </button>
          </div>
        )}
      </div>

      <Modal
        isOpen={isUserFormOpen}
        onClose={() => setIsUserFormOpen(false)}
        title="Kullanıcı Ekle"
      >
        <UserForm 
          teamId={team.id} 
          onSuccess={() => setIsUserFormOpen(false)}
        />
      </Modal>
    </>
  );
} 
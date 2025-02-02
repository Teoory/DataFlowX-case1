import { useParams, Navigate } from 'react-router-dom';
import { useTeamContext } from '../hooks/TeamContext';
import { UserRole, Team, User } from '../models';
import { useState } from 'react';
import { Modal } from '../components/Modal';
import { UserForm } from '../components/UserForm';
import { DiagramView } from '../components/DiagramView';
import { Breadcrumbs } from '../components/Breadcrumbs';
import 'reactflow/dist/style.css';

export function TeamDetailsPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const { teams, users } = useTeamContext();
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  
  if (!teamId) {
    return <Navigate to="/" />;
  }

  const team = teams.find((t: Team) => t.id === teamId);
  const teamUsers = users.filter((user: User) => user.teamId === teamId);

  if (!team) return null;

  const getRoleName = (role: UserRole): string => {
    switch (role) {
      case UserRole.LEADER:
        return 'Takım Lideri';
      case UserRole.SENIOR:
        return 'Kıdemli Üye';
      case UserRole.MEMBER:
        return 'Üye';
      case UserRole.JUNIOR:
        return 'Stajyer';
      default:
        return role;
    }
  };

  return (
    <div className="app">
      <div className="content">
        <div className="team-details">
          <Breadcrumbs />
          <div className="team-details-header">
            <div className="section-header">
              <h2>Ekip Üyeleri</h2>
              <button 
                className="new-team-button"
                onClick={() => setIsUserFormOpen(true)}
              >
                Yeni Kullanıcı Ekle
              </button>
            </div>
          </div>

          <div className="members-list">
            {Object.values(UserRole).map(role => {
              const usersWithRole = teamUsers.filter(user => user.role === role);
              if (usersWithRole.length === 0) return null;
            
              return (
                <div key={role} className="role-group">
                  <div className="role-members">
                    {usersWithRole.map((user: User) => (
                      <div key={user.id} className="member-card" data-role={user.role}>
                        <div className="member-name">
                          {user.name}
                        </div>
                        <div className="member-role">
                          {getRoleName(user.role)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <section className="team-diagram">
            <h3>Ekip Diyagramı</h3>
            <div style={{ height: '500px' }}>
              <DiagramView teamId={teamId} />
            </div>
          </section>

          <Modal
            isOpen={isUserFormOpen}
            onClose={() => setIsUserFormOpen(false)}
            title="Yeni Kullanıcı Ekle"
          >
            <UserForm 
              teamId={teamId} 
              onSuccess={() => setIsUserFormOpen(false)}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
}
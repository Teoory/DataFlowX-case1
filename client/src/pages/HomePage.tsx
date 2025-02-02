import { useState } from 'react';
import { TeamForm } from '../components/TeamForm';
import { DiagramView } from '../components/DiagramView';
import { ChartsView } from '../components/ChartsView';
import { Modal } from '../components/Modal';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useTeamContext } from '../hooks/TeamContext';
import { TeamCard } from '../components/TeamCard';
import { Team } from '../models';

export function HomePage() {
  const [isTeamFormOpen, setIsTeamFormOpen] = useState(false);
  const { teams, users } = useTeamContext();

  return (
    <div className="app">
      <Breadcrumbs />
      <main>
        <section className="teams-section">
          <div className="section-header">
            <h2>Ekipler</h2>
            <button 
              className="new-team-button"
              onClick={() => setIsTeamFormOpen(true)}
            >
              Yeni Ekip Oluştur
            </button>
          </div>
          
          <div className="teams-grid">
            {teams.map((team: Team, index: number) => (
              <TeamCard key={team.id} team={team} users={users} index={index} />
            ))}
          </div>
        </section>
        
        <section className="diagram-section">
          <h2>Organizasyon Diyagramı</h2>
          <DiagramView />
        </section>
        
        <section className="stats-section">
          <h2>İstatistikler</h2>
          <ChartsView />
        </section>
      </main>
      
      <Modal
        isOpen={isTeamFormOpen}
        onClose={() => setIsTeamFormOpen(false)}
        title="Yeni Ekip Oluştur"
      >
        <TeamForm onSuccess={() => setIsTeamFormOpen(false)} />
      </Modal>
    </div>
  );
} 
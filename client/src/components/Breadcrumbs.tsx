import { Link, useLocation } from 'react-router-dom';
import { useTeamContext } from '../hooks/TeamContext';

export function Breadcrumbs() {
  const location = useLocation();
  const { teams } = useTeamContext();
  
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  if (pathSegments.length === 0) {
    return (
      <nav className="breadcrumbs">
        <span className="breadcrumb-link-default" style={{color: '#333', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'default'}}>Ana Sayfa</span>
      </nav>
    );
  }

  const teamId = pathSegments[pathSegments.length - 1];
  const team = teams.find(t => t.id === teamId);

  if (!team) {
    return null;
  }

  return (
    <nav className="breadcrumbs">
      <Link to="/" className="breadcrumb-link">Ana Sayfa</Link>
      <span className="breadcrumb-separator">/</span>
      <span className="breadcrumb-link-default">{team.name}</span>
    </nav>
  );
} 
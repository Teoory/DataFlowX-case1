import { useState } from 'react';
import { useTeamContext } from '../hooks/TeamContext';

type TeamFormProps = {
  onSuccess?: () => void;
}

export function TeamForm({ onSuccess }: TeamFormProps) {
  const [name, setName] = useState('');
  const { addTeam } = useTeamContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addTeam({ name });
      setName('');
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="team-name">Ekip Adı</label>
        <input
          id="team-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ekip adı"
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit">Ekip Oluştur</button>
      </div>
    </form>
  );
} 
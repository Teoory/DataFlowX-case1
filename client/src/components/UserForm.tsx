import { useState } from 'react';
import { useTeamContext } from '../hooks/TeamContext';
import { UserRole } from '../models';

type UserFormProps = {
  teamId: string;
  onSuccess?: () => void;
}

export function UserForm({ teamId, onSuccess }: UserFormProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.MEMBER);
  const { addUser } = useTeamContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addUser({ name, teamId, role });
      setName('');
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="user-name">Ad Soyad</label>
        <input
          id="user-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ad Soyad"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="user-role">Rol</label>
        <select
          id="user-role"
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
          required
        >
          <option value={UserRole.LEADER}>Takım Lideri</option>
          <option value={UserRole.SENIOR}>Kıdemli Üye</option>
          <option value={UserRole.MEMBER}>Üye</option>
          <option value={UserRole.JUNIOR}>Stajyer</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit">Kullanıcı Ekle</button>
      </div>
    </form>
  );
} 
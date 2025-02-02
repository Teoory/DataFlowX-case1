import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from 'recharts';
import { useTeamContext } from '../hooks/TeamContext';

export function ChartsView() {
  const { teams, users } = useTeamContext();

  const teamStats = teams.map(team => ({
    name: team.name,
    value: users.filter(user => user.teamId === team.id).length
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="charts-container">
      <div className="chart">
        <h3>Ekip Dağılımı (Pie Chart)</h3>
        <PieChart width={400} height={400}>
          <Pie
            data={teamStats}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {teamStats.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <div className="chart">
        <h3>Ekip Dağılımı (Bar Chart)</h3>
        <BarChart width={400} height={400} data={teamStats}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
} 
import { useTeamContext } from '../hooks/TeamContext';
import { UserRole } from '../models';
import ReactFlow, { 
  Node, 
  Edge,
  Background,
  Controls,
  NodeChange,
  applyNodeChanges
} from 'reactflow';
import { useState, useEffect } from 'react';
import 'reactflow/dist/style.css';

const GROUP_COLORS = [
  '#FFE4E1',
  '#E0FFFF',
  '#F0FFF0',
  '#FFF0F5',
];

type GroupPosition = {
  x: number;
  y: number;
}

type ContextMenuType = {
  x: number;
  y: number;
  teamId?: string;
  userId?: string;
  isVisible: boolean;
  type: 'team' | 'user';
}

type DiagramViewProps = {
  teamId?: string;
}

export function DiagramView({ teamId }: DiagramViewProps) {
  const { teams, users, removeUser } = useTeamContext();
  const [currentNodes, setCurrentNodes] = useState<Node[]>([]);
  const [currentEdges, setCurrentEdges] = useState<Edge[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({});
  const [groupPositions, setGroupPositions] = useState<{ [key: string]: GroupPosition }>({});
  const [contextMenu, setContextMenu] = useState<ContextMenuType | null>(null);

  const toggleGroupExpand = (teamId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [teamId]: !prev[teamId]
    }));
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

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

  // Başlangıç pozisyonu
  useEffect(() => {
    const positions: { [key: string]: GroupPosition } = {};
    teams.forEach((team, index) => {
      positions[team.id] = {
        x: index * 800,
        y: 0
      };
    });
    setGroupPositions(positions);
  }, [teams]);

  const onNodesChange = (changes: NodeChange[]) => {
    setCurrentNodes(nodes => {
      const updatedNodes = applyNodeChanges(changes, nodes);

      changes.forEach(change => {
        if (change.type === 'position' && change.position) {
          const nodeId = change.id;
          const teamId = nodeId.includes('group-') ? nodeId.replace('group-', '') : null;
          if (teamId) {
            setGroupPositions(prev => ({
              ...prev,
              [teamId]: {
                x: change.position!.x,
                y: change.position!.y
              }
            }));
          }
        }
      });
      
      return updatedNodes;
    });
  };

  const handleContextMenu = (event: React.MouseEvent, node: Node) => {
    event.preventDefault();
    
    if (node.id.startsWith('group-') || node.id.startsWith('group-title-')) {
      const teamId = node.id.replace(/^(group-title-|group-)/, '');
      if (!teams.some(team => team.id === teamId)) return;

      setContextMenu({
        x: event.clientX,
        y: event.clientY,
        teamId,
        isVisible: true,
        type: 'team'
      });
    } else {
      const user = users.find(u => u.id === node.id);
      if (!user) return;

      setContextMenu({
        x: event.clientX,
        y: event.clientY,
        userId: user.id,
        teamId: user.teamId,
        isVisible: true,
        type: 'user'
      });
    }
  };

  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const teamsToShow = teamId ? teams.filter(t => t.id === teamId) : teams;

    teamsToShow.forEach((team) => {
      const teamUsers = users.filter(user => user.teamId === team.id);
      const position = groupPositions[team.id] || { x: 0, y: 0 };
      const isExpanded = expandedGroups[team.id] !== false;
      const groupColor = GROUP_COLORS[teams.indexOf(team) % GROUP_COLORS.length];

      if (!isExpanded) {
        // Küçük Grup Görünümü
        nodes.push({
          id: `group-${team.id}`,
          data: {
            label: (
              <div style={{
                width: '200px',
                backgroundColor: groupColor,
                borderRadius: '8px',
                padding: '12px',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <span style={{ fontWeight: 'bold' }}>{team.name}</span>
                  <button
                    onClick={() => toggleGroupExpand(team.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#333' }}
                  >
                    ⊕
                  </button>
                </div>
                
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                    Takım Lideri
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {teamUsers
                      .filter(u => u.role === UserRole.LEADER)
                      .map(u => (
                        <div
                          key={u.id}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            color: '#333'
                          }}
                        >
                          {getInitials(u.name)}
                        </div>
                      ))}
                  </div>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                    Kıdemli Üye
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {teamUsers
                      .filter(u => u.role === UserRole.SENIOR)
                      .map(u => (
                        <div
                          key={u.id}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            color: '#333'
                          }}
                        >
                          {getInitials(u.name)}
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                    Üye
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {teamUsers
                      .filter(u => u.role === UserRole.MEMBER)
                      .slice(0, 3)
                      .map(u => (
                        <div
                          key={u.id}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            color: '#333'
                          }}
                        >
                          {getInitials(u.name)}
                        </div>
                      ))}
                    {teamUsers.filter(u => u.role === UserRole.MEMBER).length > 3 && (
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 255, 255, 0.7)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          color: '#333'
                        }}
                      >
                        +{teamUsers.filter(u => u.role === UserRole.MEMBER).length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          },
          position: { x: position.x, y: position.y },
          draggable: true,
        });
      } else {
        // Büyük Grup Görünümü
        nodes.push({
          id: `group-title-${team.id}`,
          data: {
            label: (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 16px',
                backgroundColor: groupColor,
                borderRadius: '4px',
                width: '200px'
              }}>
                <span>{team.name}</span>
                <button
                  onClick={() => toggleGroupExpand(team.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#333' }}
                >
                  ⊖
                </button>
              </div>
            )
          },
          position: { x: position.x + 150, y: position.y },
          draggable: true,
        });

        const leader = teamUsers.find(user => user.role === UserRole.LEADER);
        if (leader) {
          nodes.push({
            id: leader.id,
            data: {
              label: (
                <div className={`user-node leader`}>
                  <div className="user-circle">{getInitials(leader.name)}</div>
                  <div className="user-info">
                    <div className="user-name">{leader.name}</div>
                    <div className="user-role">{getRoleName(leader.role)}</div>
                  </div>
                </div>
              )
            },
            position: { x: position.x + 150, y: position.y + 60 },
          });
        }

        const seniorUsers = teamUsers.filter(user => user.role === UserRole.SENIOR);
        seniorUsers.forEach((user, index) => {
          const xPos = position.x + 50 + (index * 200);
          nodes.push(createUserNode(user, xPos, position.y + 160));
          // Otomatik Lider Rolüne bağlantı
          if (leader) edges.push(createEdge(leader.id, user.id));
        });

        const memberUsers = teamUsers.filter(user => user.role === UserRole.MEMBER);
        memberUsers.forEach((user, index) => {
          const xPos = position.x + 50 + (index * 200);
          nodes.push(createUserNode(user, xPos, position.y + 260));
          // Otomatik Kıdemli Üye Rolüne bağlantı
          const seniors = seniorUsers;
          if (seniors.length > 0) {
            const nearestSenior = seniors[Math.min(index, seniors.length - 1)];
            edges.push(createEdge(nearestSenior.id, user.id));
          }
        });

        const juniorUsers = teamUsers.filter(user => user.role === UserRole.JUNIOR);
        juniorUsers.forEach((user, index) => {
          const xPos = position.x + 50 + (index * 200);
          nodes.push(createUserNode(user, xPos, position.y + 360));
          // Otomatik Üye Rolüne bağlantı
          const members = memberUsers;
          if (members.length > 0) {
            const nearestMember = members[Math.min(index, members.length - 1)];
            edges.push(createEdge(nearestMember.id, user.id));
          }
        });
      }
    });

    setCurrentNodes(nodes);
    setCurrentEdges(edges);
  }, [teams, users, expandedGroups, groupPositions, teamId]);

  const createUserNode = (user: any, x: number, y: number) => ({
    id: user.id,
    data: {
      label: (
        <div className={`user-node ${user.role.toLowerCase()}`}>
          <div className="user-circle">{getInitials(user.name)}</div>
          <div className="user-info">
            <div className="user-name">{user.name}</div>
            <div className="user-role">{getRoleName(user.role)}</div>
          </div>
        </div>
      )
    },
    position: { x, y },
  });

  const createEdge = (source: string, target: string) => ({
    id: `${source}-${target}`,
    source,
    target,
    type: 'smoothstep',
  });

  return (
    <div style={{ height: '600px' }}>
      <ReactFlow
        nodes={currentNodes}
        edges={currentEdges}
        onNodesChange={onNodesChange}
        onNodeContextMenu={handleContextMenu}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      {contextMenu && contextMenu.isVisible && (
        <div
          style={{
            position: 'fixed',
            top: contextMenu.y,
            left: contextMenu.x,
            backgroundColor: 'white',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            borderRadius: '4px',
            padding: '4px 0',
            zIndex: 1000
          }}
        >
          {contextMenu.type === 'team' ? (
            <button
              onClick={() => {
                toggleGroupExpand(contextMenu.teamId!);
                setContextMenu(null);
              }}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px 16px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                whiteSpace: 'nowrap',
                color: '#333'
              }}
            >
              {expandedGroups[contextMenu.teamId!] ? 'Küçült' : 'Genişlet'}
            </button>
          ) : (
            <button
              onClick={() => {
                if (window.confirm('Bu üyeyi ekipten silmek istediğinize emin misiniz?')) {
                  removeUser(contextMenu.userId!);
                }
                setContextMenu(null);
              }}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px 16px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                whiteSpace: 'nowrap',
                color: '#ff4444'
              }}
            >
              Üyeyi Sil
            </button>
          )}
        </div>
      )}
    </div>
  );
} 
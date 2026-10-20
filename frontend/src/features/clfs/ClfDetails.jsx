import { theme } from '../../config/theme.js';

export default function ClfDetails({ clf }) {
  if (!clf) return null;
  
  const renderCoreMember = (title, data) => {
    if (!data) return null;
    return (
      <div style={{ marginBottom: 16, padding: 12, background: theme.colors.background, borderRadius: 8 }}>
        <h5 style={{ margin: '0 0 8px', color: theme.colors.primary }}>{title}</h5>
        <p style={{ margin: '0 0 4px', fontSize: 13 }}><b>Name:</b> {data.name || '—'}</p>
        <p style={{ margin: '0 0 4px', fontSize: 13 }}><b>Mobile:</b> {data.mobile || '—'}</p>
        <p style={{ margin: '0 0 4px', fontSize: 13 }}><b>Address:</b> {data.address || '—'}</p>
        <p style={{ margin: '0 0 4px', fontSize: 13 }}><b>Bank A/c:</b> {data.bankDetails?.accountNumber || '—'}</p>
        <p style={{ margin: 0, fontSize: 13 }}><b>IFSC:</b> {data.bankDetails?.ifscCode || '—'}</p>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ background: theme.colors.surface, borderRadius: theme.radius.md, padding: 20 }}>
        <h3 style={{ margin: '0 0 16px', color: theme.colors.primary, borderBottom: `1px solid ${theme.colors.border}`, paddingBottom: 8 }}>Basic Info</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: 8, fontSize: 14 }}>
          <span style={{ color: theme.colors.muted }}>Name:</span> <span>{clf.name}</span>
          <span style={{ color: theme.colors.muted }}>Code:</span> <span>{clf.code}</span>
          <span style={{ color: theme.colors.muted }}>Village:</span> <span>{clf.village || '—'}</span>
        </div>
      </div>

      <div style={{ background: theme.colors.surface, borderRadius: theme.radius.md, padding: 20 }}>
        <h3 style={{ margin: '0 0 16px', color: theme.colors.primary, borderBottom: `1px solid ${theme.colors.border}`, paddingBottom: 8 }}>Core Members</h3>
        {renderCoreMember('अध्यक्ष (President)', clf.coreMembers?.president)}
        {renderCoreMember('सचिव (Secretary)', clf.coreMembers?.secretary)}
        {renderCoreMember('कोषाध्यक्ष (Treasurer)', clf.coreMembers?.treasurer)}
      </div>

      <div style={{ background: theme.colors.surface, borderRadius: theme.radius.md, padding: 20 }}>
        <h3 style={{ margin: '0 0 16px', color: theme.colors.primary, borderBottom: `1px solid ${theme.colors.border}`, paddingBottom: 8 }}>BOD Members</h3>
        {(!clf.bodMembers || clf.bodMembers.length === 0) ? (
          <p style={{ fontSize: 14, color: theme.colors.muted }}>No additional BOD members.</p>
        ) : (
          clf.bodMembers.map((m, i) => (
            <div key={i} style={{ marginBottom: 16, padding: 12, background: theme.colors.background, borderRadius: 8 }}>
              <h5 style={{ margin: '0 0 8px', color: theme.colors.primary }}>{m.name} ({m.designation})</h5>
              <p style={{ margin: '0 0 4px', fontSize: 13 }}><b>Mobile:</b> {m.mobile || '—'}</p>
              <p style={{ margin: '0 0 4px', fontSize: 13 }}><b>Address:</b> {m.address || '—'}</p>
              <p style={{ margin: '0 0 4px', fontSize: 13 }}><b>Bank A/c:</b> {m.bankDetails?.accountNumber || '—'}</p>
              <p style={{ margin: '0 0 4px', fontSize: 13 }}><b>IFSC:</b> {m.bankDetails?.ifscCode || '—'}</p>
              <p style={{ margin: 0, fontSize: 13 }}><b>Status:</b> {m.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
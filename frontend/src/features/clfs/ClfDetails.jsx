import { theme } from '../../config/theme.js';

export default function ClfDetails({ clf }) {
  if (!clf) return null;
  const rows = [
    ['Name', clf.name],
    ['Code', clf.code],
    ['Block', clf.blockId?.name],
    ['Village', clf.village],
    ['Location', clf.location],
    ['President', clf.president],
    ['Secretary', clf.secretary],
    ['Contact', clf.contact],
    ['Email', clf.email],
    ['Address', clf.address],
    ['Status', clf.status],
  ];

  return (
    <div style={{ background: theme.colors.surface, borderRadius: theme.radius.md, padding: 20 }}>
      {rows.map(([k, v]) => (
        <div
          key={k}
          style={{
            display: 'grid',
            gridTemplateColumns: '150px 1fr',
            padding: '8px 0',
            borderBottom: `1px solid ${theme.colors.border}`,
            fontSize: 14,
          }}
        >
          <span style={{ color: theme.colors.muted, fontWeight: 600 }}>{k}</span>
          <span style={{ color: theme.colors.text }}>{v || '—'}</span>
        </div>
      ))}
    </div>
  );
}
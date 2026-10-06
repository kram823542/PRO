import Button from '../../components/ui/Button.jsx';
import { theme } from '../../config/theme.js';

export default function ReportCard({ title, description, onDownload, icon }) {
  return (
    <div
      style={{
        background: theme.colors.surface,
        borderRadius: theme.radius.md,
        padding: 20,
        boxShadow: theme.shadow.sm,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div style={{ fontSize: 32 }}>{icon}</div>
      <h3 style={{ margin: 0, fontSize: 16 }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 13, color: theme.colors.muted }}>{description}</p>
      <Button onClick={onDownload}>Download</Button>
    </div>
  );
}
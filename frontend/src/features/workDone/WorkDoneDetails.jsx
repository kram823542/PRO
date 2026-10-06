import Badge from '../../components/ui/Badge.jsx';
import { theme } from '../../config/theme.js';

export default function WorkDoneDetails({ item }) {
  if (!item) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <b>Employee:</b> {item.employeeId?.name} ({item.employeeId?.employeeCode})
      </div>
      <div>
        <b>Date:</b> {item.date}
      </div>
      <div>
        <b>Description:</b>
        <p style={{ marginTop: 6 }}>{item.description}</p>
      </div>
      {item.imageUrl && (
        <img src={item.imageUrl} alt="work" style={{ maxWidth: '100%', borderRadius: 8 }} />
      )}
      <div>
        <b>Status:</b>{' '}
        <Badge
          variant={
            item.status === 'APPROVED'
              ? 'success'
              : item.status === 'REJECTED'
              ? 'danger'
              : 'warning'
          }
        >
          {item.status}
        </Badge>
      </div>
      {item.rejectionReason && (
        <div style={{ color: theme.colors.danger, fontSize: 13 }}>
          <b>Rejection Reason:</b> {item.rejectionReason}
        </div>
      )}
    </div>
  );
}
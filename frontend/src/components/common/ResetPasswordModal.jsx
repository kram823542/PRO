import { useEffect, useState } from 'react';
import Modal from '../ui/Modal.jsx';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import { theme } from '../../config/theme.js';

export default function ResetPasswordModal({
  open,
  onClose,
  entityName = '',
  entityLabel = 'user',
  onConfirm, // async (newPassword) => { username, ... }
}) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Reset state on open/close
  useEffect(() => {
    if (open) {
      setNewPassword('');
      setConfirmPassword('');
      setError('');
      setSuccess(false);
      setLoading(false);
    }
  }, [open]);

  const validate = () => {
    if (!newPassword || newPassword.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!/(?=.*[A-Za-z])(?=.*\d)/.test(newPassword)) {
      return 'Password must contain letters and numbers';
    }
    if (newPassword !== confirmPassword) {
      return 'Passwords do not match';
    }
    return null;
  };

  const handleReset = async () => {
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError('');
    setLoading(true);
    try {
      await onConfirm(newPassword);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={success ? 'Password Reset Successful' : `Reset Password — ${entityLabel}`}
    >
      {!success ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Set new password for <b>{entityName}</b>:
          </p>

          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Min 8 chars, letters + numbers"
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            required
          />

          {error && (
            <div
              style={{
                padding: 10,
                background: '#FEE2E2',
                color: theme.colors.danger,
                borderRadius: theme.radius.md,
                fontSize: 13,
              }}
            >
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
            <Button variant="ghost" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleReset} loading={loading}>
              Reset Password
            </Button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div
            style={{
              padding: 14,
              background: '#DCFCE7',
              color: theme.colors.success,
              borderRadius: theme.radius.md,
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            ✅ Password reset successful!
          </div>
          <p style={{ fontSize: 13, color: theme.colors.muted, margin: 0 }}>
            {entityName} अब नए password से login कर सकता है। उसे अगली बार login करते समय password change करने का prompt मिलेगा।
          </p>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
            <Button onClick={onClose}>Done</Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
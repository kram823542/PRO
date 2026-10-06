import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import { theme } from '../../config/theme.js';
import * as authApi from './auth.api.js';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await authApi.login(form);
      const { user, accessToken, refreshToken } = data.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      const redirects = {
        SUPER_ADMIN: '/super-admin',
        BPM: '/bpm',
        CLF: '/clf',
        EMPLOYEE: '/employee',
      };
      navigate(redirects[user.role] || '/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ textAlign: 'center', marginBottom: 4 }}>
        <h1 style={{ margin: 0, fontSize: 22, color: theme.colors.text }}>CLF Portal</h1>
        <p style={{ margin: '6px 0 0', fontSize: 13, color: theme.colors.muted }}>
          Sign in to continue
        </p>
      </div>

      <Input
        label="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Enter username"
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Enter password"
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

      <Button type="submit" loading={loading} size="lg">
        Login
      </Button>
    </form>
  );
}
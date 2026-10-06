import { useState } from 'react';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import * as api from './clfs.api.js';

export default function ClfForm({ onCreated }) {
  const [form, setForm] = useState({
    name: '',
    code: '',
    village: '',
    location: '',
    president: '',
    secretary: '',
    contact: '',
    email: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.createClf(form);
      onCreated?.(data.data.login);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Input label="CLF Name" name="name" value={form.name} onChange={handleChange} required />
      <Input label="CLF Code" name="code" value={form.code} onChange={handleChange} required />
      <Input label="Village" name="village" value={form.village} onChange={handleChange} />
      <Input label="Location" name="location" value={form.location} onChange={handleChange} />
      <Input label="President" name="president" value={form.president} onChange={handleChange} />
      <Input label="Secretary" name="secretary" value={form.secretary} onChange={handleChange} />
      <Input label="Contact" name="contact" value={form.contact} onChange={handleChange} />
      <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
      <Input label="Address" name="address" value={form.address} onChange={handleChange} />
      {error && <p style={{ color: 'red', fontSize: 13, margin: 0 }}>{error}</p>}
      <Button type="submit" loading={loading}>
        Create CLF
      </Button>
    </form>
  );
}
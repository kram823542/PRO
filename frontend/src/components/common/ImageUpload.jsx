import { useState } from 'react';
import { theme } from '../../config/theme.js';

export default function ImageUpload({ label = 'Upload Image', value, onChange, required = false }) {
  const [preview, setPreview] = useState(value || null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onChange?.(file);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: theme.colors.text }}>
        {label} {required && <span style={{ color: theme.colors.danger }}>*</span>}
      </label>
      <input
        type="file"
        accept="image/jpeg,image/png,image/jpg,image/webp"
        onChange={handleFile}
        style={{ fontSize: 13 }}
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ maxWidth: 200, borderRadius: theme.radius.md, border: `1px solid ${theme.colors.border}` }}
        />
      )}
    </div>
  );
}
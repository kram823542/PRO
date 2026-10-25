import { useState } from 'react';
import { theme } from '../../config/theme.js';

const LEAVE_TYPES = [
  { value: 'Casual Leave', label: 'Casual Leave' },
  { value: 'Medical Leave', label: 'Medical Leave' },
  { value: 'Half Day', label: 'Half Day' },
  { value: 'Emergency Leave', label: 'Emergency Leave' },
  { value: 'Other', label: 'Other' },
];

export default function LeaveForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    leaveType: 'Casual Leave',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    reason: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      if (name === 'leaveType' && value === 'Half Day') {
        newData.endDate = newData.startDate;
      }
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      startTime: formData.leaveType === 'Half Day' ? formData.startTime : undefined,
      endTime: formData.leaveType === 'Half Day' ? formData.endTime : undefined,
    };
    
    if (formData.leaveType === 'Half Day') {
      payload.endDate = formData.startDate;
    }

    onSubmit(payload, () => {
      setFormData({
        leaveType: 'Casual Leave',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        reason: '',
      });
    });
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.sm,
    fontSize: '14px',
    color: theme.colors.text,
    outline: 'none',
    background: theme.colors.surface,
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{ 
        background: theme.colors.surface, 
        padding: '24px', 
        borderRadius: theme.radius.md, 
        boxShadow: theme.shadow.sm,
        border: `1px solid ${theme.colors.border}`
      }}
      className="space-y-4"
    >
      <h2 style={{ color: theme.colors.text, borderBottom: `1px solid ${theme.colors.border}`, paddingBottom: '12px', marginBottom: '16px' }} className="text-lg font-semibold">
        Apply for Leave
      </h2>
      
      <div>
        <label style={{ color: theme.colors.muted }} className="block text-sm font-medium mb-1">Leave Type</label>
        <select
          name="leaveType"
          value={formData.leaveType}
          onChange={handleChange}
          style={inputStyle}
          required
        >
          {LEAVE_TYPES.map((type) => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label style={{ color: theme.colors.muted }} className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={{ color: theme.colors.muted }} className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            min={formData.startDate}
            disabled={formData.leaveType === 'Half Day'}
            style={{ ...inputStyle, opacity: formData.leaveType === 'Half Day' ? 0.6 : 1 }}
            required
          />
        </div>
      </div>

      {formData.leaveType === 'Half Day' && (
        <div style={{ background: `${theme.colors.info}10`, padding: '12px', borderRadius: theme.radius.sm, border: `1px solid ${theme.colors.info}30` }} className="grid grid-cols-2 gap-4">
          <div>
            <label style={{ color: theme.colors.muted }} className="block text-xs font-medium mb-1">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label style={{ color: theme.colors.muted }} className="block text-xs font-medium mb-1">End Time</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              style={inputStyle}
              required
            />
          </div>
        </div>
      )}

      <div>
        <label style={{ color: theme.colors.muted }} className="block text-sm font-medium mb-1">Reason</label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          rows="3"
          style={inputStyle}
          placeholder="Briefly explain why you need this leave..."
          required
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{ 
          background: theme.colors.primary, 
          color: '#fff', 
          padding: '10px', 
          borderRadius: theme.radius.sm,
          opacity: loading ? 0.7 : 1,
          transition: 'all 0.2s'
        }}
        className="w-full font-medium"
      >
        {loading ? 'Applying...' : 'Apply Leave'}
      </button>
    </form>
  );
}
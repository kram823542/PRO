import { useState, useEffect } from 'react';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import { theme } from '../../config/theme.js';
import { updateClfBod } from './clfs.api.js';
import toast from 'react-hot-toast';

const DESIGNATIONS = ['BOD Manager', 'CLF Manager', 'Accountant', 'MIS', 'Other'];

export default function ClfBodModal({ clf, onClose, onUpdated }) {
  const [form, setForm] = useState({
    coreMembers: {
      president: { name: '', mobile: '', address: '', bankDetails: { bankName: '', accountNumber: '', ifscCode: '', branch: '' } },
      secretary: { name: '', mobile: '', address: '', bankDetails: { bankName: '', accountNumber: '', ifscCode: '', branch: '' } },
      treasurer: { name: '', mobile: '', address: '', bankDetails: { bankName: '', accountNumber: '', ifscCode: '', branch: '' } },
    },
    bodMembers: [],
  });
  const [loading, setLoading] = useState(false);
  
  // ✅ NAYA: Edit karne ke liye state
  const [editingIndex, setEditingIndex] = useState(null);
  
  const [newMember, setNewMember] = useState({ 
    designation: 'BOD Manager', name: '', mobile: '', address: '', 
    bankDetails: { bankName: '', accountNumber: '', ifscCode: '', branch: '' } 
  });

  useEffect(() => {
    if (clf) {
      const core = clf.coreMembers || {};
      setForm({
        coreMembers: {
          president: {
            name: core.president?.name || clf.president || '',
            mobile: core.president?.mobile || '',
            address: core.president?.address || '',
            bankDetails: core.president?.bankDetails || { bankName: '', accountNumber: '', ifscCode: '', branch: '' },
          },
          secretary: {
            name: core.secretary?.name || clf.secretary || '',
            mobile: core.secretary?.mobile || '',
            address: core.secretary?.address || '',
            bankDetails: core.secretary?.bankDetails || { bankName: '', accountNumber: '', ifscCode: '', branch: '' },
          },
          treasurer: {
            name: core.treasurer?.name || clf.treasurer || '',
            mobile: core.treasurer?.mobile || '',
            address: core.treasurer?.address || '',
            bankDetails: core.treasurer?.bankDetails || { bankName: '', accountNumber: '', ifscCode: '', branch: '' },
          },
        },
        bodMembers: clf.bodMembers || [],
      });
    }
  }, [clf]);

  const handleCoreChange = (role, field, value) => {
    setForm((prev) => ({
      ...prev,
      coreMembers: {
        ...prev.coreMembers,
        [role]: { ...prev.coreMembers[role], [field]: value }
      }
    }));
  };

  const handleCoreBankChange = (role, field, value) => {
    setForm((prev) => ({
      ...prev,
      coreMembers: {
        ...prev.coreMembers,
        [role]: {
          ...prev.coreMembers[role],
          bankDetails: { ...prev.coreMembers[role].bankDetails, [field]: value }
        }
      }
    }));
  };

  // ✅ Edit button click handler
  const handleEditMember = (index) => {
    const member = form.bodMembers[index];
    setNewMember({ ...member });
    setEditingIndex(index);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddNewMember = () => {
    if (!newMember.name) return toast.error('Name is required');
    
    if (editingIndex !== null) {
      // Update existing
      const updated = [...form.bodMembers];
      updated[editingIndex] = { ...newMember };
      setForm((prev) => ({ ...prev, bodMembers: updated }));
      setEditingIndex(null);
      toast.success('Member updated');
    } else {
      // Add new
      setForm((prev) => ({
        ...prev,
        bodMembers: [...prev.bodMembers, { ...newMember, status: 'ACTIVE' }],
      }));
      toast.success('Member added');
    }
    
    setNewMember({ 
      designation: 'BOD Manager', name: '', mobile: '', address: '', 
      bankDetails: { bankName: '', accountNumber: '', ifscCode: '', branch: '' } 
    });
  };

  const deleteBodMember = (index) => {
    if (!window.confirm('Delete this member?')) return;
    const updated = form.bodMembers.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, bodMembers: updated }));
    // Agar editing wahi member tha toh reset
    if (editingIndex === index) {
      setEditingIndex(null);
      setNewMember({ 
        designation: 'BOD Manager', name: '', mobile: '', address: '', 
        bankDetails: { bankName: '', accountNumber: '', ifscCode: '', branch: '' } 
      });
    }
  };

  const toggleBodStatus = (index) => {
    const updated = [...form.bodMembers];
    updated[index].status = updated[index].status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    setForm((prev) => ({ ...prev, bodMembers: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateClfBod(clf._id, form);
      toast.success('Details Updated!');
      onUpdated?.();
      onClose?.();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update');
    } finally {
      setLoading(false);
    }
  };

  if (!clf) return null;

  const renderCoreMember = (role, label) => {
    const m = form.coreMembers[role];
    return (
      <div style={{ background: theme.colors.background, padding: 16, borderRadius: 8, marginBottom: 12, border: `1px solid ${theme.colors.border}` }}>
        <h5 style={{ margin: '0 0 10px', color: theme.colors.primary, fontSize: 14 }}>{label}</h5>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Input label="Name" value={m.name} onChange={(e) => handleCoreChange(role, 'name', e.target.value)} />
          <Input label="Mobile" value={m.mobile} onChange={(e) => handleCoreChange(role, 'mobile', e.target.value)} />
        </div>
        <Input label="Address" value={m.address} onChange={(e) => handleCoreChange(role, 'address', e.target.value)} />
        
        <div style={{ marginTop: 8, padding: 10, background: theme.colors.surface, borderRadius: 6 }}>
          <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 600, color: theme.colors.muted }}>Bank Details</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8 }}>
            <Input label="Bank Name" value={m.bankDetails.bankName || ''} onChange={(e) => handleCoreBankChange(role, 'bankName', e.target.value)} />
            <Input label="A/c No." value={m.bankDetails.accountNumber} onChange={(e) => handleCoreBankChange(role, 'accountNumber', e.target.value)} />
            <Input label="IFSC" value={m.bankDetails.ifscCode} onChange={(e) => handleCoreBankChange(role, 'ifscCode', e.target.value)} />
            <Input label="Branch" value={m.bankDetails.branch} onChange={(e) => handleCoreBankChange(role, 'branch', e.target.value)} />
          </div>
        </div>
      </div>
    );
  };

  const groupedBod = DESIGNATIONS.reduce((acc, des) => {
    acc[des] = form.bodMembers.filter(m => m.designation === des);
    return acc;
  }, {});

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20, maxHeight: '75vh', overflowY: 'auto', paddingRight: 10 }}>
      
      <div>
        <h4 style={{ margin: '0 0 12px', color: theme.colors.primary, borderBottom: `1px solid ${theme.colors.border}`, paddingBottom: 8 }}>
          Core Members
        </h4>
        {renderCoreMember('president', 'अध्यक्ष (President)')}
        {renderCoreMember('secretary', 'सचिव (Secretary)')}
        {renderCoreMember('treasurer', 'कोषाध्यक्ष (Treasurer)')}
      </div>

      <div>
        <h4 style={{ margin: '0 0 12px', color: theme.colors.primary, borderBottom: `1px solid ${theme.colors.border}`, paddingBottom: 8 }}>
          Other Members (BOD, Manager, etc.)
        </h4>

        <div style={{ background: theme.colors.background, padding: 16, borderRadius: 8, marginBottom: 20, border: `1px dashed ${theme.colors.primary}50` }}>
          <h5 style={{ margin: '0 0 10px', fontSize: 13, color: theme.colors.primary }}>
            {editingIndex !== null ? 'Edit Member' : 'Add New Member'}
          </h5>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: theme.colors.muted }}>Designation</label>
              <select 
                value={newMember.designation} 
                onChange={(e) => setNewMember(prev => ({ ...prev, designation: e.target.value }))}
                style={{ padding: '10px 12px', border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.sm, fontSize: 14, background: theme.colors.surface }}
              >
                {DESIGNATIONS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <Input label="Name" value={newMember.name} onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))} />
            <Input label="Mobile" value={newMember.mobile} onChange={(e) => setNewMember(prev => ({ ...prev, mobile: e.target.value }))} />
          </div>
          <Input label="Address" value={newMember.address} onChange={(e) => setNewMember(prev => ({ ...prev, address: e.target.value }))} />
          
          <div style={{ marginTop: 8, padding: 10, background: theme.colors.surface, borderRadius: 6 }}>
            <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 600, color: theme.colors.muted }}>Bank Details</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8 }}>
              <Input label="Bank Name" value={newMember.bankDetails.bankName} onChange={(e) => setNewMember(prev => ({ ...prev, bankDetails: { ...prev.bankDetails, bankName: e.target.value } }))} />
              <Input label="A/c No." value={newMember.bankDetails.accountNumber} onChange={(e) => setNewMember(prev => ({ ...prev, bankDetails: { ...prev.bankDetails, accountNumber: e.target.value } }))} />
              <Input label="IFSC" value={newMember.bankDetails.ifscCode} onChange={(e) => setNewMember(prev => ({ ...prev, bankDetails: { ...prev.bankDetails, ifscCode: e.target.value } }))} />
              <Input label="Branch" value={newMember.bankDetails.branch} onChange={(e) => setNewMember(prev => ({ ...prev, bankDetails: { ...prev.bankDetails, branch: e.target.value } }))} />
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
            <Button type="button" onClick={handleAddNewMember} style={{ flex: 1, background: theme.colors.primary }}>
              {editingIndex !== null ? 'Update Member' : '+ Add to List'}
            </Button>
            {editingIndex !== null && (
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => {
                  setEditingIndex(null);
                  setNewMember({ 
                    designation: 'BOD Manager', name: '', mobile: '', address: '', 
                    bankDetails: { bankName: '', accountNumber: '', ifscCode: '', branch: '' } 
                  });
                }}
              >
                Cancel Edit
              </Button>
            )}
          </div>
        </div>

        {DESIGNATIONS.map(des => {
          const members = groupedBod[des];
          if (members.length === 0) return null;
          
          return (
            <div key={des} style={{ marginBottom: 16 }}>
              <h5 style={{ margin: '0 0 8px', fontSize: 13, color: theme.colors.text, textTransform: 'uppercase', letterSpacing: 0.5 }}>{des} List</h5>
              {members.map((member, idx) => {
                const globalIndex = form.bodMembers.findIndex(m => m === member);
                return (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 12px', background: theme.colors.background, borderRadius: 6, marginBottom: 6, border: `1px solid ${theme.colors.border}` }}>
                    <div>
                      <div style={{ fontWeight: 600, color: theme.colors.text, fontSize: 14 }}>{member.name}</div>
                      <div style={{ fontSize: 12, color: theme.colors.muted }}>{member.mobile} • {member.address}</div>
                      
                      {/* ✅ NAYA: Bank Name display */}
                      {member.bankDetails?.bankName && (
                        <div style={{ fontSize: 11, color: theme.colors.primary, marginTop: 2 }}>
                          Bank: {member.bankDetails.bankName} (A/c: {member.bankDetails.accountNumber})
                        </div>
                      )}
                      {!member.bankDetails?.bankName && member.bankDetails?.accountNumber && (
                        <div style={{ fontSize: 11, color: theme.colors.muted, marginTop: 2 }}>
                          A/c: {member.bankDetails.accountNumber}
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {/* ✅ NAYA: Edit Button */}
                      <Button 
                        type="button" 
                        onClick={() => handleEditMember(globalIndex)} 
                        style={{ padding: '4px 8px', fontSize: 11, background: theme.colors.info, color: '#fff' }}
                      >
                        Edit
                      </Button>
                      <Button 
                        type="button" 
                        onClick={() => toggleBodStatus(globalIndex)} 
                        style={{ padding: '4px 8px', fontSize: 11, background: member.status === 'ACTIVE' ? theme.colors.success : theme.colors.muted, color: '#fff' }}
                      >
                        {member.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button 
                        type="button" 
                        variant="danger" 
                        onClick={() => deleteBodMember(globalIndex)} 
                        style={{ padding: '4px 8px', fontSize: 11 }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 10, borderTop: `1px solid ${theme.colors.border}`, paddingTop: 16 }}>
        <Button type="button" variant="ghost" onClick={onClose} style={{ flex: 1 }}>Cancel</Button>
        <Button type="submit" loading={loading} style={{ flex: 1 }}>Save All Details</Button>
      </div>
    </form>
  );
}
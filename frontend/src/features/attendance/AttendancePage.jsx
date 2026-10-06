// import { useEffect, useState } from 'react';
// import PageHeader from '../../components/common/PageHeader.jsx';
// import Table from '../../components/ui/Table.jsx';
// import Badge from '../../components/ui/Badge.jsx';
// import Button from '../../components/ui/Button.jsx';
// import AttendanceFilter from './AttendanceFilter.jsx';
// import * as api from './attendance.api.js';

// export default function AttendancePage() {
//   const [attendance, setAttendance] = useState([]);
//   const [summary, setSummary] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({ from: '', to: '' });

//   const load = async () => {
//     setLoading(true);
//     try {
//       const { data } = await api.listAttendance(filters);
//       setAttendance(data.data.attendance || []);
//       setSummary(data.data.summary || null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, [filters]);

//   const handleExport = async () => {
//     const { data } = await api.exportAttendanceCSV(filters);
//     const url = URL.createObjectURL(new Blob([data]));
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `attendance-${Date.now()}.csv`;
//     a.click();
//   };

//   const columns = [
//     { header: 'Date', key: 'date' },
//     { header: 'Employee', render: (r) => r.employeeId?.name || '—' },
//     { header: 'Code', render: (r) => r.employeeId?.employeeCode || '—' },
//     {
//       header: 'Status',
//       render: (r) => (
//         <Badge
//           variant={
//             r.status === 'PRESENT'
//               ? 'success'
//               : r.status === 'ABSENT'
//               ? 'danger'
//               : 'warning'
//           }
//         >
//           {r.status}
//         </Badge>
//       ),
//     },
//     { header: 'Source', key: 'source' },
//   ];

//   return (
//     <>
//       <PageHeader
//         title="Attendance"
//         subtitle={summary ? `Present: ${summary.present} | Total: ${summary.total}` : ''}
//         actions={<Button variant="ghost" onClick={handleExport}>Export CSV</Button>}
//       />
//       <AttendanceFilter filters={filters} onChange={setFilters} />
//       <Table columns={columns} data={attendance} loading={loading} />
//     </>
//   );
// }



// import { useEffect, useMemo, useState } from 'react';
// import PageHeader from '../../components/common/PageHeader.jsx';
// import Button from '../../components/ui/Button.jsx';
// import Loader from '../../components/ui/Loader.jsx';
// import AttendanceFilter from './AttendanceFilter.jsx';
// import { theme } from '../../config/theme.js';
// import { listEmployees } from '../employees/employees.api.js';
// import * as api from './attendance.api.js';

// const MONTHS = [
//   'January', 'February', 'March', 'April', 'May', 'June',
//   'July', 'August', 'September', 'October', 'November', 'December',
// ];

// // ✅ सिर्फ P और A
// const STATUS_UI = {
//   PRESENT: { label: 'P', bg: '#DCFCE7', color: '#15803D' },
//   ABSENT:  { label: 'A', bg: '#FEE2E2', color: '#B91C1C' },
// };

// const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
// const fmt = (y, m, d) =>
//   `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

// export default function AttendancePage() {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const isEmployee = user.role === 'EMPLOYEE';

//   const now = new Date();
//   const [filters, setFilters] = useState({
//     month: now.getMonth() + 1,
//     year: now.getFullYear(),
//     employeeId: '',
//   });

//   const [employees, setEmployees] = useState([]);
//   const [attendance, setAttendance] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /* Load employees — only for BPM/CLF */
//   useEffect(() => {
//     if (isEmployee) return;
//     (async () => {
//       try {
//         const { data } = await listEmployees({ page: 1, limit: 500 });
//         setEmployees(data.data.employees || []);
//       } catch (err) {
//         console.error('Load employees error:', err);
//       }
//     })();
//   }, [isEmployee]);

//   /* Load attendance — reloads whenever month/year/employeeId changes */
//   useEffect(() => {
//     let cancelled = false;

//     const load = async () => {
//       setLoading(true);
//       setAttendance([]); // ✅ Clear old data immediately on month change
//       try {
//         const y = Number(filters.year);
//         const m = Number(filters.month);
//         const lastDay = daysInMonth(y, m);

//         const params = {
//           from: fmt(y, m, 1),
//           to: fmt(y, m, lastDay),
//         };
//         if (filters.employeeId) params.employeeId = filters.employeeId;

//         const { data } = await api.listAttendance(params);
//         if (!cancelled) {
//           setAttendance(data.data.attendance || []);
//         }
//       } catch (err) {
//         console.error('Load attendance error:', err);
//         if (!cancelled) setAttendance([]);
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     };

//     load();
//     return () => {
//       cancelled = true;
//     };
//   }, [filters.month, filters.year, filters.employeeId]);

//   const year = Number(filters.year);
//   const month = Number(filters.month);
//   const totalDays = daysInMonth(year, month);

//   /* Build matrix: employee → { day: status } */
//   const matrix = useMemo(() => {
//     const map = new Map();

//     // Seed all employees (admin view)
//     if (!isEmployee) {
//       const list = filters.employeeId
//         ? employees.filter((e) => e._id === filters.employeeId)
//         : employees;
//       list.forEach((e) => {
//         map.set(e._id, {
//           employee: {
//             _id: e._id,
//             name: e.name,
//             code: e.employeeCode,
//             designation: e.designation || '—',
//           },
//           days: {},
//         });
//       });
//     }

//     attendance.forEach((a) => {
//       const empId = a.employeeId?._id || a.employeeId;
//       const day = Number(a.date.split('-')[2]);

//       if (!map.has(empId)) {
//         map.set(empId, {
//           employee: {
//             _id: empId,
//             name: a.employeeId?.name || user.name || '—',
//             code: a.employeeId?.employeeCode || user.username || '—',
//             designation: a.employeeId?.designation || '—',
//           },
//           days: {},
//         });
//       }
//       map.get(empId).days[day] = a.status;
//     });

//     return Array.from(map.values()).sort((a, b) =>
//       String(a.employee.code).localeCompare(String(b.employee.code))
//     );
//   }, [attendance, employees, filters.employeeId, isEmployee, user]);

//   /* Totals — P and A only */
//   const totals = useMemo(() => {
//     let p = 0, a = 0;
//     attendance.forEach((row) => {
//       if (row.status === 'PRESENT') p++;
//       else if (row.status === 'ABSENT') a++;
//     });
//     return { p, a };
//   }, [attendance]);

//   const handleExport = async () => {
//     const { data } = await api.exportAttendanceCSV({
//       from: fmt(year, month, 1),
//       to: fmt(year, month, totalDays),
//     });
//     const url = URL.createObjectURL(new Blob([data]));
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `attendance-${MONTHS[month - 1]}-${year}.csv`;
//     a.click();
//   };

//   return (
//     <>
//       <PageHeader
//         title="Attendance"
//         subtitle={`${MONTHS[month - 1]} ${year} — ${matrix.length} employee(s)`}
//         actions={
//           <Button variant="ghost" onClick={handleExport}>
//             Export CSV
//           </Button>
//         }
//       />

//       <AttendanceFilter
//         filters={filters}
//         onChange={setFilters}
//         showEmployeeFilter={!isEmployee}
//         employees={employees}
//       />

//       {/* P / A only summary */}
//       <div
//         style={{
//           display: 'flex',
//           gap: 16,
//           marginBottom: 14,
//           fontSize: 12,
//           color: theme.colors.muted,
//         }}
//       >
//         <span>
//           <b style={{ color: '#15803D' }}>P</b> {totals.p}
//         </span>
//         <span>
//           <b style={{ color: '#B91C1C' }}>A</b> {totals.a}
//         </span>
//       </div>

//       {loading ? (
//         <Loader />
//       ) : matrix.length === 0 ? (
//         <EmptyState month={MONTHS[month - 1]} year={year} />
//       ) : (
//         <AttendanceMatrix matrix={matrix} totalDays={totalDays} />
//       )}
//     </>
//   );
// }

// /* ─────────────────────────────────────────────
//    Compact matrix
//    ───────────────────────────────────────────── */
// function AttendanceMatrix({ matrix, totalDays }) {
//   const days = Array.from({ length: totalDays }, (_, i) => i + 1);

//   const nameColWidth = 180;
//   const dayColWidth = 22;
//   const totalColWidth = 30;

//   return (
//     <div
//       style={{
//         background: theme.colors.surface,
//         borderRadius: theme.radius.md,
//         boxShadow: theme.shadow.sm,
//         overflow: 'hidden',
//         width: '100%',
//       }}
//     >
//       <table
//         style={{
//           borderCollapse: 'collapse',
//           fontSize: 11,
//           width: '100%',
//           tableLayout: 'fixed',
//         }}
//       >
//         <colgroup>
//           <col style={{ width: nameColWidth }} />
//           {days.map((d) => (
//             <col key={d} style={{ width: dayColWidth }} />
//           ))}
//           <col style={{ width: totalColWidth }} />
//           <col style={{ width: totalColWidth }} />
//         </colgroup>

//         <thead>
//           <tr>
//             <th
//               style={{
//                 position: 'sticky',
//                 top: 0,
//                 left: 0,
//                 zIndex: 3,
//                 background: theme.colors.background,
//                 padding: '8px 10px',
//                 textAlign: 'left',
//                 fontWeight: 700,
//                 fontSize: 10,
//                 color: theme.colors.text,
//                 borderBottom: `1px solid ${theme.colors.border}`,
//                 letterSpacing: 0.5,
//               }}
//             >
//               EMPLOYEE
//             </th>
//             {days.map((d) => (
//               <th
//                 key={d}
//                 style={{
//                   position: 'sticky',
//                   top: 0,
//                   zIndex: 2,
//                   background: theme.colors.background,
//                   padding: '8px 0',
//                   textAlign: 'center',
//                   fontWeight: 600,
//                   fontSize: 10,
//                   color: theme.colors.muted,
//                   borderBottom: `1px solid ${theme.colors.border}`,
//                 }}
//               >
//                 {d}
//               </th>
//             ))}
//             <th
//               style={{
//                 position: 'sticky',
//                 top: 0,
//                 right: totalColWidth,
//                 zIndex: 3,
//                 background: theme.colors.background,
//                 padding: '8px 4px',
//                 textAlign: 'center',
//                 fontWeight: 700,
//                 fontSize: 10,
//                 color: '#15803D',
//                 borderBottom: `1px solid ${theme.colors.border}`,
//                 borderLeft: `1px solid ${theme.colors.border}`,
//               }}
//             >
//               P
//             </th>
//             <th
//               style={{
//                 position: 'sticky',
//                 top: 0,
//                 right: 0,
//                 zIndex: 3,
//                 background: theme.colors.background,
//                 padding: '8px 4px',
//                 textAlign: 'center',
//                 fontWeight: 700,
//                 fontSize: 10,
//                 color: '#B91C1C',
//                 borderBottom: `1px solid ${theme.colors.border}`,
//               }}
//             >
//               A
//             </th>
//           </tr>
//         </thead>

//         <tbody>
//           {matrix.map(({ employee, days: dayMap }) => {
//             let pCount = 0;
//             let aCount = 0;
//             days.forEach((d) => {
//               if (dayMap[d] === 'PRESENT') pCount++;
//               else if (dayMap[d] === 'ABSENT') aCount++;
//             });

//             return (
//               <tr key={employee._id}>
//                 <td
//                   style={{
//                     position: 'sticky',
//                     left: 0,
//                     zIndex: 2,
//                     background: theme.colors.surface,
//                     padding: '6px 10px',
//                     borderBottom: `1px solid ${theme.colors.border}`,
//                     overflow: 'hidden',
//                   }}
//                 >
//                   <div
//                     style={{
//                       fontWeight: 600,
//                       fontSize: 12,
//                       color: theme.colors.text,
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       whiteSpace: 'nowrap',
//                     }}
//                     title={`${employee.name} (${employee.code})`}
//                   >
//                     {employee.name}
//                   </div>
//                   <div
//                     style={{
//                       fontSize: 10,
//                       color: theme.colors.muted,
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       whiteSpace: 'nowrap',
//                     }}
//                     title={`${employee.code} • ${employee.designation}`}
//                   >
//                     {employee.code} • {employee.designation}
//                   </div>
//                 </td>

//                 {days.map((d) => {
//                   const status = dayMap[d];
//                   const ui = STATUS_UI[status];
//                   return (
//                     <td
//                       key={d}
//                       style={{
//                         padding: 1,
//                         textAlign: 'center',
//                         borderBottom: `1px solid ${theme.colors.border}`,
//                       }}
//                     >
//                       <div
//                         style={{
//                           width: 18,
//                           height: 18,
//                           margin: '0 auto',
//                           borderRadius: 4,
//                           background: ui?.bg || '#F8FAFC',
//                           color: ui?.color || '#CBD5E1',
//                           fontSize: 10,
//                           fontWeight: 700,
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           lineHeight: 1,
//                         }}
//                         title={status || 'No record'}
//                       >
//                         {ui?.label || ''}
//                       </div>
//                     </td>
//                   );
//                 })}

//                 <td
//                   style={{
//                     position: 'sticky',
//                     right: totalColWidth,
//                     zIndex: 2,
//                     background: theme.colors.surface,
//                     padding: '6px 4px',
//                     textAlign: 'center',
//                     fontWeight: 700,
//                     fontSize: 11,
//                     color: '#15803D',
//                     borderBottom: `1px solid ${theme.colors.border}`,
//                     borderLeft: `1px solid ${theme.colors.border}`,
//                   }}
//                 >
//                   {pCount}
//                 </td>
//                 <td
//                   style={{
//                     position: 'sticky',
//                     right: 0,
//                     zIndex: 2,
//                     background: theme.colors.surface,
//                     padding: '6px 4px',
//                     textAlign: 'center',
//                     fontWeight: 700,
//                     fontSize: 11,
//                     color: '#B91C1C',
//                     borderBottom: `1px solid ${theme.colors.border}`,
//                   }}
//                 >
//                   {aCount}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// function EmptyState({ month, year }) {
//   return (
//     <div
//       style={{
//         padding: 40,
//         background: theme.colors.surface,
//         borderRadius: theme.radius.md,
//         boxShadow: theme.shadow.sm,
//         textAlign: 'center',
//         color: theme.colors.muted,
//         fontSize: 13,
//       }}
//     >
//       <b>
//         {month} {year}
//       </b>{' '}
//       के लिए कोई attendance record नहीं मिला।
//     </div>
//   );
// }


// import { useEffect, useMemo, useState } from 'react';
// import PageHeader from '../../components/common/PageHeader.jsx';
// import Button from '../../components/ui/Button.jsx';
// import Loader from '../../components/ui/Loader.jsx';
// import AttendanceFilter from './AttendanceFilter.jsx';
// import { theme } from '../../config/theme.js';
// import { listEmployees } from '../employees/employees.api.js';
// import * as api from './attendance.api.js';

// const MONTHS = [
//   'January', 'February', 'March', 'April', 'May', 'June',
//   'July', 'August', 'September', 'October', 'November', 'December',
// ];

// // ✅ border attribute add kar diya gaya hai
// const STATUS_UI = {
//   PRESENT: { label: 'P', bg: '#DCFCE7', color: '#15803D', border: '#86EFAC' },
//   ABSENT:  { label: 'A', bg: '#FEE2E2', color: '#B91C1C', border: '#FCA5A5' },
// };

// const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
// const fmt = (y, m, d) =>
//   `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

// export default function AttendancePage() {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const isEmployee = user.role === 'EMPLOYEE';

//   const now = new Date();
//   const [filters, setFilters] = useState({
//     month: now.getMonth() + 1,
//     year: now.getFullYear(),
//     employeeId: '',
//   });

//   const [employees, setEmployees] = useState([]);
//   const [attendance, setAttendance] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /* Load employees — only for BPM/CLF */
//   useEffect(() => {
//     if (isEmployee) return;
//     (async () => {
//       try {
//         const { data } = await listEmployees({ page: 1, limit: 500 });
//         setEmployees(data.data.employees || []);
//       } catch (err) {
//         console.error('Load employees error:', err);
//       }
//     })();
//   }, [isEmployee]);

//   /* Load attendance — reloads whenever month/year/employeeId changes */
//   useEffect(() => {
//     let cancelled = false;

//     const load = async () => {
//       setLoading(true);
//       setAttendance([]); // ✅ Clear old data immediately on month change
//       try {
//         const y = Number(filters.year);
//         const m = Number(filters.month);
//         const lastDay = daysInMonth(y, m);

//         const params = {
//           from: fmt(y, m, 1),
//           to: fmt(y, m, lastDay),
//         };
//         if (filters.employeeId) params.employeeId = filters.employeeId;

//         const { data } = await api.listAttendance(params);
//         if (!cancelled) {
//           setAttendance(data.data.attendance || []);
//         }
//       } catch (err) {
//         console.error('Load attendance error:', err);
//         if (!cancelled) setAttendance([]);
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     };

//     load();
//     return () => {
//       cancelled = true;
//     };
//   }, [filters.month, filters.year, filters.employeeId]);

//   const year = Number(filters.year);
//   const month = Number(filters.month);
//   const totalDays = daysInMonth(year, month);

//   /* Build matrix: employee → { day: status } */
//   const matrix = useMemo(() => {
//     const map = new Map();

//     // Seed all employees (admin view)
//     if (!isEmployee) {
//       const list = filters.employeeId
//         ? employees.filter((e) => e._id === filters.employeeId)
//         : employees;
//       list.forEach((e) => {
//         map.set(e._id, {
//           employee: {
//             _id: e._id,
//             name: e.name,
//             code: e.employeeCode,
//             designation: e.designation || '—',
//           },
//           days: {},
//         });
//       });
//     }

//     attendance.forEach((a) => {
//       const empId = a.employeeId?._id || a.employeeId;
//       const day = Number(a.date.split('-')[2]);

//       if (!map.has(empId)) {
//         map.set(empId, {
//           employee: {
//             _id: empId,
//             name: a.employeeId?.name || user.name || '—',
//             code: a.employeeId?.employeeCode || user.username || '—',
//             designation: a.employeeId?.designation || '—',
//           },
//           days: {},
//         });
//       }
//       map.get(empId).days[day] = a.status;
//     });

//     return Array.from(map.values()).sort((a, b) =>
//       String(a.employee.code).localeCompare(String(b.employee.code))
//     );
//   }, [attendance, employees, filters.employeeId, isEmployee, user]);

//   /* Totals — P and A only */
//   const totals = useMemo(() => {
//     let p = 0, a = 0;
//     attendance.forEach((row) => {
//       if (row.status === 'PRESENT') p++;
//       else if (row.status === 'ABSENT') a++;
//     });
//     return { p, a };
//   }, [attendance]);

//   const handleExport = async () => {
//     const { data } = await api.exportAttendanceCSV({
//       from: fmt(year, month, 1),
//       to: fmt(year, month, totalDays),
//     });
//     const url = URL.createObjectURL(new Blob([data]));
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `attendance-${MONTHS[month - 1]}-${year}.csv`;
//     a.click();
//   };

//   return (
//     <>
//       <PageHeader
//         title="Attendance"
//         subtitle={`${MONTHS[month - 1]} ${year} — ${matrix.length} employee(s)`}
//         actions={
//           <Button variant="ghost" onClick={handleExport}>
//             Export CSV
//           </Button>
//         }
//       />

//       <AttendanceFilter
//         filters={filters}
//         onChange={setFilters}
//         showEmployeeFilter={!isEmployee}
//         employees={employees}
//       />

//       {/* P / A only summary */}
//       <div
//         style={{
//           display: 'flex',
//           gap: 16,
//           marginBottom: 14,
//           fontSize: 12,
//           color: theme.colors.muted,
//         }}
//       >
//         <span>
//           <b style={{ color: '#15803D' }}>P</b> {totals.p}
//         </span>
//         <span>
//           <b style={{ color: '#B91C1C' }}>A</b> {totals.a}
//         </span>
//       </div>

//       {loading ? (
//         <Loader />
//       ) : matrix.length === 0 ? (
//         <EmptyState month={MONTHS[month - 1]} year={year} />
//       ) : (
//         <AttendanceMatrix matrix={matrix} totalDays={totalDays} />
//       )}
//     </>
//   );
// }

// /* ─────────────────────────────────────────────
//    Compact matrix
//    ───────────────────────────────────────────── */
// function AttendanceMatrix({ matrix, totalDays }) {
//   const days = Array.from({ length: totalDays }, (_, i) => i + 1);

//   const nameColWidth = 180;
//   const dayColWidth = 22;
//   const totalColWidth = 30;

//   return (
//     <div
//       style={{
//         background: theme.colors.surface,
//         borderRadius: theme.radius.md,
//         boxShadow: theme.shadow.sm,
//         overflow: 'hidden',
//         width: '100%',
//       }}
//     >
//       <table
//         style={{
//           borderCollapse: 'collapse',
//           fontSize: 11,
//           width: '100%',
//           tableLayout: 'fixed',
//         }}
//       >
//         <colgroup>
//           <col style={{ width: nameColWidth }} />
//           {days.map((d) => (
//             <col key={d} style={{ width: dayColWidth }} />
//           ))}
//           <col style={{ width: totalColWidth }} />
//           <col style={{ width: totalColWidth }} />
//         </colgroup>

//         <thead>
//           <tr>
//             <th
//               style={{
//                 position: 'sticky',
//                 top: 0,
//                 left: 0,
//                 zIndex: 3,
//                 background: theme.colors.background,
//                 padding: '8px 10px',
//                 textAlign: 'left',
//                 fontWeight: 700,
//                 fontSize: 10,
//                 color: theme.colors.text,
//                 borderBottom: `1px solid ${theme.colors.border}`,
//                 letterSpacing: 0.5,
//               }}
//             >
//               EMPLOYEE
//             </th>
//             {days.map((d) => (
//               <th
//                 key={d}
//                 style={{
//                   position: 'sticky',
//                   top: 0,
//                   zIndex: 2,
//                   background: theme.colors.background,
//                   padding: '8px 0',
//                   textAlign: 'center',
//                   fontWeight: 600,
//                   fontSize: 10,
//                   color: theme.colors.muted,
//                   borderBottom: `1px solid ${theme.colors.border}`,
//                 }}
//               >
//                 {d}
//               </th>
//             ))}
//             <th
//               style={{
//                 position: 'sticky',
//                 top: 0,
//                 right: totalColWidth,
//                 zIndex: 3,
//                 background: theme.colors.background,
//                 padding: '8px 4px',
//                 textAlign: 'center',
//                 fontWeight: 700,
//                 fontSize: 10,
//                 color: '#15803D',
//                 borderBottom: `1px solid ${theme.colors.border}`,
//                 borderLeft: `1px solid ${theme.colors.border}`,
//               }}
//             >
//               P
//             </th>
//             <th
//               style={{
//                 position: 'sticky',
//                 top: 0,
//                 right: 0,
//                 zIndex: 3,
//                 background: theme.colors.background,
//                 padding: '8px 4px',
//                 textAlign: 'center',
//                 fontWeight: 700,
//                 fontSize: 10,
//                 color: '#B91C1C',
//                 borderBottom: `1px solid ${theme.colors.border}`,
//               }}
//             >
//               A
//             </th>
//           </tr>
//         </thead>

//         <tbody>
//           {matrix.map(({ employee, days: dayMap }) => {
//             let pCount = 0;
//             let aCount = 0;
//             days.forEach((d) => {
//               if (dayMap[d] === 'PRESENT') pCount++;
//               else if (dayMap[d] === 'ABSENT') aCount++;
//             });

//             return (
//               <tr key={employee._id}>
//                 <td
//                   style={{
//                     position: 'sticky',
//                     left: 0,
//                     zIndex: 2,
//                     background: theme.colors.surface,
//                     padding: '6px 10px',
//                     borderBottom: `1px solid ${theme.colors.border}`,
//                     overflow: 'hidden',
//                   }}
//                 >
//                   <div
//                     style={{
//                       fontWeight: 600,
//                       fontSize: 12,
//                       color: theme.colors.text,
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       whiteSpace: 'nowrap',
//                     }}
//                     title={`${employee.name} (${employee.code})`}
//                   >
//                     {employee.name}
//                   </div>
//                   <div
//                     style={{
//                       fontSize: 10,
//                       color: theme.colors.muted,
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       whiteSpace: 'nowrap',
//                     }}
//                     title={`${employee.code} • ${employee.designation}`}
//                   >
//                     {employee.code} • {employee.designation}
//                   </div>
//                 </td>

//                 {days.map((d) => {
//                   const status = dayMap[d];
//                   const ui = STATUS_UI[status];
//                   return (
//                     <td
//                       key={d}
//                       style={{
//                         padding: 1,
//                         textAlign: 'center',
//                         borderBottom: `1px solid ${theme.colors.border}`,
//                       }}
//                     >
//                       <div
//                         style={{
//                           width: 18,
//                           height: 18,
//                           margin: '0 auto',
//                           borderRadius: 4,
//                           background: ui?.bg || '#F8FAFC',
//                           color: ui?.color || '#CBD5E1',
//                           border: `1px solid ${ui?.border || '#E2E8F0'}`, // ✅ Custom border added
//                           fontSize: 10,
//                           fontWeight: 700,
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           lineHeight: 1,
//                           boxSizing: 'border-box',
//                         }}
//                         title={status || 'No record'}
//                       >
//                         {ui?.label || ''}
//                       </div>
//                     </td>
//                   );
//                 })}

//                 <td
//                   style={{
//                     position: 'sticky',
//                     right: totalColWidth,
//                     zIndex: 2,
//                     background: theme.colors.surface,
//                     padding: '6px 4px',
//                     textAlign: 'center',
//                     fontWeight: 700,
//                     fontSize: 11,
//                     color: '#15803D',
//                     borderBottom: `1px solid ${theme.colors.border}`,
//                     borderLeft: `1px solid ${theme.colors.border}`,
//                   }}
//                 >
//                   {pCount}
//                 </td>
//                 <td
//                   style={{
//                     position: 'sticky',
//                     right: 0,
//                     zIndex: 2,
//                     background: theme.colors.surface,
//                     padding: '6px 4px',
//                     textAlign: 'center',
//                     fontWeight: 700,
//                     fontSize: 11,
//                     color: '#B91C1C',
//                     borderBottom: `1px solid ${theme.colors.border}`,
//                   }}
//                 >
//                   {aCount}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// function EmptyState({ month, year }) {
//   return (
//     <div
//       style={{
//         padding: 40,
//         background: theme.colors.surface,
//         borderRadius: theme.radius.md,
//         boxShadow: theme.shadow.sm,
//         textAlign: 'center',
//         color: theme.colors.muted,
//         fontSize: 13,
//       }}
//     >
//       <b>
//         {month} {year}
//       </b>{' '}
//       के लिए कोई attendance record नहीं मिला।
//     </div>
//   );
// }



// import { useEffect, useMemo, useState } from 'react';
// import PageHeader from '../../components/common/PageHeader.jsx';
// import Button from '../../components/ui/Button.jsx';
// import Loader from '../../components/ui/Loader.jsx';
// import AttendanceFilter from './AttendanceFilter.jsx';
// import { theme } from '../../config/theme.js';
// import { listEmployees } from '../employees/employees.api.js';
// import * as api from './attendance.api.js';

// const MONTHS = [
//   'January', 'February', 'March', 'April', 'May', 'June',
//   'July', 'August', 'September', 'October', 'November', 'December',
// ];

// const STATUS_UI = {
//   PRESENT: { label: 'P', bg: '#DCFCE7', color: '#15803D', border: '#86EFAC' },
//   ABSENT:  { label: 'A', bg: '#FEE2E2', color: '#B91C1C', border: '#FCA5A5' },
// };

// const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
// const fmt = (y, m, d) =>
//   `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

// export default function AttendancePage() {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   const isEmployee = user.role === 'EMPLOYEE';

//   const now = new Date();
//   const [filters, setFilters] = useState({
//     month: now.getMonth() + 1,
//     year: now.getFullYear(),
//     employeeId: '',
//   });

//   const [employees, setEmployees] = useState([]);
//   const [attendance, setAttendance] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /* Load employees — only for BPM/CLF */
//   useEffect(() => {
//     if (isEmployee) return;
//     (async () => {
//       try {
//         const { data } = await listEmployees({ page: 1, limit: 500 });
//         setEmployees(data.data.employees || []);
//       } catch (err) {
//         console.error('Load employees error:', err);
//       }
//     })();
//   }, [isEmployee]);

//   /* Load attendance — reloads whenever month/year/employeeId changes */
//   useEffect(() => {
//     let cancelled = false;

//     const load = async () => {
//       setLoading(true);
//       setAttendance([]); // ✅ Clear old data immediately on month change
//       try {
//         const y = Number(filters.year);
//         const m = Number(filters.month);
//         const lastDay = daysInMonth(y, m);

//         const params = {
//           from: fmt(y, m, 1),
//           to: fmt(y, m, lastDay),
//         };
//         if (filters.employeeId) params.employeeId = filters.employeeId;

//         const { data } = await api.listAttendance(params);
//         if (!cancelled) {
//           setAttendance(data.data.attendance || []);
//         }
//       } catch (err) {
//         console.error('Load attendance error:', err);
//         if (!cancelled) setAttendance([]);
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     };

//     load();
//     return () => {
//       cancelled = true;
//     };
//   }, [filters.month, filters.year, filters.employeeId]);

//   const year = Number(filters.year);
//   const month = Number(filters.month);
//   const totalDays = daysInMonth(year, month);

//   /* Build matrix: employee → { day: status } */
//   const matrix = useMemo(() => {
//     const map = new Map();

//     // Seed all employees (admin view)
//     if (!isEmployee) {
//       const list = filters.employeeId
//         ? employees.filter((e) => e._id === filters.employeeId)
//         : employees;
//       list.forEach((e) => {
//         map.set(e._id, {
//           employee: {
//             _id: e._id,
//             name: e.name,
//             code: e.employeeCode,
//             designation: e.designation || '—',
//           },
//           days: {},
//         });
//       });
//     }

//     attendance.forEach((a) => {
//       const empId = a.employeeId?._id || a.employeeId;
//       const day = Number(a.date.split('-')[2]);

//       if (!map.has(empId)) {
//         map.set(empId, {
//           employee: {
//             _id: empId,
//             name: a.employeeId?.name || user.name || '—',
//             code: a.employeeId?.employeeCode || user.username || '—',
//             designation: a.employeeId?.designation || '—',
//           },
//           days: {},
//         });
//       }
//       map.get(empId).days[day] = a.status;
//     });

//     return Array.from(map.values()).sort((a, b) =>
//       String(a.employee.code).localeCompare(String(b.employee.code))
//     );
//   }, [attendance, employees, filters.employeeId, isEmployee, user]);

//   /* Totals — P and A only */
//   const totals = useMemo(() => {
//     let p = 0, a = 0;
//     attendance.forEach((row) => {
//       if (row.status === 'PRESENT') p++;
//       else if (row.status === 'ABSENT') a++;
//     });
//     return { p, a };
//   }, [attendance]);

//   /* ✅ Export Excel (matrix format — same as UI) */
//   const handleExport = async () => {
//     try {
//       const { data } = await api.exportAttendanceCSV({
//         from: fmt(year, month, 1),
//         to: fmt(year, month, totalDays),
//       });

//       const blob = new Blob([data], {
//         type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//       });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `attendance-${MONTHS[month - 1]}-${year}.xlsx`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error('Export error:', err);
//       alert('Failed to export attendance. Please try again.');
//     }
//   };

//   return (
//     <>
//       <PageHeader
//         title="Attendance"
//         subtitle={`${MONTHS[month - 1]} ${year} — ${matrix.length} employee(s)`}
//         actions={
//           <Button variant="ghost" onClick={handleExport}>
//             Export Excel
//           </Button>
//         }
//       />

//       <AttendanceFilter
//         filters={filters}
//         onChange={setFilters}
//         showEmployeeFilter={!isEmployee}
//         employees={employees}
//       />

//       {/* P / A only summary */}
//       <div
//         style={{
//           display: 'flex',
//           gap: 16,
//           marginBottom: 14,
//           fontSize: 12,
//           color: theme.colors.muted,
//         }}
//       >
//         <span>
//           <b style={{ color: '#15803D' }}>P</b> {totals.p}
//         </span>
//         <span>
//           <b style={{ color: '#B91C1C' }}>A</b> {totals.a}
//         </span>
//       </div>

//       {loading ? (
//         <Loader />
//       ) : matrix.length === 0 ? (
//         <EmptyState month={MONTHS[month - 1]} year={year} />
//       ) : (
//         <AttendanceMatrix matrix={matrix} totalDays={totalDays} />
//       )}
//     </>
//   );
// }

// /* ─────────────────────────────────────────────
//    Compact matrix
//    ───────────────────────────────────────────── */
// function AttendanceMatrix({ matrix, totalDays }) {
//   const days = Array.from({ length: totalDays }, (_, i) => i + 1);

//   const nameColWidth = 180;
//   const dayColWidth = 22;
//   const totalColWidth = 30;

//   return (
//     <div
//       style={{
//         background: theme.colors.surface,
//         borderRadius: theme.radius.md,
//         boxShadow: theme.shadow.sm,
//         overflow: 'hidden',
//         width: '100%',
//       }}
//     >
//       <table
//         style={{
//           borderCollapse: 'collapse',
//           fontSize: 11,
//           width: '100%',
//           tableLayout: 'fixed',
//         }}
//       >
//         <colgroup>
//           <col style={{ width: nameColWidth }} />
//           {days.map((d) => (
//             <col key={d} style={{ width: dayColWidth }} />
//           ))}
//           <col style={{ width: totalColWidth }} />
//           <col style={{ width: totalColWidth }} />
//         </colgroup>

//         <thead>
//           <tr>
//             <th
//               style={{
//                 position: 'sticky',
//                 top: 0,
//                 left: 0,
//                 zIndex: 3,
//                 background: theme.colors.background,
//                 padding: '8px 10px',
//                 textAlign: 'left',
//                 fontWeight: 700,
//                 fontSize: 10,
//                 color: theme.colors.text,
//                 borderBottom: `1px solid ${theme.colors.border}`,
//                 letterSpacing: 0.5,
//               }}
//             >
//               EMPLOYEE
//             </th>
//             {days.map((d) => (
//               <th
//                 key={d}
//                 style={{
//                   position: 'sticky',
//                   top: 0,
//                   zIndex: 2,
//                   background: theme.colors.background,
//                   padding: '8px 0',
//                   textAlign: 'center',
//                   fontWeight: 600,
//                   fontSize: 10,
//                   color: theme.colors.muted,
//                   borderBottom: `1px solid ${theme.colors.border}`,
//                 }}
//               >
//                 {d}
//               </th>
//             ))}
//             <th
//               style={{
//                 position: 'sticky',
//                 top: 0,
//                 right: totalColWidth,
//                 zIndex: 3,
//                 background: theme.colors.background,
//                 padding: '8px 4px',
//                 textAlign: 'center',
//                 fontWeight: 700,
//                 fontSize: 10,
//                 color: '#15803D',
//                 borderBottom: `1px solid ${theme.colors.border}`,
//                 borderLeft: `1px solid ${theme.colors.border}`,
//               }}
//             >
//               P
//             </th>
//             <th
//               style={{
//                 position: 'sticky',
//                 top: 0,
//                 right: 0,
//                 zIndex: 3,
//                 background: theme.colors.background,
//                 padding: '8px 4px',
//                 textAlign: 'center',
//                 fontWeight: 700,
//                 fontSize: 10,
//                 color: '#B91C1C',
//                 borderBottom: `1px solid ${theme.colors.border}`,
//               }}
//             >
//               A
//             </th>
//           </tr>
//         </thead>

//         <tbody>
//           {matrix.map(({ employee, days: dayMap }) => {
//             let pCount = 0;
//             let aCount = 0;
//             days.forEach((d) => {
//               if (dayMap[d] === 'PRESENT') pCount++;
//               else if (dayMap[d] === 'ABSENT') aCount++;
//             });

//             return (
//               <tr key={employee._id}>
//                 <td
//                   style={{
//                     position: 'sticky',
//                     left: 0,
//                     zIndex: 2,
//                     background: theme.colors.surface,
//                     padding: '6px 10px',
//                     borderBottom: `1px solid ${theme.colors.border}`,
//                     overflow: 'hidden',
//                   }}
//                 >
//                   <div
//                     style={{
//                       fontWeight: 600,
//                       fontSize: 12,
//                       color: theme.colors.text,
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       whiteSpace: 'nowrap',
//                     }}
//                     title={`${employee.name} (${employee.code})`}
//                   >
//                     {employee.name}
//                   </div>
//                   <div
//                     style={{
//                       fontSize: 10,
//                       color: theme.colors.muted,
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       whiteSpace: 'nowrap',
//                     }}
//                     title={`${employee.code} • ${employee.designation}`}
//                   >
//                     {employee.code} • {employee.designation}
//                   </div>
//                 </td>

//                 {days.map((d) => {
//                   const status = dayMap[d];
//                   const ui = STATUS_UI[status];
//                   return (
//                     <td
//                       key={d}
//                       style={{
//                         padding: 1,
//                         textAlign: 'center',
//                         borderBottom: `1px solid ${theme.colors.border}`,
//                       }}
//                     >
//                       <div
//                         style={{
//                           width: 18,
//                           height: 18,
//                           margin: '0 auto',
//                           borderRadius: 4,
//                           background: ui?.bg || '#F8FAFC',
//                           color: ui?.color || '#CBD5E1',
//                           border: `1px solid ${ui?.border || '#E2E8F0'}`,
//                           fontSize: 10,
//                           fontWeight: 700,
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           lineHeight: 1,
//                           boxSizing: 'border-box',
//                         }}
//                         title={status || 'No record'}
//                       >
//                         {ui?.label || ''}
//                       </div>
//                     </td>
//                   );
//                 })}

//                 <td
//                   style={{
//                     position: 'sticky',
//                     right: totalColWidth,
//                     zIndex: 2,
//                     background: theme.colors.surface,
//                     padding: '6px 4px',
//                     textAlign: 'center',
//                     fontWeight: 700,
//                     fontSize: 11,
//                     color: '#15803D',
//                     borderBottom: `1px solid ${theme.colors.border}`,
//                     borderLeft: `1px solid ${theme.colors.border}`,
//                   }}
//                 >
//                   {pCount}
//                 </td>
//                 <td
//                   style={{
//                     position: 'sticky',
//                     right: 0,
//                     zIndex: 2,
//                     background: theme.colors.surface,
//                     padding: '6px 4px',
//                     textAlign: 'center',
//                     fontWeight: 700,
//                     fontSize: 11,
//                     color: '#B91C1C',
//                     borderBottom: `1px solid ${theme.colors.border}`,
//                   }}
//                 >
//                   {aCount}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// function EmptyState({ month, year }) {
//   return (
//     <div
//       style={{
//         padding: 40,
//         background: theme.colors.surface,
//         borderRadius: theme.radius.md,
//         boxShadow: theme.shadow.sm,
//         textAlign: 'center',
//         color: theme.colors.muted,
//         fontSize: 13,
//       }}
//     >
//       <b>
//         {month} {year}
//       </b>{' '}
//       के लिए कोई attendance record नहीं मिला।
//     </div>
//   );
// }



import { useEffect, useMemo, useState } from 'react';
import PageHeader from '../../components/common/PageHeader.jsx';
import Button from '../../components/ui/Button.jsx';
import Loader from '../../components/ui/Loader.jsx';
import AttendanceFilter from './AttendanceFilter.jsx';
import { theme } from '../../config/theme.js';
import { listEmployees } from '../employees/employees.api.js';
import * as api from './attendance.api.js';
import Table from '../../components/ui/Table.jsx';
import Badge from '../../components/ui/Badge.jsx';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const STATUS_UI = {
  PRESENT: { label: 'P', bg: '#DCFCE7', color: '#15803D', border: '#86EFAC' },
  ABSENT:  { label: 'A', bg: '#FEE2E2', color: '#B91C1C', border: '#FCA5A5' },
};

const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
const fmt = (y, m, d) =>
  `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

export default function AttendancePage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isEmployee = user.role === 'EMPLOYEE';

  const now = new Date();
  const [filters, setFilters] = useState({
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    employeeId: '',
  });

  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  /* Load employees — only for BPM/CLF */
  useEffect(() => {
    if (isEmployee) return;
    (async () => {
      try {
        const { data } = await listEmployees({ page: 1, limit: 500 });
        setEmployees(data.data.employees || []);
      } catch (err) {
        console.error('Load employees error:', err);
      }
    })();
  }, [isEmployee]);

  /* Load attendance — reloads whenever month/year/employeeId changes */
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setAttendance([]); // Clear old data immediately on month change
      try {
        const y = Number(filters.year);
        const m = Number(filters.month);
        const lastDay = daysInMonth(y, m);

        const params = {
          from: fmt(y, m, 1),
          to: fmt(y, m, lastDay),
        };
        if (filters.employeeId) params.employeeId = filters.employeeId;

        const { data } = await api.listAttendance(params);
        if (!cancelled) {
          setAttendance(data.data.attendance || []);
        }
      } catch (err) {
        console.error('Load attendance error:', err);
        if (!cancelled) setAttendance([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [filters.month, filters.year, filters.employeeId]);

  const year = Number(filters.year);
  const month = Number(filters.month);
  const totalDays = daysInMonth(year, month);

  /* Build matrix: employee → { day: status } */
  const matrix = useMemo(() => {
    const map = new Map();

    // Seed all employees (admin view)
    if (!isEmployee) {
      const list = filters.employeeId
        ? employees.filter((e) => e._id === filters.employeeId)
        : employees;
      list.forEach((e) => {
        map.set(e._id, {
          employee: {
            _id: e._id,
            name: e.name,
            code: e.employeeCode,
            designation: e.designation || '—',
          },
          days: {},
        });
      });
    }

    attendance.forEach((a) => {
      const empId = a.employeeId?._id || a.employeeId;
      const day = Number(a.date.split('-')[2]);

      if (!map.has(empId)) {
        map.set(empId, {
          employee: {
            _id: empId,
            name: a.employeeId?.name || user.name || '—',
            code: a.employeeId?.employeeCode || user.username || '—',
            designation: a.employeeId?.designation || '—',
          },
          days: {},
        });
      }
      map.get(empId).days[day] = a.status;
    });

    return Array.from(map.values()).sort((a, b) =>
      String(a.employee.code).localeCompare(String(b.employee.code))
    );
  }, [attendance, employees, filters.employeeId, isEmployee, user]);

  /* Totals — P and A only */
  const totals = useMemo(() => {
    let p = 0, a = 0;
    attendance.forEach((row) => {
      if (row.status === 'PRESENT') p++;
      else if (row.status === 'ABSENT') a++;
    });
    return { p, a };
  }, [attendance]);

  /* Export Excel (matrix format — same as UI) */
  const handleExport = async () => {
    try {
      const { data } = await api.exportAttendanceCSV({
        from: fmt(year, month, 1),
        to: fmt(year, month, totalDays),
      });

      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `attendance-${MONTHS[month - 1]}-${year}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export error:', err);
      alert('Failed to export attendance. Please try again.');
    }
  };

  return (
    <>
      <PageHeader
        title="Attendance"
        subtitle={`${MONTHS[month - 1]} ${year} — ${matrix.length} employee(s)`}
        actions={
          <Button variant="ghost" onClick={handleExport}>
            Export Excel
          </Button>
        }
      />

      <AttendanceFilter
        filters={filters}
        onChange={setFilters}
        showEmployeeFilter={!isEmployee}
        employees={employees}
      />

      {/* Summary Chips */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          marginBottom: 16,
          fontSize: 13,
          alignItems: 'center',
        }}
      >
        <span
          style={{
            background: '#DCFCE7',
            color: '#15803D',
            padding: '4px 10px',
            borderRadius: 6,
            fontWeight: 600,
            border: '1px solid #86EFAC',
          }}
        >
          P: {totals.p}
        </span>
        <span
          style={{
            background: '#FEE2E2',
            color: '#B91C1C',
            padding: '4px 10px',
            borderRadius: 6,
            fontWeight: 600,
            border: '1px solid #FCA5A5',
          }}
        >
          A: {totals.a}
        </span>
      </div>

      {loading ? (
        <Loader />
      ) : matrix.length === 0 ? (
        <EmptyState month={MONTHS[month - 1]} year={year} />
      ) : (
        <AttendanceMatrix matrix={matrix} totalDays={totalDays} />
      )}
    </>
  );
}

/* Compact matrix */
function AttendanceMatrix({ matrix, totalDays }) {
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  const nameColWidth = 180;
  const dayColWidth = 28;
  const totalColWidth = 36;

  return (
    <div
      style={{
        background: theme.colors.surface,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadow.sm,
        border: `1px solid ${theme.colors.border}`,
        overflowX: 'auto',
        width: '100%',
      }}
    >
      <table
        style={{
          borderCollapse: 'separate',
          borderSpacing: 0,
          fontSize: 11,
          width: '100%',
          minWidth: nameColWidth + (totalDays * dayColWidth) + (totalColWidth * 2),
        }}
      >
        <colgroup>
          <col style={{ width: nameColWidth }} />
          {days.map((d) => (
            <col key={d} style={{ width: dayColWidth }} />
          ))}
          <col style={{ width: totalColWidth }} />
          <col style={{ width: totalColWidth }} />
        </colgroup>

        <thead>
          <tr>
            <th
              style={{
                position: 'sticky',
                top: 0,
                left: 0,
                zIndex: 4,
                background: theme.colors.background,
                padding: '10px 12px',
                textAlign: 'left',
                fontWeight: 700,
                fontSize: 10,
                color: theme.colors.text,
                borderBottom: `1px solid ${theme.colors.border}`,
                letterSpacing: 0.5,
              }}
            >
              EMPLOYEE
            </th>
            {days.map((d) => (
              <th
                key={d}
                style={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 2,
                  background: theme.colors.background,
                  padding: '8px 0',
                  textAlign: 'center',
                  fontWeight: 600,
                  fontSize: 10,
                  color: theme.colors.muted,
                  borderBottom: `1px solid ${theme.colors.border}`,
                }}
              >
                {d}
              </th>
            ))}
            <th
              style={{
                position: 'sticky',
                top: 0,
                right: totalColWidth,
                zIndex: 4,
                background: theme.colors.background,
                padding: '8px 4px',
                textAlign: 'center',
                fontWeight: 700,
                fontSize: 10,
                color: '#15803D',
                borderBottom: `1px solid ${theme.colors.border}`,
                borderLeft: `1px solid ${theme.colors.border}`,
              }}
            >
              P
            </th>
            <th
              style={{
                position: 'sticky',
                top: 0,
                right: 0,
                zIndex: 4,
                background: theme.colors.background,
                padding: '8px 4px',
                textAlign: 'center',
                fontWeight: 700,
                fontSize: 10,
                color: '#B91C1C',
                borderBottom: `1px solid ${theme.colors.border}`,
              }}
            >
              A
            </th>
          </tr>
        </thead>

        <tbody>
          {matrix.map(({ employee, days: dayMap }) => {
            let pCount = 0;
            let aCount = 0;
            days.forEach((d) => {
              if (dayMap[d] === 'PRESENT') pCount++;
              else if (dayMap[d] === 'ABSENT') aCount++;
            });

            return (
              <tr key={employee._id}>
                <td
                  style={{
                    position: 'sticky',
                    left: 0,
                    zIndex: 3,
                    background: theme.colors.surface,
                    padding: '8px 12px',
                    borderBottom: `1px solid ${theme.colors.border}`,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 12,
                      color: theme.colors.text,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    title={`${employee.name} (${employee.code})`}
                  >
                    {employee.name}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: theme.colors.muted,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    title={`${employee.code} • ${employee.designation}`}
                  >
                    {employee.code} • {employee.designation}
                  </div>
                </td>

                {days.map((d) => {
                  const status = dayMap[d];
                  const ui = STATUS_UI[status];
                  return (
                    <td
                      key={d}
                      style={{
                        padding: '2px 0',
                        textAlign: 'center',
                        borderBottom: `1px solid ${theme.colors.border}`,
                      }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          margin: '0 auto',
                          borderRadius: 4,
                          background: ui?.bg || '#F8FAFC',
                          color: ui?.color || '#CBD5E1',
                          border: `1px solid ${ui?.border || '#E2E8F0'}`,
                          fontSize: 10,
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxSizing: 'border-box',
                        }}
                        title={status || 'No record'}
                      >
                        {ui?.label || ''}
                      </div>
                    </td>
                  );
                })}

                <td
                  style={{
                    position: 'sticky',
                    right: totalColWidth,
                    zIndex: 3,
                    background: theme.colors.surface,
                    padding: '6px 4px',
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: 11,
                    color: '#15803D',
                    borderBottom: `1px solid ${theme.colors.border}`,
                    borderLeft: `1px solid ${theme.colors.border}`,
                  }}
                >
                  {pCount}
                </td>
                <td
                  style={{
                    position: 'sticky',
                    right: 0,
                    zIndex: 3,
                    background: theme.colors.surface,
                    padding: '6px 4px',
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: 11,
                    color: '#B91C1C',
                    borderBottom: `1px solid ${theme.colors.border}`,
                  }}
                >
                  {aCount}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function EmptyState({ month, year }) {
  return (
    <div
      style={{
        padding: 40,
        background: theme.colors.surface,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadow.sm,
        border: `1px solid ${theme.colors.border}`,
        textAlign: 'center',
        color: theme.colors.muted,
        fontSize: 13,
      }}
    >
      <b>
        {month} {year}
      </b>{' '}
      ke liye koi attendance record nahi mila.
    </div>
  );
}

export function AttendanceTable({ attendance = [], loading = false }) {
  const columns = [
    { header: 'Date', key: 'date' },
    { header: 'Employee', render: (r) => r.employeeId?.name || '—' },
    { header: 'Code', render: (r) => r.employeeId?.employeeCode || '—' },
    {
      header: 'Status',
      render: (r) => (
        <Badge
          variant={
            r.status === 'PRESENT' ? 'success' : r.status === 'ABSENT' ? 'danger' : 'warning'
          }
        >
          {r.status}
        </Badge>
      ),
    },
    { header: 'Source', key: 'source' },
  ];
  return <Table columns={columns} data={attendance} loading={loading} />;
}
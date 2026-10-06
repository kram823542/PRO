// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import PageHeader from '../../components/common/PageHeader.jsx';
// import EmployeeDetails from './EmployeeDetails.jsx';
// import Loader from '../../components/ui/Loader.jsx';
// import * as api from './employees.api.js';

// export default function EmployeeProfilePage() {
//   const { id } = useParams();
//   const [employee, setEmployee] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       try {
//         const { data } = await api.getEmployee(id);
//         setEmployee(data.data);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [id]);

//   if (loading) return <Loader />;
//   if (!employee) return <p>Employee not found</p>;

//   return (
//     <>
//       <PageHeader title={employee.name} subtitle={`Code: ${employee.employeeCode}`} />
//       <EmployeeDetails employee={employee} />
//     </>
//   );
// }



import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader.jsx';
import EmployeeDetails from './EmployeeDetails.jsx';
import Loader from '../../components/ui/Loader.jsx';
import { theme } from '../../config/theme.js';
import * as api from './employees.api.js';

export default function EmployeeProfilePage() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.getEmployee(id);
        setEmployee(data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load employee');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <Loader />;
  if (error)
    return (
      <p style={{ color: theme.colors.danger, fontSize: 14 }}>{error}</p>
    );
  if (!employee) return <p>Employee not found</p>;

  return (
    <>
      <PageHeader title={employee.name} subtitle={`Code: ${employee.employeeCode}`} />
      <EmployeeDetails employee={employee} />
    </>
  );
}
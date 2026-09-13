// import { useState, useEffect } from 'react';
// import { getEmployeesApi, getClfsApi } from '../api/adminApi';
// import Loader from '../components/Loader';
// import toast from 'react-hot-toast';

// const AdminSuperEmployees = () => {
//   const [employees, setEmployees] = useState([]);
//   const [clfs, setClfs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     clfId: '',
//     employeeType: '',
//     status: '',
//     search: '',
//   });

//   useEffect(() => {
//     fetchClfs();
//   }, []);

//   useEffect(() => {
//     fetchEmployees();
//   }, [filters]);

//   const fetchClfs = async () => {
//     try {
//       const data = await getClfsApi();
//       setClfs(data.clfs || []);
//     } catch (error) {
//       // silent
//     }
//   };

//   const fetchEmployees = async () => {
//     setLoading(true);
//     try {
//       const params = {};
//       if (filters.clfId) params.clfId = filters.clfId;
//       if (filters.employeeType) params.employeeType = filters.employeeType;
//       if (filters.status) params.status = filters.status;
//       if (filters.search) params.search = filters.search;
//       const data = await getEmployeesApi(params);
//       setEmployees(data.employees || []);
//     } catch (error) {
//       toast.error('Failed to load employees');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 md:p-8">
//       <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6">
//         All Employees
//       </h1>

//       <div className="card mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div>
//             <label className="label">Search</label>
//             <input
//               type="text"
//               value={filters.search}
//               onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//               placeholder="Name or ID"
//               className="input-field"
//             />
//           </div>
//           <div>
//             <label className="label">CLF</label>
//             <select
//               value={filters.clfId}
//               onChange={(e) => setFilters({ ...filters, clfId: e.target.value })}
//               className="input-field"
//             >
//               <option value="">All CLFs</option>
//               {clfs.map((c) => (
//                 <option key={c._id} value={c._id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="label">Type</label>
//             <select
//               value={filters.employeeType}
//               onChange={(e) =>
//                 setFilters({ ...filters, employeeType: e.target.value })
//               }
//               className="input-field"
//             >
//               <option value="">All Types</option>
//               <option>CADER</option>
//               <option>Bank Sakhi</option>
//               <option>BDSP</option>
//               <option>FLCRP</option>
//               <option>Gender CRP</option>
//               <option>Setu</option>
//               <option>Senior Setu</option>
//             </select>
//           </div>
//           <div>
//             <label className="label">Status</label>
//             <select
//               value={filters.status}
//               onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//               className="input-field"
//             >
//               <option value="">All</option>
//               <option value="ACTIVE">Active</option>
//               <option value="INACTIVE">Inactive</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {loading ? (
//         <Loader />
//       ) : employees.length === 0 ? (
//         <div className="card text-center py-12">
//           <p className="text-gray-500">No employees found</p>
//         </div>
//       ) : (
//         <div className="card overflow-x-auto">
//           <table className="w-full min-w-[700px]">
//             <thead className="bg-primary text-white">
//               <tr>
//                 <th className="text-left p-3 text-sm">Name</th>
//                 <th className="text-left p-3 text-sm">User ID</th>
//                 <th className="text-left p-3 text-sm">Type</th>
//                 <th className="text-left p-3 text-sm">CLF</th>
//                 <th className="text-left p-3 text-sm">Mobile</th>
//                 <th className="text-left p-3 text-sm">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {employees.map((emp) => (
//                 <tr key={emp._id} className="border-b hover:bg-gray-50">
//                   <td className="p-3 text-sm font-semibold text-primary">
//                     {emp.name}
//                   </td>
//                   <td className="p-3 text-sm text-gray-700">{emp.userId}</td>
//                   <td className="p-3 text-sm text-gray-700">{emp.employeeType}</td>
//                   <td className="p-3 text-sm text-gray-700">
//                     {emp.clfId?.name || '-'}
//                   </td>
//                   <td className="p-3 text-sm text-gray-700">{emp.mobile || '-'}</td>
//                   <td className="p-3">
//                     <span
//                       className={`text-xs px-2 py-1 rounded-full font-bold ${
//                         emp.status === 'ACTIVE'
//                           ? 'bg-green-100 text-green-800'
//                           : 'bg-red-100 text-red-800'
//                       }`}
//                     >
//                       {emp.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminSuperEmployees;


import { useState, useEffect } from 'react';
import { getEmployeesApi, getClfsApi } from '../api/adminApi';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const AdminSuperEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [clfs, setClfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    clfId: '',
    employeeType: '',
    status: '',
    search: '',
  });

  useEffect(() => {
    fetchClfs();
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [filters]);

  const fetchClfs = async () => {
    try {
      const data = await getClfsApi();
      setClfs(data.clfs || []);
    } catch (error) {
      // silent
    }
  };

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.clfId) params.clfId = filters.clfId;
      if (filters.employeeType) params.employeeType = filters.employeeType;
      if (filters.status) params.status = filters.status;
      if (filters.search) params.search = filters.search;
      const data = await getEmployeesApi(params);
      setEmployees(data.employees || []);
    } catch (error) {
      toast.error('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-black min-h-screen text-white">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
        All Employees
      </h1>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-1">Search</label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Name or ID"
              className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-1">CLF</label>
            <select
              value={filters.clfId}
              onChange={(e) => setFilters({ ...filters, clfId: e.target.value })}
              className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white"
            >
              <option value="" className="bg-black text-white">All CLFs</option>
              {clfs.map((c) => (
                <option key={c._id} value={c._id} className="bg-black text-white">
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-1">Type</label>
            <select
              value={filters.employeeType}
              onChange={(e) =>
                setFilters({ ...filters, employeeType: e.target.value })
              }
              className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white"
            >
              <option value="" className="bg-black text-white">All Types</option>
              <option className="bg-black text-white">CADER</option>
              <option className="bg-black text-white">Bank Sakhi</option>
              <option className="bg-black text-white">BDSP</option>
              <option className="bg-black text-white">FLCRP</option>
              <option className="bg-black text-white">Gender CRP</option>
              <option className="bg-black text-white">Setu</option>
              <option className="bg-black text-white">Senior Setu</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white"
            >
              <option value="" className="bg-black text-white">All</option>
              <option value="ACTIVE" className="bg-black text-white">Active</option>
              <option value="INACTIVE" className="bg-black text-white">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : employees.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl text-center py-12">
          <p className="text-zinc-400">No employees found</p>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-zinc-800 text-white border-b border-zinc-700">
              <tr>
                <th className="text-left p-3 text-sm font-semibold">Name</th>
                <th className="text-left p-3 text-sm font-semibold">User ID</th>
                <th className="text-left p-3 text-sm font-semibold">Type</th>
                <th className="text-left p-3 text-sm font-semibold">CLF</th>
                <th className="text-left p-3 text-sm font-semibold">Mobile</th>
                <th className="text-left p-3 text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {employees.map((emp) => (
                <tr key={emp._id} className="hover:bg-zinc-800/50">
                  <td className="p-3 text-sm font-semibold text-white">
                    {emp.name}
                  </td>
                  <td className="p-3 text-sm text-zinc-300">{emp.userId}</td>
                  <td className="p-3 text-sm text-zinc-300">{emp.employeeType}</td>
                  <td className="p-3 text-sm text-zinc-300">
                    {emp.clfId?.name || '-'}
                  </td>
                  <td className="p-3 text-sm text-zinc-300">{emp.mobile || '-'}</td>
                  <td className="p-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-bold border ${
                        emp.status === 'ACTIVE'
                          ? 'bg-zinc-100 text-black border-white'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminSuperEmployees;
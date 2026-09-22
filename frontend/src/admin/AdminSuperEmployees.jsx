
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
//     <div className="p-4 md:p-8 bg-black min-h-screen text-white">
//       <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
//         All Employees
//       </h1>

//       <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6 shadow-md">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div>
//             <label className="block text-sm font-semibold text-zinc-300 mb-1">Search</label>
//             <input
//               type="text"
//               value={filters.search}
//               onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//               placeholder="Name or ID"
//               className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-white"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-zinc-300 mb-1">CLF</label>
//             <select
//               value={filters.clfId}
//               onChange={(e) => setFilters({ ...filters, clfId: e.target.value })}
//               className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white"
//             >
//               <option value="" className="bg-black text-white">All CLFs</option>
//               {clfs.map((c) => (
//                 <option key={c._id} value={c._id} className="bg-black text-white">
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-zinc-300 mb-1">Type</label>
//             <select
//               value={filters.employeeType}
//               onChange={(e) =>
//                 setFilters({ ...filters, employeeType: e.target.value })
//               }
//               className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white"
//             >
//               <option value="" className="bg-black text-white">All Types</option>
//               <option className="bg-black text-white">CADER</option>
//               <option className="bg-black text-white">Bank Sakhi</option>
//               <option className="bg-black text-white">BDSP</option>
//               <option className="bg-black text-white">FLCRP</option>
//               <option className="bg-black text-white">Gender CRP</option>
//               <option className="bg-black text-white">Setu</option>
//               <option className="bg-black text-white">Senior Setu</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-zinc-300 mb-1">Status</label>
//             <select
//               value={filters.status}
//               onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//               className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white"
//             >
//               <option value="" className="bg-black text-white">All</option>
//               <option value="ACTIVE" className="bg-black text-white">Active</option>
//               <option value="INACTIVE" className="bg-black text-white">Inactive</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {loading ? (
//         <Loader />
//       ) : employees.length === 0 ? (
//         <div className="bg-zinc-900 border border-zinc-800 rounded-xl text-center py-12">
//           <p className="text-zinc-400">No employees found</p>
//         </div>
//       ) : (
//         <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-x-auto">
//           <table className="w-full min-w-[700px]">
//             <thead className="bg-zinc-800 text-white border-b border-zinc-700">
//               <tr>
//                 <th className="text-left p-3 text-sm font-semibold">Name</th>
//                 <th className="text-left p-3 text-sm font-semibold">User ID</th>
//                 <th className="text-left p-3 text-sm font-semibold">Type</th>
//                 <th className="text-left p-3 text-sm font-semibold">CLF</th>
//                 <th className="text-left p-3 text-sm font-semibold">Mobile</th>
//                 <th className="text-left p-3 text-sm font-semibold">Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-zinc-800">
//               {employees.map((emp) => (
//                 <tr key={emp._id} className="hover:bg-zinc-800/50">
//                   <td className="p-3 text-sm font-semibold text-white">
//                     {emp.name}
//                   </td>
//                   <td className="p-3 text-sm text-zinc-300">{emp.userId}</td>
//                   <td className="p-3 text-sm text-zinc-300">{emp.employeeType}</td>
//                   <td className="p-3 text-sm text-zinc-300">
//                     {emp.clfId?.name || '-'}
//                   </td>
//                   <td className="p-3 text-sm text-zinc-300">{emp.mobile || '-'}</td>
//                   <td className="p-3">
//                     <span
//                       className={`text-xs px-2 py-1 rounded-full font-bold border ${
//                         emp.status === 'ACTIVE'
//                           ? 'bg-zinc-100 text-black border-white'
//                           : 'bg-zinc-800 text-zinc-400 border-zinc-700'
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
    designation: '',
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
      if (filters.designation) params.designation = filters.designation;
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
            <label className="block text-sm font-semibold text-zinc-300 mb-1">
              Search
            </label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Name or ID"
              className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-1">
              CLF
            </label>
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
            <label className="block text-sm font-semibold text-zinc-300 mb-1">
              Designation
            </label>
            <select
              value={filters.designation}
              onChange={(e) =>
                setFilters({ ...filters, designation: e.target.value })
              }
              className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-white"
            >
              <option value="" className="bg-black text-white">All Designations</option>
              <option className="bg-black text-white">Block Coordinator</option>
              <option className="bg-black text-white">Cluster Coordinator</option>
              <option className="bg-black text-white">Field Officer</option>
              <option className="bg-black text-white">Field Worker</option>
              <option className="bg-black text-white">Accountant</option>
              <option className="bg-black text-white">Data Entry Operator</option>
              <option className="bg-black text-white">Office Assistant</option>
              <option className="bg-black text-white">Manager</option>
              <option className="bg-black text-white">Assistant Manager</option>
              <option className="bg-black text-white">Supervisor</option>
              <option className="bg-black text-white">Trainer</option>
              <option className="bg-black text-white">Community Mobilizer</option>
              <option className="bg-black text-white">Social Worker</option>
              <option className="bg-black text-white">Program Officer</option>
              <option className="bg-black text-white">Project Coordinator</option>
              <option className="bg-black text-white">Book Keeper</option>
              <option className="bg-black text-white">Cashier</option>
              <option className="bg-black text-white">Clerk</option>
              <option className="bg-black text-white">Peon</option>
              <option className="bg-black text-white">Driver</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-zinc-300 mb-1">
              Status
            </label>
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
          <table className="w-full min-w-[800px]">
            <thead className="bg-zinc-800 text-white border-b border-zinc-700">
              <tr>
                <th className="text-left p-3 text-sm font-semibold">Photo</th>
                <th className="text-left p-3 text-sm font-semibold">Name</th>
                <th className="text-left p-3 text-sm font-semibold">User ID</th>
                <th className="text-left p-3 text-sm font-semibold">Designation</th>
                <th className="text-left p-3 text-sm font-semibold">CLF</th>
                <th className="text-left p-3 text-sm font-semibold">Mobile</th>
                <th className="text-left p-3 text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {employees.map((emp) => (
                <tr key={emp._id} className="hover:bg-zinc-800/50">
                  <td className="p-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white font-bold text-sm overflow-hidden">
                      {emp.profilePicture ? (
                        <img
                          src={emp.profilePicture}
                          alt={emp.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        emp.name?.charAt(0).toUpperCase()
                      )}
                    </div>
                  </td>
                  <td className="p-3 text-sm font-semibold text-white">
                    {emp.name}
                  </td>
                  <td className="p-3 text-sm text-zinc-300 font-mono">
                    {emp.userId}
                  </td>
                  <td className="p-3 text-sm text-zinc-300">
                    {emp.designation || '-'}
                  </td>
                  <td className="p-3 text-sm text-zinc-300">
                    {emp.clfId?.name || '-'}
                  </td>
                  <td className="p-3 text-sm text-zinc-300">
                    {emp.mobile || '-'}
                  </td>
                  <td className="p-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-bold border ${
                        emp.status === 'ACTIVE'
                          ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60'
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
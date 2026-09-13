// // Same as AdminClfSubmissions — Super Admin sees all CLFs' pending items
// import AdminClfSubmissions from './AdminClfSubmissions';

// const AdminSuperSubmissions = () => {
//   return <AdminClfSubmissions />;
// };

// export default AdminSuperSubmissions;

// Super Admin sees all CLFs' pending items with unified Dark/Monochrome styles
import AdminClfSubmissions from './AdminClfSubmissions';

const AdminSuperSubmissions = () => {
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <AdminClfSubmissions />
    </div>
  );
};

export default AdminSuperSubmissions;
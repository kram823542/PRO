// import express from 'express';
// import { applyLeave, getMyLeaves, cancelLeave } from './leave.controller.js';
// // import { auth } from '../../middlewares/auth.middleware.js'; // Apne project ka auth middleware import karein

// const router = express.Router();

// // Sabhi routes protected honge (employee login hona chahiye)
// // router.use(auth); 

// // Apply for leave
// router.post('/apply', applyLeave);

// // Get my leave history
// router.get('/my-leaves', getMyLeaves);

// // Cancel a pending leave
// router.delete('/:id', cancelLeave);

// export default router;



// import express from 'express';
// import { applyLeave, getMyLeaves, cancelLeave } from './leave.controller.js';

// // ✅ FIX: 'auth' ki jagah 'authenticate' import kiya (kyunki middleware me yahi naam hai)
// import { authenticate } from '../../middlewares/auth.middleware.js'; 

// const router = express.Router();

// // ✅ Middleware apply karo
// router.use(authenticate); 

// router.post('/apply', applyLeave);
// router.get('/my-leaves', getMyLeaves);
// router.delete('/:id', cancelLeave);

// export default router;


// import express from 'express';
// import { applyLeave, getMyLeaves, cancelLeave, getAllLeavesForAdmin } from './leave.controller.js'; // ✅ getAllLeavesForAdmin import kiya
// import { authenticate } from '../../middlewares/auth.middleware.js'; 

// const router = express.Router();
// router.use(authenticate); 

// router.post('/apply', applyLeave);
// router.get('/my-leaves', getMyLeaves);
// router.delete('/:id', cancelLeave);
// router.get('/admin/all', getAllLeavesForAdmin); // ✅ NAYA: Admin route

// export default router;



import express from 'express';
import { 
  applyLeave, 
  getMyLeaves, 
  cancelLeave, 
  getAllLeavesForAdmin, 
  updateLeaveStatus, 
  downloadLeavePDF // ✅ NAYA: PDF function import kiya
} from './leave.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js'; 

const router = express.Router();
router.use(authenticate); 

router.post('/apply', applyLeave);
router.get('/my-leaves', getMyLeaves);
router.delete('/:id', cancelLeave);
router.get('/admin/all', getAllLeavesForAdmin);
router.put('/admin/:id/status', updateLeaveStatus);

// ✅ NAYA: PDF Download route add kiya
router.get('/:id/download-pdf', downloadLeavePDF); 

export default router;
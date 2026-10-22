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
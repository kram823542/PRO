// import mongoose from 'mongoose';
// import { Employee } from './employee.model.js';
// import { CLF } from '../clfs/clf.model.js';
// import { User } from '../users/user.model.js';
// import { ApiError } from '../../utils/ApiError.js';
// import { encrypt, decrypt, maskAadhaar, maskAccount, generatePassword } from '../../utils/security.js';
// import { createAudit } from '../../middlewares/audit.middleware.js';

// /** CLF creates employee in own CLF */
// export const createEmployee = async (req, data) => {
//   const user = req.user;
//   const clfId = user.role === 'CLF' ? user.clfId : data.clfId;
//   if (!clfId) throw ApiError.badRequest('CLF is required');

//   const clf = await CLF.findById(clfId);
//   if (!clf) throw ApiError.notFound('CLF not found');

//   // Scope: CLF can only create in own CLF; BPM must have same block
//   if (user.role === 'CLF' && String(user.clfId) !== String(clf._id)) {
//     throw ApiError.forbidden('Access denied');
//   }
//   if (user.role === 'BPM' && String(user.blockId) !== String(clf.blockId)) {
//     throw ApiError.forbidden('Block mismatch');
//   }

//   const empCode = data.employeeCode?.toUpperCase();
//   const exists = await Employee.findOne({ employeeCode: empCode });
//   if (exists) throw ApiError.conflict('Employee code already exists');

//   const session = await mongoose.startSession();
//   let result;
//   try {
//     await session.withTransaction(async () => {
//       const tempPassword = generatePassword(10);
//       const username = empCode.toLowerCase();

//       const empUser = await User.create(
//         [
//           {
//             username,
//             password: tempPassword,
//             role: 'EMPLOYEE',
//             name: data.name,
//             mobile: data.mobile,
//             blockId: clf.blockId,
//             clfId: clf._id,
//             createdBy: user._id,
//             mustChangePassword: true,
//           },
//         ],
//         { session }
//       );

//       const employee = await Employee.create(
//         [
//           {
//             employeeCode: empCode,
//             name: data.name,
//             mobile: data.mobile,
//             designation: data.designation,
//             joiningDate: data.joiningDate,
//             aadhaarNumber: data.aadhaarNumber ? encrypt(data.aadhaarNumber) : undefined,
//             bankDetails: {
//               bankName: data.bankDetails?.bankName,
//               accountNumber: data.bankDetails?.accountNumber
//                 ? encrypt(data.bankDetails.accountNumber)
//                 : undefined,
//               branch: data.bankDetails?.branch,
//               ifsc: data.bankDetails?.ifsc?.toUpperCase(),
//             },
//             workLocation: { panchayat: data.workLocation.panchayat },
//             profilePhoto: data.profilePhoto,
//             clfId: clf._id,
//             blockId: clf.blockId,
//             userId: empUser[0]._id,
//             createdBy: user._id,
//           },
//         ],
//         { session }
//       );

//       await User.findByIdAndUpdate(
//         empUser[0]._id,
//         { employeeId: employee[0]._id },
//         { session }
//       );

//       result = { employee: employee[0], login: { username, tempPassword } };
//     });

//     await createAudit({
//       req,
//       action: 'EMPLOYEE_CREATED',
//       targetType: 'Employee',
//       targetId: result.employee._id,
//       metadata: { employeeCode: empCode, clfId },
//     });

//     return result;
//   } finally {
//     await session.endSession();
//   }
// };

// /** Sanitize employee output - decrypt+mask sensitive fields if authorized */
// export const formatEmployee = (emp, { revealSensitive = false } = {}) => {
//   const obj = emp.toObject ? emp.toObject() : emp;
//   return {
//     ...obj,
//     aadhaarNumber: revealSensitive && obj.aadhaarNumber
//       ? maskAadhaar(decrypt(obj.aadhaarNumber))
//       : obj.aadhaarNumber
//         ? 'XXXX-XXXX-XXXX'
//         : null,
//     bankDetails: {
//       ...obj.bankDetails,
//       accountNumber: revealSensitive && obj.bankDetails?.accountNumber
//         ? maskAccount(decrypt(obj.bankDetails.accountNumber))
//         : obj.bankDetails?.accountNumber
//           ? 'XXXXXXXX'
//           : null,
//     },
//   };
// };

// /** Scope list */
// export const listEmployees = async (req, query) => {
//   const user = req.user;
//   const filter = {};

//   if (user.role === 'CLF') filter.clfId = user.clfId;
//   else if (user.role === 'BPM') filter.blockId = user.blockId;
//   else if (user.role === 'SUPER_ADMIN' && query.clfId) filter.clfId = query.clfId;

//   if (query.status) filter.status = query.status;
//   if (query.search) {
//     filter.$or = [
//       { name: new RegExp(query.search, 'i') },
//       { employeeCode: new RegExp(query.search, 'i') },
//       { mobile: new RegExp(query.search, 'i') },
//     ];
//   }

//   const page = Math.max(1, parseInt(query.page) || 1);
//   const limit = Math.min(100, parseInt(query.limit) || 20);

//   const [employees, total] = await Promise.all([
//     Employee.find(filter)
//       .populate('clfId', 'name code')
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(limit),
//     Employee.countDocuments(filter),
//   ]);

//   // Employees only see self
//   if (user.role === 'EMPLOYEE') {
//     return {
//       employees: employees.filter((e) => String(e.userId) === String(user._id)),
//       pagination: { page, limit, total: 1, pages: 1 },
//     };
//   }

//   return {
//     employees: employees.map((e) => formatEmployee(e, { revealSensitive: false })),
//     pagination: { page, limit, total, pages: Math.ceil(total / limit) },
//   };
// };

// /** Get employee with access scope */
// export const getEmployee = async (req, id) => {
//   const emp = await Employee.findById(id).populate('clfId', 'name code blockId');
//   if (!emp) throw ApiError.notFound('Employee not found');
//   assertEmployeeAccess(req.user, emp);

//   const revealSensitive = ['CLF', 'SUPER_ADMIN'].includes(req.user.role);
//   return formatEmployee(emp, { revealSensitive });
// };

// export const assertEmployeeAccess = (user, emp) => {
//   if (user.role === 'SUPER_ADMIN') return;
//   if (user.role === 'BPM' && String(user.blockId) === String(emp.blockId)) return;
//   if (user.role === 'CLF' && String(user.clfId) === String(emp.clfId)) return;
//   if (user.role === 'EMPLOYEE' && String(user.employeeId) === String(emp._id)) return;
//   throw ApiError.forbidden('Access denied');
// };

// export const updateEmployee = async (req, id, data) => {
//   const emp = await Employee.findById(id);
//   if (!emp) throw ApiError.notFound('Employee not found');
//   if (req.user.role !== 'CLF' || String(req.user.clfId) !== String(emp.clfId)) {
//     if (req.user.role !== 'SUPER_ADMIN') throw ApiError.forbidden('Access denied');
//   }

//   const updatable = ['name', 'mobile', 'designation', 'joiningDate', 'profilePhoto'];
//   updatable.forEach((k) => {
//     if (data[k] !== undefined) emp[k] = data[k];
//   });
//   if (data.workLocation?.panchayat) {
//     emp.workLocation.panchayat = data.workLocation.panchayat;
//   }
//   if (data.bankDetails) {
//     if (data.bankDetails.bankName) emp.bankDetails.bankName = data.bankDetails.bankName;
//     if (data.bankDetails.accountNumber)
//       emp.bankDetails.accountNumber = encrypt(data.bankDetails.accountNumber);
//     if (data.bankDetails.branch) emp.bankDetails.branch = data.bankDetails.branch;
//     if (data.bankDetails.ifsc) emp.bankDetails.ifsc = data.bankDetails.ifsc.toUpperCase();
//   }
//   if (data.aadhaarNumber) emp.aadhaarNumber = encrypt(data.aadhaarNumber);

//   await emp.save();
//   await createAudit({ req, action: 'EMPLOYEE_UPDATED', targetType: 'Employee', targetId: emp._id });
//   return formatEmployee(emp, { revealSensitive: true });
// };

// export const setEmployeeStatus = async (req, id, status) => {
//   const emp = await Employee.findById(id);
//   if (!emp) throw ApiError.notFound('Employee not found');
//   if (req.user.role !== 'CLF' || String(req.user.clfId) !== String(emp.clfId)) {
//     if (req.user.role !== 'SUPER_ADMIN') throw ApiError.forbidden();
//   }
//   emp.status = status;
//   await emp.save();
//   await User.findByIdAndUpdate(emp.userId, {
//     status: status === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE',
//   });
//   await createAudit({ req, action: `EMPLOYEE_${status}`, targetType: 'Employee', targetId: id });
//   return emp;
// };





// import mongoose from 'mongoose';
// import { Employee } from './employee.model.js';
// import { CLF } from '../clfs/clf.model.js';
// import { User } from '../users/user.model.js';
// import { ApiError } from '../../utils/ApiError.js';
// import { encrypt, decrypt, maskAadhaar, maskAccount, generatePassword } from '../../utils/security.js';
// import { createAudit } from '../../middlewares/audit.middleware.js';

// /** CLF creates employee in own CLF */
// export const createEmployee = async (req, data) => {
//   const user = req.user;
//   const clfId = user.role === 'CLF' ? user.clfId : data.clfId;
//   if (!clfId) throw ApiError.badRequest('CLF is required');

//   const clf = await CLF.findById(clfId);
//   if (!clf) throw ApiError.notFound('CLF not found');

//   // Scope: CLF can only create in own CLF; BPM must have same block
//   if (user.role === 'CLF' && String(user.clfId) !== String(clf._id)) {
//     throw ApiError.forbidden('Access denied');
//   }
//   if (user.role === 'BPM' && String(user.blockId) !== String(clf.blockId)) {
//     throw ApiError.forbidden('Block mismatch');
//   }

//   const empCode = data.employeeCode?.toUpperCase();
//   const exists = await Employee.findOne({ employeeCode: empCode });
//   if (exists) throw ApiError.conflict('Employee code already exists');

//   const session = await mongoose.startSession();
//   let result;
//   try {
//     await session.withTransaction(async () => {
//       const tempPassword = generatePassword(10);
//       const username = empCode.toLowerCase();

//       const empUser = await User.create(
//         [
//           {
//             username,
//             password: tempPassword,
//             role: 'EMPLOYEE',
//             name: data.name,
//             mobile: data.mobile,
//             blockId: clf.blockId,
//             clfId: clf._id,
//             createdBy: user._id,
//             mustChangePassword: true,
//           },
//         ],
//         { session }
//       );

//       const employee = await Employee.create(
//         [
//           {
//             employeeCode: empCode,
//             name: data.name,
//             mobile: data.mobile,
//             designation: data.designation,
//             joiningDate: data.joiningDate,
//             aadhaarNumber: data.aadhaarNumber ? encrypt(data.aadhaarNumber) : undefined,
//             bankDetails: {
//               bankName: data.bankDetails?.bankName,
//               accountNumber: data.bankDetails?.accountNumber
//                 ? encrypt(data.bankDetails.accountNumber)
//                 : undefined,
//               branch: data.bankDetails?.branch,
//               ifsc: data.bankDetails?.ifsc?.toUpperCase(),
//             },
//             workLocation: { panchayat: data.workLocation.panchayat },
//             profilePhoto: data.profilePhoto,
//             clfId: clf._id,
//             blockId: clf.blockId,
//             userId: empUser[0]._id,
//             createdBy: user._id,
//           },
//         ],
//         { session }
//       );

//       await User.findByIdAndUpdate(
//         empUser[0]._id,
//         { employeeId: employee[0]._id },
//         { session }
//       );

//       result = { employee: employee[0], login: { username, tempPassword } };
//     });

//     await createAudit({
//       req,
//       action: 'EMPLOYEE_CREATED',
//       targetType: 'Employee',
//       targetId: result.employee._id,
//       metadata: { employeeCode: empCode, clfId },
//     });

//     return result;
//   } finally {
//     await session.endSession();
//   }
// };

// /** Sanitize employee output - decrypt+mask sensitive fields if authorized */
// export const formatEmployee = (emp, { revealSensitive = false } = {}) => {
//   const obj = emp.toObject ? emp.toObject() : emp;

//   // Mask Aadhaar
//   let aadhaarOut = null;
//   if (obj.aadhaarNumber) {
//     if (revealSensitive) {
//       const plain = decrypt(obj.aadhaarNumber);
//       aadhaarOut = plain ? maskAadhaar(plain) : null;
//     } else {
//       aadhaarOut = 'XXXX-XXXX-XXXX';
//     }
//   }

//   // Mask Bank Account
//   let accountOut = null;
//   if (obj.bankDetails?.accountNumber) {
//     if (revealSensitive) {
//       const plain = decrypt(obj.bankDetails.accountNumber);
//       accountOut = plain ? maskAccount(plain) : null;
//     } else {
//       accountOut = 'XXXXXXXX';
//     }
//   }

//   return {
//     ...obj,
//     aadhaarNumber: aadhaarOut,
//     bankDetails: {
//       ...obj.bankDetails,
//       accountNumber: accountOut,
//     },
//   };
// };

// /** Scope list */
// export const listEmployees = async (req, query) => {
//   const user = req.user;
//   const filter = {};

//   if (user.role === 'CLF') filter.clfId = user.clfId;
//   else if (user.role === 'BPM') filter.blockId = user.blockId;
//   else if (user.role === 'SUPER_ADMIN' && query.clfId) filter.clfId = query.clfId;

//   if (query.status) filter.status = query.status;
//   if (query.search) {
//     filter.$or = [
//       { name: new RegExp(query.search, 'i') },
//       { employeeCode: new RegExp(query.search, 'i') },
//       { mobile: new RegExp(query.search, 'i') },
//     ];
//   }

//   const page = Math.max(1, parseInt(query.page) || 1);
//   const limit = Math.min(100, parseInt(query.limit) || 20);

//   const [employees, total] = await Promise.all([
//     Employee.find(filter)
//       .populate('clfId', 'name code')
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(limit),
//     Employee.countDocuments(filter),
//   ]);

//   // Employees only see self
//   if (user.role === 'EMPLOYEE') {
//     return {
//       employees: employees.filter((e) => String(e.userId) === String(user._id)),
//       pagination: { page, limit, total: 1, pages: 1 },
//     };
//   }

//   return {
//     employees: employees.map((e) => formatEmployee(e, { revealSensitive: false })),
//     pagination: { page, limit, total, pages: Math.ceil(total / limit) },
//   };
// };

// /** ✅ FIXED: Get employee with access scope + sensitive fields */
// export const getEmployee = async (req, id) => {
//   // Step 1: fetch WITH sensitive fields (select: false वाले fields भी)
//   const emp = await Employee.findById(id).select(
//     '+aadhaarNumber +bankDetails.accountNumber'
//   );
//   if (!emp) throw ApiError.notFound('Employee not found');

//   // Step 2: access check on raw doc (clfId string, blockId string)
//   assertEmployeeAccess(req.user, emp);

//   // Step 3: now populate for response
//   const populated = await emp.populate('clfId', 'name code blockId');

//   const revealSensitive = ['CLF', 'SUPER_ADMIN'].includes(req.user.role);
//   return formatEmployee(populated, { revealSensitive });
// };

// /** ✅ FIXED: Handle populated + non-populated both */
// export const assertEmployeeAccess = (user, emp) => {
//   if (user.role === 'SUPER_ADMIN') return;

//   // Normalize: अगर populated object है तो _id निकालो, वरना string
//   const empClfId = emp.clfId?._id
//     ? String(emp.clfId._id)
//     : String(emp.clfId);

//   const empBlockId = emp.blockId?._id
//     ? String(emp.blockId._id)
//     : String(emp.blockId);

//   if (user.role === 'BPM' && String(user.blockId) === empBlockId) return;
//   if (user.role === 'CLF' && String(user.clfId) === empClfId) return;
//   if (user.role === 'EMPLOYEE' && String(user.employeeId) === String(emp._id)) return;

//   throw ApiError.forbidden('Access denied');
// };

// /** ✅ FIXED: Update with sensitive field access */
// export const updateEmployee = async (req, id, data) => {
//   const emp = await Employee.findById(id).select(
//     '+aadhaarNumber +bankDetails.accountNumber'
//   );
//   if (!emp) throw ApiError.notFound('Employee not found');

//   if (req.user.role !== 'CLF' || String(req.user.clfId) !== String(emp.clfId)) {
//     if (req.user.role !== 'SUPER_ADMIN') throw ApiError.forbidden('Access denied');
//   }

//   const updatable = ['name', 'mobile', 'designation', 'joiningDate', 'profilePhoto'];
//   updatable.forEach((k) => {
//     if (data[k] !== undefined) emp[k] = data[k];
//   });
//   if (data.workLocation?.panchayat) {
//     emp.workLocation.panchayat = data.workLocation.panchayat;
//   }
//   if (data.bankDetails) {
//     if (data.bankDetails.bankName) emp.bankDetails.bankName = data.bankDetails.bankName;
//     if (data.bankDetails.accountNumber)
//       emp.bankDetails.accountNumber = encrypt(data.bankDetails.accountNumber);
//     if (data.bankDetails.branch) emp.bankDetails.branch = data.bankDetails.branch;
//     if (data.bankDetails.ifsc) emp.bankDetails.ifsc = data.bankDetails.ifsc.toUpperCase();
//   }
//   if (data.aadhaarNumber) emp.aadhaarNumber = encrypt(data.aadhaarNumber);

//   await emp.save();
//   await createAudit({ req, action: 'EMPLOYEE_UPDATED', targetType: 'Employee', targetId: emp._id });
//   return formatEmployee(emp, { revealSensitive: true });
// };

// export const setEmployeeStatus = async (req, id, status) => {
//   const emp = await Employee.findById(id);
//   if (!emp) throw ApiError.notFound('Employee not found');
//   if (req.user.role !== 'CLF' || String(req.user.clfId) !== String(emp.clfId)) {
//     if (req.user.role !== 'SUPER_ADMIN') throw ApiError.forbidden();
//   }
//   emp.status = status;
//   await emp.save();
//   await User.findByIdAndUpdate(emp.userId, {
//     status: status === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE',
//   });
//   await createAudit({ req, action: `EMPLOYEE_${status}`, targetType: 'Employee', targetId: id });
//   return emp;
// };



// import mongoose from 'mongoose';
// import { Employee } from './employee.model.js';
// import { CLF } from '../clfs/clf.model.js';
// import { User } from '../users/user.model.js';
// import { ApiError } from '../../utils/ApiError.js';
// import { encrypt, decrypt, generatePassword } from '../../utils/security.js';
// import { createAudit } from '../../middlewares/audit.middleware.js';

// /** CLF creates employee in own CLF */
// export const createEmployee = async (req, data) => {
//   const user = req.user;
//   const clfId = user.role === 'CLF' ? user.clfId : data.clfId;
//   if (!clfId) throw ApiError.badRequest('CLF is required');

//   const clf = await CLF.findById(clfId);
//   if (!clf) throw ApiError.notFound('CLF not found');

//   if (user.role === 'CLF' && String(user.clfId) !== String(clf._id)) {
//     throw ApiError.forbidden('Access denied');
//   }
//   if (user.role === 'BPM' && String(user.blockId) !== String(clf.blockId)) {
//     throw ApiError.forbidden('Block mismatch');
//   }

//   const empCode = data.employeeCode?.toUpperCase();
//   const exists = await Employee.findOne({ employeeCode: empCode });
//   if (exists) throw ApiError.conflict('Employee code already exists');

//   const session = await mongoose.startSession();
//   let result;
//   try {
//     await session.withTransaction(async () => {
//       const tempPassword = generatePassword(10);
//       const username = empCode.toLowerCase();

//       const empUser = await User.create(
//         [
//           {
//             username,
//             password: tempPassword,
//             role: 'EMPLOYEE',
//             name: data.name,
//             mobile: data.mobile,
//             blockId: clf.blockId,
//             clfId: clf._id,
//             createdBy: user._id,
//             mustChangePassword: true,
//           },
//         ],
//         { session }
//       );

//       const employee = await Employee.create(
//         [
//           {
//             employeeCode: empCode,
//             name: data.name,
//             mobile: data.mobile,
//             designation: data.designation,
//             joiningDate: data.joiningDate,
//             aadhaarNumber: data.aadhaarNumber ? encrypt(data.aadhaarNumber) : undefined,
//             bankDetails: {
//               bankName: data.bankDetails?.bankName,
//               accountNumber: data.bankDetails?.accountNumber
//                 ? encrypt(data.bankDetails.accountNumber)
//                 : undefined,
//               branch: data.bankDetails?.branch,
//               ifsc: data.bankDetails?.ifsc?.toUpperCase(),
//             },
//             workLocation: { panchayat: data.workLocation.panchayat },
//             profilePhoto: data.profilePhoto,
//             clfId: clf._id,
//             blockId: clf.blockId,
//             userId: empUser[0]._id,
//             createdBy: user._id,
//           },
//         ],
//         { session }
//       );

//       await User.findByIdAndUpdate(
//         empUser[0]._id,
//         { employeeId: employee[0]._id },
//         { session }
//       );

//       result = { employee: employee[0], login: { username, tempPassword } };
//     });

//     await createAudit({
//       req,
//       action: 'EMPLOYEE_CREATED',
//       targetType: 'Employee',
//       targetId: result.employee._id,
//       metadata: { employeeCode: empCode, clfId },
//     });

//     return result;
//   } finally {
//     await session.endSession();
//   }
// };

// /** ✅ Decrypt Aadhaar/Account for CLF, BPM, SUPER_ADMIN */
// export const formatEmployee = (emp, { revealSensitive = false } = {}) => {
//   const obj = emp.toObject ? emp.toObject() : emp;

//   let aadhaarOut = null;
//   if (obj.aadhaarNumber) {
//     if (revealSensitive) {
//       aadhaarOut = decrypt(obj.aadhaarNumber) || 'XXXX-XXXX-XXXX';
//     } else {
//       aadhaarOut = 'XXXX-XXXX-XXXX';
//     }
//   }

//   let accountOut = null;
//   if (obj.bankDetails?.accountNumber) {
//     if (revealSensitive) {
//       accountOut = decrypt(obj.bankDetails.accountNumber) || 'XXXXXXXX';
//     } else {
//       accountOut = 'XXXXXXXX';
//     }
//   }

//   return {
//     ...obj,
//     aadhaarNumber: aadhaarOut,
//     bankDetails: {
//       ...obj.bankDetails,
//       accountNumber: accountOut,
//     },
//   };
// };

// /** Scope list */
// export const listEmployees = async (req, query) => {
//   const user = req.user;
//   const filter = {};

//   if (user.role === 'CLF') filter.clfId = user.clfId;
//   else if (user.role === 'BPM') filter.blockId = user.blockId;
//   else if (user.role === 'SUPER_ADMIN' && query.clfId) filter.clfId = query.clfId;

//   if (query.status) filter.status = query.status;
//   if (query.search) {
//     filter.$or = [
//       { name: new RegExp(query.search, 'i') },
//       { employeeCode: new RegExp(query.search, 'i') },
//       { mobile: new RegExp(query.search, 'i') },
//     ];
//   }

//   const page = Math.max(1, parseInt(query.page) || 1);
//   const limit = Math.min(100, parseInt(query.limit) || 20);

//   const [employees, total] = await Promise.all([
//     Employee.find(filter).populate('clfId', 'name code').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
//     Employee.countDocuments(filter),
//   ]);

//   if (user.role === 'EMPLOYEE') {
//     return {
//       employees: employees.filter((e) => String(e.userId) === String(user._id)),
//       pagination: { page, limit, total: 1, pages: 1 },
//     };
//   }

//   return {
//     employees: employees.map((e) => formatEmployee(e, { revealSensitive: false })),
//     pagination: { page, limit, total, pages: Math.ceil(total / limit) },
//   };
// };

// /** ✅ Get employee with access scope + sensitive fields (decrypted) */
// export const getEmployee = async (req, id) => {
//   const emp = await Employee.findById(id)
//     .select('+aadhaarNumber +bankDetails.accountNumber')
//     .populate('clfId', 'name code blockId');

//   if (!emp) throw ApiError.notFound('Employee not found');

//   assertEmployeeAccess(req.user, emp);

//   // ✅ CLF, BPM, SUPER_ADMIN को full decrypted data दिखे
//   const revealSensitive = ['CLF', 'BPM', 'SUPER_ADMIN'].includes(req.user.role);
//   return formatEmployee(emp, { revealSensitive });
// };

// export const assertEmployeeAccess = (user, emp) => {
//   if (user.role === 'SUPER_ADMIN') return;

//   const empClfId = emp.clfId?._id ? String(emp.clfId._id) : String(emp.clfId);
//   const empBlockId = emp.blockId?._id ? String(emp.blockId._id) : String(emp.blockId);

//   if (user.role === 'BPM' && String(user.blockId) === empBlockId) return;
//   if (user.role === 'CLF' && String(user.clfId) === empClfId) return;
//   if (user.role === 'EMPLOYEE' && String(user.employeeId) === String(emp._id)) return;

//   throw ApiError.forbidden('Access denied');
// };

// export const updateEmployee = async (req, id, data) => {
//   const emp = await Employee.findById(id).select('+aadhaarNumber +bankDetails.accountNumber');
//   if (!emp) throw ApiError.notFound('Employee not found');

//   if (req.user.role !== 'CLF' || String(req.user.clfId) !== String(emp.clfId)) {
//     if (req.user.role !== 'SUPER_ADMIN') throw ApiError.forbidden('Access denied');
//   }

//   const updatable = ['name', 'mobile', 'designation', 'joiningDate', 'profilePhoto'];
//   updatable.forEach((k) => {
//     if (data[k] !== undefined) emp[k] = data[k];
//   });
//   if (data.workLocation?.panchayat) {
//     emp.workLocation.panchayat = data.workLocation.panchayat;
//   }
//   if (data.bankDetails) {
//     if (data.bankDetails.bankName) emp.bankDetails.bankName = data.bankDetails.bankName;
//     if (data.bankDetails.accountNumber)
//       emp.bankDetails.accountNumber = encrypt(data.bankDetails.accountNumber);
//     if (data.bankDetails.branch) emp.bankDetails.branch = data.bankDetails.branch;
//     if (data.bankDetails.ifsc) emp.bankDetails.ifsc = data.bankDetails.ifsc.toUpperCase();
//   }
//   if (data.aadhaarNumber) emp.aadhaarNumber = encrypt(data.aadhaarNumber);

//   await emp.save();
//   await createAudit({ req, action: 'EMPLOYEE_UPDATED', targetType: 'Employee', targetId: emp._id });
//   return formatEmployee(emp, { revealSensitive: true });
// };

// export const setEmployeeStatus = async (req, id, status) => {
//   const emp = await Employee.findById(id);
//   if (!emp) throw ApiError.notFound('Employee not found');
//   if (req.user.role !== 'CLF' || String(req.user.clfId) !== String(emp.clfId)) {
//     if (req.user.role !== 'SUPER_ADMIN') throw ApiError.forbidden();
//   }
//   emp.status = status;
//   await emp.save();
//   await User.findByIdAndUpdate(emp.userId, {
//     status: status === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE',
//   });
//   await createAudit({ req, action: `EMPLOYEE_${status}`, targetType: 'Employee', targetId: id });
//   return emp;
// };


// /** Reset employee's user password → admin provides the new password */
// export const resetEmployeePassword = async (req, id, newPassword) => {
//   if (!newPassword || newPassword.length < 8) {
//     throw ApiError.badRequest('Password must be at least 8 characters');
//   }
//   if (!/(?=.*[A-Za-z])(?=.*\d)/.test(newPassword)) {
//     throw ApiError.badRequest('Password must contain letters and numbers');
//   }

//   const emp = await Employee.findById(id);
//   if (!emp) throw ApiError.notFound('Employee not found');

//   // ✅ Scope check
//   const user = req.user;
//   if (user.role === 'CLF' && String(user.clfId) !== String(emp.clfId)) {
//     throw ApiError.forbidden('Access denied');
//   }
//   if (user.role === 'BPM' && String(user.blockId) !== String(emp.blockId)) {
//     throw ApiError.forbidden('Access denied');
//   }
//   if (!['CLF', 'SUPER_ADMIN'].includes(user.role)) {
//     throw ApiError.forbidden('Only CLF or Super Admin can reset employee password');
//   }

//   const empUser = await User.findById(emp.userId);
//   if (!empUser) throw ApiError.notFound('Employee user account not found');

//   // ✅ Set the admin-provided password (model pre-save will hash it)
//   empUser.password = newPassword;
//   empUser.mustChangePassword = true;
//   empUser.loginAttempts = 0;
//   empUser.lockUntil = null;
//   await empUser.save();

//   await createAudit({
//     req,
//     action: 'EMPLOYEE_PASSWORD_RESET',
//     targetType: 'Employee',
//     targetId: emp._id,
//   });

//   return {
//     username: empUser.username,
//     // No tempPassword — admin already knows it
//     resetBy: user.role,
//   };
// };

// /** ✅ Permanently delete employee + linked user account */
// export const deleteEmployee = async (req, id) => {
//   const emp = await Employee.findById(id);
//   if (!emp) throw ApiError.notFound('Employee not found');

//   // ✅ Scope check
//   const user = req.user;
//   if (user.role === 'CLF' && String(user.clfId) !== String(emp.clfId)) {
//     throw ApiError.forbidden('Access denied');
//   }
//   if (user.role === 'BPM' && String(user.blockId) !== String(emp.blockId)) {
//     throw ApiError.forbidden('Access denied');
//   }
//   if (!['CLF', 'SUPER_ADMIN'].includes(user.role)) {
//     throw ApiError.forbidden('Only CLF or Super Admin can delete employee');
//   }

//   // Delete linked user account first
//   if (emp.userId) {
//     await User.findByIdAndDelete(emp.userId);
//   }

//   // Delete employee record
//   await Employee.findByIdAndDelete(id);

//   await createAudit({
//     req,
//     action: 'EMPLOYEE_DELETED',
//     targetType: 'Employee',
//     targetId: emp._id,
//     metadata: { employeeCode: emp.employeeCode, name: emp.name },
//   });

//   return { deleted: true, employeeCode: emp.employeeCode };
// };


import mongoose from 'mongoose';
import { Employee } from './employee.model.js';
import { CLF } from '../clfs/clf.model.js';
import { User } from '../users/user.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { encrypt, decrypt, generatePassword } from '../../utils/security.js';
import { createAudit } from '../../middlewares/audit.middleware.js';

/** CLF creates employee in own CLF */
export const createEmployee = async (req, data) => {
  const user = req.user;
  const clfId = user.role === 'CLF' ? user.clfId : data.clfId;
  if (!clfId) throw ApiError.badRequest('CLF is required');

  const clf = await CLF.findById(clfId);
  if (!clf) throw ApiError.notFound('CLF not found');

  if (user.role === 'CLF' && String(user.clfId) !== String(clf._id)) {
    throw ApiError.forbidden('Access denied');
  }
  if (user.role === 'BPM' && String(user.blockId) !== String(clf.blockId)) {
    throw ApiError.forbidden('Block mismatch');
  }

  const empCode = data.employeeCode?.toUpperCase();
  const exists = await Employee.findOne({ employeeCode: empCode });
  if (exists) throw ApiError.conflict('Employee code already exists');

  const session = await mongoose.startSession();
  let result;
  try {
    await session.withTransaction(async () => {
      const tempPassword = generatePassword(10);
      const username = empCode.toLowerCase();

      const empUser = await User.create(
        [
          {
            username,
            password: tempPassword,
            role: 'EMPLOYEE',
            name: data.name,
            mobile: data.mobile,
            blockId: clf.blockId,
            clfId: clf._id,
            createdBy: user._id,
            mustChangePassword: true,
          },
        ],
        { session }
      );

      const employee = await Employee.create(
        [
          {
            employeeCode: empCode,
            name: data.name,
            mobile: data.mobile,
            designation: data.designation,
            joiningDate: data.joiningDate,
            aadhaarNumber: data.aadhaarNumber ? encrypt(data.aadhaarNumber) : undefined,
            bankDetails: {
              bankName: data.bankDetails?.bankName,
              accountNumber: data.bankDetails?.accountNumber
                ? encrypt(data.bankDetails.accountNumber)
                : undefined,
              branch: data.bankDetails?.branch,
              ifsc: data.bankDetails?.ifsc?.toUpperCase(),
            },
            workLocation: { panchayat: data.workLocation.panchayat },
            profilePhoto: data.profilePhoto,
            clfId: clf._id,
            blockId: clf.blockId,
            userId: empUser[0]._id,
            createdBy: user._id,
          },
        ],
        { session }
      );

      await User.findByIdAndUpdate(
        empUser[0]._id,
        { employeeId: employee[0]._id },
        { session }
      );

      result = { employee: employee[0], login: { username, tempPassword } };
    });

    await createAudit({
      req,
      action: 'EMPLOYEE_CREATED',
      targetType: 'Employee',
      targetId: result.employee._id,
      metadata: { employeeCode: empCode, clfId },
    });

    return result;
  } finally {
    await session.endSession();
  }
};

/** ✅ Decrypt Aadhaar/Account for authorized roles */
export const formatEmployee = (emp, { revealSensitive = false } = {}) => {
  const obj = emp.toObject ? emp.toObject() : emp;

  let aadhaarOut = null;
  if (obj.aadhaarNumber) {
    if (revealSensitive) {
      aadhaarOut = decrypt(obj.aadhaarNumber) || 'XXXX-XXXX-XXXX';
    } else {
      aadhaarOut = 'XXXX-XXXX-XXXX';
    }
  }

  let accountOut = null;
  if (obj.bankDetails?.accountNumber) {
    if (revealSensitive) {
      accountOut = decrypt(obj.bankDetails.accountNumber) || 'XXXXXXXX';
    } else {
      accountOut = 'XXXXXXXX';
    }
  }

  return {
    ...obj,
    aadhaarNumber: aadhaarOut,
    bankDetails: {
      ...obj.bankDetails,
      accountNumber: accountOut,
    },
  };
};

/** ✅ Scope list — CLF/BPM/SUPER_ADMIN ko full decrypted data */
export const listEmployees = async (req, query) => {
  const user = req.user;
  const filter = {};

  if (user.role === 'CLF') filter.clfId = user.clfId;
  else if (user.role === 'BPM') filter.blockId = user.blockId;
  else if (user.role === 'SUPER_ADMIN' && query.clfId) filter.clfId = query.clfId;

  if (query.status) filter.status = query.status;
  if (query.search) {
    filter.$or = [
      { name: new RegExp(query.search, 'i') },
      { employeeCode: new RegExp(query.search, 'i') },
      { mobile: new RegExp(query.search, 'i') },
    ];
  }

  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, parseInt(query.limit) || 20);

  // ✅ ADDED: .select() — sensitive fields fetch karo
  const [employees, total] = await Promise.all([
    Employee.find(filter)
      .select('+aadhaarNumber +bankDetails.accountNumber')
      .populate('clfId', 'name code')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Employee.countDocuments(filter),
  ]);

  if (user.role === 'EMPLOYEE') {
    return {
      employees: employees.filter((e) => String(e.userId) === String(user._id)),
      pagination: { page, limit, total: 1, pages: 1 },
    };
  }

  // ✅ CHANGED: revealSensitive based on role (pehle false hardcoded tha)
  const revealSensitive = ['CLF', 'BPM', 'SUPER_ADMIN'].includes(user.role);

  return {
    employees: employees.map((e) => formatEmployee(e, { revealSensitive })),
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  };
};

/** ✅ Get employee with access scope + sensitive fields (decrypted) */
/** ✅ Get employee with access scope + sensitive fields (decrypted for self too) */
export const getEmployee = async (req, id) => {
  const emp = await Employee.findById(id)
    .select('+aadhaarNumber +bankDetails.accountNumber')
    .populate('clfId', 'name code blockId');

  if (!emp) throw ApiError.notFound('Employee not found');

  assertEmployeeAccess(req.user, emp);

  // ✅ 'EMPLOYEE' bhi include karo — taaki khud ka Aadhaar/Account khud dekh sake
  const revealSensitive = ['CLF', 'BPM', 'SUPER_ADMIN', 'EMPLOYEE'].includes(
    req.user.role
  );
  return formatEmployee(emp, { revealSensitive });
};

export const assertEmployeeAccess = (user, emp) => {
  if (user.role === 'SUPER_ADMIN') return;

  const empClfId = emp.clfId?._id ? String(emp.clfId._id) : String(emp.clfId);
  const empBlockId = emp.blockId?._id ? String(emp.blockId._id) : String(emp.blockId);

  if (user.role === 'BPM' && String(user.blockId) === empBlockId) return;
  if (user.role === 'CLF' && String(user.clfId) === empClfId) return;
  if (user.role === 'EMPLOYEE' && String(user.employeeId) === String(emp._id)) return;

  throw ApiError.forbidden('Access denied');
};

export const updateEmployee = async (req, id, data) => {
  const emp = await Employee.findById(id).select('+aadhaarNumber +bankDetails.accountNumber');
  if (!emp) throw ApiError.notFound('Employee not found');

  if (req.user.role !== 'CLF' || String(req.user.clfId) !== String(emp.clfId)) {
    if (req.user.role !== 'SUPER_ADMIN') throw ApiError.forbidden('Access denied');
  }

  const updatable = ['name', 'mobile', 'designation', 'joiningDate', 'profilePhoto'];
  updatable.forEach((k) => {
    if (data[k] !== undefined) emp[k] = data[k];
  });
  if (data.workLocation?.panchayat) {
    emp.workLocation.panchayat = data.workLocation.panchayat;
  }
  if (data.bankDetails) {
    if (data.bankDetails.bankName) emp.bankDetails.bankName = data.bankDetails.bankName;
    if (data.bankDetails.accountNumber)
      emp.bankDetails.accountNumber = encrypt(data.bankDetails.accountNumber);
    if (data.bankDetails.branch) emp.bankDetails.branch = data.bankDetails.branch;
    if (data.bankDetails.ifsc) emp.bankDetails.ifsc = data.bankDetails.ifsc.toUpperCase();
  }
  if (data.aadhaarNumber) emp.aadhaarNumber = encrypt(data.aadhaarNumber);

  await emp.save();
  await createAudit({ req, action: 'EMPLOYEE_UPDATED', targetType: 'Employee', targetId: emp._id });
  return formatEmployee(emp, { revealSensitive: true });
};

export const setEmployeeStatus = async (req, id, status) => {
  const emp = await Employee.findById(id);
  if (!emp) throw ApiError.notFound('Employee not found');
  if (req.user.role !== 'CLF' || String(req.user.clfId) !== String(emp.clfId)) {
    if (req.user.role !== 'SUPER_ADMIN') throw ApiError.forbidden();
  }
  emp.status = status;
  await emp.save();
  await User.findByIdAndUpdate(emp.userId, {
    status: status === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE',
  });
  await createAudit({ req, action: `EMPLOYEE_${status}`, targetType: 'Employee', targetId: id });
  return emp;
};

/** Reset employee's user password → admin provides the new password */
export const resetEmployeePassword = async (req, id, newPassword) => {
  if (!newPassword || newPassword.length < 8) {
    throw ApiError.badRequest('Password must be at least 8 characters');
  }
  if (!/(?=.*[A-Za-z])(?=.*\d)/.test(newPassword)) {
    throw ApiError.badRequest('Password must contain letters and numbers');
  }

  const emp = await Employee.findById(id);
  if (!emp) throw ApiError.notFound('Employee not found');

  const user = req.user;
  if (user.role === 'CLF' && String(user.clfId) !== String(emp.clfId)) {
    throw ApiError.forbidden('Access denied');
  }
  if (user.role === 'BPM' && String(user.blockId) !== String(emp.blockId)) {
    throw ApiError.forbidden('Access denied');
  }
  if (!['CLF', 'SUPER_ADMIN'].includes(user.role)) {
    throw ApiError.forbidden('Only CLF or Super Admin can reset employee password');
  }

  const empUser = await User.findById(emp.userId);
  if (!empUser) throw ApiError.notFound('Employee user account not found');

  empUser.password = newPassword;
  empUser.mustChangePassword = true;
  empUser.loginAttempts = 0;
  empUser.lockUntil = null;
  await empUser.save();

  await createAudit({
    req,
    action: 'EMPLOYEE_PASSWORD_RESET',
    targetType: 'Employee',
    targetId: emp._id,
  });

  return {
    username: empUser.username,
    resetBy: user.role,
  };
};

/** ✅ Permanently delete employee + linked user account */
export const deleteEmployee = async (req, id) => {
  const emp = await Employee.findById(id);
  if (!emp) throw ApiError.notFound('Employee not found');

  const user = req.user;
  if (user.role === 'CLF' && String(user.clfId) !== String(emp.clfId)) {
    throw ApiError.forbidden('Access denied');
  }
  if (user.role === 'BPM' && String(user.blockId) !== String(emp.blockId)) {
    throw ApiError.forbidden('Access denied');
  }
  if (!['CLF', 'SUPER_ADMIN'].includes(user.role)) {
    throw ApiError.forbidden('Only CLF or Super Admin can delete employee');
  }

  if (emp.userId) {
    await User.findByIdAndDelete(emp.userId);
  }

  await Employee.findByIdAndDelete(id);

  await createAudit({
    req,
    action: 'EMPLOYEE_DELETED',
    targetType: 'Employee',
    targetId: emp._id,
    metadata: { employeeCode: emp.employeeCode, name: emp.name },
  });

  return { deleted: true, employeeCode: emp.employeeCode };
};
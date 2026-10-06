// import { asyncHandler } from '../../utils/asyncHandler.js';
// import * as authService from './auth.service.js';
// import { env } from '../../config/env.js';

// const cookieOpts = {
//   httpOnly: true,
//   secure: env.IS_PROD,
//   sameSite: env.IS_PROD ? 'none' : 'lax',
//   maxAge: 7 * 24 * 60 * 60 * 1000,
// };

// export const login = asyncHandler(async (req, res) => {
//   const { user, accessToken, refreshToken } = await authService.login(req, req.body);

//   res
//     .status(200)
//     .cookie('accessToken', accessToken, { ...cookieOpts, maxAge: 15 * 60 * 1000 })
//     .cookie('refreshToken', refreshToken, cookieOpts)
//     .json({ success: true, data: { user, accessToken } });
// });

// export const refresh = asyncHandler(async (req, res) => {
//   const token = req.cookies?.refreshToken || req.body.refreshToken;
//   const { accessToken } = await authService.refresh(token);
//   res
//     .status(200)
//     .cookie('accessToken', accessToken, { ...cookieOpts, maxAge: 15 * 60 * 1000 })
//     .json({ success: true, data: { accessToken } });
// });

// export const logout = asyncHandler(async (req, res) => {
//   res
//     .clearCookie('accessToken')
//     .clearCookie('refreshToken')
//     .json({ success: true, message: 'Logged out' });
// });

// export const me = asyncHandler(async (req, res) => {
//   const u = req.user;
//   res.json({
//     success: true,
//     data: {
//       _id: u._id,
//       username: u.username,
//       name: u.name,
//       role: u.role,
//       blockId: u.blockId,
//       clfId: u.clfId,
//       mustChangePassword: u.mustChangePassword,
//     },
//   });
// });

// export const changePassword = asyncHandler(async (req, res) => {
//   await authService.changePassword(req, req.user._id, req.body);
//   res.json({ success: true, message: 'Password changed' });
// });


import { asyncHandler } from '../../utils/asyncHandler.js';
import * as authService from './auth.service.js';
import { env } from '../../config/env.js';

const cookieOpts = {
  httpOnly: true,
  secure: env.IS_PROD,
  sameSite: env.IS_PROD ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login(req, req.body);

  res
    .status(200)
    .cookie('accessToken', accessToken, { ...cookieOpts, maxAge: 15 * 60 * 1000 })
    .cookie('refreshToken', refreshToken, cookieOpts)
    .json({ success: true, data: { user, accessToken, refreshToken } });
});

export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken || req.body.refreshToken;
  const { accessToken } = await authService.refresh(token);
  res
    .status(200)
    .cookie('accessToken', accessToken, { ...cookieOpts, maxAge: 15 * 60 * 1000 })
    .json({ success: true, data: { accessToken } });
});

export const logout = asyncHandler(async (req, res) => {
  res
    .clearCookie('accessToken')
    .clearCookie('refreshToken')
    .json({ success: true, message: 'Logged out' });
});

export const me = asyncHandler(async (req, res) => {
  const profile = await authService.getProfile(req.user);
  res.json({ success: true, data: profile });
});

export const changePassword = asyncHandler(async (req, res) => {
  await authService.changePassword(req, req.user._id, req.body);
  res.json({ success: true, message: 'Password changed' });
});


export const updateProfile = asyncHandler(async (req, res) => {
  const user = await authService.updateProfile(req, req.user._id, req.body);
  res.json({ success: true, data: user });
});
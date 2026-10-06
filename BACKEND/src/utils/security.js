import CryptoJS from 'crypto-js';
import crypto from 'crypto';
import { env } from '../config/env.js';

const KEY = CryptoJS.enc.Utf8.parse(env.ENCRYPTION_KEY);

/** AES-256 Encrypt (Aadhaar, Bank Account) */
export const encrypt = (text) => {
  if (!text) return null;
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(String(text), KEY, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return `${iv.toString()}:${encrypted.ciphertext.toString()}`;
};

/** AES-256 Decrypt */
export const decrypt = (cipherText) => {
  if (!cipherText) return null;
  try {
    const [ivHex, encryptedHex] = cipherText.split(':');
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const encrypted = CryptoJS.enc.Hex.parse(encryptedHex);
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: encrypted },
      KEY,
      { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch {
    return null;
  }
};

/** Mask Aadhaar: XXXX-XXXX-1234 */
export const maskAadhaar = (aadhaar) => {
  if (!aadhaar) return null;
  const last4 = aadhaar.slice(-4);
  return `XXXX-XXXX-${last4}`;
};

/** Mask Account Number */
export const maskAccount = (acc) => {
  if (!acc) return null;
  return `XXXX${acc.slice(-4)}`;
};

/** Generate secure random password */
export const generatePassword = (length = 10) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789@#$';
  let pwd = '';
  const bytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    pwd += chars[bytes[i] % chars.length];
  }
  return pwd;
};

/** Validate time window (Asia/Kolkata) */
export const isWithinTimeWindow = (startHour, endHour) => {
  const now = new Date();
  const istTime = new Date(
    now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
  );
  const hour = istTime.getHours();
  return hour >= startHour && hour < endHour;
};

/** Get today's IST date (YYYY-MM-DD) */
export const getISTDateString = (date = new Date()) => {
  const ist = new Date(
    date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
  );
  return ist.toISOString().slice(0, 10);
};
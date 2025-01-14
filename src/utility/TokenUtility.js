import jwt from "jsonwebtoken";

// ==== Token Encoded Functionality =====
export const TokenEncoded = (id, email) => {
  const KEY = process.env.JWT_KEY;
  const JwtOptions = {
    expiresIn: process.env.JWT_EXPIRED_TIME,
  };

  const Payload = {
    id: id,
    email: email,
  };

  const token = jwt.sign(Payload, KEY, JwtOptions);
  return token;
};

// ==== Token Decoded Functionality =====
export const TokenDecoded = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return decoded;
  } catch {
    return null;
  }
};

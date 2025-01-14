// ===== Internal Imports =====
import { TokenDecoded } from "../utility/TokenUtility.js";

// ==== Verify Auth Token ====
export const AuthVerify = (req, res, next) => {
  const token = req.cookies["token"];
  const decodedToken = TokenDecoded(token);

  if (!decodedToken) {
    return res.status(401).json({ status: "Failed", message: "Unauthorize" });
  }

  const { id, email } = decodedToken;

  req.headers.userID = id;
  req.headers.email = email;
  next();
};


// ==== Verify Host Auth Token ====
export const HostAuthVerify = (req, res, next) => {
  const token = req.cookies["hostToken"];
  const decodedToken = TokenDecoded(token);

  if (!decodedToken) {
    return res.status(401).json({ status: "Failed", message: "Unauthorize" });
  }

  const { id, email } = decodedToken;

  req.headers.hostID = id;
  req.headers.email = email;
  next();
};

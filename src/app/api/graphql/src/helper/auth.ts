import crypto from "crypto";
import bcryptjs from "bcryptjs";

export const getResetPasswordToken = function () {
  const resetPIN = crypto.randomInt(100000, 999999);

  // expire in 15 minits
  var resetExpireDate = new Date(Date.now() + 15 * 60 * 1000);
  return { resetExpireDate, resetPIN };
};

export const verifyResetToken = function (token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const createHashPassword = async (password: string) => {
  return await bcryptjs.hash(password, 14);
};

export const getVerifyPIN = function () {
  const verifyPIN = crypto.randomInt(100000, 999999);
  // // creatimg tokan from ID
  // const verifyToken = crypto.randomBytes(60).toString("hex");

  // const verifyHashToken = crypto
  //   .createHash("sha256")
  //   .update(verifyToken)
  //   .digest("hex");

  // expire in 15 minits
  let verifyPINExpireDate = new Date(Date.now() + 15 * 60 * 1000);

  return { verifyPIN, verifyPINExpireDate };
};

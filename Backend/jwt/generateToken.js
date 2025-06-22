import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
        expiresIn: "5d",
    });

    res.cookie("jwt", token, {
        httpOnly: true, // XSS protection
        secure: true,
        sameSite: "strict", // CSRF protection
    });
};

export default createTokenAndSaveCookie;

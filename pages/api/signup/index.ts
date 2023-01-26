import { NextApiRequest, NextApiResponse } from "next";

export default function signup(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { email, firstName, lastName } = req.body;

        const hashedPassword = await hashPassword(
            req.body.password
        );

        const userData = {
            email: email.toLowerCase(),
            firstName,
            lastName,
            password: hashedPassword,
            role: 'admin'
        };

        const existingEmail = await User.findOne({
            email: userData.email
        }).lean();

        if (existingEmail) {
            return res
                .status(400)
                .json({ message: 'Email already exists' });
        }

        const newUser = new User(userData);
        const savedUser = await newUser.save();

        if (savedUser) {
            const token = createToken(savedUser);
            const decodedToken = jwtDecode(token);
            const expiresAt = decodedToken.exp;

            const {
                firstName,
                lastName,
                email,
                role
            } = savedUser;

            const userInfo = {
                firstName,
                lastName,
                email,
                role
            };

            return res.json({
                message: 'User created!',
                token,
                userInfo,
                expiresAt
            });
        } else {
            return res.status(400).json({
                message: 'There was a problem creating your account'
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: 'There was a problem creating your account'
        });
    }
}
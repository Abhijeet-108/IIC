import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// generate the access token and refresh token
const generateTokens = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Internal Server Error while generating the token");
    }
}

// register
export const registerUser = asyncHandler(async(req, res) => {
    try {
        const { username, email, name, password, college_id, department, role } = req.body;

        if (!username || !email || !name || !password || !college_id || !department || !role) {
            throw new ApiError(400, "All fields are required");
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }, { college_id }] });
        if (existingUser) throw new ApiError(409, "User already exists");

        const user = await User.create({
            username,
            email,
            name,
            password,
            college_id,
            department,
            role
        });

        const { accessToken, refreshToken } = await generateTokens(user._id);

        return res.status(201).json(
            new ApiResponse(
                201,
                {
                    user: user.toJSON(),
                    accessToken,
                    refreshToken
                },
                "User registered successfully"
            )
        )
    } catch (error) {
        throw new ApiError(400, error.message || "Error while registering the user");
    }
})

// login
export const loginUser = asyncHandler(async(req, res) => {
    // console.log("REQ BODY:", req.body);
    const {email, username, college_id, password} = req.body;
    if(!email && !username && !college_id) {
        throw new ApiError(400, "Email or Username or College ID is required to login");
    }

    const user = await User.findOne({
        $or: [{ email }, { username }, { college_id }]
    });
    if(!user) throw new ApiError(404, "User not found");

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if(!isPasswordCorrect) throw new ApiError(401, "Invalid credentials");

    const { accessToken, refreshToken } = await generateTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    };

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken,refreshToken
            },
            "User Logged In successfully"
        )
    )
})

// logout User
export const logoutUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    if(!user) throw new ApiError(404, "User not found");

    user.refreshToken = null;
    await user.save({ validateBeforeSave: false });

    return res
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
})
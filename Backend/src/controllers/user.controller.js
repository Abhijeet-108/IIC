import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { OAuth2Client } from "google-auth-library";

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
    const { username, email, password, fullname, phone, collegeId, dept, year, role} = req.body;

    if(
        [username, email, password, fullname, phone, collegeId, dept, role].some((field) => !field)
    ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ 
        $or: [{ email }, { username }, { collegeId }]
     });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const profilePhoto = req.file? req.file.path : "";
    if(!profilePhoto) throw new ApiError(400, "Profile photo is required");

    let firstname = "";
    let lastname = "";
    if(typeof fullname === "string") {
        const parts = fullname.trim().split(" ");
        firstname = parts[0];
        lastname = parts.slice(1).join(" ") || "";
    }else{
        firstname = fullname.firstname ;
        lastname = fullname.lastname;
    }

    const user = await User.create({
        username,
        email,
        password,
        fullname:{
            firstname,
            lastname
        },
        phone,
        collegeId,
        dept,
        year,
        profilePhoto: profilePhoto,
        role: role
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if(!createdUser) throw new ApiError(500, "Something went wrong while creating the user");

    return res.status(200).json(new ApiResponse(200, "User registered successfully", createdUser));
})

// login
export const loginUser = asyncHandler(async(req, res) => {
    // console.log("REQ BODY:", req.body);
    const {email, username, collegeId, password} = req.body;
    if(!email && !username && !collegeId) {
        throw new ApiError(400, "Email or Username or College ID is required to login");
    }

    // const query = {};
    // if(email) query.email = email;
    // if(username) query.username = username;
    // if(collegeId) query.collegeId = collegeId;

    const user = await User.findOne({
        $or: [{ email }, { username }, { collegeId }]
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
    .json(new ApiResponse(200, null, "User logged out successfully"));
})

// google auth
export const googleAuth = asyncHandler(async(req, res) => {
    const { token } = req.body;
    if(!token) throw new ApiError(400, "Token is required");

    const client = new OAuth2Client(process.env.CLIENT_ID);

    let payload;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        });
        payload = ticket.getPayload();
    } catch (error) {
        console.error("Error verifying Google ID token:", error);
        throw new ApiError(401, "Invalid token");
    }

    const googleId = payload.sub;
    const email = payload.email;
    const fullname = payload.name;
    const picture = payload.picture;

    if(!googleId || !email || !fullname) {
        throw new ApiError(400, "Google ID, email and fullname are required");
    }

    const user = await User.findOne({ googleId });
    if(user){
        if(user.googleId){
            return res.status(200).json(new ApiResponse(200, user, "User logged in successfully"));
        }
    }else{
        throw new ApiError(409, "Email is already registered with a different method");
    }

    let firstname = "";
    let lastname = "";
    if(typeof fullname === "string") {
        const parts = fullname.trim().split(" ");
        firstname = parts[0];
        lastname = parts.slice(1).join(" ") || "";
    }else{
        firstname = fullname.firstname ;
        lastname = fullname.lastname || "";
    }

    const newUser = await User.create({
        googleId,
        email,
        fullname: {
            firstname,
            lastname
        },
        picture
    });

    const createdUser = await User.findById(newUser._id).select("-password -refreshToken");

    return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
})

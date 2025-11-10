import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        // index: true,
        minlength: [5, 'Username must be at least 5 characters long'],
        maxlength: [30, 'Username must be at most 30 characters long'],
        match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores']
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
        validate: {
        validator: function(v) {
            return /^[a-zA-Z\s]+$/.test(v);
        },
        message: 'Name can only contain letters and spaces'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(v);
            },
            message: 'Please enter a valid email address'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate: {
        validator: function(v) {
            return v.length >= 6;
        },
        message: 'Password must be at least 6 characters long'
        }
    },
    college_id:{
        type: String,
        required: [true, 'College ID is required'],
        trim: true,
        unique: true,
        uppercase: true,
    },
    department:{
        type: String,
        required: [true, 'Department is required'],
        enum: [
            'Computer Science & Engineering',
            'Computer Science & Engineering - AIML',
            'Computer Science & Engineering - DATA SCIENCE',
            'Computer Science & Engineering - CYBER SECURITY',
            'Computer Science & BUSINESS SYSTEM',
            'Computer Science & Engineering - IOT',
            'INFORMATION TECHNOLOGY',
            'ELECTRONICS & COMMUNICATION ENGINEERING',
            'CIVIL ENGINEERING',
            'MECHANICAL ENGINEERING',
            'ELECTRICAL ENGINEERING',
            'ELECTRONICS & INSTRUMENTATION ENGINEERING',
            'Computer Applications',
            'FOOD TECHNOLOGY',
            'MEDIA SCIENCE',
            'Business Studies',
            'HOSPITAL ADMINISTRATION',
            'HOSPITALITY MANAGEMENT',
            'Basic Science & Humanities',
            'Master in Business Administration'
        ],
    },
    role:{
        type: String,
        enum: {
            values: ['faculty', 'member'],
            message: 'Role must be either faculty or member'
        },
        required: true
    },
    refreshToken: {
        type: String,
    },
}, { timestamps: true })

// Indexes for better query performance
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ college_id: 1 }, { unique: true });
userSchema.index({ role: 1 });
userSchema.index({ department: 1 });


// middleware for pre-saving user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            name: this.name,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.statics.findByRole = function(role) {
  return this.find({ role: role });
};

userSchema.statics.findByDepartment = function(department) {
  return this.find({ department: department });
};

export const User = mongoose.model("User", userSchema);
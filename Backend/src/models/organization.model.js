import mongoose from "mongoose";


const contactSchema = new mongoose.Schema({
    name: { 
        type: String 
    },
    designation: { 
        type: String 
    },
    email: { 
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                return /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(v);
            },
            message: 'Please enter a valid email address'
        }
    },
    phone: [{ 
        type: String
    }],
    websiteLink: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                if (!v) return true;
                return /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(:[0-9]{1,5})?(\/.*)?$/.test(v);
            },
            message: 'Must be a valid URL'
        }
    }
}, { _id: false });

const organizationSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        // index: true
    },
    thrustArea: [{
        type: String,
    }],
    city:{
        type: String,
        // index: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    contact: [contactSchema],
    Stages: {
        type: [String],
        enum: ['ideation', 'validation', 'Early traction', 'scaling', 'maturity'],
        required: true,
        // index: true
    },
    status: {
        type: String,
        enum: ["incubator", "startup"],
        required: true
    },
},{timestamps: true});

organizationSchema.index({ name: 1 }); 
organizationSchema.index({ status: 1 });   
organizationSchema.index({ city: 1 });

organizationSchema.statics.findIncubators = function() {
  return this.find({ status: "incubator" });
};

organizationSchema.statics.findStartups = function() {
  return this.find({ status: "startup" });
};

organizationSchema.statics.findByCity = function(city) {
  return this.find({ city });
};

organizationSchema.statics.findByStage = function (stage) {
    return this.find({ Stages: stage });
};

organizationSchema.statics.findByThrustArea = function (area) {
    return this.find({ thrustArea: new RegExp(area, "i") });
};


export const Organization = mongoose.model("Organization", organizationSchema);
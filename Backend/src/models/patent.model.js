import mongoose from "mongoose";

const patentSchema = new mongoose.Schema({
    patentNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 50
    },

    area: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },

    domain: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },

    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },

    status: {
        type: String,
        required: true,
        enum: ['Published', 'Granted'],
        trim: true,
        default: 'Published'
    },

    year: {
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear()
    },

    supportDocument: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function(v) {
                if (!v) return true;
                return /^https?:\/\/.+$/i.test(v);
            },
            message: 'Support document must be a valid URL'
        }
    }
},{ timestamps: true });

patentSchema.index({ patentNumber: 1 }, { unique: true });
patentSchema.index({ area: 1 });
patentSchema.index({ domain: 1 });
patentSchema.index({ title: "text" });
patentSchema.index({ status: 1 });
patentSchema.index({ year: -1 });

patentSchema.statics.findByArea = function(area) {
  return this.find({ area: new RegExp(area, 'i') });
};

patentSchema.statics.findByDomain = function(domain) {
  return this.find({ domain: new RegExp(domain, 'i') });
};

patentSchema.statics.findByStatus = function(status) {
  return this.find({ status: status });
};

patentSchema.statics.findByYear = function(year) {
  return this.find({ year: year });
};

patentSchema.statics.findByYearRange = function(startYear, endYear) {
  return this.find({ year: { $gte: startYear, $lte: endYear } });
};

export const Patent = mongoose.model('Patent', patentSchema);
import mongoose from "mongoose";

const copyrightSchema = new mongoose.Schema({
    copyrightNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: [50, 'Copyright number cannot be more than 50 characters']
    },

    area: {
        type: String,
        required: true,
        trim: true,
        maxlength: [100, 'Area cannot be more than 100 characters']
    },

    domain: {
        type: String,
        required: true,
        trim: true,
        maxlength: [100, 'Domain cannot be more than 100 characters']
    },

    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: [200, 'Title cannot be more than 200 characters']
    },

    status: {
        type: String,
        required: true,
        enum: ['Registered', 'Pending', 'Under Review'],
        trim: true,
        default: 'Pending'
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
        validate: {
            validator: function(v) {
                if (!v) return true;
                return /^https?:\/\/.+$/i.test(v);
            },
            message: 'Support document must be a valid URL'
        }
    }
},{timestamps: true});

copyrightSchema.index({ copyrightNumber: 1 }, { unique: true });
copyrightSchema.index({ area: 1 });
copyrightSchema.index({ domain: 1 });
copyrightSchema.index({ status: 1 });
copyrightSchema.index({ year: -1 });

copyrightSchema.statics.findByArea = function(area) {
  return this.find({ area: new RegExp(area, 'i') });
};

copyrightSchema.statics.findByDomain = function(domain) {
  return this.find({ domain: new RegExp(domain, 'i') });
};

copyrightSchema.statics.findByStatus = function(status) {
  return this.find({ status: status });
};

copyrightSchema.statics.findByYear = function(year) {
  return this.find({ year: year });
};

copyrightSchema.statics.findByYearRange = function(startYear, endYear) {
  return this.find({ year: { $gte: startYear, $lte: endYear } });
};

export const Copyright = mongoose.model('Copyright', copyrightSchema);
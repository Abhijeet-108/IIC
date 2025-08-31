import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
    titleOfManuscript: {
        type: String,
        required: true,
        trim: true,
        maxlength: 300
    },

    authorsDetails: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    },

    isbn: {
        type: String,
        trim: true,
        maxlength: 20,
        validate: {
            validator: function(v) {
                if (!v) return true;
                return /^(97[89])?\d{9}(\d|X)$/i.test(v.replace(/[-\s]/g, ''));
            },
            message: 'Must be a valid ISBN format'
        }
    },

    journalName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },

    publisherName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150
    },

    issue: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    },

    no: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    },

    pageNo: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20
    },

    year: {
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear() + 10
    },

    doiLink: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                if (!v) return true;
                return /^(https?:\/\/)?(dx\.)?doi\.org\/10\..+|^https?:\/\/.+$/i.test(v);
            },
            message: 'Must be a valid DOI or URL'
        }
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
});

journalSchema.index({ titleOfManuscript: 1 });
journalSchema.index({ journalName: 1 });
journalSchema.index({ publisherName: 1 });
journalSchema.index({ year: -1 });
journalSchema.index({ authorsDetails: 'text' });

journalSchema.statics.findByJournal = function(journalName) {
  return this.find({ journalName: new RegExp(journalName, 'i') });
};

journalSchema.statics.findByPublisher = function(publisherName) {
  return this.find({ publisherName: new RegExp(publisherName, 'i') });
};

journalSchema.statics.findByYear = function(year) {
  return this.find({ year: year });
};

journalSchema.statics.findByYearRange = function(startYear, endYear) {
  return this.find({ year: { $gte: startYear, $lte: endYear } });
};

journalSchema.statics.findByAuthor = function(authorName) {
  return this.find({ authorsDetails: new RegExp(authorName, 'i') });
};

journalSchema.statics.searchByTitle = function(searchTerm) {
  return this.find({ titleOfManuscript: new RegExp(searchTerm, 'i') });
};

export const Journal = mongoose.model('Journal', journalSchema);
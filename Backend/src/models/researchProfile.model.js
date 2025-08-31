import mongoose from "mongoose";

const researchProfileSchema = new mongoose.Schema({
    facultyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },

    designation: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },

    photograph: {
        type: String,
        trim: true,
        validate: {
        validator: function(v) {
            if (!v) return true;
            return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
        },
        message: 'Photograph must be a valid image URL'
        }
    },

    googleScholarLink: {
        type: String,
        trim: true,
        validate: {
        validator: function(v) {
            if (!v) return true;
            return /^https?:\/\/(scholar\.google\.[a-z]{2,3}|scholar\.google\.com)\/citations\?user=.+$/i.test(v);
        },
        message: 'Must be a valid Google Scholar profile URL'
        }
    },

    orcid: {
        type: String,
        trim: true,
        validate: {
        validator: function(v) {
            if (!v) return true;
            return /^https?:\/\/orcid\.org\/\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/i.test(v);
        },
        message: 'Must be a valid ORCID URL format'
        }
    },

    scopusId: {
        type: String,
        trim: true,
        validate: {
        validator: function(v) {
            if (!v) return true;
            return /^https?:\/\/www\.scopus\.com\/authid\/detail\.uri\?authorId=\d+$/i.test(v);
        },
        message: 'Must be a valid Scopus Author ID URL'
        }
    },

    researcherId: {
        type: String,
        trim: true,
        validate: {
        validator: function(v) {
            if (!v) return true;
            return /^https?:\/\/.+/i.test(v);
        },
        message: 'Must be a valid URL'
        }
    },

    vidwanPortalLink: {
        type: String,
        trim: true,
        validate: {
        validator: function(v) {
            if (!v) return true;
            return /^https?:\/\/(www\.)?vidwan\.inflibnet\.ac\.in\/profile\/.+$/i.test(v);
        },
        message: 'Must be a valid Vidwan Portal URL'
        }
    },

    patents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patent'
    }],

    copyrights: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Copyright'
    }],

    journals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Journal'
    }],

    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],

    bookChapters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookChapter'
    }],

    conferences: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conference'
    }]
},{ timestamps: true });

researchProfileSchema.index({ facultyId: 1 }, { unique: true });
researchProfileSchema.index({ designation: 1 });

researchProfileSchema.statics.findByDesignation = function(designation) {
  return this.find({ designation: new RegExp(designation, 'i') }).populate('facultyId');
};

researchProfileSchema.statics.findByFacultyId = function(facultyId) {
  return this.findOne({ facultyId: facultyId })
    .populate('facultyId')
    .populate('patents')
    .populate('copyrights')
    .populate('journals')
    .populate('books')
    .populate('bookChapters')
    .populate('conferences');
};

researchProfileSchema.methods.addPublication = function(type, publicationId) {
  const validTypes = ['patents', 'copyrights', 'journals', 'books', 'bookChapters', 'conferences'];
  
  if (!validTypes.includes(type)) {
    throw new Error('Invalid publication type');
  }
  
  if (!this[type].includes(publicationId)) {
    this[type].push(publicationId);
  }
  
  return this.save();
};

researchProfileSchema.methods.removePublication = function(type, publicationId) {
  const validTypes = ['patents', 'copyrights', 'journals', 'books', 'bookChapters', 'conferences'];
  
  if (!validTypes.includes(type)) {
    throw new Error('Invalid publication type');
  }
  
  this[type].pull(publicationId);
  return this.save();
};

export const ResearchProfile = mongoose.model('ResearchProfile', researchProfileSchema);
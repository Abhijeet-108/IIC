import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
      index: true
    },
    
    authors: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000
    },
    
    isbn: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: function(v) {
          return /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/.test(v);
        },
        message: 'Invalid ISBN format'
      },
      index: true
    },
    
    publisherName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
      index: true
    },
    
    year: {
      type: Number,
      required: true,
      min: 1000,
      max: new Date().getFullYear() + 10,
      index: true
    },
    
    supportDocument: {
      type: String,
      trim: true
    }
}, {
  collection: 'books'
});

BookSchema.index({ title: 'text', authors: 'text' });
BookSchema.index({ publisherName: 1, year: -1 });
BookSchema.index({ year: -1, title: 1 });

BookSchema.pre('save', function(next) {
  next();
});

export const Book = mongoose.model("Book", BookSchema);

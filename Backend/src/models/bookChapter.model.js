import mongoose from "mongoose";

const BookChapterSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
      maxlength: [500, "Title cannot exceed 500 characters"],
      index: true,
    },

    authors: {
      type: String,
      required: [true, "Author details are required"],
      trim: true,
      maxlength: [1000, "Authors field cannot exceed 1000 characters"],
    },

    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/.test(
            v
          );
        },
        message: "Invalid ISBN format",
      },
      index: true,
    },

    chapterName: {
      type: String,
      required: [true, "Chapter name is required"],
      trim: true,
      maxlength: [300, "Chapter name cannot exceed 300 characters"],
      index: true,
    },

    publisherName: {
      type: String,
      required: [true, "Publisher name is required"],
      trim: true,
      maxlength: [200, "Publisher name cannot exceed 200 characters"],
      index: true,
    },

    pageNo: {
      type: String,
      required: [true, "Page number is required"],
      trim: true,
      maxlength: [50, "Page number cannot exceed 50 characters"],
    },

    year: {
      type: Number,
      required: [true, "Publication year is required"],
      min: [1000, "Year must be at least 1000"],
      max: [
        new Date().getFullYear() + 10,
        "Year cannot be more than 10 years in the future",
      ],
      index: true,
    },

    doiLink: {
      type: String,
      required: [true, "DOI/Link is required"],
      trim: true,
      maxlength: [500, "DOI/Link cannot exceed 500 characters"],
    },

    supportDocument: {
      type: String,
      trim: true,
    },
},
  {
    collection: "bookchapters",
  }
);

mongooseBookChapterSchema.index({ title: "text", authors: "text", chapterName: "text" });
mongooseBookChapterSchema.index({ publisherName: 1, year: -1 });
mongooseBookChapterSchema.index({ year: -1, title: 1 });
mongooseBookChapterSchema.index({ isbn: 1, chapterName: 1 });


mongooseBookChapterSchema.pre("save", function (next) {
  next();
});

const BookChapter = mongoose.model("BookChapter", BookChapterSchema);

export default BookChapter;

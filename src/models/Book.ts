import mongoose, { Document, Schema } from "mongoose";

export interface IBook {
  title: string;
  author: string;
}

export interface IBookModel extends IBook, Document {}

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: "Author" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model<IBookModel>("Book", BookSchema);

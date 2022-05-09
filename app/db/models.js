import { mongoose } from "mongoose";

const { Schema } = mongoose;

const snippetsSchema = new Schema({
  title: String,
  date: Date,
  description: String,
  code_snippet: String,
  language: String,
  favourite: Boolean,

  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

const users = new Schema({
  username: {
    type: String,
    required: true,
    minLength: [3, "That's too short"],
  },
  password: {
    type: String,
    required: true,
    minLength: [3, "That's too short"],
  },

  createdAt: {
    type: Date,
    required: false,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
});

export const models = [
  {
    name: "CodeSnippet",
    schema: snippetsSchema,
    collection: "code-snippets",
  },
  {
    name: "Users",
    schema: users,
    collection: "users",
  },
];

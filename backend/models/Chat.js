import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  currQuery: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;

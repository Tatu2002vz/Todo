const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    expired: {
      type: Date,
      default: () => {
        const date = new Date();
        let month = date.getUTCMonth() + 1;
        if (month < 10) month = "0" + month;
        const day = date.getUTCDate();
        const year = date.getUTCFullYear();
        return new Date(`${year}-${month}-${day + 1}T00:00:00`).valueOf(); // trả về 00h ngày tiếp theo nếu không nhập ngày giờ hết hạn
      },
    },
    status: {
      type: String,
      enum: ["completed", "incomplete"],
      default: "incomplete",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);

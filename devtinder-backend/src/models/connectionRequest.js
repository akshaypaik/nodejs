const { Schema, model } = require("mongoose");

const connectionRequestSchema = Schema(
    {
        fromUserId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        toUserId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        status: {
            type: String,
            enum: {
                values: ["ignore", "interested", "accepted", "rejected"],
                message: `{VALUE} is incorrect status type`
            },
            required: true
        }
    },
    {
        timestamps: true
    }
);

connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;

    //check if fromUserId is same as toUserId
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error('You cannot send connection request to yourself!');
    }
    next();
});

module.exports = model("ConnectionRequest", connectionRequestSchema);
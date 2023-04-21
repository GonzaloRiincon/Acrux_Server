const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
    {
        bars: {
            type: [{
                barInfo: {
                    ref: 'Bar',
                    type: Schema.Types.ObjectId
                }

            }],
            validate: {
                validator: function (arr) {
                    return arr.length >= 1;
                },
                message: 'Should have at least 1 bar'
            }
        },
        subEvent: {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }
    },
    {
        timestamps: true
    }
);

const Event = model("Event", eventSchema)

module.exports = Event
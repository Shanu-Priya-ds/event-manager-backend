const Event = require("../models/Event");

const isEventOrganizer = async (req, res, next) => {
    try {

        const eventId = req.params.id;
        console.log(eventId);
        const event = await Event.findById(eventId);

        if (!event) return res.status(404).json({ error: 'Event not found' });
        console.log(event.organizerId);
        console.log(req.user.userId);
        if (event.organizerId.toString() !== req.user.userId) {
            return res.status(403).json({ message: `You don't have permission to update/delete the eventId ${eventId}` });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error."
        });
    }
    next();
}

module.exports = isEventOrganizer;
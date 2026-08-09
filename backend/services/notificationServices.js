import { notifications } from "../../models/notificationSchema.js";

export async function fetchNotificationData(req, res) {

  try {

    const Notifications = await notifications.find().sort({ createdAt: -1 })


    const data = {

      notifications: Notifications

    }

    res.status(200).json(data);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

}

export async function markAllAsRead(req, res) {

  try {

    const data = await notifications.updateMany(
    { read: false },
    { $set: { read: true } }
);

    res.status(200).json(data);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

}


export async function markAsRead(req, res) {

  try {

    const { id } = req.params
    console.log(id)
    console.log('hi');
    

    const data = await notifications.updateOne(
    { _id : id },
    { $set: { read: true } }
);

    res.status(200).json(data);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

}


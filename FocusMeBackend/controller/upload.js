const Photo = require('../models/photos');

exports.uploadPhoto = async (req, res) => {
    try {
        const { base64, googleDriveLink } = req.body;

        if (base64) {
            await Promise.all(base64.map(async (data) => {
                await Photo.create({ base64: data });
            }));
        }

        if (googleDriveLink) {
            await Photo.create({ base64: googleDriveLink }); // Assuming you're storing the Google Drive link in the base64 field
        }

        return res.status(200).json({ error: false });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: true, error });
    }
};

exports.getAllPhotos = async (req, res) => {
    try {
        const data = await Photo.find({});
        return res.status(200).json({ error: false, data });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: true, error });
    }
};

exports.deletePhoto = async (req, res) => {
    try {
        const { id } = req.params;
        await Photo.findByIdAndDelete(id);
        return res.status(200).json({ error: false });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: true, error });
    }
};

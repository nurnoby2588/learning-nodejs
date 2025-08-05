const shortid = require("shortid");
const Url = require("../model/urlSchema");
const handleCatchError = require("../Error/handleCatchError");

const createShortUrl = async (req, res) => {
    const { longUrl } = req.body;
    if (!longUrl) {
        return res.status(400).json({ error: 'Long URL is required' });
    }
    try {
        const shortId = shortid.generate()
        const url = new Url({ shortId, redirectUrl: longUrl, visitHistory: [] });
        if (!url) {
            return res.status(500).json({ error: 'Failed to create short URL' });
        }
        await url.save();
        // for ejs
       return res.render('home',
           { id: shortId }
        )
        res.status(201).json({ shortUrl: `${req.protocol}://${req.get('host')}/url/${shortId}` });
    } catch (error) {
        console.error('Error creating short URL:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getRedirectUrl = async (req, res) => {
    const { shortId } = req.params;
    try {
        if (!shortId) {
            return res.status(400).json({ error: 'Short ID is required' });
        }
        const entry = await Url.findOneAndUpdate({ shortId }, { $push: { visitHistory: { timeStamp: Date.now() } } }, { new: true });
        if (!entry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }
        res.redirect(entry.redirectUrl);
    } catch (error) {
        return handleCatchError(error, req, res);
    }
}

const handleAnaliticsUrl = async (req, res) => {
    const { shortId } = req.params;
    try {
        if (!shortId) {
            return res.status(400).json({ error: 'Short ID is required' });
        }
        // count the number of visites useing project
        const entry = await Url.aggregate([
            { $match: { shortId } },
            {
                $project: {
                    shortId: 3,
                    visitHistoryCount: { $size: "$visitHistory" }
                }
            }

        ])
        // count the number of visites useing group by
        // const entry = await Url.aggregate([
        //     { $match: { shortId } },
        //     { $unwind: "$visitHistory" },
        //     {
        //         $group: {
        //             _id: "$shortId",
        //             visitedCount: { $sum: 1 }
        //         }
        //     }

        // ])

        if (!entry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        res.status(200).json({ visitHistory: entry });
    } catch (error) {
        return handleCatchError(error, req, res);
    }
}

module.exports = { createShortUrl, getRedirectUrl, handleAnaliticsUrl }
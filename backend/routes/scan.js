const vision = require('@google-cloud/vision');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const client = new vision.ImageAnnotatorClient();
const fs = require('fs');

const jsonParser = bodyParser.json();

router.post('/detect', jsonParser, async (req, res) => {
    if (!req.body.image) {
        return res.status(400).json({ success: false, message: 'No image provided' });
    }

    fs.writeFileSync('image.png', req.body.image.base64, 'base64');

    const image = req.body.image.base64.replace(/^data:image\/\w+;base64,/, '');

    const request_body_json = {
        image: {
            content: image
        },
        features: [
            { type: "LOGO_DETECTION" },
            { type: "TEXT_DETECTION" },
            { type: "OBJECT_LOCALIZATION" }
        ]
    };

    fs.writeFileSync('request.json', JSON.stringify(request_body_json)); // Debug

    try {
        const [result] = await client.annotateImage(request_body_json);

        const logos = result.logoAnnotations || [];
        logos.forEach(logos => {
            console.log(`Logo: ${logos.description} (confidence: ${logos.score})`);
        });

        const texts = result.textAnnotations || [];
        texts.forEach(text => {
            console.log(`Text: ${text.description} (confidence: ${text.score})`);
        });

        const objects = result.localizedObjectAnnotations || [];
        objects.forEach(object => {
            console.log(`Object: ${object.name} (confidence: ${object.score})`);
            const vertices = object.boundingPoly.normalizedVertices;
            vertices.forEach(v => console.log(`x: ${v.x}, y: ${v.y}`));
        });

        fs.writeFileSync('result.json', JSON.stringify(result)); // Debug

        let productName = null;
        if (texts.length > 0) {
            productName = texts[0].description.split('\n')[0].trim();
            console.log("Herkenning:", productName);
        }

        if (productName) {
            return res.status(200).json({ success: true, productName });
        } else {
            return res.status(200).json({ success: false, message: "Geen product herkend." });
        }

    } catch (error) {
        console.error("Scan error:", error);
        return res.status(500).json({ success: false, message: "Er ging iets mis tijdens het scannen." });
    }
});

module.exports = router;

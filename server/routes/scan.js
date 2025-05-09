const vision = require('@google-cloud/vision');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const client = new vision.ImageAnnotatorClient();
const fs = require('fs');
const { debug } = require('console');

const jsonParser = bodyParser.json();


router.post('/detect', jsonParser, async (req, res) => {
    if (!req.body.image) {
        return res.status(400).json({success: false, message: 'No image provided'});
    }
    fs.writeFileSync('image.png', req.body.image.base64, 'base64'); //Debug
    const image = req.body.image.base64.slice(22);
    const request_body_json = {
        "image":{
            "content":image
        },
        "features": [
            { "type": "LOGO_DETECTION" },
            { "type": "TEXT_DETECTION" },
            { "type": "OBJECT_LOCALIZATION" }
        ]
    }
    fs.writeFileSync('request.json', JSON.stringify(request_body_json)); //Debug
    const [result] = await client.annotateImage(request_body_json);
    const logos = result.logoAnnotations;
    logos.forEach(logos => {
        console.log(`Description: ${logos.description}`);
        console.log(`Confidence: ${logos.score}`);
    });
    const texts = result.textAnnotations;
    texts.forEach(text => {
        console.log(`Description: ${text.description}`);
        console.log(`Confidence: ${text.score}`);
    });
    const objects = result.localizedObjectAnnotations;
    objects.forEach(object => {
        console.log(`Name: ${object.name}`);
        console.log(`Confidence: ${object.score}`);
        const veritices = object.boundingPoly.normalizedVertices;
        veritices.forEach(v => console.log(`x: ${v.x}, y:${v.y}`));
    });
    fs.writeFileSync('result.json', JSON.stringify(result)); //Debug
    res.status(200).json({success: true, message: 'Object localization successful'});
});


module.exports = router;
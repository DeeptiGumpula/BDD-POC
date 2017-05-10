const path = require('path');
const nodecv = require('nodecv');


var matchTemplateImage = function (source,template) {
    const color = [0, 0, 255];
    const image1Path = path.join(__base, 'resources', template);
    const image2Path = path.join(__base, 'resources', source);
    const outputPath = path.join(__base, 'resources', 'output.jpg');
    nodecv.imread(image2Path, function(err, image1){
        logger.info("image2Path"+image2Path);
        if (err) {
            throw err;
        }
        nodecv.imread(image1Path, function(err, image2){
            logger.info("image1Path"+image1Path);
            if (err) {
                throw err;
            }
            nodecv.matchTemplate(image1, image2,5,function(err, match){
                if (err) {
                    throw err;
                }
                logger.info("MATCH"+match);
                logger.info("MATCH"+match.length);
                image1.rectangle([match[1], match[2]], [match[3], match[4]], color, 3);
                nodecv.imwrite(outputPath, image1);
                return match.length;
            })
        })
    })
}




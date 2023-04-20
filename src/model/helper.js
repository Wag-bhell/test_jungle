const https = require('https');
const fs = require('fs');
exports.helper = class helper {

    static async downloadImage(imageUrl, filename) {
        return new Promise((resolve, reject) => {
            https.get(imageUrl, (response) => {
                if (response.statusCode !== 200) {
                    reject(new Error(`Impossible de télécharger l'image. Code de réponse ${response.statusCode}`));
                }

                const file = fs.createWriteStream(filename);
                response.pipe(file);

                file.on('finish', () => {
                    file.close(resolve);
                });
            }).on('error', (error) => {
                fs.unlink(filename, () => {
                    reject(error);
                });
            });
        });
    }

}
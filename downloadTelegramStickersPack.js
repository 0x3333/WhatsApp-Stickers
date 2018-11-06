// Copyright (c) 2018 - Tercio Gaudencio Filho
//
// This script as is will download all the stickers found in
// the Web version of Telegram and will print the JSON needed
// to use in the WhatsApp Stickers.
//
// Another option is to use [StickerSetBot](https://telegram.me/stickerset2packbot)
// to download the images and this script, with minimal modification to export the JSON.
// To use this method, remove the line identified below and follow the instructions.
//
// Instructions:
// 1 - Enter a clean chat(No messages or stickers)
// 2 - Send all Stickers you want(If using the StickerSetBot you must start a pack /newpack and /finish png)
// 3 - Reload chat
// 4 - Scroll to load all Stickers sent
// 5 - Open console and Copy/Paste this code
// 
// It will prompt to save the files(Each sticker is a file)
// In the console, will have the WhatsApp Stickers JSON
//
// NB: You need to use "Preserve Log" in your browser,
//     otherwise, it will clean logs when the download starts.

function download(image, filename) {
    var a = document.createElement('a');
    a.href = image;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function searchStickers() {
    var imgs = Array.prototype.slice.call(document.getElementsByTagName('img')),
        count = 1,
        pack_json = [],
        pack = window.prompt("Pack Name:");

    console.log("Stickers found:");
    imgs.forEach(function (img) {
        if (img.alt.endsWith(' Sticker]')) {
            var emoji = img.alt.replace("[", "").replace(" Sticker]", ""),
                nome = (count < 10 ? "0" : "") + count + "_" + pack + "_" + emoji + ".webp";

            pack_json.push({
                "image_file": nome,
                "emojis": [emoji]
            });

            count++;

            console.log(nome, img.src);
            //
            // Remove this line (download...) to use the StickerSetBot
            //
            download(img.src, nome);
        }
    });
    console.log("WhatsApp Stickers JSON:");
    console.log(JSON.stringify(pack_json));
}

searchStickers();

"use strict";
/* Inspired by the following:
- https://github.com/mattogodoy/hacker-sounds/blame/master/src/player.ts
- https://github.com/jengjeng/aural-coding-vscode/blob/master/src/lib/player.ts
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.play = void 0;
const fs = require("fs");
const path = require('path');
const player = require('play-sound')();
const _isWindows = process.platform === 'win32';
const playerAdapter = (opts) => ({
    afplay: ['-v', opts.macVol],
    mplayer: ['-af', `volume=${opts.linuxVol}`],
});
const getRandomFile = (dirPath) => {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, (err, items) => {
            if (err) {
                reject(err);
            }
            const fileIndex = Math.round(Math.random() * (items.length - 1));
            resolve(items[fileIndex]);
        });
    });
};
const play = (soundName, soundCategory = "hacker", config) => __awaiter(void 0, void 0, void 0, function* () {
    if (_isWindows) {
        // no Windows support yet :/
        return;
    }
    const fileDirectory = path.join(__dirname, "../../audio/", soundCategory, soundName);
    const fileName = yield getRandomFile(fileDirectory);
    const filePath = path.join(fileDirectory, fileName);
    player.play(filePath, playerAdapter(config), (err) => {
        if (err) {
            console.error("Error playing sound:", filePath, " - Description:", err);
        }
    });
});
exports.play = play;
//# sourceMappingURL=player.js.map
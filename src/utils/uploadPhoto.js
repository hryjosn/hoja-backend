import imgur from "imgur";
import fs from "fs";

imgur.setClientId("29855e39f65893f");
imgur.setAPIUrl("https://api.imgur.com/3/");
// 搜尋相關的 api
const uploadPhoto = ({ imageUri, album = "", title, description }) => {
    const imgRes = imgur.uploadFile(imageUri, album, title, description);
    fs.unlink(imageUri, error => {
        console.error(error)
    });
    return imgRes.data.link;
};
export default uploadPhoto;

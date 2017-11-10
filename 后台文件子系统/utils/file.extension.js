module.exports = {
    get_img_extension(file) {
        var type = file.mimetype;

        var originalName = file.originalname;
        //判断是不是图片
        if (/image\/+/ig.test(type)) {

            type = originalName.split('.')[1]

            return type
        }

        return null
    }
}
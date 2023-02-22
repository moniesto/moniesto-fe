class ImageService {

    getBase64(file: File) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.onload = () => { return resolve(reader.result); };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
}

export default new ImageService()
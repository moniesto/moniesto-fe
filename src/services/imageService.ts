class ImageService {
  getBase64(file: File) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onload = () => {
        return resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  getFirebaseImagePath = (imageUrl: string) =>
    `https://firebasestorage.googleapis.com/v0/b/moniesto-bd2f6.appspot.com/o/${imageUrl.replace(
      "/",
      "%2F"
    )}?alt=media`;
}

export default new ImageService();

import heic2any from "heic2any"

export const useHeicMultiple = (e, setImages, setFiles) => {
    let fileName = e.target.value;
    const lastIndex = e.target.files.length - 1;
    let fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (fileNameExt === "heic") {
        var blob = e.target.files[lastIndex]; //ev.target.files[0];
        heic2any({
            blob: blob,
            toType: "image/jpg",
        })
            .then((resultBlob) => {
                setImages((images) => [...images, URL.createObjectURL(resultBlob)])
                setFiles((files) => [...files, new File([resultBlob])])
            })
            .catch(function (x) {
                console.log(x.code);
                console.log(x.message);
            });
    } else if (fileNameExt !== "heic") {
        setFiles((files) => [...files, e.target.files[lastIndex]]);
        setImages((images) => [
            ...images,
            URL.createObjectURL(e.target.files[lastIndex]),
        ]);
    }
}
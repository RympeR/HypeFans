import heic2any from "heic2any"

export const useHeicMultiple = (e, setImages, setFiles, setIsHeicCompiling) => {
    let fileName = e.target.value;
    const lastIndex = e.target.files.length - 1;
    let fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (fileNameExt === "HEIC") {
        setIsHeicCompiling(true)
        let blob = e.target.files[lastIndex]; //ev.target.files[0];
        heic2any({
            blob: blob,
            toType: "image/jpg",
        })
            .then((resultBlob) => {
                setIsHeicCompiling(false)
                setImages((images) => [...images, URL.createObjectURL(new File([resultBlob], "heic" + ".jpg", { type: "image/jpeg", lastModified: new Date().getTime() }))])
                setFiles((files) => [...files, new File([resultBlob], "heic" + ".jpg", { type: "image/jpeg", lastModified: new Date().getTime() })])
            })
            .catch(function (x) {
                setIsHeicCompiling(false)
                console.log(x.code);
                console.log(x.message);
            });
    } else if (fileNameExt !== "HEIC") {
        setFiles((files) => [...files, e.target.files[lastIndex]]);
        setImages((images) => [
            ...images,
            URL.createObjectURL(e.target.files[lastIndex]),
        ]);
    }
}
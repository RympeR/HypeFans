import heic2any from "heic2any"

export const useHeic = (e, setImages, setFiles) => {
    let fileName = e.target.value;
    let fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
    if (fileNameExt === "HEIC") {
        let blob = e.target.files[0]; //ev.target.files[0];
        heic2any({ blob: blob, toType: "image/jpg", }).then((resultBlob) => {
            setImages(URL.createObjectURL(new File([resultBlob], "heic" + ".jpg", { type: "image/jpeg", lastModified: new Date().getTime() })))
            setFiles(new File([resultBlob], "heic" + ".jpg", { type: "image/jpeg", lastModified: new Date().getTime() }));
        })
    } else if (fileNameExt !== "HEIC") {
        setImages(URL.createObjectURL(e.target.files[0]))
        setFiles(e.target.files[0])
    }
}
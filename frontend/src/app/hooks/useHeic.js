import heic2any from "heic2any"

export const useHeic = (resultBlob, setImages, setFiles) => {
    heic2any({ blob: resultBlob, toType: "image/jpg", }).then((resultBlob) => {
        setImages(URL.createObjectURL(resultBlob))
        setFiles(new File([resultBlob]));
    })
}
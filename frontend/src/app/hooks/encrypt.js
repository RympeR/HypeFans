import CryptoJS from "crypto-js"

export const encrypt = (text) => {
    const key = CryptoJS.enc.Utf8.parse("D?F2WNxBk_yLJhy8+Xn&2uqSSVJmN2Eh")
    return CryptoJS.AES.encrypt(
        text,
        key, {
            mode: CryptoJS.mode.ECB
        }
    ).toString();
}
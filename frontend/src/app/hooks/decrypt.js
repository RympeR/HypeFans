import CryptoJS from "crypto-js"

export const decrypt = (text) => {
    return CryptoJS.AES.encrypt(
        text,
        "D?F2WNxBk_yLJhy8+Xn&2uqSSVJmN2Eh", { mode: CryptoJS.mode.ECB }
    ).toString(CryptoJS.enc.Utf8)
}
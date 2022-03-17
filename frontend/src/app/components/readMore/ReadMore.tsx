import React, { useEffect, useState } from 'react'

export const ReadMore = ({ text }: { text: string }) => {

    const [isWholeTextShowed, setIsWholeTextShowed] = useState<boolean>(false)

    useEffect(() => {
        setIsWholeTextShowed(text?.length <= 40)
    }, [text])

    return (
        <>
            <p className="post__caption">
                {isWholeTextShowed ? text : `${text?.slice(0, 40)}...`}
            </p>

            <button
                className={
                    text?.length <= 40
                        ? "post__read-more-btn post__read-more-btn_hidden"
                        : "post__read-more-btn"
                }
                onClick={() => setIsWholeTextShowed(!isWholeTextShowed)}
            >
                {isWholeTextShowed ? "Скрыть" : "Прочитать больше..."}
            </button>
        </>
    )
}

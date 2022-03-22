import React, { useEffect, useState } from 'react'

export const ReadMore = ({ text }: { text: string }) => {

    console.log(text);


    const [isWholeTextShowed, setIsWholeTextShowed] = useState<boolean>(false)

    useEffect(() => {
        setIsWholeTextShowed(text?.length <= 40)
    }, [text])

    return (
        <div style={{ margin: "10px 0px" }}>
            {text !== null ? <p className="post__caption">
                {isWholeTextShowed ? text : `${text?.slice(0, 40)}...`}
            </p> : null}

            <button
                className={
                    text === null || text?.length <= 40
                        ? "post__read-more-btn post__read-more-btn_hidden"
                        : "post__read-more-btn"
                }
                onClick={() => setIsWholeTextShowed(!isWholeTextShowed)}
            >
                {isWholeTextShowed ? "Скрыть" : "Прочитать больше..."}
            </button>
        </div>
    )
}

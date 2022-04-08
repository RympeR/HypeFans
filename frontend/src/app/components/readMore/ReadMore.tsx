import React, { useContext, useEffect, useState } from 'react'
import { LangContext } from '../../../app/utils/LangProvider';

export const ReadMore = ({ text }: { text: string }) => {

    const [isWholeTextShowed, setIsWholeTextShowed] = useState<boolean>(false)
    const { currentlang } = useContext(LangContext);

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
                {isWholeTextShowed ? currentlang?.hide : currentlang?.readmore}
            </button>
        </div>
    )
}

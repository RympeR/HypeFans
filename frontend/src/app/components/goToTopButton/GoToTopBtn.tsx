import React, { useEffect, useState } from 'react'

export const GoToTopBtn = () => {

    const [showTopBtn, setShowTopBtn] = useState<boolean>(false)

    const goToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);

    return (
        <button id="goToTop" onClick={goToTop} style={showTopBtn ? { display: "flex" } : {}}>
            &#129045;
        </button>
    )
}

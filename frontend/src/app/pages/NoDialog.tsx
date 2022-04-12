import React, { useContext, useState } from "react";
import { LangContext } from "../utils/LangProvider";

export const NoDialog = () => {
  const { currentLang } = useContext(LangContext)

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "62.5%",
          alignItems: "center"
        }}
        className="chat__inactive"
      >
        <p style={{ textAlign: "center", fontSize: "18px", backgroundColor: "#fbdfcf", borderRadius: "12px", padding: "5px", maxWidth: "50%" }}>
          {currentLang.chooseDialog}
        </p>
      </div>
    </>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LangContext } from "../../../app/utils/LangProvider";
import { ReactComponent as Logo } from "../../../assets/images/logo.svg";

export const UserItem = ({ item }: { item: any }) => {
  const { currentLang } = useContext(LangContext);

  return (
    <div
      className="notifications__walletChild"
      style={{ borderBottom: "0px" }}
    >
      <div style={{ display: "flex" }}>
        <div>
          <Link to={`/profile/${item.username}`}>
            {!item.avatar ? (
              <Logo
                style={{
                  width: "50px",
                  height: "50px",
                  margin: "12px",
                }}
              />
            ) : (
              <img
                src={item.avatar}
                alt="img"
                style={{ width: "50px", height: "50px" }}
              />
            )}
          </Link>
        </div>
        <div>
          <h3>{item.first_name ?? currentLang.name}</h3>
          <h4>@{item.username ?? "nickname"}</h4>
        </div>
      </div>
    </div>
  );
};

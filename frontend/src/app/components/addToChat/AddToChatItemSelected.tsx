import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../../assets/images/logo.svg";

export const AddToChatItemSelected = ({
  item,
  index,
  items,
  setSelectedItems,
}: {
  item: any;
  index: number;
  items: any;
  setSelectedItems: any;
}) => {
  return (
    <div
      className="notifications__walletChild"
      style={{ borderBottom: "0px", paddingTop: "10px", paddingBottom: "10px" }}
      key={`${index} fav-list`}
      onClick={() =>
        setSelectedItems(items.filter((filterItem: any) => filterItem !== item))
      }
    >
      <div style={{ display: "flex" }}>
        <div>
          <Link to={`/profile/${item.username}`}>
            {item.avatar ? (
              <img
                src={item.avatar}
                alt="img"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "100%",
                  marginLeft: "12px",
                }}
              />
            ) : (
              <Logo style={{ width: "50px", height: "50px", margin: "12px" }} />
            )}
          </Link>
        </div>
        <div>
          <h3>{item.first_name ?? "Имя"}</h3>
          <h4>@{item.username ?? "nickname"}</h4>
        </div>
      </div>
      <div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "100%",
          backgroundColor: "green",
        }}
      ></div>
    </div>
  );
};

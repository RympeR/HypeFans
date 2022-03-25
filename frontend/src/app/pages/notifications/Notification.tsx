/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPost } from "../../../redux/blogReducer";
import { PostModal } from "../Post";
import logo from "../../../assets/images/logo.svg";

export const Notification = ({ item }: any) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const dispatch = useDispatch();
  const closeModal = () => {
    setIsModalOpened(false);
    dispatch(getPost({ id: null }));
  };
  const getTitle = (type: string) => {
    switch (type) {
      case "like":
        return "понравился ваш пост";
      case "comment":
        return "Оставил(а) комментарий";
      case "donation":
        return `Задонатил(а) ${item.donation.amount} $`;
      case "subscription":
        return (
          <>
            подписался(лась) на ваш <br></br>профиль!
          </>
        );
      case "chat_subscription":
        return <>подписался(лась) на чат с вами!</>;
    }
  };
  return (
    <div className="notifications__mainItem">
      <div className="notifications__userInfo">
        <Link to={`/profile/${item.user.username}`}>
          <img
            src={item.user.avatar ? item.user.avatar : logo}
            alt="userPhoto"
            className="notifications__userPhoto"
          ></img>
        </Link>
        <div style={{ marginLeft: "7px" }}>
          <div style={{ display: "flex" }}>
            <h2 style={{ margin: "0px" }}>{item.user.first_name}</h2>&nbsp;
            <h3 style={{ margin: "0px" }}>@{item.user.username}</h3>
          </div>
          <h4 style={{ margin: "0px" }}>{getTitle(item.type)}</h4>
          <p> {moment(item?.time).fromNow()}</p>
        </div>
      </div>
      {item.type !== "donation" &&
      item.type !== "subscription" &&
      item.type !== "chat_subscription" ? (
        <img
          src={item?.post?.post?.attachments[0]?._file}
          alt="postPhoto"
          className="notifications__postPhoto"
          onClick={() => setIsModalOpened(true)}
        ></img>
      ) : null}
      {item.type === "subscription" || item.type !== "chat_subscription" ? (
        <div className="notifications__donationAmount">
          {item.subscription.amount} месяца
        </div>
      ) : null}
      <Modal
        show={isModalOpened}
        onHide={() => {
          closeModal();
        }}
        centered
        size="lg"
      >
        <Modal.Body className="notifications__modal">
          <PostModal post_id={item?.post?.post?.pk} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

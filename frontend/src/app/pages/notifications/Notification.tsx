/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPost } from "../../../redux/blogReducer";
import { PostModal } from "../Post";
import logo from '../../../assets/images/logo.svg';
import { LangContext } from "../../../app/utils/LangProvider";

export const Notification = ({ item }: any) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { currentLang } = useContext(LangContext)
  const dispatch = useDispatch();
  const closeModal = () => {
    setIsModalOpened(false);
    dispatch(getPost({ id: null }));
  };
  const getTitle = (type: string) => {
    switch (type) {
      case "like":
        return currentLang.noteLike;
      case "comment":
        return currentLang.noteComment;
      case "donation":
        return `${currentLang.noteDonut}${item.donation.amount} $`;
      case "subscription":
        return currentLang.noteSubscribe
      case "chat_subscription":
        return currentLang.chatSubscribedU
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
          <p>{moment(item?.date_time * 1000).fromNow()}</p>
        </div>
      </div>
      {item.type !== "donation" && item.type !== "subscription" && item.type !== "chat_subscription" ? (
        <img
          src={item?.post?.post?.attachments[0]?._file}
          alt="postPhoto"
          className="notifications__postPhoto"
          onClick={() => setIsModalOpened(true)}
        ></img>
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

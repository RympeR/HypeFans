import CryptoJS from "crypto-js";
import { Formik } from "formik";
import React, {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAlert } from "react-alert";
import Modal from "react-bootstrap/Modal";
import CurrencyInput from "react-currency-input-field";
import { useReactMediaRecorder } from "react-media-recorder";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { blogAPI } from "../../api/blogAPI";
import { chatAPI } from "../../api/chatAPI";
import { userAPI } from "../../api/userAPI";
import { RootState } from "../../redux/redux";
import { ReactComponent as ImageIcn } from "../../assets/images/imageI.svg";
import { ReactComponent as Readed } from "../../assets/images/messageIcon.svg";
import { ReactComponent as NotReaded } from "../../assets/images/messageIconWhite.svg";
import { ReactComponent as MicrIcon } from "../../assets/images/micI.svg";
import { ReactComponent as More } from "../../assets/images/more-vertical.svg";
import { ReactComponent as Vektor } from "../../assets/images/send.svg";
import { ReactComponent as VektorDisabled } from "../../assets/images/sendDisabled.svg";
import { ReactComponent as Tip } from "../../assets/images/tipI.svg";
import { ReactComponent as VideoIcn } from "../../assets/images/videoI.svg";
import { ReactComponent as CloseIcon } from "../../assets/images/x-circle.svg";
import { AddToChat } from "../components/addToChat/AddToChat";
import { AudioRecorder } from "../components/recordAudio/AudioRecorder";
import { Preloader } from "../utils/Preloader";
import { getLastUrlPoint } from "../utils/utilities";
import { ChatImage } from "./card/components/ChatImage";
import { Video } from "./card/components/Video";
import moment from "moment";

const Input = ({
  sendMessage,
  messageText,
  setMessageText,
}: {
  sendMessage: any;
  messageText: string;
  setMessageText: (text: string) => void;
}) => {
  const VektorIcon = () => <Vektor />;
  const VektorIconDisabled = () => <VektorDisabled />;
  return (
    <div className="chat__text">
      <input
        value={messageText}
        onChange={(val) => setMessageText(val.currentTarget.value)}
      ></input>
      <button
        disabled={messageText.length < 0 && messageText.length > 255}
        onClick={() => {
          if (messageText.length > 0 && messageText.length < 255) {
            return sendMessage();
          } else {
            return null;
          }
        }}
      >
        {messageText.length > 0 && messageText.length < 255 ? (
          <VektorIcon />
        ) : (
          <VektorIconDisabled />
        )}
      </button>
    </div>
  );
};

export const DialogMain = ({
  visible,
  rooms,
}: {
  visible: boolean;
  rooms: any;
}) => {
  const history = useHistory();
  const lastUrl = getLastUrlPoint(history.location.pathname);
  const alert = useAlert();
  const MoreIcon = () => <More />;
  const [isMessagesLoading, setIsMessagesLoading] = useState(true);
  const TipIcon = () => <Tip />;
  const MicIcon = () => <MicrIcon />;
  const VideoIcon = () => <VideoIcn />;
  const ImageIcon = () => <ImageIcn />;
  const [ws, setWs] = useState(null);
  const [wsRead, setWsRead] = useState(null);
  const [showTip, setShowTip] = useState(false);
  const [isPaidModalShown, setPaidModalShow] = useState(false);
  const [messageCost, setMessageCost] = useState("0");
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [uploadedFilesImg, setUploadedFilesImg] = useState<string[]>([]);
  const uid = useSelector((state: RootState) => state.auth.pk);
  const [amICreator, setCreator] = useState(false);
  const inputFileRef = useRef(null);

  // useEffect`s

  useEffect(() => {
    const wsClient = new WebSocket(`wss://hype-fans.com/ws/chat/${lastUrl}/`);
    wsClient.onopen = () => {
      console.log("ws opened");
      setWs(wsClient);
    };
    const wsReadClient = new WebSocket(
      `wss://hype-fans.com/ws/chat-readed/${lastUrl}/`
    );
    wsReadClient.onopen = () => {
      setWsRead(wsReadClient);
      wsReadClient.send(
        JSON.stringify({ room_id: lastUrl, user: uid, message_id: 0 })
      );
    };
    wsReadClient.onclose = () => console.log("ws closed read");
    wsClient.onclose = () => console.log("ws closed");

    return () => {
      wsClient.close();
      wsReadClient.close();
    };
  }, []);

  const { startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({
      video: false,
      audio: true,
    });

  useEffect(() => {
    if (!ws) return;
    ws.onmessage = (e: any) => {
      const message = JSON.parse(e.data);
      console.log(message);
      if (message.user.pk !== uid) {
        wsRead.send(
          JSON.stringify({
            room_id: lastUrl,
            user: uid,
            message_id: message.message_id,
          })
        );
      }
      setMessages((oldMessages) => [message, ...oldMessages]);
    };
  }, [ws]);

  useEffect(() => {
    if (!wsRead) return;
    wsRead.onmessage = (e: any) => {
      console.log(e);
    };
  }, [wsRead]);

  useEffect(() => {
    if (
      uid ===
      rooms.find((item: any) => item.room.room_info.id === Number(lastUrl))
        ?.room?.room_info?.creator?.pk
    )
      setCreator(true);
    else setCreator(false);
  }, []);

  useEffect(() => {
    const recieveChatMessages = async () => {
      const response = await chatAPI.getChatMessages(Number(lastUrl));
      setMessages(response);
      setIsMessagesLoading(false);
    };
    recieveChatMessages();
  }, [lastUrl]);

  // useEffect`s

  // Добавление файлов в сообщение

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const lastIndex = e.target.files.length - 1;
    setFiles([...files, inputFileRef?.current?.value]);
    setUploadedFiles([...uploadedFiles, e?.target?.files[lastIndex]]);
    setUploadedFilesImg([
      ...uploadedFilesImg,
      URL.createObjectURL(e?.target?.files[lastIndex]),
    ]);
  };

  const deleteImg = (e: MouseEvent<HTMLOrSVGElement>, index: number) => {
    setUploadedFilesImg([
      ...uploadedFilesImg.filter((file: string, i: number) => i !== index),
    ]);
    setUploadedFiles([
      ...uploadedFiles.filter((file: any, i: number) => i !== index),
    ]);
  };

  // Добавление файлов в сообщение

  const sendMessage = async () => {
    const attachmentsIds: Array<number> = [];
    if (mediaBlobUrl !== null) {
      const data = await blogAPI.createAttachment(
        new File([mediaBlobUrl], "media.mp3")
      );
      clearBlobUrl();
      attachmentsIds.push(data.data.id);
    }
    if (uploadedFiles.length > 0) {
      for (let i = 0; i < uploadedFiles.length; i++) {
        const data = await blogAPI.createAttachment(uploadedFiles[i]);
        attachmentsIds.push(data.data.id);
      }
    }
    ws.send(
      JSON.stringify({
        text: CryptoJS.AES.encrypt(
          messageText,
          "ffds#^$*#&#!;fsdfds#$&^$#@$@#"
        ).toString(),
        user: uid,
        is_payed: false,
        attachments: attachmentsIds,
        room_id: lastUrl,
        message_price: Number(messageCost),
        message_id: 0,
      })
    );
    setMessageCost("0");
    setPaidModalShow(false);
    setUploadedFilesImg([]);
    setUploadedFiles([]);
    return setMessageText("");
  };

  const sendTip = async (amount: number, reciever: number) => {
    const data = await userAPI.createDonation({
      amount,
      sender: uid,
      reciever,
    });
    if (data.status === 200) {
      alert.success("Донат отправлен");
      return setShowTip(false);
    } else if (data.status === 451) {
      setShowTip(false);
      alert.error("Ошибка");
      return console.log("Не хватает средств");
    } else {
      alert.error("Ошибка");
      return console.log("ошибка сервера");
    }
  };

  const payForMessage = async (message_id: number, price: number) => {
    const data = await blogAPI.buyMessage(uid, message_id, price);
    if (data.status === 200) {
      setMessages(
        messages.map((item, index) => {
          if (item.id === data.data.chat) {
            return { ...item, payed: true };
          } else {
            return item;
          }
        })
      );
    }
  };

  const blockUser = async (id: number) => {
    await userAPI.blockUser({ user: id });
  };

  const [isAddModalShown, setIsAddModalShow] = useState<boolean>(false);

  return (
    <div className="chat__dialogsMain">
      <Modal
        show={isAddModalShown}
        onHide={() => {
          setIsAddModalShow(false);
        }}
        centered
        size="lg"
        style={{
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
        }}
      >
        <Modal.Body className="notifications__modal" style={{ padding: "0px" }}>
          <AddToChat />
        </Modal.Body>
      </Modal>
      <div className="chat__dialogsHeader">
        <div className="chat__sidebarItem" style={{ alignItems: "center" }}>
          <Link
            to={`/profile/${
              typeof rooms.find(
                (item: any) => item.room.room_info.id === Number(lastUrl)
              )?.room?.room_info?.invited !== "number"
                ? amICreator
                  ? rooms.find(
                      (item: any) => item.room.room_info.id === Number(lastUrl)
                    )?.room?.room_info?.invited?.username
                  : rooms.find(
                      (item: any) => item.room.room_info.id === Number(lastUrl)
                    )?.room?.room_info?.creator?.username
                : rooms.find(
                    (item: any) => item.room.room_info.id === Number(lastUrl)
                  )?.room?.room_info?.id
            }`}
          >
            <img
              src={
                typeof rooms.find(
                  (item: any) => item.room.room_info.id === Number(lastUrl)
                )?.room?.room_info?.invited !== "number"
                  ? amICreator
                    ? rooms.find(
                        (item: any) =>
                          item.room.room_info.id === Number(lastUrl)
                      )?.room?.room_info?.invited?.avatar
                    : rooms.find(
                        (item: any) =>
                          item.room.room_info.id === Number(lastUrl)
                      )?.room?.room_info?.creator?.avatar
                  : rooms.find(
                      (item: any) => item.room.room_info.id === Number(lastUrl)
                    )?.room?.room_info?.logo
              }
              alt="avatar"
            ></img>
          </Link>
          <div>
            <h2>
              {typeof rooms.find(
                (item: any) => item.room.room_info.id === Number(lastUrl)
              )?.room?.room_info?.invited !== "number"
                ? amICreator
                  ? rooms.find(
                      (item: any) => item.room.room_info.id === Number(lastUrl)
                    )?.room?.room_info?.invited?.first_name
                  : rooms.find(
                      (item: any) => item.room.room_info.id === Number(lastUrl)
                    )?.room?.room_info?.creator?.first_name
                : rooms.find(
                    (item: any) => item.room.room_info.id === Number(lastUrl)
                  )?.room?.room_info?.name}
            </h2>
            <h2
              style={{
                fontFamily: "Factor A",
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "18px",
                lineHeight: "20px",
                color: "#000000",
              }}
            >
              @{" "}
              {typeof rooms.find(
                (item: any) => item.room.room_info.id === Number(lastUrl)
              )?.room?.room_info?.invited !== "number"
                ? amICreator
                  ? rooms.find(
                      (item: any) => item.room.room_info.id === Number(lastUrl)
                    )?.room?.room_info?.invited?.username
                  : rooms.find(
                      (item: any) => item.room.room_info.id === Number(lastUrl)
                    )?.room?.room_info?.creator?.username
                : rooms.find(
                    (item: any) => item.room.room_info.id === Number(lastUrl)
                  )?.room?.room_info?.name}
            </h2>
          </div>
        </div>
        <Popup
          trigger={
            <div style={{ marginRight: "24px" }}>
              <MoreIcon />
            </div>
          }
          position="bottom right"
        >
          <div style={{ padding: "5px", fontSize: "11px" }}>
            <button onClick={() => setIsAddModalShow(true)}>
              Добавить участников
            </button>
          </div>
          <div style={{ padding: "5px", fontSize: "11px" }}>
            <button>Отключить уведомления</button>
          </div>
          <div style={{ padding: "5px", fontSize: "11px" }}>
            <button>Посмотреть вложения</button>
          </div>
          <div style={{ padding: "5px", fontSize: "11px" }}>
            <button>Копировать ссылку на профиль</button>
          </div>
          <div style={{ padding: "5px", fontSize: "11px" }}>
            <button>Убрать из всех групп</button>
          </div>
          <div style={{ padding: "5px", fontSize: "11px" }}>
            <button
              onClick={() =>
                blockUser(
                  rooms.find(
                    (item: any) => item.room.room_info.id === Number(lastUrl)
                  )?.room?.user?.pk
                )
              }
            >
              Заблокировать
            </button>
          </div>
        </Popup>
      </div>
      <div className="chat__dialog">
        <div className="message-wrap">
          <div
            style={{
              fontFamily: "Factor A",
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: "14px",
              lineHeight: "15px",
              color: " rgba(0, 0, 0, 0.6)",
            }}
          >
            {messages.filter((item) => item.user.pk === uid)[
              messages.filter((item) => item.user.pk === uid).length - 1
            ]?.readed
              ? "Прочитанно"
              : "Не прочитанно"}
          </div>
          {isMessagesLoading ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Preloader />
            </div>
          ) : (
            messages.map((item, index) => {
              return (
                <div
                  style={
                    item.user.pk === uid
                      ? {
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          width: "100%",
                        }
                      : {
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          width: "100%",
                        }
                  }
                  key={Math.random() + index + Math.random()}
                >
                  {item.message_price !== 0 &&
                  !item.is_payed &&
                  item.user.pk !== uid ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "15px",
                        backgroundColor: "rgba(248, 241, 240, 0.4)",
                      }}
                    >
                      <button
                        style={{
                          background: "#FB5734",
                          borderRadius: "16px",
                          padding: "15px",
                          margin: "20px",
                        }}
                        onClick={() =>
                          payForMessage(item.id, item.message_price)
                        }
                      >
                        Посмотреть за {item.message_price}$
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: "flex" }}>
                        {item.user.pk === uid ? (
                          <div style={{ marginRight: "5px" }}>
                            {item.readed ? <Readed /> : <NotReaded />}
                          </div>
                        ) : (
                          <></>
                        )}
                        <div
                          className="text-wrapp"
                          style={
                            item?.attachments.length > 0
                              ? {
                                  backgroundColor: "white",
                                  justifyContent: "flex-end",
                                }
                              : {}
                          }
                        >
                          {CryptoJS.AES.decrypt(
                            item.text,
                            "ffds#^$*#&#!;fsdfds#$&^$#@$@#"
                          ).toString(CryptoJS.enc.Utf8)}
                          {item?.attachments.length > 0
                            ? item?.attachments.map(
                                (item: any, index: number) => {
                                  if (item.file_type === 4) {
                                    return <Video src={item.file_url} />;
                                  } else if (item.file_type === 1) {
                                    return (
                                      <a href={item.file_url} download>
                                        Скачать{" "}
                                        {
                                          item.file_url.split("/")[
                                            item.file_url.split("/").length - 1
                                          ]
                                        }
                                      </a>
                                    );
                                  } else if (item.file_type === 2) {
                                    console.log(item.file_url);
                                    return <audio src={item.file_url} />;
                                  } else {
                                    return (
                                      <ChatImage
                                        item={item}
                                        index={index}
                                        key={index + Math.random()}
                                      />
                                    );
                                  }
                                }
                              )
                            : null}
                        </div>
                      </div>
                      <div className="time-text">   {moment(item?.item?.room?.message?.time).fromNow()}</div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
        <div className="chat__input">
          <Input
            sendMessage={sendMessage}
            messageText={messageText}
            setMessageText={setMessageText}
          />
          <div
            style={{
              margin: "0px 24px",
              marginBottom: "8px",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <div onClick={() => setShowTip(true)}>
              <TipIcon />
            </div>
            <AudioRecorder
              startRecording={startRecording}
              stopRecording={stopRecording}
              mediaBlobUrl={mediaBlobUrl}
              clearBlobUrl={clearBlobUrl}
            />
            <div>
              <label
                className="upload__file-input-label"
                htmlFor="file-input"
                style={{ marginBottom: "15px" }}
              >
                <VideoIcon />
              </label>
              <input
                className="upload__file-input"
                id="file-input"
                ref={inputFileRef}
                type="file"
                onChange={onFileChange}
                multiple
              />
            </div>
            <ImageIcon />
            <button
              style={{ marginBottom: "10px" }}
              onClick={() => setPaidModalShow(true)}
            >
              Установить цену
            </button>
          </div>
        </div>
      </div>
      <Modal
        show={isPaidModalShown}
        onHide={() => {
          setPaidModalShow(false);
        }}
        centered
        size="sm"
        style={{
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
        }}
      >
        <Modal.Body className="notifications__modal" style={{ padding: "0px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "15px",
            }}
          >
            <h2>Цена сообщения</h2>
            <CurrencyInput
              prefix="$"
              style={{
                border: "1px solid rgba(0, 0, 0, 0.4)",
                boxSizing: "border-box",
                borderRadius: "8px",
                padding: "8px",
                marginTop: "16px",
              }}
              value={messageCost}
              placeholder="$ Введите сумму..."
              decimalsLimit={2}
              onValueChange={(value, name) => setMessageCost(value)}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "15px",
              }}
            >
              <h3 onClick={() => setShowTip(false)}>Отмена</h3>
              <div style={{ width: "20px" }}></div>
              <h3
                style={
                  messageText.length > 0 && messageText.length < 255
                    ? { color: "#FB5734" }
                    : { color: "grey" }
                }
                onClick={() => {
                  if (messageText.length > 0 && messageText.length < 255) {
                    return sendMessage();
                  } else {
                    return null;
                  }
                }}
              >
                Отправить
              </h3>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={uploadedFiles.length > 0}
        onHide={() => {
          setUploadedFiles([]);
          setUploadedFilesImg([]);
        }}
        centered
        size="sm"
        style={{
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
        }}
      >
        <Modal.Body className="notifications__modal" style={{ padding: "0px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              borderRadius: "12px",
            }}
          >
            {uploadedFilesImg?.map((file: string, index: number) => {
              switch (uploadedFiles[index].type.split("/")[0]) {
                case "image": {
                  return (
                    <div
                      className="upload__img-wrapper"
                      key={Math.random() + Math.random() + index}
                    >
                      <img
                        className="upload__img"
                        src={file}
                        alt="delete"
                      ></img>
                      <CloseIcon
                        className="upload__close-icon"
                        onClick={(e) => deleteImg(e, index)}
                      />
                    </div>
                  );
                }
                case "video": {
                  return (
                    <div
                      className="upload__img-wrapper"
                      key={Math.random() + Math.random() + index}
                    >
                      <video className="upload__img">
                        <source src={file} />
                      </video>
                      <CloseIcon
                        className="upload__close-icon"
                        onClick={(e) => deleteImg(e, index)}
                      />
                    </div>
                  );
                }
                case "application": {
                  return (
                    <div
                      className="upload__img-wrapper"
                      key={Math.random() + Math.random() + index}
                    >
                      <img
                        className="upload__img"
                        src="https://w7.pngwing.com/pngs/748/480/png-transparent-computer-icons-filename-extension-scalable-graphics-link-symbol-document-file-format-downloads-black-and-white.png"
                        alt="delete"
                      ></img>
                      <CloseIcon
                        className="upload__close-icon"
                        onClick={(e) => deleteImg(e, index)}
                      />
                    </div>
                  );
                }
              }
            })}
          </div>
          <div style={{ marginLeft: "15px" }}>
            <label
              className="upload__file-input-label"
              htmlFor="file-input"
              style={{ marginBottom: "15px" }}
            >
              Добавить
            </label>
            <input
              className="upload__file-input"
              id="file-input"
              ref={inputFileRef}
              type="file"
              onChange={onFileChange}
              multiple
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "19px",
            }}
          >
            <h3
              onClick={() => {
                setUploadedFiles([]);
                setUploadedFilesImg([]);
              }}
            >
              Отмена
            </h3>
            <div style={{ width: "20px" }}></div>
            <h3 onClick={() => sendMessage()} style={{ color: "#FB5734" }}>
              Далее
            </h3>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={showTip}
        onHide={() => {
          setShowTip(false);
        }}
        centered
        size="sm"
        style={{
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
        }}
      >
        <Modal.Body className="notifications__modal" style={{ padding: "0px" }}>
          <Formik
            initialValues={{
              donation_amount: 0,
            }}
            onSubmit={(obj) => {
              console.log(obj);
            }}
          >
            {({ values, handleSubmit, setFieldValue }) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "15px",
                  }}
                >
                  <h2>Отправить донат</h2>
                  <div
                    className="chat__sidebarItem"
                    style={{ alignItems: "center", padding: "0px" }}
                  >
                    <img
                      src={
                        rooms.find(
                          (item: any) =>
                            item.room.room_info.id === Number(lastUrl)
                        )?.room?.user?.avatar
                      }
                      alt="fdsfsdfsd"
                    ></img>
                    <div>
                      <h2>
                        {
                          rooms.find(
                            (item: any) =>
                              item.room.room_info.id === Number(lastUrl)
                          )?.room?.user?.first_name
                        }
                      </h2>
                      <h2
                        style={{
                          fontFamily: "Factor A",
                          fontStyle: "normal",
                          fontWeight: "normal",
                          fontSize: "18px",
                          lineHeight: "20px",
                          color: "#000000",
                        }}
                      >
                        @
                        {
                          rooms.find(
                            (item: any) =>
                              item.room.room_info.id === Number(lastUrl)
                          )?.room?.user?.username
                        }
                      </h2>
                    </div>
                  </div>
                  <CurrencyInput
                    prefix="$"
                    style={{
                      border: "1px solid rgba(0, 0, 0, 0.4)",
                      boxSizing: "border-box",
                      borderRadius: "8px",
                      padding: "8px",
                      marginTop: "16px",
                    }}
                    name="donation_amount"
                    value={values.donation_amount}
                    placeholder="$ Введите сумму..."
                    decimalsLimit={2}
                    onValueChange={(value, name) => setFieldValue(name, value)}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "15px",
                    }}
                  >
                    <h3 onClick={() => setShowTip(false)}>Отмена</h3>
                    <div style={{ width: "20px" }}></div>
                    <h3
                      style={{ color: "#FB5734" }}
                      onClick={() =>
                        sendTip(
                          values.donation_amount,
                          rooms.find(
                            (item: any) =>
                              item.room.room_info.id === Number(lastUrl)
                          )?.room?.user?.pk
                        )
                      }
                    >
                      Отправить
                    </h3>
                  </div>
                </div>
              );
            }}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

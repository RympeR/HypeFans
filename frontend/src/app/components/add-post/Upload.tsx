import { Formik } from "formik";
import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useContext,
  useRef,
  useState,
} from "react";
import CurrencyInput from "react-currency-input-field";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { useHeicMultiple } from "../../../app/hooks/useHeicMultiple";
import { useTextInput } from "../../../app/utils/useTextInput";
import { BREAKPOINTS, NAV_LINKS } from "../../../app/utils/utilities";
import { useViewport } from "../../../app/utils/ViewportProvider";
import { ReactComponent as BackIconMobile } from "../../../assets/images/arrow-left-mobile.svg";
import { ReactComponent as BackIcon } from "../../../assets/images/arrow-left.svg";
import { ReactComponent as AttachIcon } from "../../../assets/images/attach.svg";
import { ReactComponent as CloseIcon } from "../../../assets/images/x-circle.svg";
import { createPost } from "../../../redux/blogReducer";
import { RootState } from "../../../redux/redux";
import { LangContext } from "../../utils/LangProvider";

const Upload = () => {
  const { currentLang } = useContext(LangContext);

  const dispatch = useDispatch();

  const id = useSelector((state: RootState) => state.auth.pk);

  const [isHeicCompiling, setIsHeicCompiling] = useState<boolean>(false)

  const [postCost, setPostCost] = useState("0");
  const [accessType, setAccessType] = useState("1");
  const [showInRecommendations, setShowInRecommendations] = useState(false);

  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [uploadedFilesImg, setUploadedFilesImg] = useState<string[]>([]);

  const { value, onChangeHandler, clearInput } = useTextInput("");

  const inputFileRef = useRef(null);

  const history = useHistory();

  const windowDimensions = useViewport();

  const useFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    useHeicMultiple(e, setUploadedFilesImg, setUploadedFiles, setIsHeicCompiling)
  };

  const deleteImg = (e: MouseEvent<HTMLOrSVGElement>, index: number) => {
    setUploadedFilesImg([
      ...uploadedFilesImg.filter((file: any, i: number) => i !== index),
    ]);
    setUploadedFiles([
      ...uploadedFiles.filter((file: any, i: number) => i !== index),
    ]);
  };

  const handleChange = (event: any) => {
    setAccessType(event.target.value);
  };

  const uploadSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const send = {
      attachments: [...uploadedFiles],
      user: id,
      name: "post",
      description: value,
      access_level: accessType,
      price_to_watch: postCost,
      show_in_recomendations: showInRecommendations,
    };
    dispatch(createPost(send));
    inputFileRef.current.value = "";
    clearInput();
    setUploadedFiles([]);
    setPostCost("0");
    setAccessType("1");
    setUploadedFilesImg([]);
    toast.success("Post created");
  };

  return (
    <Formik initialValues={{}} onSubmit={() => alert("")}>
      {() => (
        <form className="upload" onSubmit={uploadSubmitHandler}>
          <div className="upload__top">
            <div className="upload__top-inner">
              {windowDimensions.width <= BREAKPOINTS.S ? (
                <BackIconMobile
                  onClick={() => history.push(`/${NAV_LINKS.HOME}`)}
                />
              ) : (
                <BackIcon onClick={() => history.push(`/${NAV_LINKS.HOME}`)} />
              )}

              <h2 className="upload__title">
                {windowDimensions.width <= BREAKPOINTS.S
                  ? currentLang.create
                  : currentLang.newPost}
              </h2>
            </div>
            <div className="upload__btn-list">
              <button className="upload__btn upload__btn_active">
                {currentLang.newPost}
              </button>
              <button className="upload__btn" disabled>
                {currentLang.newStory}
              </button>
            </div>
          </div>

          <div className="upload__mid">
            <textarea
              className="upload__textarea"
              placeholder={currentLang.shareMind}
              value={value}
              onChange={onChangeHandler}
            ></textarea>

            <div className="upload__img-list">
              {uploadedFilesImg?.map((file: string, index: number) => {
                console.log(uploadedFiles);

                switch (uploadedFiles[index]?.type.split("/")[0]) {
                  case "image": {
                    return (
                      <div className="upload__img-wrapper" key={index}>
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
                      <div className="upload__img-wrapper" key={index}>
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
                      <div className="upload__img-wrapper" key={index}>
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

            <label
              className="upload__file-input-label"
              htmlFor="file-input"
              style={{ marginBottom: "15px" }}
            >
              <AttachIcon className="upload__attach-icon" />
            </label>
            <input
              className="upload__file-input"
              id="file-input"
              ref={inputFileRef}
              type="file"
              onChange={useFileChange}
              multiple
              accept="image/*, video/*"
            />
          </div>
          <div className="upload__bottom">
            <div>
              {currentLang.postPrice}:
              <CurrencyInput
                prefix="$"
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.4)",
                  boxSizing: "border-box",
                  borderRadius: "8px",
                  padding: "8px",
                  margin: "16px 10px",
                }}
                value={postCost}
                decimalsLimit={2}
                onValueChange={(value, name) => setPostCost(value)}
              />
            </div>
            <div style={{ marginBottom: "25px" }}>
              {currentLang.accesslevel}
              <select
                className="post__access__select"
                value={accessType}
                onChange={handleChange}
                name="acess_type"
                id="acess_type"
              >
                <option className="post__access__select__option" value="1">
                  {currentLang.accessLevelBuy}
                </option>
                <option className="post__access__select__option" value="2">
                  {currentLang.accessLevelSub}
                </option>
              </select>
            </div>
            <div style={{ marginBottom: "25px" }}>
              {currentLang.showInRecs}
              <input
                type="checkbox"
                className="notifications__toggle-button"
                name="push_notifications"
                style={{ marginLeft: "10px" }}
                checked={showInRecommendations}
                onChange={(val) => {
                  setShowInRecommendations(val.target.checked);
                }}
              ></input>
            </div>
            <button
              className={
                (uploadedFiles.length || value) && !isHeicCompiling
                  ? "upload__submit-btn upload__submit-btn_active"
                  : "upload__submit-btn"
              }
              type="submit"
              disabled={isHeicCompiling}
            >
              {currentLang.public}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Upload;

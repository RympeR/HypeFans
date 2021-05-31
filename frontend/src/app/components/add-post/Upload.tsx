import React, { ChangeEvent, FormEvent, MouseEvent, useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { BREAKPOINTS, NAV_LINKS } from '~/app/utils/utilities';
import { useViewport } from '~/app/utils/ViewportProvider';
import { ReactComponent as BackIconMobile } from '../../../assets/images/arrow-left-mobile.svg';
import { ReactComponent as BackIcon } from '../../../assets/images/arrow-left.svg';
import { ReactComponent as AttachIcon } from '../../../assets/images/attach.svg';
import { ReactComponent as CloseIcon } from '../../../assets/images/x-circle.svg';
import { LangContext } from '../../utils/LangProvider';

const Upload = () => {
  const { currentLang } = useContext(LangContext);

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const [textValue, setTextValue] = useState('');

  const inputFileRef = useRef(null);

  const history = useHistory();

  const windowDimensions = useViewport();

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const lastIndex = e.target.files.length - 1;

    setUploadedFiles([...uploadedFiles, URL.createObjectURL(e.target.files[lastIndex])]);
  };

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  const deleteImg = (e: MouseEvent<HTMLOrSVGElement>, index: number) => {
    setUploadedFiles([...uploadedFiles.filter((file: any, i: number) => i !== index)]);
  };

  const uploadSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    //Finally
    inputFileRef.current.value = '';

    setTextValue('');

    setUploadedFiles([]);
  };

  return (
    <form className="upload" onSubmit={uploadSubmitHandler}>
      <div className="upload__top">
        <div className="upload__top-inner">
          {windowDimensions.width <= BREAKPOINTS.S ? (
            <BackIconMobile onClick={() => history.push(`/${NAV_LINKS.HOME}`)} />
          ) : (
            <BackIcon onClick={() => history.push(`/${NAV_LINKS.HOME}`)} />
          )}

          <h2 className="upload__title">
            {windowDimensions.width <= BREAKPOINTS.S ? currentLang.create : currentLang.newPost}
          </h2>
        </div>
        <div className="upload__btn-list">
          <button className="upload__btn upload__btn_active">{currentLang.newPost}</button>
          <button className="upload__btn" disabled>
            {currentLang.newStory}
          </button>
        </div>
      </div>

      <div className="upload__mid">
        <textarea
          className="upload__textarea"
          placeholder={currentLang.shareMind}
          value={textValue}
          onChange={onTextChange}
        ></textarea>

        <div className="upload__img-list">
          {uploadedFiles?.map((file: string, index: number) => (
            <div className="upload__img-wrapper" key={index}>
              <img className="upload__img" src={file}></img>
              <CloseIcon className="upload__close-icon" onClick={(e) => deleteImg(e, index)} />
            </div>
          ))}
        </div>

        <label className="upload__file-input-label" htmlFor="file-input">
          <AttachIcon className="upload__attach-icon" />
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
      <div className="upload__bottom">
        <button
          className={
            uploadedFiles.length || textValue ? 'upload__submit-btn upload__submit-btn_active' : 'upload__submit-btn'
          }
          type="submit"
        >
          {currentLang.public}
        </button>
      </div>
    </form>
  );
};

export default Upload;

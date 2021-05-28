import React, { ChangeEvent, FormEvent, MouseEvent, useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { ReactComponent as BackIcon } from '../../../assets/images/arrow-left.svg';
import { ReactComponent as AttachIcon } from '../../../assets/images/attach.svg';
import { ReactComponent as CloseIcon } from '../../../assets/images/x-circle.svg';
import { LangContext } from '../../utils/LangProvider';

const Upload = () => {
  const { currentLang } = useContext(LangContext);

  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  const inputFileRef = useRef(null);

  const history = useHistory();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const lastIndex = e.target.files.length - 1;

    setUploadedFiles([...uploadedFiles, URL.createObjectURL(e.target.files[lastIndex])]);
  };

  const deleteImg = (e: MouseEvent<HTMLOrSVGElement>, index: number) => {
    setUploadedFiles([...uploadedFiles.filter((file: any, i: number) => i !== index)]);
  };

  const uploadSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    inputFileRef.current.value = '';

    setUploadedFiles([]);
  };

  return (
    <form className="upload" onSubmit={uploadSubmitHandler}>
      <div className="upload__top">
        <BackIcon onClick={() => history.push('/')} />
        <h2 className="upload__title">{currentLang.newPost}</h2>
      </div>
      <div className="upload__mid">
        <textarea className="upload__textarea" placeholder={currentLang.shareMind}></textarea>

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
          onChange={changeHandler}
          multiple
        />
      </div>
      <div className="upload__bottom">
        <button
          className={uploadedFiles.length ? 'upload__submit-btn upload__submit-btn_active' : 'upload__submit-btn'}
          type="submit"
        >
          {currentLang.public}
        </button>
      </div>
    </form>
  );
};

export default Upload;

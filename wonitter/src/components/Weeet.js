import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Weeet = ({ weeetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newWeeet, setNewWeeet] = useState(weeetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("정말 지울거야?");
    if (ok) {
      await dbService.doc(`weeets/${weeetObj.id}`).delete();
      await storageService.refFromURL(weeetObj.attachmentUrl).delete();
    }
  };
  //삭제

  const toggleEditing = () => setEditing(prev => !prev);
  const onSubmit = async event => {
    event.preventDefault();
    await dbService.doc(`weeets/${weeetObj.id}`).update({
      text: newWeeet,
    });
    //수정
    setEditing(false);
    //수정 후 버튼 클릭시 에디터창 닫힘
  };

  const onChange = event => {
    const {
      target: { value },
    } = event;
    setNewWeeet(value);
  };

  return (
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="수정하세요."
              value={newWeeet}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update Nweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{weeetObj.text}</h4>
          {weeetObj.attachmentUrl && <img src={weeetObj.attachmentUrl} />}
          {isOwner && (
            <div class="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Weeet;

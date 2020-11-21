import { dbService, storageService } from "fbase";
import React, { useState } from "react";

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
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="수정하세요."
              value={newWeeet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{weeetObj.text}</h4>
          {weeetObj.attachmentUrl && (
            <img src={weeetObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>삭제</button>
              <button onClick={toggleEditing}>수정</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Weeet;

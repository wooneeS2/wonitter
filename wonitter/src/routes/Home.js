import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import Weeet from "components/Weeet";
import { v4 as uuidv4 } from "uuid";

const Home = userObj => {
  const [weeet, setNweet] = useState("");

  //form을 위한 State
  const [weeets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");

  useEffect(() => {
    dbService.collection("weeets").onSnapshot(snapShot => {
      const weeetArray = snapShot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNweets(weeetArray);
    });
  }, []);

  const onSubmit = async event => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.userObj.uid}/${uuidv4()}`);

      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const weeetObj = {
      text: weeet,
      createdAt: Date.now(),
      creatorId: userObj.userObj.uid,
      attachmentUrl,
    };

    await dbService.collection("weeets").add(weeetObj);
    setNweet("");
    setAttachment("");
  };
  const onChange = event => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = event => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = finishedEvent => {
      const {
        currentTarget: { result },
      } = finishedEvent;

      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment(null);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={weeet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          alt="attachment"
        />
        <input type="submit" value="Weeeet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="attachment" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {weeets.map(weeet => (
          <Weeet
            key={weeet.id}
            weeetObj={weeet}
            isOwner={weeet.creatorId === userObj.userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

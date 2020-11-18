import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import Weeet from "components/Weeet";

const Home = userObj => {
  const [weeet, setNweet] = useState("");
  //form을 위한 State
  const [weeets, setNweets] = useState([]);

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
    await dbService.collection("weeets").add({
      text: weeet,
      createdAt: Date.now(),
      creatorId: userObj.userObj.uid,
    });
    console.log(userObj.userObj.uid);
    setNweet("");
  };
  const onChange = event => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

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
        <input type="submit" value="Weeeet" />
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

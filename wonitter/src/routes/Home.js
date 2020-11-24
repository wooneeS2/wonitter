import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import Weeet from "components/Weeet";
import WeeetFactory from "components/WeeetFactory";

const Home = userObj => {
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

  return (
    <div className="container">
      <WeeetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
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

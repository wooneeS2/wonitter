import { dbService } from "fbase";
import React,{useEffect, useState} from "react"

const Home = (userObj) =>{
    
    const [weeet, setNweet] =useState("");
    const [weeets, setNweets] = useState([]);
    const getWeets = async()=> {
        const dbWeets = await dbService.collection("weeets").get();
        dbWeets.forEach(document => {
            const weetObject ={
                ...document.data(),
                id: document.id,
               
            };
            setNweets(prev => [weetObject, ...prev ]);
            // 배열리턴 첫 데이터는 최근 그뒤로 나머지 데이터


        });
    };
    useEffect(() => {
        getWeets();
        dbService.collection("weeets").onSnapshot(snapShot => {
            console.log("something happend");
        });


    },[]);

    const onSubmit = async(event) => {
        event.preventDefault();
       await dbService.collection("weeets").add({
           text: weeet,
            createdAt: Date.now(),
            
        });
        setNweet("");
             };
    const onChange = ( event) =>{
        const {
             target:{value},
            } = event;
setNweet(value);
    };

    
return (
 <div>
    <form onSubmit = {onSubmit}>
        <input   
				value={weeet}
         onChange={onChange} 
         type="text" 
         placeholder="What's on your mind?"
          maxLength={120}
 />
        <input type = "submit" value="Weeeet" />
    </form>
    <div>
    {weeets.map(weeet =>
         <div key ={weeet.id}>
        <h4>{weeet.text}</h4>

    </div>)}

    </div>
</div>
);
};

export default Home;
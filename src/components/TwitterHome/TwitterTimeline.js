import React, { useState, useEffect } from "react";
import "./twitter.css";
import { getData } from "../ApiService/index";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function TwitterTimeline() {
   const [twitterData, setTwitterData] = useState([]);
   const [count, setCount] = useState({
      post: [],
   });
   const [imgS] = useState(
      "https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png"
   );
   const [tweet, setTweet] = useState('')

   localStorage.setItem("liked_post", JSON.stringify(count.post));

   useEffect(() => {
      getData().then((data) => {
         setTwitterData(data);
      });
   }, []);


   const alertTweet = (e) => {
      e.preventDefault();
      if (tweet === "") {
         alert('tweet cannot be empty');
      }
      else {

         alert(tweet);
         setTweet("");
      }


   }

   const incrementLike = (e, id) => {
      alert(`you liked ${id + 1} tweet`)
      const { post } = count;
      var addedLike = twitterData.map((newData, index) => {
         if (newData.author === e.author) {
            setCount({
               post: [...post, newData],
            });
         } else {
            return newData;
         }

         return addedLike
      });




   };

   return (
      <>
         <div>
            {/* feed starts */}
            <div className="feed">
               <div className="feed__header">
                  <h2>Home</h2>
               </div>

               <div className="tweetBox">
                  <form>
                     <div className="tweetbox__input">
                        <img
                           src="https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png"
                           alt=""
                        />
                        <input type="text" placeholder="What's happening?" value={tweet} onChange={(e) => { setTweet(e.target.value) }} />
                     </div>
                     <button className="tweetBox__tweetButton" style={{ cursor: "pointer" }} onClick={(e) => alertTweet(e)}>Tweet</button>
                  </form>
               </div>


               {twitterData && twitterData.length ? (
                  twitterData.map((elem, ind) => {
                     return (
                        <div className="post" key={ind}>
                           <div className="post__avatar">
                              {elem.imageUrl ? (
                                 <img src={elem.imageUrl} alt="img" />
                              ) : (
                                 <img src={imgS} alt="img" />
                              )}
                           </div>

                           <div className="post__body">
                              <div className="post__header">
                                 <div className="post__headerText">
                                    <h3>
                                       {elem.author}
                                       <span className="post__headerSpecial">
                                          <span className="material-icons post__badge">
                                             {" "}
                                             verified
                                          </span>
                                          @{elem.author}
                                       </span>
                                    </h3>
                                 </div>
                                 <div className="post__headerDescription">
                                    <p>{elem.text}</p>
                                 </div>
                              </div>

                              <div className="post__footer">
                                 <span className="material-icons"> repeat </span>
                                 <span
                                    className=""
                                    onClick={() => {
                                       incrementLike(elem, ind);
                                    }} style={{ cursor: 'pointer' }}
                                 >
                                    {" "}

                                    <FontAwesomeIcon icon={faHeart} />
                                 </span>
                                 <span className="material-icons"> publish </span>
                                 <span>
                                    {" "}
                                    <a href={elem._id} target="_blank" rel="noreferrer">
                                       {" "}
                                       original tweet{" "}
                                    </a>{" "}
                                 </span>
                              </div>
                           </div>
                        </div>
                     );
                  })
               ) : (
                  <div>Loading..</div>
               )}
            </div>
         </div>
      </>
   );
}

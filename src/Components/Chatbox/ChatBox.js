
import React, { useEffect, useState } from "react";
import { db,  storage } from "../../firebase/config";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { Firebase } from "../../firebase/config";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import User from "./User";
import Message from './Message';
import MessageForm from './MessageForm';
const ChatBox = () => {
  const location = useLocation();
  const  curuserDetails = location.user.curuserDetails;
  const  userDetails  = location.chat.userDetails;

    const [users, setUsers] = useState([]);
    const [text, setText] = useState("");
    const [img, setImg] = useState("");
    const [msgs, setMsgs] = useState([]);
    const [chat, setChat] = useState("");
    const user1 = curuserDetails.id;
    const product =curuserDetails.favorite_product_id;
    // {console.log(curuserDetails)
    // console.log(product)}
  useEffect(() => {
    // {console.log(userDetails)}
    let users = [];
    for(let i=0;i<product.length;i++){
      const userId = product[i];
      Firebase.firestore()
        .collection("users")
        .where("id", "==", userId)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            users.push(doc.data());
          });
        });
    }
    
            setUsers(users)
            // {console.log(users)}
  }, []);

  const selectUser = async (user) => {
    setChat(user);
    {console.log(users)}
    const user2 = user.id;
    
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));
   
    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
     
      setMsgs(msgs);
    });

    // get last message b/w logged in user and selected user
    const docSnap = await getDoc(doc(db, "lastMsg", id));
    // if last message exists and message is from selected user
    if (docSnap.data() && docSnap.data().from !== user1) {
      // update last message doc, set unread to false
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.id;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    {console.log(user1+" "+user2)}
    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });

    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    });

    setText("");
    setImg("");
  };
  return (
    <div className="home_container">
         <div className="users_container">
          {console.log(users)}
        {users.map((user) => (
          <User
            key={user.id}
            user={user}
            selectUser={selectUser}
            user1={user1}
            chat={chat}
          />
          
        ))}
      </div>
      <div className="messages_container">
        {chat ? (
          <>
            <div className="messages_user">
              <h3>{chat.name}</h3>
            </div>
            <div className="messages">
              {msgs.length
                ? msgs.map((msg, i) => (
                    <Message key={i} msg={msg} user1={user1} />
                  ))
                : null}
            </div>
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              setImg={setImg}
            />
          </>
        ) : (
          <h3 className="no_conv">Select a user to start conversation</h3>
        )}
      </div>
    </div>
  );
};

export default ChatBox

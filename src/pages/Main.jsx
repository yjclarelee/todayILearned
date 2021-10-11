import React, {useEffect, useState} from 'react';
import Navbar from "../components/Nav";
import TILCard from '../components/TILCard';
import Footer from "../components/Footer";
import axios from "axios";

const Main = () => {
  const [cardData, setCardData] = useState([]);

  const getData = async () => {
    const res = await axios.get("http://localhost:4000/posts");
    setCardData(res.data);
  }

  useEffect(() => {
    getData();
  }, [])

  return <div>
    <Navbar></Navbar>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
    {
      cardData.map(card => 
        <TILCard
          key={card.id} 
          title={card.title}
          body={card.body}
        />)
    }
    </div>
    <Footer></Footer>
  </div>
}

export default Main;
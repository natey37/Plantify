import { useState, useEffect } from "react";
import "./Main.css";
import Plants from "./components/Plants";
import WateringTasks from "./components/WateringTasks";
import Notes from "./components/Notes";
import Categories from "./components/Categories";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import PlantIcon from "./images/PlantIcon.png";
import CategoryIcon from "./images/CategoryIcon.png";
import NotepadIcon from "./images/NotepadIcon.png";
import WateringCanIcon from "./images/WateringCanIcon.png";
import Gpt3Example from "./components/Gpt3Example";
//Color Pallate
//#B8336A raspberry rose
//#C490D1 wisteria
//#ACACDE periwinkle
//#ABDAFC uranian blue
//#E5FCFF azure

const MainPage = ({ user }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Set the scroll threshold here (e.g., 200 pixels)
      if (window.pageYOffset + window.innerHeight >= document.body.scrollHeight) {
        // The scroll is at the bottom
        setShowButton(false);
      } else if (window.pageYOffset > 1200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
      
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="container">
      <Nav user={user} />
      <main>
        <h1 className="title">
          Welcome to <span className="plantify">Plantify</span>{" "}
          {`${user.username}`}
        </h1>
        <div id="link-row" className="section-link-row">
          <a href="#plants">
            <div className="section-link-column plant-background">
              <img className="section-link-icon" src={PlantIcon}></img>
              <h2 className="section-link-title">Plants</h2>
            </div>
          </a>
          <a href="#categories">
            <div className="section-link-column categories-background">
              <img className="section-link-icon" src={CategoryIcon}></img>
              <h2 className="section-link-title">Categories</h2>
            </div>
          </a>
          <a href="#watering-tasks">
            <div className="section-link-column watering-tasks-background">
              <img className="section-link-icon" src={WateringCanIcon}></img>
              <h2 className="section-link-title">Watering</h2>
            </div>
          </a>
          <a href="#notes">
            <div className="section-link-column notes-background">
              <img className="section-link-icon" src={NotepadIcon}></img>
              <h2 className="section-link-title">Notes</h2>
            </div>
          </a>
        </div>
        <Gpt3Example user={user}/>
        <section id="plants">
          <div className="section-row plant-background">
            <h2 className="section-title">Plants</h2>
            <img className="section-icon" src={PlantIcon}></img>
          </div>
          <Plants />
        </section>
        <section id="categories">
          <div className="section-row categories-background">
            <h2 className="section-title">Categories</h2>
            <img className="section-icon" src={CategoryIcon}></img>
          </div>

          <Categories />
        </section>
        <section id="watering-tasks">
          <div className="section-row watering-tasks-background">
            <h2 className="section-title">Watering Schedule</h2>
            <img className="section-icon" src={WateringCanIcon}></img>
          </div>

          <WateringTasks />
        </section>
        <section id="notes">
          <div className="section-row notes-background">
            <h2 className="section-title">Notes</h2>
            <img className="section-icon" src={NotepadIcon}></img>
          </div>

          <Notes />
        </section>
        {showButton && (
          <a href="#link-row">
            <button className="scroll-to-top">Scroll to Top</button>
          </a>
        )}
      </main>

      <Footer />
    </div>
  );
};
export default MainPage;

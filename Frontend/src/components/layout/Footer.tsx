// import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-[#063A7F] to-[#11B7FF] py-8 px-4 h-[300px] flex items-center justify-between text-[#BBFF00]">
      <section>
        <ul>
          <h3 className="font-bold tracking-wide">Partners</h3>
          <li>Real Tennis Club</li>
          <li>Greatest Sports Equipments</li>
          <li>Thunder Energy</li>
        </ul>
      </section>

      <section>
        <p>www.sportsworld.com</p>
      </section>

      <section>
        <ul>
          <h3 className="font-bold tracking-wide">Contact</h3>
          <li>sportsworld@sportsmail.com</li>
          <li>+47 12345678</li>

          <h3 className="font-bold tracking-wide">Address</h3>
          <li>Sportsgata 32, 0343 Levanger </li>
        </ul>

        {/* TODO: fontawesome iconer */}
      </section>
    </footer>
  );
};

export default Footer;

import SmoothScroll from "smooth-scroll"
import HomePage from "./views/homePage"

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  return (
    <div>
      <HomePage></HomePage>
    </div>
  );
};

export default App;

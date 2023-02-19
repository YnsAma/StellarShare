import { useState, useEffect } from "react";
import "./App.css";

function Card({ img }) {
  return (
    <div class="card">
      <div class="card-image">
        <img src={img.webformatURL} alt="Image" />
      </div>
      {/* <div class="card-text">
        <h2>Card Title</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div> */}
      <div class="card-overlay">
        <div>
          <button class="save-button">Save</button>
        </div>
        <div className="overlay-bottom">
          <div class="card-avatar">
            <img src={img.userImageURL} alt="User Avatar" />
            <h4>{img.user}</h4>
          </div>
          <div className="card-stats">
            <div class="card-like">
              <i class="fas fa-comment"></i>
              <span>{img.comments}</span>
            </div>
            <div class="card-like">
              <i class="fas fa-heart"></i>
              <span>{img.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [images, setImages] = useState([]);
  const [trim ,setTrim]=useState("");
  const [Filtred, setFiltred] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://pixabay.com/api/?key=33121414-4b54ff1a6ec58d55831913078&q=colorful&per_page=99&min_height=100&max_height=5000&image_type=photo&pretty=true
        `
      );
      const data = await response.json();
      setImages(data.hits);
    }
    fetchData();
  }, []);

  const handleSearche = (e,trim) => {
    e.preventDefault()
    if (trim) {
      setFiltred(
        images.filter((img) => {
          return (img.tags.toLowerCase().includes(trim.toLowerCase())||img.user.toLowerCase().includes(trim.toLowerCase()))
        })
      );
    } else {
      
      <h4>ERROR 404</h4>
      setFiltred([]);
    }
  };
  
  console.log(Filtred);
  
  return (
    <div>
      <header class="site-header">
        <div className="alinger">
          <div class="logo">
            <a href="#">StellarShare</a>
          </div>
          <nav class="site-nav">
            <ul>
              <li>
                <a href="#">Freinds</a>
              </li>
              <li>
                <a href="#">CREER</a>
              </li>
              <li>
                <a href="#">
                  HOME <i class="fas fa-home"></i>
                </a>
              </li>
            </ul>
          </nav>
          <div class="search"  onSubmit={(e)=>handleSearche(e,trim)}>
            <form>
              <input type="text" placeholder="Search" onChange={(e)=>setTrim(e.target.value)}/>
              <button type="submit">
                <i class="fas fa-search"></i>
              </button>
            </form>
          </div>

          <div class="notification-icons">
            <a href="#">
              <i class="fas fa-bell"></i>
            </a>
            <a href="#">
              <i class="fas fa-user"></i>
            </a>
            <a href="#">
              <i class="fas fa-angle-down"></i>
            </a>
          </div>
        </div>
      </header>
      <div class="grid">{
        Filtred.length>0 ?
        Filtred.map((img, id) => <Card key={id} img={img} />)
        :images.map((img, id) => <Card key={id} img={img} />) 
        
      }</div>
      <footer class="site-footer">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <p>&copy; 2023 Your Website Name</p>
            </div>
            <div class="col-md-6 text-right">
              <ul class="footer-links">
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

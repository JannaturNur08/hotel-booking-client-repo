import Banner from "./Banner";


const Home = () => {
    return (
        <div>
            {/* //parallax effect  */}
            <div>
                  <div className="parallax"><img src="https://i.ibb.co/mTswZfq/header.jpg" alt="" /></div> 
                  <div></div>
                  <div>
                    <Banner></Banner>
                  </div>
                  
            </div>
            
        </div>
    );
};

export default Home;
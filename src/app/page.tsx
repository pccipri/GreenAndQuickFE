import Button from '@mui/material/Button';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';

export default function Home() {
  return (
    <>
      {/* Banner container */}
      <div className="bannerContainer"
        style={{
          width: '100%',
          height: '550px',
          backgroundImage: 'url(./images/bgplaceholder.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '80px',
        }}>
        <h1>Fresh. Local. Honest. Closer to Nature, Closer to You.</h1>
        <h4 style={{ marginTop: '15px', marginBottom: '40px' }}>Connecting local farmers with everyday shoppers.</h4>
        <Button variant="contained" style={{ width: '150px' }}>Discover</Button>
      </div>

      {/* Main content container */}
      <div className="contentContainer"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >

        {/* Description about us container */}
        <div className="descriptionContainer"
          style={{
            width: '100%',
            height: 'auto',
            padding: '80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >

          <div className="descriptionTextContainer"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              height: 'auto',
              marginBottom: '70px',
            }}
          >
            <h2>Who are we?</h2>
            <p style={{ width: '60%' }}>An easy-to-use app that bridges the gap between farmers and consumers, making local food more accessible and farmers more visible.
              We are helping you discover and order fresh, local produce from trusted farmers near you.
            </p>
          </div>

          <div className="descriptionImageContainer"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              height: 'auto'
            }}
          >
            <img src="./images/bgplaceholder.jpeg" alt="Farmer" style={{ width: '600px', height: '600px' }} />
            <img src="./images/bgplaceholder.jpeg" alt="Vegetables" style={{ width: '940px', height: '600px' }} />
          </div>
        </div>

        {/* Description about the sellers container */}
        <div className="sellersContainer"
          style={{
            padding: '80px',
            paddingTop: '0px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 'auto'
          }}
        >

          <div className="sellersTextContainer"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: '100%',
              height: 'auto'
            }}
          >
            <h2>Meet the Farmers Behind Your Food</h2>
            <p style={{ marginTop: '20px' }}>Every tomato, carrot, and apple in your basket has a story: and it starts here.</p>
            <p>Our local farmers work hard every day to bring you the freshest, most natural produce straight from their fields.
              Learn who they are, how they grow their food, and why they love what they do.</p>
          </div>

          <div className="sellersImageContainer"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              height: 'auto',
              marginTop: '70px'
            }}
          >
            <img src="./images/bgplaceholder.jpeg" alt="Farmer" style={{ width: '500px', height: '350px' }} />
            <img src="./images/bgplaceholder.jpeg" alt="Vegetables" style={{ width: '500px', height: '350px' }} />
            <img src="./images/bgplaceholder.jpeg" alt="Vegetables" style={{ width: '500px', height: '350px' }} />
          </div>

          <Button variant="text" style={{ alignSelf: 'flex-start', marginTop: '60px' }}>Discover More <EastOutlinedIcon style={{ marginLeft: '10px' }} /></Button>
        </div>
      </div >
    </>
  );
}
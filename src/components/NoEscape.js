import { useEffect } from "react";
import cooked from '../images/cooked.png';
import yikes from '../images/scared.png';

const NoEscape = ({ onPass }) => {

  useEffect(() => {
    // Set styles when the component mounts
    document.body.style.background = 'linear-gradient(rgb(94, 135, 146) 45%, white) ';

    const footerLinks = document.querySelectorAll('.footer a, .footer p');
    footerLinks.forEach(link => {
      link.style.color = "rgb(26, 31, 50)";
    });


    return () => {
      // Remove styles when the component unmounts
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleTryAgain = () => {
    onPass(true);
  }

  return (
    <div className="main--witch">
      <div className='centerItems failed'>
        <img id='success-img' className='' src={cooked} alt="" />
        <img id='success-img' className='pumpkin-looking' src={yikes} width='20%' alt="" />
        <div className='failed-text centerItems'>
          <h1>Cooked</h1>
          <button onClick={handleTryAgain}>Try Again</button>
        </div>
      </div>
    </div>
  )
}

export default NoEscape

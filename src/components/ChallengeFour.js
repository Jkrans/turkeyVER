import { useEffect, useState, useRef } from 'react'
import Story from './Story'
import whisk from '../images/whisk.png'
import knife from '../images/knife.png'
import oven from '../images/oven.png'
import TryAgain from './TryAgainMessage'


const ChallengeFour = ({ onPass }) => {
    const [riddles, setRiddles] = useState([]);
    const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0); // starts from the first riddle
    const [userInput, setUserInput] = useState('');
    const [tryAgainMessage, setTryAgainMessage] = useState(false);
    const [scrollHeight, setScrollHeight] = useState(1638);

    const whiskIconRef = useRef(null);
    const knifeIconRef = useRef(null);

    useEffect(() => {
        async function fetchRiddles() {
            try {

                const response = await fetch(`https://turkeyver-backend-production.up.railway.app/api/riddles/tver`);
                const data = await response.json();
                console.log("data: ", data)

                setRiddles(data);
            } catch (err) {
                console.error("An error occurred while fetching riddles:", err);
            }
        }

        fetchRiddles();
    }, []);


    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = (e) => {

        let gTimer;
        e.preventDefault();

        let correct = riddles[currentRiddleIndex].answer.some(variant =>
            userInput.toLowerCase().includes(variant.toLowerCase())
        );

        if (correct) {
            riddles[currentRiddleIndex].isSolved = true;
            if ((currentRiddleIndex === riddles.length - 1)) {
                //End the game or display a message, etc.
                onPass(true)
                clearTimeout(gTimer);
            } else {
                setCurrentRiddleIndex((prevIndex) => prevIndex + 1);
                setUserInput('');
                console.log('set to false')
                setTryAgainMessage(false)
            }

        } else {
            // if it's already true, set it to false, then after that, set it to true
            if (tryAgainMessage) {
                setTryAgainMessage(false);
                // Using a timeout to delay the setting of the message to true 
                // to ensure the previous state change has been processed
                setTimeout(() => {
                    setTryAgainMessage(true);
                }, 0);
            } else {
                setTryAgainMessage(true);
            }
        }
    };


    useEffect(() => {
        // Set styles when the component mounts
        document.body.style.background = 'linear-gradient(rgb(92, 132, 101)25%, rgb(50, 200, 125)';
        document.getElementsByClassName('header--h1')[0].style.color = 'rgb(255, 255, 255, 0.8)';

        const footerLinks = document.querySelectorAll('.footer a, .footer p');
        footerLinks.forEach(link => {
            link.style.color = "rgb(50, 200, 125)";
        })


        return () => {
            // Remove styles when the component unmounts
            document.body.style.backgroundColor = '';
        };
    }, []);

    const iconAnimate = (elementRef, duration, maxHeight) => {
        const element = elementRef.current;

        const keyframes = [
            { transform: `translateX(25vw) translateY(calc(${maxHeight}px - 389px)) rotate(0deg)` },
            { transform: 'translateX(-70vw) translateY(-30vh) rotate(180deg)' },
            { transform: `translateX(-20vw) translateY(calc(${maxHeight}px  - 389px)) rotate(90deg)` },
            { transform: 'translateX(40vw) translateY(-30vh) rotate(270deg)' },
            { transform: `translateX(25vw) translateY(calc(${maxHeight}px  - 389px)) rotate(0deg)` }
        ];

        const timing = {
            duration: duration, // Total animation duration in milliseconds
            iterations: Infinity, // Repeat the animation forever
            fill: 'forwards' // Ensure the animation stays at the last keyframe when finished
        };
        setTimeout(() => {
            element.animate(keyframes, timing);
        }, 0)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            const html = document.documentElement;
            const height = Math.max(html.clientHeight, html.scrollHeight, html.offsetHeight);
            setScrollHeight(height);
            console.log("height: ", scrollHeight);
            if (knifeIconRef) {
                iconAnimate(knifeIconRef, 43000, scrollHeight)
            }
        }, 1000)
        return () => clearTimeout(timer);
    }, [scrollHeight])

    return (
        <div className="main--witch">
            <Story apiUrl="https://turkeyver-backend-production.up.railway.app/api/stories/4" color="rgb(255,255,255,0.8)" width="78%" />
            {riddles.length > 0 && (
                <>
                    <div ref={whiskIconRef} class="floating-icon">
                        <img src={whisk} alt="Floating Icon" />
                    </div>
                    <div ref={knifeIconRef} class="floating-icon-2">
                        <img src={knife} alt="Floating Icon" />
                    </div>
                    <div className='ch4-riddles-container'>
                        <img src={oven} alt="oven Icon" style={{ width: '45%', maxWidth: '512px' }} />

                        <div className="ch4-riddle">
                            <div className="recipe-title">
                                <h3>Recipe:</h3>
                                <p style={{ fontFamily: 'Linefont' }}>wHatintheworld dOesthiseven saybruh?</p>
                            </div>
                            <div className="recipe-main">
                                <div className="recipe-ingredients">
                                    <h5>Ingredients:</h5>
                                    <ul style={{ fontFamily: 'Linefont' }}>
                                        <li>whatintheheck isthisagain</li>
                                        <li>thisdoesntmeannothin</li>
                                        <li>itsjustabunchof nothing</li>
                                        <li>nothingitellyou</li>
                                        <li>justneeds tolooklikesomeone</li>
                                        <li>actuallyscribbled inhere</li>
                                        <li>scribblescribble scribble</li>
                                    </ul>
                                </div>
                                <div className="recipe-instructions">
                                    <h4>Instructions:</h4>
                                    <p>{riddles[currentRiddleIndex].question}</p>
                                    <form onSubmit={handleSubmit}>
                                        <input type='text' value={userInput} onChange={handleInputChange} maxLength={35} />
                                    </form>
                                </div>

                            </div>


                            <TryAgain
                                message='Please try again. Check your spelling.'
                                isDisplayed={tryAgainMessage}
                                marginTop='1rem'
                                color='black'
                            />
                        </div>


                    </div>
                </>
            )}
        </div>

    )
}

export default ChallengeFour

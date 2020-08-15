/** @jsx jsx */
// al usar jsx podemos eliminar React del import inicial
import { useState, useEffect, useRef } from 'react'
import { css, jsx } from '@emotion/core'
import SliderContent from './SliderContent'
import Arrow from './Arrow'

/**
 * @function Slider
 */

//  Slider es el componente principal, va a alojar a los otros componente

const Slider = props => {

  const size = useWindowSize()

  const [state, setState] = useState({
    activeSlide: 0,
    translate: 0,
    transition: 0.45
  })

  const { translate, transition, activeSlide } = state
  const autoPlayRef = useRef()

  useEffect(()=>{
    autoPlayRef.current = nextSlide
  })

  useEffect(()=>{
    const play = () => {
      autoPlayRef.current()
    }
    setInterval(play, props.autoPlay * 1000)
  }, [])

  const nextSlide = () => {
    if (activeSlide === props.slides.length - props.numberSlides) {
      return setState({
        ...state,
        translate: 0,
        activeSlide: 0
      })
    }

    setState({
      ...state,
      activeSlide: activeSlide + 1,
      translate: (activeSlide + 1) * (size.width-20)/props.numberSlides
    })
  }

  const prevSlide = () => {
    if (activeSlide === 0) {
      return setState({
        ...state,
        translate: (props.slides.length - props.numberSlides) * (size.width-20)/props.numberSlides,
        activeSlide: props.slides.length - props.numberSlides
      })
    }

    setState({
      ...state,
      activeSlide: activeSlide - 1,
      translate: (activeSlide - 1) * (size.width-20)/props.numberSlides
    })
  }
  
  return (
    <div 
      css={css`
        position: relative;
        height: ${((size.width-20)/props.numberSlides)*1.5}px;
        width: ${(size.width-20)}px;
        margin: 0 10px 20px 10px;
        overflow: hidden;
        border: 1px solid #383e56;
        border-radius: 15px;
      `}
      className="Carousel-Container"
    >
      <SliderContent
        translate={translate}
        transition={transition}
      >
        {props.slides.map((slide, i) => (
          <div 
            className="Carousel-image-container"
            css={css`
              width: ${(size.width-20)/props.numberSlides}px;
            `}
            key={slide.id} 
          >
            <img 
            css={css`
              width: ${(size.width-20)/props.numberSlides}px;
            `}
            src={`https://image.tmdb.org/t/p/original/${slide.poster_path}`}  
            alt={slide.title}
            />
          </div>
          
        ))}
      </SliderContent>

      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />
    </div>
  )
}

Slider.defaultProps = {
  slides: [],
  autoPlay: 100000
}

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export default Slider
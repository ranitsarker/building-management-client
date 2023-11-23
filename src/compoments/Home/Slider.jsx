import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import banner1 from '../../assets/banner/1.png'
import banner2 from '../../assets/banner/2.png'
import banner3 from '../../assets/banner/3.png'
import banner4 from '../../assets/banner/4.png'

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Slider = () => {
  return (
    <AutoplaySlider
      play={true}
      cancelOnInteraction={false} // should stop playing on user interaction
      interval={6000}
    >
      <div data-src={banner1}/>
      <div data-src={banner2}/>
      <div data-src={banner3}/>
      <div data-src={banner4}/>
    </AutoplaySlider>
  );
};

export default Slider;

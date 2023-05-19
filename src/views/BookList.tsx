import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
const bookImage = require('../assets/images/book.png');

const slideContent = (props : {}) =>  {
  return (
    <>
      <div style={{ backgroundImage : `url(${bookImage})`, width: '230px', height: '260px'}}>
      </div>
    </>
  )
}

const BookList = () => {  
  const slides = Array.from({ length: 3 }).map(
    (el, index) => `Slide ${index + 1}`
  );

  return (
    <div className="contentWrapper">
      <div className="titleBox">
        <p className="title-sm">회전목마 case 1</p>
        <p className="caption">full contents일 경우 최초 진입</p>
      </div>
      <div className="listBox">
        <Swiper 
          navigation={true} 
          modules={[Navigation]} 
          slidesPerView={'auto'}
        >
          {slides.map((item, index) => (
            <SwiperSlide key={item}>
              {slideContent(item)}
            </SwiperSlide>
          ))}
      </Swiper>
      </div>
    </div>
  );
};

export default BookList;
import { Navigation } from 'swiper';
import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import BookService from 'services/books'
const bookImage = require('../assets/images/book.png');

interface Book {
  id : string,
  title : string,
  description ?: string
}

const slideContent = (props : Book) =>  {
  return (
    <>
      <div style={{ backgroundImage : `url(${bookImage})`, width: '230px', height: '260px'}}>
        {props.title}
        {props.description}
      </div>
    </>
  )
}

const BookList = () => {  
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    getBooks();
  },[]);
  
  const getBooks = async () => {
    let response : any = await BookService.getBookList();

    const data = response.data;
    setBooks(data);
  }

  const slides = Array.from({ length: 10 }).map(
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
          {books.map((item : Book, index) => (
            <SwiperSlide key={item.id}>
              {slideContent(item)}
            </SwiperSlide>
          ))}
      </Swiper>
      </div>
    </div>
  );
};

export default BookList;
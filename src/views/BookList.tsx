import { Navigation } from 'swiper';
import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Icon from '@mdi/react';
import { mdiBookmark } from '@mdi/js';
import 'swiper/css';
import "swiper/css/navigation";
import BookService from 'services/books'
const bookImage = require('../assets/images/book.png');

interface Book {
  id : string,
  title : string,
  description : string,
  bookmark ?: boolean
}

const SlideContent = ({item, bookmarkFunction} : any) =>  {
  return (
    <>
      <div style={{ backgroundImage : `url(${bookImage})`, width: '230px', height: '260px'}}>
        <div onClick={ () => {bookmarkFunction(item.id)} }>
          <Icon 
            className='bookmark' 
            color={`${item.bookmark ? '#FF893C' : '#B2B2B2'}`} 
            path={mdiBookmark}
          />
        </div>
        <div className='bookTitle'>{item.title}</div>
        <div className='bookDesc'>{item.description}</div>
      </div>
    </>
  )
}

const BookList = () => {  
  const [books, setBooks] = useState([] as any);
  
  useEffect(() => {
    if (localStorage.getItem('bookmark') == null) {
      localStorage.setItem('bookmark', JSON.stringify([]))
    }
    getBooks();
  },[]);
  
  const getBooks = async () => {
    let response : any = await BookService.getBookList();

    const data = response.data;
    let newData = [...data]
    for (let i=0; i<newData.length; i++) {
      if (localStorage.getItem('bookmark') !== null) {
        let _bookmark: string | null = localStorage.getItem('bookmark');
        let bookmarkArr = [];
        if (_bookmark != null) {
          bookmarkArr = JSON.parse(_bookmark);	
        }

        if (bookmarkArr.indexOf(newData[i].id) > -1) {
          newData[i].bookmark = true;
        } else {
          newData[i].bookmark = false;
        }
      } else {
        newData[i].bookmark = false;
      }
    }
    setBooks(data);
  }

  const handleBookmark = (id : string) => {
    let _bookmarkStr : string = localStorage.getItem('bookmark') || JSON.stringify([]);
    let bookmarkArr = JSON.parse(_bookmarkStr);
    if (bookmarkArr.indexOf(id) > -1) {
      bookmarkArr.splice(bookmarkArr.indexOf(id), 1);
    } else {
      bookmarkArr.push(id);
    }
    localStorage.setItem('bookmark', JSON.stringify(bookmarkArr));
    
    let updateBooks : Array<any> = [...books];
    for (let i=0; i<updateBooks.length; i++) {
      if (updateBooks[i].id == id) {
        updateBooks[i].bookmark = !updateBooks[i].bookmark;
      }
    }
    setBooks(updateBooks);
  }

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
          {books.map((item : Book, index: number) => (
            <SwiperSlide key={item.id}>
              <SlideContent item={item} bookmarkFunction={handleBookmark}></SlideContent>
            </SwiperSlide>
          ))}
      </Swiper>
      </div>
    </div>
  );
};

export default BookList;
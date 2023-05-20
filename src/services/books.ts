import { axios } from '../libs/index';

interface books {
    id: string
    title: string
    description?: string
}
class BookService {
    getBookList() : Promise<{}> {
        // return axios('GET', '/', params);

        let list : books[] = [
            {
                id : '1',
                title : '도서1',
                description : '도서1 Description 입니다.'
            },
            {
                id : '2',
                title : '도서2',
                description : '도서2 Description 입니다.'
            },
            {
                id : '3',
                title : '도서3',
                description : '도서3 Description 입니다.'
            },
            {
                id : '4',
                title : '도서4',
                description : '도서4 Description 입니다.'
            },
            {
                id : '5',
                title : '도서5',
                description : '도서5 Description 입니다.'
            },
            {
                id : '6',
                title : '도서6',
                description : '도서6 Description 입니다.'
            },
        ]

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({status : 200, data : list})
            },0)
        })
    }
}

export default new BookService();
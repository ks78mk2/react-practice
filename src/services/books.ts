import { axios } from '../libs/index';

interface Books {
    id: string
    title: string
    description?: string
}
class BookService {
    getBookList(type : number) : Promise<{}> {
        // return axios('GET', '/', params);

        let list1 : Books[] = []
        let list2 : Books[] = []

        for (let i=0; i<8; i++) {
            let number = i+1;
            let data = {
                id : `${number}`,
                title : `도서${number}`,
                description : `${number} Description 입니다.`
            }
            list1.push(data)
            if (i < 3) {
                list2.push(data)
            }
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (type == 1) {
                    resolve({status : 200, data : list1})
                } else {
                    resolve({status : 200, data : list2})
                }
            },0)
        })
    }
}

export default new BookService();
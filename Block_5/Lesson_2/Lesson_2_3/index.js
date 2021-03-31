//0. run without docker (adjust port before) & ensure the local mongo db is updated with the books list
//1. docker images //ensure mongo image does not exist
//2. docker run --rm -d -p 27011:27017 mongo //27017 - container mongo db port; 27011 - exposed port
//3. start the app 
// - open docker dashboard
// - click mongo container and click to CLI icon (terminal)
// - # mongo
// - > use use dev_demo_db_docker
// - > db.books.find() // books is here, not in the local mongo db!
//4. Stop container: $ docker stop <id>
//5. update Book model & books arr data
//6. start container and ensure the updated data could be written to the db

const db = require("./db");
const Book = require("./db//models/book");

const saveBooks = async (books) => {
  try {
    await Book.insertMany(books);
  } catch (e) {
    console.log('Can not save!', e)
  }
}

const getBooks = async () => {
  try {
    const books = await Book.find();
    console.log(books);
    return books;
  } catch (e) {
    console.log('Can not get!', e)
  }
}

//=============================================

const books = [
  {title: 'Зеленая миля', author: 'Стивен Кинг', genre: ['Мистика', 'Фантастика']},
  {title: 'Хранители', author: 'Алан Мур', genre: ['Фантастика', 'Графический Роман']},
  {title: 'Метро', author: 'Дмитрий Глуховский', genre: ['Фантастика']},
  {title: 'Трое из леса', author: 'Юрий Никитин', genre: ['Фантастика']}
];

saveBooks(books).then(() => {
  getBooks().then(() => {
    db.close();
  });
});



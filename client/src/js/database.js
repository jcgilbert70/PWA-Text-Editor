import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // console.log('PUT to the database');
  // connect to database
  const jateDb = await openDB('jate', 1);
  // specify database & privileges
  const tx = jateDb.transaction('jate', 'readwrite');
  // open desired object store
  const store = tx.objectStore('jate');
  // pass value and content to store
  const request = store.put({ id: 1, content: content });

  const result = await request;
  console.log('Data saved to indexDb', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  //console.log('GET content from the database');
  // connect to database
  const jateDb = await openDB('jate', 1);
  // new action, specify database and privileges
  const tx = jateDb.transaction('jate', 'readonly');
  // open object
  const store = tx.objectStore('jate');
  // get one from database
  const request = store.getAll();
  // confirm request
  const result = await request;
  console.log(result);
  return result;
};

initdb();

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';
import Button from 'react-bootstrap/Button';

const BookDetailPage = () => {
  const params = useParams();
  const firebase = useFirebase();

  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);
  console.log(data);

  useEffect(() => {
    firebase.getBookById(params.bookId).then((value) => setData(value.data()));
  }, []);

  useEffect(() => {
    if (data) {
      const imageURL = data.imageURL;
      firebase.getImageURL(imageURL).then((url) => setURL(url));
    }
  }, [data]);

  if (data == null) return <h1>Loading...</h1>;
  return (
    <div className='container mt-5'>
      <h1>{data.name}</h1>
      <img src={url} width='50%' style={{ borderRadius: '10px' }}></img>
      <h1>Details</h1>
      <p>Price: Rs. {data.price}</p>
      <p>ISBN Number: {data.isbn}</p>
      <h1>Owner Details</h1>
      <p> Name: {data.displayName}</p>
      <p> Email: {data.userEmail}</p>
      <Button variant='success'>Buy Now</Button>{' '}
    </div>
  );
};

export default BookDetailPage;

import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    window.addEventListener('scroll', onScrollWrapper)
  }, [offset])

  const submitForm = e => {
    e.preventDefault()

    getData();
  }


  const getData = async () => {
    console.log(offset)
    var request = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=Rl3uE3PVH5DQoGUV9BPiC4EZs52g2zc0&offset=${offset}&q=${searchText}`);
    if(request.ok){
      let data = await request.json()
      let buffer = results;
      setResults([...buffer, ...data.data])
    } else {
      console.error('something went wrong in the API')
    }
  }

  const changeText = e => {
    e.preventDefault();
    setSearchText(e.target.value);
  }

  const onScrollWrapper = e => {
    var viewPortHeight = window.innerHeight
    var containerHeight = document.querySelector('.container').offsetHeight
    var formHeight = document.querySelector('.giphyForm').offsetHeight

    if(containerHeight - (viewPortHeight + window.scrollY - formHeight) <= 0) {
      window.removeEventListener('scroll', onScrollWrapper)
      var newOffset = offset+1;
      setOffset(newOffset)

      console.log(offset)
      getData()
    }
  }


  return (
    <div className="container">
      <h1>Gyphy api</h1>

      <form className="giphyForm" action="" onSubmit={submitForm}>
        <input className="search" type="text" onChange={changeText}/>
        <input type="submit"/>
      </form>

      { results.length > 0 && results.map((e, i) => <img key={i} className="photo" src={e.images.downsized.url} alt=""/> )}
      <div className="ends"> { results.length > 0 && <span>Loading...</span> }</div>
  </div>
  );
}

export default App;

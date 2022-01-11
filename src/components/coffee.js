import { useState } from 'react';
import axios from 'axios';

const Coffee = () => {

    const [videoFeature, setVideoFeature] = useState(null);
    const [videosRequest, setVideosRequest] = useState(null);
    const [videosData, setVideosData] = useState(null);

    const handleRequest = () => {
        let par = document.querySelector('input[name=search]').value;
        if (par !== '' && par !== ' ') {
            let options = {
                method: 'GET',
                url: 'http://localhost:8000/videos',
                params: { search: par },
            };
            axios.request(options)
                .then(res => {
                    setVideoFeature(res.data.items[0]);
                    setVideosRequest(res.data.items.slice(1));
                    setVideosData(res.data.items);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const formatTitle = (title) => {
        let new_title = title?.slice(0, 70) + '...';
        return new_title;
    };

    const handleWatch = (par) => {
        let new_videos = videosData.filter(i => i !== par);
        setVideosRequest(new_videos);
        setVideoFeature(par);
    };


    return (
        <div className="coffee">
            <div className="coffee-search">
                <p>Search</p>
                <div className="coffee-search-flex">
                    <input type="text" name="search" />
                    <button onClick={() => handleRequest()}>Search</button>
                </div>
            </div>
            {
                videoFeature && videosRequest &&
                <div className="coffee-main">
                    <div className="coffee-video">
                        <div className="video-container">
                            <iframe id="player" type="text/html" width="640" height="390"
                                src={`https://www.youtube.com/embed/${videoFeature.id.videoId}`}></iframe>
                        </div>
                        <div className="video-info">
                            <h2>{videoFeature.snippet.title}</h2>
                            <p>{videoFeature.snippet.description}</p>
                        </div>
                    </div>
                    <div className="coffee-similar">

                        {
                            videosRequest?.map((val, index) => {
                                return (
                                    <div key={index} onClick={() => handleWatch(val)} className="coffee-similar-single">
                                        <div className="single-container">
                                            <img src={val.snippet.thumbnails.high.url} />
                                        </div>
                                        <div className="single-info">
                                            <h3>{formatTitle(val.snippet.title)}</h3>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            }
        </div>
    )
};


export default Coffee;
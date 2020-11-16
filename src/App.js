import React, { useState } from "react";
import { Grid } from "@material-ui/core"; //named export/import
import youtube from "./api/youtube";

//importing the components
import { SearchBar, VideoDetail, VideoList } from "./components";

export default () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <Grid style={{justifyContent:"center"}} container spacing={10}>
      <Grid item xs={11}>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <SearchBar onSubmit={handleSubmit} />
          </Grid>
          <Grid item xs={8}>
            <VideoDetail video={selectedVideo} />
          </Grid>
          <Grid item xs={4}>
           <VideoList videos= {videos}  onVideoSelect= {setSelectedVideo} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
  async function handleSubmit(searchTerm) {
        try{
            const response = await youtube.get('search',{
            params: {
                q: searchTerm,
                key: "AIzaSyBbUh2plGq6aFKVtVTlRHRKRhs9EVu-L-s", //API key
                part: "snippet",
                maxResults: 5
            },
            });
            setVideos(response.data.items);
            setSelectedVideo(response.data.items[0]);
        } catch(err) {
            console.log(err);
        }
    }
};

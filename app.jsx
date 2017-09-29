"use strict";

const API_KEY = "AIzaSyB6RQPxv-X6aojxx9IKh0Nc4twyqlMnitI";

class Youtube extends React.Component {
   constructor (props) {
      super(props);

      this.state = {
         videos : [],
         searchTerm : 'laboratoria',
         selectedVideo : null
      }
      this.youtubeSearch(this.state.searchTerm);
   }

   youtubeSearch(searchTerm) {
      console.log(searchTerm);

      YTSearch({ key: API_KEY, term: searchTerm }, data => {
         console.log("result", data);
         
         this.setState ({
            videos : data,
            searchTerm : searchTerm,
            selectedVideo : data[0]
         });
         
         //var list = app.getVideoList(app.result.videos);
         //console.log("lis: ", list);
         //$("#root").html(list);
      });
   }

   onClick (e, index) {
      console.log ("video Click!", index);
      
      this.setState ({
         videos : this.state.videos,
         searchTerm : this.state.searchTerm,
         selectedVideo : this.state.videos[index]
      });    
   }
   getVideoList(videos) {
      return videos.map((video, index) => {
         const imageUrl = video.snippet.thumbnails.default.url;
         const url = `https://www.youtube.com/embed/${video.id.videoId}`;
         return <li key = {index}>
                     <img class="media-object" src={imageUrl} onClick= { (e) => this.onClick (e, index) }/>                  
               </li>
      });
   }
   onSubmit (e) {
      e.preventDefault();
      console.log (this.state.searchTerm);
      this.youtubeSearch(this.state.searchTerm);
   }
   onChange (e) {
      this.setState ({
         videos : this.state.videos,
         searchTerm : e.target.value,
         selectedVideo : this.state.selectedVideo
      });      
   }
   render () {       
      if (!this.state.selectedVideo)
         return <div> loading ... </div>;

      const url = `https://www.youtube.com/embed/${this.state.selectedVideo.id.videoId}`;
      return (
         <div>
         <form onSubmit={(e) => this.onSubmit(e)}>
            <input value = {this.state.searchTerm}  onChange= {(e) => this.onChange(e)} />
            <button type="submit">
               Go
            </button>
         </form>
         <div>
            <iframe class="embed-responsive-item" src={url}> </iframe>
         </div>
         <ol>
            {this.getVideoList(this.state.videos)}
         </ol>
         </div>
      );
   }
}

ReactDOM.render(<Youtube />, document.getElementById("container"));

import React, {Component} from 'react';
import {Form, Container, Embed, Divider, Grid} from 'semantic-ui-react';
import Suggestion from './Suggestion.js';
class YoutubePlayer extends Component{
    constructor(){
        super();
        this.state = {
            query: 'Messi',
            url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=AIzaSyAhsmsa_iDxOtj7QCcD1aq6Ypu_YWZmziI&q=`,
            mainVideo: '',
            suggestedVideos: [],        
        }
        this.getVideos = this.getVideos.bind(this);
        this.searchVideos = this.searchVideos.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeVideos = this.changeVideos.bind(this);
    }

    componentDidMount(){
        //fetch videos using default query state
this.getVideos(this.state.query);
    }

    getVideos(searchQuery){
        let url = this.state.url + searchQuery;
        return (
            fetch(url).then(response => response.json())
            .then((data) => {
                console.log(data)
                 let firstVideo = data.items.shift();
            this.setState({...this.state, mainVideo: firstVideo.id.videoId, suggestedVideos: data.items})
            })
        );
    }

    handleChange(e){
        this.setState({...this.state,
            query: e.target.value});
    }
    searchVideos(e){
        e.preventDefault();
        this.getVideos(this.state.query);
    }

    changeVideos(video){
        this.setState({...this.state, mainVideo: video.id.videoId})
    }

    render(){
        return(
        <div>
            <Container textAlign='center'>
            <Form onSubmit={this.searchVideos} size='small'>
            <Form.Group>
                <Form.Input placeholder='search me' width={6} onChange={this.handleChange}/>
                <Form.Button content='Search Videos' />
            </Form.Group>
                </Form>
                    < Embed
                        id ={this.state.mainVideo}
                        placeholder = '/images/image-16by9.png'
                        source = 'youtube' 
                        />
                        <Divider horizontal>
                            Suggestions
                        </Divider>
                        <Grid doubling columns={3}>
                           {
                               this.state.suggestedVideos.map((video) => <Suggestion video={video} changeVideos={this.changeVideos}/>)
                           } 
                        </Grid>
            </Container>
        </div>
             )}
}

export default YoutubePlayer;

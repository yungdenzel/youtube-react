import React from 'react';
import {Grid, Image} from 'semantic-ui-react';


const Suggestion = (props) => {

const performvideoChange = () => {
    props.changeVideos(props.video);
}

    return(
        <Grid.Column onClick={performvideoChange}>
            <Image src={props.video.snippet.thumbnails.medium.url}/>
        </Grid.Column>
    )
}




export default Suggestion;
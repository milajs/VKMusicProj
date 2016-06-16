/*
{
    "aid":456239220,
    "owner_id":2360042,
    "artist":"The Ninetys",
    "title":"All Saints",
    "duration":81,
    "url":"http://cs611123.v ..."
}
*/

/// global audio vars
var audios_array = [];
var defCompanies = [];

var AuthBnt = React.createClass({

    handleClick :function(){

        var that = this

        VK.Auth.login(function (cb) {
            console.log('cb ->' + cb); 
        },1034);
    },

    render: function() {
        return(
            <div>
                <button className="btn" onClick={this.handleClick}> Log In </button>
            </div>
        );
    }
});


var AudioBnt = React.createClass({

    handleClick :function(){

        console.log(JSON.stringify(this.props));

        vk_getaudios(function (audiosArray){
            if (audiosArray) {

                this.props.handleUpdate(audiosArray);
            }
        }.bind(this))
    },

    render: function() {

        return(
            <div>
               <button className="btn" onClick={this.handleClick}> Load audio </button>
            </div>
        );
    }
});


var UserImg = React.createClass({

    getInitialState: function() {
        return {imgUrl: "/media/no-photo.png",
                userName: "",
                userLastName: ""};
    },

    loadCommentsFromServer: function() {

        vk_getuserphoto(function (userData){

            if (userData) {

                var imageURL = userData.photo_200;
                var user_name = userData.first_name;
                var user_last_name = userData.last_name;
                this.setState( {imgUrl: imageURL, userName: user_name, userLastName: user_last_name} );
            }
        }.bind(this))
    },


    componentDidMount: function() {
        this.loadCommentsFromServer();
    },

    handleNewPhoto: function(user_data) {
        var imageURL = user_data.photo_200;
        var user_name = user_data.first_name;
        var user_last_name = user_data.last_name;
        this.setState( {imgUrl: imageURL, userName: user_name, userLastName: user_last_name} );
    },

    render: function() {

        return(
            <div>
               <img className="user-img" src={this.state.imgUrl} handleUpdate={this.handleNewPhoto} />
               <p className="user-name" handleUpdate={this.handleNewPhoto} > {this.state.userName} </p>
               <p className="user-name" handleUpdate={this.handleNewPhoto} > {this.state.userLastName} </p>
            </div>
        );
    }
});


var LogOutBnt = React.createClass({

    handleClick :function(){
        VK.Auth.logout(function (cb) {
            console.log('cb ->' + JSON.stringify(cb)); 
        });
    },

    render: function() {
        return(
            <div>
                <button className="btn" onClick={this.handleClick}> Log out </button>
            </div>
        );
    }
});

//////////////////////
/////   VK API 
//////////////////////

function vk_getaudios (callback) {
    VK.Api.call('audio.get', {count: 50}, function(r) { 

        if(r.error) {
            console.log("audio.get error ->" + JSON.stringify(r.error));
        } else {

            audios_array = r.response;

            console.log('Список аудио 50 штук, ' + JSON.stringify(audios_array[0]));
            callback(r.response);
        }
    }); 
}


function vk_getuserphoto (callback) {
    VK.Api.call('users.get', {fields: 'photo_200'}, function(r) { 

        if(r.error) {
            console.log("users.get error ->" + JSON.stringify(r.error));
        } else {

            var user = r.response;

            console.log('Данные пользователя ' + JSON.stringify(user[0]));
            callback(user[0]);
        }
    }); 
}


var VKMusicApp = React.createClass({

    getInitialState: function() {

        return {audiolist: this.props.audios,
                audiourl: "", 
                playing: true, 
                value: '▶',
                played: 0,
                volume: 0.8};
    },

    handleNewRowSubmit: function( newaudios ) {
        this.setState( {audiolist: newaudios} );
    },

    handleNewAudioSubmit: function(url) {
        console.log('it works!!!!!! KEK ->' + url);
        this.setState( {audiourl: url, playing: true} );
    },

    onProgressHandle: function(event) {
        console.log('::: progress handle ->' + event.played);
        this.setState({ played: parseFloat(event.played) });
    },

    onEndedHandle: function(event) {
        console.log('::: playing is ended :::');
    },

    pause: function() { 
        this.setState( {playing: !this.state.playing, value: this.state.playing ? '▶' : '||'} );
    },

    onSeekChange: function(event) {    
        this.setState({ played: parseFloat(event.target.value) });
        this.refs.player.seekTo(parseFloat(event.target.value));
    },

    setVolume: function(event) {   
        this.setState({ volume: parseFloat(event.target.value) });
    },

    updateUserImage: function(user_data) {
        this.refs.user_image.handleNewPhoto(user_data);
    },

    render: function() {

        var tableStyle = {width: '100%'};

        return ( 
            <div>
                <div className="wrap">
                    <div className="line top">
                        <UserImg ref='user_image'/>
                        <AuthBnt handleUpdate={this.updateUserImage} />
                        <AudioBnt handleUpdate={this.handleNewRowSubmit} />
                        <LogOutBnt />
                    </div>

                    <div className="line">

                        <ReactPlayer 
                        ref='player'
                        url={this.state.audiourl} 
                        volume={this.state.volume}
                        className="player" 
                        playing={this.state.playing} 
                        seekTo={this.state.played}
                        onProgress={this.onProgressHandle}
                        onEnded={this.onEndedHandle}
                        height="120px"
                        /> 

                        <div className="player-holder">
                            <div className="player-design">
                                <input type="button" className="stop-btn" onClick={this.pause} value={this.state.value} /> 
                                <button className="pervios-audio"> <img className="switch-buttons" src="/media/prev-arrow.png" /> </button>
                                <button className="next-audio"> <img className="switch-buttons" src="/media/next-arrow.png" /> </button>
                                <input type='range' className="progress-bar" min={0} max={1} step='any' value={this.state.played} onChange={this.onSeekChange} />
                                <input type='range' className="volume-bar" min={0} max={1} step='any' value={this.state.volume} onChange={this.setVolume} />
                                <img className="volume-pic" src="/media/audio-speaker.png" />
                            </div>
                        </div>
                
                        <AudiosList handleUpdate={this.handleNewAudioSubmit} handleNewAudios={this.handleNewRowSubmit}  />
                    </div>
                </div>
            </div>
        );
    }
});



var AudiosList = React.createClass({

    getInitialState:function() {
        return {audiolist: []};
    },

    loadNewAudiosFromServer: function() {

        vk_getaudios(function (audiosArray){
            if (audiosArray) {

                console.log('alistk ' + audiosArray)

                this.setState( {audiolist: audiosArray} );
            }

        }.bind(this))

    },

    componentDidMount: function() {
        this.loadNewAudiosFromServer();
    },

    handleTest: function(url) {
        this.props.handleUpdate(url);
    },

    render: function() {

        var auidosarray = [];
        var _data = this.state.audiolist

        console.log('alist-> ' + this.state.audiolist);

        return ( 
              <div>
                <table className="table">
                  <tbody>
                      {_data.map(function(audioModel, i) {
                         return <AudioRow audio={audioModel} handleUpdate={this.handleTest} key={i}/>
                      }.bind(this))}
                  </tbody>
                </table>
              </div>
            );
    }

});


var AudioRow = React.createClass({

    getInitialState: function() {
        return {value: "▶"};
    },

    handleClick :function(){
        this.props.handleUpdate(this.props.audio.url);
    },

    render: function() {
        return (
            <tr className="audio-row">
                <td className="artists"> {this.props.audio.artist} </td>
                <td> {this.props.audio.title} </td>
                <td className="wrap buttons-onrow">
                    <input type="button" className="stop-btn-onrow line" onClick={this.handleClick} value={this.state.value} /> 
                    <a href={this.props.audio.url} download="audio.mp3">
                    <button className="download-btn line"> <img className="download-img" src="/media/download.png"/> </button>
                    </a>
                </td>
            </tr>
          );
    }
});


ReactDOM.render(
    <VKMusicApp />, 
    document.getElementById('container')
);


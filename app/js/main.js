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

        vk_getuserphoto(function (userData){
            if (userData) {

                that.props.handleUpdate(userData);
            }
        })
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
        var that = this

        console.log(JSON.stringify(this.props));

        vk_getaudios(function (audiosArray){
            if (audiosArray) {

                that.props.handleUpdate(audiosArray);
            }
        })
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
        return {imgUrl: "/media/no-photo.png"};
    },

    handleNewPhoto: function(user_data) {
        var imageURL = user_data.photo_200;

        console.log('image url -> ' + imageURL);

        this.setState( {imgUrl: imageURL} );
    },

    render: function() {

        return(
            <div>
               <img className="user-img" src={this.state.imgUrl} handleUpdate={this.handleNewPhoto} /> 
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

        return {audiolist:this.props.audios,
                audiourl:"", 
                playing: true, 
                value: "▶",
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
        //
        console.log('::: progress handle ->' + event.played);

        this.setState({ played: parseFloat(event.played) });

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
                        height="120px"
                        /> 

                        <div className="player-holder">
                            <input type='range' className="progress-bar" min={0} max={1} step='any' value={this.state.played} onChange={this.onSeekChange} />
                            <input type="button" className="stop-btn" onClick={this.pause} value={this.state.value} /> 
                            <input type='range' className="volume-bar" min={0} max={1} step='any' value={this.state.volume} onChange={this.setVolume} />
                        </div>
                
                        <AudiosList handleUpdate={this.handleNewAudioSubmit} audiolist={this.state.audiolist} />
                    </div>
                </div>
            </div>
        );
    }
});



var AudiosList = React.createClass({

    handleTest: function(url) {

        this.props.handleUpdate(url);
    },

    render: function() {

        var auidosarray = [];
        var _data = this.props.audiolist

        console.log('alist-> ' + this.props.audiolist);

        var that = this

        return ( 
              <div>
                <table className="table">
                  <tbody>
                      {_data.map(function(audioModel, i) {
                         return <AudioRow audio={audioModel} handleUpdate={that.handleTest} key={i}/>
                      })}
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
            <tr>
                <td className="artists"> {this.props.audio.artist} </td>
                <td> {this.props.audio.title} </td>
                <td><input type="button" className="stop-btn-onrow" onClick={this.handleClick} value={this.state.value} />  </td>
            </tr>
          );
    }
});


var App = React.createClass({

    render: function() {
        return(
            <div>
               <VKMusicApp audios={audios_array}/>
            </div>
        );
    }
});


ReactDOM.render(
    <App />, 
    document.getElementById('container')
);


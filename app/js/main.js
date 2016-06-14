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


function vk_getaudios (callback) {
    VK.Api.call('audio.get', {count: 50}, function(r) { 

        if(r.error) {
            console.log("audio.get error ->" + JSON.stringify(r.error));
        } else {

            audios_array = r.response;

            console.log('Список аудио, ' + JSON.stringify(audios_array[0]));
            callback(r.response);
        }
    }); 
}


var GetPermissionsBnt = React.createClass({

    handleClick :function(){

        VK.Api.call('account.getAppPermissions', {}, function(r) { 

            if(r.error) {
                console.log("account.getAppPermissions error ->" + JSON.stringify(r.error));
            } else {
                console.log('account.getAppPermissions ->, ' + JSON.stringify(r.response));
            }
        }); 
    },

    render: function() {
        return(
            <div>
               <button className="btn" onClick={this.handleClick}> Get permissions </button>
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


var VKMusicApp = React.createClass({

    getInitialState: function() {

        return {audiolist:this.props.audios,
                audiourl:"", 
                playing: true, 
                value: "Pause",
                played: 0};
    },

    handleNewRowSubmit: function( newaudios ) {

        this.setState( {audiolist: newaudios} );
    },

    handleNewAudioSubmit: function(url) {

        console.log('it works!!!!!! KEK ->' + url);

        this.setState( {audiourl: url, playing: true} );
    },

    onProgressHandle: function(event) {
        //{"loaded":0.40027573529411764,"played":0.04611666228991597}
        //loaded
        //played
        console.log('::: progress handle ->' + event.played);

        this.setState({ played: parseFloat(event.played) });

    },

    pause: function() {
    
        this.setState( {playing: !this.state.playing, value: this.state.playing ? 'Play' : 'Pause'} );
    },

    onSeekChange: function(event) {
    
        this.setState({ played: parseFloat(event.target.value) });
        this.refs.player.seekTo(parseFloat(event.target.value));
    },

    render: function() {

        var tableStyle = {width: '100%'};

        return ( 
            <div>
                <div className="wrap">
                    <div className="line top">
                        <AuthBnt />
                        <AudioBnt handleUpdate={this.handleNewRowSubmit}/>
                        <GetPermissionsBnt />
                        <LogOutBnt />
                    </div>

                    <div className="line">

                        <ReactPlayer 
                        ref='player'
                        url={this.state.audiourl} 
                        className="player" 
                        playing={this.state.playing} 
                        seekTo={this.state.played}
                        onProgress={this.onProgressHandle}
                        height="80px"
                        /> 

                        <div className="player-holder">
                            <input type='range' className="progress-bar" min={0} max={1} step='any' value={this.state.played} onChange={this.onSeekChange} />
                            <input type="button" className="btn stop-btn" onClick={this.pause} value={this.state.value} /> 
                        </div>
                
                        <AudiosList handleUpdate={this.handleNewAudioSubmit} audiolist={this.state.audiolist} />
                    </div>
                </div>
            </div>
        );
    }
});



var AudiosList = React.createClass({

    handleTesttttt: function(kokostring) {

        console.log(kokostring);
    },

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

    handleClick :function(){
        this.props.handleUpdate(this.props.audio.url);
    },

    render: function() {
        return (
            <tr>
                <td>{this.props.audio.artist}</td>
                <td>{this.props.audio.title}</td>
                <td><button onClick={this.handleClick} className="btn play-btn"> Play </button> </td>
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


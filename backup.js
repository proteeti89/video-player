import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import { findDOMNode } from 'react-dom'
import './App.css';

import screenfull from 'screenfull'
import CardMedia from '@material-ui/core/CardMedia';

class App extends Component {
  state = {
    currentUrl: "https://vimeo.com/90509568",
    /*url: "file:///Proteeti/Desktop/IMG_4521.mp4",*/
    urlHindi: "https://www.dailymotion.com/video/x5e9eog",
    urlBengali: "https://www.youtube.com/watch?v=Dr6b_6i-fY4",
    urlsByResolution: ["https://www.dailymotion.com/video/x5e9eog", "https://vimeo.com/90509568",
    "https://www.youtube.com/watch?v=Dr6b_6i-fY4","https://www.youtube.com/watch?v=_DL0aOgOwwg"],
    pip: false,
    playing: true,
    isHindi: false,
    controls: false,
    muted: false,
    light: false,
    volume: 0.8,
    played: 0,
    loaded: 0,
    loop: false,
    playbackRate: 1.0
  }


  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false
    })
  }

  playOrPause = () => {
    this.setState({
      playing: !this.state.playing
    })
  }

  isHindi = () => {
    this.setState({
      isHindi: !this.state.isHindi
    })
  }

  stop = () => {
    this.setState ({
      url: null,
      playing: false
    })
  }

  changeControls = () => {
    const url = this.state.url
    this.setState({
      controls: !this.state.controls,
      url: null
    },
  () => this.load(url))
  }

  changeMuted = () =>
  {
    this.setState({
      muted: !this.state.muted
    })
  }

  changeLoop =() => {
    this.setState ({
      loop: !this.state.loop
    })
  }

  changeVolume = e => {
    this.setState({
      volume: parseFloat(e.target.value)
    })
  }

  changePlaybackRate = e => {
    this.setState({
      playbackRate: parseFloat(e.target.value)
    })
  }

  onPlay = () => {
    console.log("onPlay")
    this.setState({
      playing: true
    })
  }

  onPause = () => {
    console.log("onPause")
    this.setState({
      playing: false
    })
  }

  onEnded = () => {
    console.log("onEnded")
    this.setState({
      playing: this.state.loop
    })
  }

  changePlace = e => {
    this.setState({
      played: parseFloat(e.target.value)
    })
  }
  onClickFullScreen = () => {
    screenfull.request(findDOMNode(this.player))
  }


  ref = player => {
    this.player = player

  }
 /* language changers */
  changeToHindi = () => {
    this.setState({
      currentUrl: this.state.urlHindi
    })
  }

  changeToBengali = () => {
    this.setState({
      currentUrl: this.state.urlBengali
    })
  }

  /* resolution changers */
  changeResolution = () => {
    this.setState({
      currentUrl: "https://www.youtube.com/watch?v=ao4fEglWqms"
    })
  }

  render() {

    const { currentUrl,
            urlsByResolution,
            pip,
            playing,
            isHindi,
            controls,
            muted,
            light,
            volume,
            played,
            loaded,
            loop,
            playbackRate}
          = this.state

  const input = document.querySelector('[type=file]');

  return (
    <div className = "app">
      <h1> Video Player </h1>
      <div className = "player-wrapper">
      <CardMedia className = "embed-responsive embed-responsive-16by9">
        <ReactPlayer
          url = {currentUrl}
          ref = {this.ref}
          playing = {playing}
          /*config={{ file: {
        tracks: [
      {kind: 'subtitles', label: "English", src: 'subs/subtitles.en.vtt', srcLang: 'en'},
      {kind: 'subtitles', label: "Hindi", src: 'subs/subtitles.hi.vtt', srcLang: 'hi', default: true},
      {kind: 'subtitles', label: "Bengali", src: 'subs/subtitles.bn.vtt', srcLang: 'bn'}
    ]}
  }}*/
          controls = {true}
          loop = {loop}
          light = {light}
          playbackRate = {playbackRate}
          volume = {volume}
          muted = {muted}
          onReady = {() => console.log("onReady")}
          onStart = {() => console.log("onStart")}
          onPlay = {this.onPlay}
          onPause = {this.onPause}
          onBuffer = {() => console.log("onBuffer")}
          onEnded = {this.onEnded}
          onError = {e => console.log("onError", e)}
          />
      </CardMedia>
      </div>

        <table> <tbody>
          <tr>
            <th> Controls </th>
            <td>
            <button onClick = {this.stop}> Stop </button>
            <button onClick = {this.playOrPause}> {playing ? 'Pause' : 'Play'} </button>
            <button onClick = {this.onClickFullScreen}> Fullscreen </button>

            </td>
          </tr>
          <tr>
            <th> Playback Rate </th>
            <td>
              <button onClick = {this.changePlaybackRate} value = {0.75}> 0.75x </button>
              <button onClick = {this.changePlaybackRate} value = {1}> 1x </button>
              <button onClick = {this.changePlaybackRate} value = {1.5}> 1.5x </button>
              <button onClick = {this.changePlaybackRate} value = {2}> 2x </button>
            </td>
          </tr>

          <tr>
            <th> Languages </th>
            <td>
              <button onClick = {this.changeToHindi}> {this.isHindi ? "English" : "Hindi"} </button>
              <button onClick = {this.changeToBengali}> Bengali </button>
            </td>
          </tr>
          <tr>
            <th> Volume </th>
            <td>
              <input type = "range" min = {0} max = {1}
              step = "any" value = {volume}
              onChange = {this.changeVolume} />
            </td>
          </tr>
          <tr>
            <th> <label htmlFor = "muted"> Muted </label> </th>
            <td>
              <input id = "muted" type = "checkbox" checked = {muted}
              onChange = {this.changeMuted} />
            </td>
          </tr>
          <tr>
            <th> Resolution Switcher </th>
            <td>
              <button onClick = {this.changeResolution}> low </button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  );
 }
}

<ResponsiveMenu
  menuOpenButton={<div />}
  menuCloseButton={<div />}
  changeMenuOn="500px"
  largeMenuClassName="large-menu-classname"
  smallMenuClassName="small-menu-classname"
  menu={
    <ul>
      <li> <button onClick = {this.changePlaybackRate} value = {0.75}> 0.75x </button> </li>
      <li> <button onClick = {this.changePlaybackRate} value = {1}> 1x </button> </li>
      <li> <button onClick = {this.changePlaybackRate} value = {1.5}> 1.5x </button> </li>
      <li> <button onClick = {this.changePlaybackRate} value = {2}> 2x </button> </li>
    </ul>
  }
/>

export default App;

import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import { findDOMNode } from 'react-dom';
import './App.css';

import screenfull from 'screenfull';
import CardMedia from '@material-ui/core/CardMedia';
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';



class App extends Component {

  state = {
    currentUrl: "IMG_4521.mp4",
    pip: false,
    playing: true,
    isHindi: false,
    muted: false,
    light: true,
    defaultLang: "English",
    urlEnglish: "https://vimeo.com/90509568",
    /*url: "file:///Proteeti/Desktop/IMG_4521.mp4",*/
    urlHindi: "https://www.dailymotion.com/video/x5e9eog",
    urlBengali: "https://www.youtube.com/watch?v=Dr6b_6i-fY4",
    urlsByResolution: ["https://www.dailymotion.com/video/x5e9eog", "https://vimeo.com/90509568",
    "https://www.youtube.com/watch?v=Dr6b_6i-fY4","https://www.youtube.com/watch?v=_DL0aOgOwwg"],
    volume: 0.7,
    played: 0,
    loaded: 0,
    loop: false,
    playbackRate: 1.0,
    isHidden: false,
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

  changePlaybackRate75 = () => {
    this.setState({
      playbackRate: 0.75
    })
  }

  changePlaybackRate1 = () => {
    this.setState({
      playbackRate: 1.0
    })
  }

  changePlaybackRate15 = () => {
    this.setState({
      playbackRate: 1.5
    })
  }

  changePlaybackRate2 = () => {
    this.setState({
      playbackRate: 1.5
    })
  }

  changePlaybackRate2 = () => {
    this.setState({
      playbackRate: 2.0
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
      currentUrl: this.state.urlHindi,
      defaultLang: "Hindi"
    })
  }

  changeToEnglish = () => {
    this.setState({
      currentUrl: this.state.urlEnglish,
      defaultLang: "English"
    })
  }

  changeToBengali = () => {
    this.setState({
      currentUrl: this.state.urlBengali,
      defaultLang: "Bengali"
    })
  }

  /* resolution changers */
  /* low */
  changeResolution = () => {
    this.setState({
      currentUrl: "https://www.youtube.com/watch?v=ao4fEglWqms"
    })
  }

  changeToHigh = () => {
    this.setState({
      currentUrl: "https://www.youtube.com/watch?v=dHTXLA92hu4"
    })
  }

  toggleHidden = () => {
    this.setState({
      isHidden: !this.state.isHidden
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
      {/*<div className = "player-wrapper"> */}
      <CardMedia className = "embed-responsive embed-responsive-16by9">
        <ReactPlayer
          className = "video-player"
          url = {currentUrl}
          ref = {this.ref}
          playing = {playing}
          config = {{ file: {
        tracks: [
      {kind: 'subtitles', label: "English", src: 'subs/subtitles.en.vtt', srcLang: 'en'},
      {kind: 'subtitles', label: "Hindi", src: 'subs/subtitles.hi.vtt', srcLang: 'hi', default: true},
      {kind: 'subtitles', label: "Bengali", src: 'subs/subtitles.bn.vtt', srcLang: 'bn'}
    ]}
  }}
          controls = {true}
          loop = {loop}
          light = {true}
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

      {/*light = "thumbnail.png" */}
      <DropdownMenu triggerType='text' trigger='Languages'>
        <MenuItem text="English"  onClick = {this.changeToEnglish}/>
        <MenuItem text="Hindi"  onClick = {this.changeToHindi}/>
        <MenuItem text="Bengali"  onClick = {this.changeToBengali}/>
      </DropdownMenu>
      <DropdownMenu triggerType = 'text' trigger = 'Resolution'>
        <MenuItem text = "Low Res" onClick = {this.changeResolution} />
        <MenuItem text = "Medium Res" onClick = {this.changeToMedium} />
        <MenuItem text = "High Res" onClick = {this.changeToHigh} />
      </DropdownMenu>
      <DropdownMenu triggerType = 'text' trigger = 'Playback Rate'>
        <MenuItem text = "0.75x" onClick = {this.changePlaybackRate75} />
        <MenuItem text = "1x" onClick = {this.changePlaybackRate1} />
        <MenuItem text = "1.5x" onClick = {this.changePlaybackRate15} />
        <MenuItem text = "2x" onClick = {this.changePlaybackRate2} />
      </DropdownMenu>


      {/*
      <ul>
        <li>
        <ul> Controls
        <div className = "divider">
            <li> <button onClick = {this.stop}> Stop </button> </li>
            <li> <button onClick = {this.playOrPause}> {playing ? 'Pause' : 'Play'} </button> </li>
            <li> <button onClick = {this.onClickFullScreen}> Fullscreen </button> </li>
        </div>
        </ul>
        </li>
        <li>
          <ul> Playback Rate
              <div className = "divider">
              <li> <button onClick = {this.changePlaybackRate} value = {0.75}> 0.75x </button> </li>
              <li> <button onClick = {this.changePlaybackRate} value = {1}> 1x </button> </li>
              <li> <button onClick = {this.changePlaybackRate} value = {1.5}> 1.5x </button> </li>
              <li> <button onClick = {this.changePlaybackRate} value = {2}> 2x </button> </li>
              </div>
          </ul>
        </li>

        <li>
        <ul> Languages
        <div>
            <li> <button onClick = {this.changeToEnglish}> English </button> </li>
            <li>  <button onClick = {this.changeToHindi}> Hindi </button> </li>
            <li> <button onClick = {this.changeToBengali}> Bengali </button> </li>
        </div>
        </ul>
        </li>

      </ul>

      <ul>
        <li>
        <ul> Volume
        <div>
          <li>  <input type = "range" min = {0} max = {1}
              step = "any" value = {volume}
              onChange = {this.changeVolume} /> </li>
        </div>
        </ul>
        </li>

        <li>
        <ul>
          <div>
            <li> <label htmlFor = "muted"> Muted </label>
              <input id = "muted" type = "checkbox" checked = {muted}
              onChange = {this.changeMuted} />
            </li>
          </div>
        </ul>
        </li>

        <li>
            <ul> Resolution
            <div>
            <li>
              <button onClick = {this.changeResolution}> Low </button>
              <button onClick = {this.changeToMedium}> Medium </button>
              <button onClick = {this.changeToHigh}> High </button>
            </li>
            </div>
          </ul>

        </li>
      </ul>
      */}
    </div>
  );
 }
}

export default App;

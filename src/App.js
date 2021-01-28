import React,{Component} from 'react';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';

class App extends Component{
  render(){
    return(
      <div className='App'>
        <Particles  className='particles'/>
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm/>
        {/*
        <FaceRecognition/> */}
      </div>
    );
  }
}

export default App;

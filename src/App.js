import React,{Component} from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/navigation';
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const app= new Clarifai.App({
  apiKey: 'f2a81bb7a14c4ea7805ce9a7ee492a67'
});

class App extends Component{
  constructor(){
    super();
    this.state={
      input: '',
      imageUrl:'',
      box:{},
      route:'signin',
      isSignedIn:false,
    }
  }

  calculateFaceLocation =(faceData)=>{
    const clarifaiFace=faceData.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputimage');
    const width=Number(image.width);
    const height=Number(image.height);
    return{
      leftCol: clarifaiFace.left_col *width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox=(box)=>{
    this.setState({box:box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit=()=>{
    this.setState({imageUrl:this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input).then(response=>this.displayFaceBox(this.calculateFaceLocation(response))).catch(err=>console.log(err));
  }

  onRouteChange=(route)=>{
    if(route==='signout'){
      this.setState({isSignedIn:false})
    } else if(route==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route});
  }

  render(){
    const {isSignedIn,imageUrl,route,box}=this.state;
    return(
      <div className='App'>
        <Particles  className='particles'/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {
          route==='home' ? 
          <div>
            <Logo/>
            <Rank/>
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
           :  (
            this.state.route==='signin'? <Signin onRouteChange={this.onRouteChange}/> :
            <Register onRouteChange={this.onRouteChange}/>
           )
          
        }
      </div>
    );
  }
}

export default App;

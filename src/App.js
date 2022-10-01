import { useState, useEffect,useParams } from 'react';
import * as React from 'react';
import Puzzle from 'react-image-puzzle';
import Question from './Question';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Carousel from 'react-material-ui-carousel'
import FilerobotImageEditor from 'react-filerobot-image-editor';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import { Player } from 'video-react';
import quotes from './quotes';
import InfoIcon from '@mui/icons-material/Info';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ReactPlayer from "react-player";
import ReactCompareImage from 'react-compare-image';
import DownloadIcon from '@mui/icons-material/Download';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./video-react.css"; // or import scss

import {
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  FacebookMessengerIcon,
  RedditIcon,

  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  FacebookMessengerShareButton
} from "react-share";

import './styles.css';
import { height } from '@mui/system';

const axios = require('axios').default;
let data = require('./images.json');
const questions = [
  {
     "id": "1",
     "q": "Which feature is depicted in the circled area in the above picture?",
     "o": [
        "The Great Redspot",
        "Large Cloud Ripple",
        "Shadow of Moon",
        "Cyclone"
     ],
     "a": "1"
  },
  {
     "id": "2",
     "q": "What do the circled regions signify?",
     "o": [
        "Cyclone",
        "Swirls",
        "Dense Cloud",
        "Water"
     ],
     "a": "0"
  },
  {
     "id": "3",
     "q": "Why is the middle portion of the image red?",
     "o": [
        "Shadow of Sun",
        "Shadow of Moon",
        "Short Storm",
        "A thousand-year-long cyclone"
     ],
     "a": "3"
  },
  {
     "id": "4",
     "q": "What causes this black spot on Jupiter?",
     "o": [
        "Shadow of Sun",
        "Shadow of Moon",
        "Cyclone",
        "A thousand-year-long cyclone"
     ],
     "a": "1"
  },
  {
     "id": "5",
     "q": "What is the blue region indicated?",
     "o": [
        "Water",
        "Aurora",
        "Shadow",
        "Cyclone"
     ],
     "a": "1"
  },
  {
     "id": "6",
     "q": "What causes the blue indicated region?",
     "o": [
        "Presence of ocean",
        "Storm",
        "Magnetic Field",
        "Aliens"
     ],
     "a": "2"
  }
]
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const thumbnailUrl = 'https://d2xkkdgjnsfvb0.cloudfront.net/Vault/Thumb?Interlaced=1&Mode=R&ResX=320&OutputFormat=jpg&Quality=75&ts=1656511106&VaultID=';
const HDUrl = 'https://www.missionjuno.swri.edu/Vault/VaultOutput?VaultID=';
function App() {
  
  const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))
  var self = 'http://'+window.location.hostname;
  if(window.location.port !=='') self += ':' + window.location.port;

  const [qid, setQid] = useState(0);
  const [color, setColor] = useState('white');
  const [id, setId] = useState(data[0]['map-projected']);
  const [url1, setUrl1] = useState(thumbnailUrl + id);
  const [url2, setUrl2] = useState(thumbnailUrl + id);
  const [url3, setUrl3] = useState(thumbnailUrl + id);
  const [videoUrl, setVideoUrl]   = useState(false);
  const [state, setState] = useState();
  const [foreFile, setForeFile] = useState();
  const [foreImg, setForeImg] = useState();
  const [backFile, setBackFile] = useState();
  const [backImg, setBackImg] = useState('bg.png');
  const [uploadedUrl,setUploadedUrl] = useState();
  const [value, setValue] = React.useState('1');
  const [ft, setft] = useState('');
  const [fm, setfm] = useState('');
  const [sd, setsd] = useState(new Date('1900-1-1'));
  const [ed, seted] = useState(new Date('9999-12-31'));
  const [puzzleId, setPuzzleId] = useState(id);

  useEffect(() => {
    var u=window.location.toString();
    if(u.includes('puzzle=')) {
      var p = u.split('puzzle=')[1];
      setPuzzleId(p);
      setValue('7');
    }
  }, [])

 
  const applyFilter = () => {
    var title = document.getElementById('ftitle');
    var mission =  document.getElementById('fmission');
    var s =  document.getElementById('sd');
    var e =  document.getElementById('ed');
    setft(title.value);
    setfm(mission.value);
    setsd(new Date(s.value));
    seted(new Date(e.value));
  }

  const clearFilter = () => {
    setft('');
    setfm('');
    setsd(new Date('1900-1-1'));
    seted(new Date('9999-12-31'));
  }
  useEffect(() => {
    if(!foreFile) {
      setForeImg(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(foreFile)
    setForeImg(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
   }, [foreFile]);

   useEffect(() => {
    if(!backFile) {
      setBackImg(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(backFile);
    setBackImg(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
   }, [backFile])

   const onSelectForeFile = e => {
      if (!e.target.files || e.target.files.length === 0) {
        setForeFile(undefined)
        return;
      }
      setForeFile(e.target.files[0])
    }
    const onSelectBackFile = e => {
      if (!e.target.files || e.target.files.length === 0) {
        setBackFile(undefined)
        return;
      }
      setBackFile(e.target.files[0])
    }

   
    function DataURIToBlob(dataURI: string) {
        const splitDataURI = dataURI.split(',')
        const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
        const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

        const ia = new Uint8Array(byteString.length)
        for (let i = 0; i < byteString.length; i++)
            ia[i] = byteString.charCodeAt(i)

        return new Blob([ia], { type: mimeString })
      }
      
    const popupCenter = ({url, title, w, h}) => {
      // Fixes dual-screen position                             Most browsers      Firefox
      const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
      const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;
      const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width;
      const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height;
      const systemZoom = width / window.screen.availWidth;
      const left = (width - w) / 2 / systemZoom + dualScreenLeft
      const top = (height - h) / 2 / systemZoom + dualScreenTop
      const newWindow = window.open(url, title, 
        `
        scrollbars=yes,
        width=${w / systemZoom}, 
        height=${h / systemZoom}, 
        top=${top}, 
        left=${left}
        `
      )
      if (window.focus) newWindow.focus();
    }

    const upload = async () => {
      const file = DataURIToBlob(url3);
      const formData = new FormData();
      formData.append('file', file, 'image.jpg') 
      fetch('https://tmpfiles.org/api/v1/upload', {
        method: 'POST',
        body: formData
      }).then(
        response => response.json() // if the response is a JSON object
      ).then(
        success => {
          var u = success.data.url;
          var t = u.split('org');
          var U = t[0] + 'org/dl' + t[1]; 
          setUploadedUrl(U);
        } 
      ).catch(
        error => {
          console.log(error);
        } 
      );
    }
    
  const load = (id) => {
    setId(id);
    setPuzzleId(id);
    toDataURL(thumbnailUrl + id)
    .then(dataUrl => {
      console.log('RESULT:', dataUrl);
      setUrl1(dataUrl);
      setUrl2(dataUrl);
      setUrl3(dataUrl);
      setForeImg(dataUrl);
    })
  };
  
  const download = (img, s) => {
    console.log(s);
    console.log(window.location);
    setUrl2(img.imageBase64);
    setUrl3(img.imageBase64);
    setForeImg(img.imageBase64);
    setState(s);
    //var a = document.createElement('a');
    //a.href = img.imageBase64;
    //a.download = "output.png";
    //document.body.appendChild(a);
    //a.click();
    //document.body.removeChild(a);
  }

  const downloadClick = () => {
    var a = document.createElement('a');
    a.href = url3;
    a.download = "output.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.crossOrigin='';
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
   // return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
  const downloadRaw = (id,title) => {
    var base_image = new Image();
    base_image.src = HDUrl + id;
    base_image.crossOrigin='';
    base_image.onload = function(){
      var a = document.createElement('a');
      a.href = getBase64Image(base_image);
      a.download = title + ".png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
  }

  const saveClick = (e) => {
    console.log(e);
    return false;
  }
  

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  function addTextToImage(imagePath, text) {
    var c = document.getElementById('textColor').value;
    var circle_canvas = document.getElementById("canvass");
    circle_canvas.setAttribute('crossOrigin','');
    var context = circle_canvas.getContext("2d");
    var img = new Image();
    img.crossOrigin="anonymous";
    img.onload = function () {
      circle_canvas.width=img.width;
        circle_canvas.height=img.height;
        context.drawImage(img, 0, 0);
        context.lineWidth = 1;
        context.fillStyle = c;
        context.lineStyle = "#ffff00";
        context.font = "20px sans-serif";
        var t = '';
        var h = 30;
        for(var i=0;i<text.length;i++) {
          t += text.charAt(i);
          if(t.length === 30) {
            context.fillText(t.trim(), 20, h);
            h += 30;
            t = '';
          }
        }
        context.fillText(t , 20, h);
        let data = circle_canvas.toDataURL();
    };
    img.src = imagePath;
   
}
const saveQuote = () => {
  var circle_canvas = document.getElementById("canvass");
  let data = circle_canvas.toDataURL();
  setUrl3(data);
}
  const [cat, setCat] = useState('age');
  const addQuote = () => {
    console.log(url3);
    console.log(quotes.length);
    var t = quotes[cat];
    console.log(t);
    console.log(cat);
    var q = t[Math.floor(Math.random() * t.length)].text;
    addTextToImage(url3, q);
  };

  const process = () => {
    var fore = document.getElementById('foreImg');
    fore.setAttribute('crossOrigin','');

    var frac = document.getElementById('input');
    frac.setAttribute('crossOrigin','');

    var back = document.getElementById('backImg');
    back.setAttribute('crossOrigin','');

    let foreMat = window.cv.imread(fore);
    let fracMat = window.cv.imread(frac);
    let backMat = window.cv.imread(back);
    
    for (let i = 0; i < fracMat.rows; i++) {
      for (let j = 0; j < fracMat.cols; j++) {
        var s=0;
        for(let k=0;k<3;k++) s+=fracMat.ucharPtr(i, j)[k];
        if(s < 50) {
          fracMat.ucharPtr(i, j)[0] = backMat.ucharPtr(i, j)[0];
          fracMat.ucharPtr(i, j)[1] = backMat.ucharPtr(i, j)[1];
          fracMat.ucharPtr(i, j)[2] = backMat.ucharPtr(i, j)[2];
          fracMat.ucharPtr(i, j)[3] = backMat.ucharPtr(i, j)[3];
        }
        else {
          fracMat.ucharPtr(i, j)[0] = foreMat.ucharPtr(i, j)[0];
          fracMat.ucharPtr(i, j)[1] = foreMat.ucharPtr(i, j)[1];
          fracMat.ucharPtr(i, j)[2] = foreMat.ucharPtr(i, j)[2];
          fracMat.ucharPtr(i, j)[3] = foreMat.ucharPtr(i, j)[3];
        }
      }
    }
    
    window.cv.imshow('output', fracMat);
    var out = document.getElementById('output');
    setUrl3(out.toDataURL());
  };

  const [open, setOpen] = React.useState(false);
  const [video, setVideo] = React.useState('Photograph');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [sid, setSid] = useState('https://raw.githubusercontent.com/aaniksahaa/Images-Junocam/main/img/'+id+'red.jpg');

  return (
    <div className="app">
       <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box style={style}>
          <img width="1000px" src={sid} alt=''/>
          </Box>
        </Fade>
      </Modal>
      <div style={{display: 'flex'}}>
        <div>
          <div className="filter-div">
            <i>Apply filters to choose your desired photos</i><p/>
            <table>
            <tr><td>TITLE</td><td><input type="text" className='text-box' id='ftitle'/></td></tr>
            <tr><td>MISSION PHASE</td><td><input type="text" className='text-box' id='fmission'/></td></tr>
            <tr><td>START DATE</td><td><input type="date" id='sd'/></td></tr>
            <tr><td>END DATE</td><td><input type="date" id='ed'/></td></tr>
            <tr><td><button onClick={applyFilter}>APPLY FILTER</button></td><td><button onClick={clearFilter}>CLEAR FILTER</button></td></tr>
            </table>
          </div>
          <ImageList className="image-list"
            cols={2}
            rowHeight={200}>
            {data.map((item) => {
              if(item.title.includes(ft) === false) return <></>
              if(item.mission.includes(fm) === false) return <></>
              var d = item.year + "-" + item.month + "-" + item.day;
              var D = new Date(d);
              if(D < sd) return <></>
              if(D > ed)  return <></>
              return (
                <ImageListItem key={item['map-projected']} className="image-list-item">
                  <a href='#'>
                    <img
                      src={'https://d2xkkdgjnsfvb0.cloudfront.net/Vault/Thumb?Interlaced=1&Mode=R&ResX=320&OutputFormat=jpg&Quality=75&ts=1656511106&VaultID=' + item['map-projected']}
                      alt={"alt"}
                      loading="lazy"
                      onClick={() => load(item['map-projected'])}
                      className="img-item"
                    />
                  </a>
                  <ImageListItemBar
                    title={<a className="title" target='_blank' href={'https://www.missionjuno.swri.edu/junocam/processing?source=junocam&ob_from=&ob_to=&phases%5B%5D='+item.mission+'&perpage=100'}>{item.title}</a>}
                    subtitle={
                      <div style={{fontSize: "12px"}}>
                        MISSION: {item.mission}
                        <br/>
                        DATE: {D.toDateString()}
                        <br/>
                        <button onClick={() => {
                          setSid('https://raw.githubusercontent.com/aaniksahaa/Images-Junocam/main/img/'+item['map-projected']+'red.jpg');
                          handleOpen();
                        }}>View Scientific Analysis</button>
                      </div>
                    }
                    actionIcon={
                      <IconButton
                        sx={{ color: 'rgb(255, 255, 255,0.8)' }}
                        aria-label={item['map-projected']}
                        onClick={() => downloadRaw(item['map-projected'], item.title)}
                      >
                      <CloudDownloadIcon />
                      </IconButton>
                  }
              />
                </ImageListItem>
              )
            })}
          </ImageList>
        </div>
        <Box sx={{ width: '100%', typography: 'body1', color: 'white'}}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} indicatorColor="primary" textColor="white"
              variant="fullWidth">
                <Tab label="Basic Editor" value="1"/>
                <Tab label="Change Background" value="2"/>
                <Tab label="Add Quotes" value="5"/>
                <Tab label="Generate Music Video" value="6"/>
                <Tab label="Share and Download" value="4" onClick={upload}/>
                <Tab label="Quiz" value="3"/>
                <Tab label="Puzzle" value="7"/>
                <Tab label="User Manual" value="8"/>
                <Tab label="About" value="9"/>
              </TabList>
            </Box>
            <TabPanel value="1">
              <i>Select an image from the left pane. Please click on save to process to further steps.</i>
              <div className='editor'>
                <FilerobotImageEditor
               // loadableDesignState={state}
                Text={{ text: 'Filerobot...' }}
                onModify={(e)=>console.log(e)}
                onBeforeSave={(e)=>saveClick(e)}
                  showCanvasOnly={false}
                  onSave={(editedImageObject, designState) => download(editedImageObject, designState)}
                  source={url1}
                  annotationsCommon={{
                    fill: '#ff0000',
                  }}
                  theme={{
                    typography: {
                      fontFamily: 'Consolas',
                    },
                    palette: {
                      'bg-primary':'#181818',
                      'bg-primary-active': 'red',
                      'bg-primary-hover': 'blue',
                      'bg-secondary': '#grey',
                      'accent-primary': 'red',
                      'accent-primary-active':'white',
                      'active-secondary':'#00ff00',
                      'txt-primary':'white',
                      'txt-primary-invert':'green',
                      'txt-secondary':'white',
                      'link-active':'cyan',
                      'link-primary':'teal',
                      'btn-primary-text':'white',
                      'icons-primary':'white',
                      'icons-secondary': '#00ff00',
                    },
                  }}
                />
              </div>
            </TabPanel>
            <TabPanel value="2">
              <i>Please ensure that you've saved an image in basic editor.</i><p/>
              <div>
                <div style={{display: 'flex'}}>
                  <div>
                    <div>
                    Foreground<br/><input type='file' id='back' onChange={onSelectForeFile}/>
                    </div>
                    <div>
                    <img src={foreImg} id='foreImg' alt = '' className='input-image'/>
                    </div>
                  </div>
                  <div>
                    <div>Background<br/><input type='file' id='fore' onChange={onSelectBackFile}/></div>
                    <div><img src={backImg} id='backImg' alt = '' className='input-image'/></div>
                  </div>
                </div>
                <div style={{display: 'flex'}}>
                  <img src={url2} id='input' alt = '' className='input-image'/>
                  <canvas id='output'/>
                </div>
              </div>
              <button onClick={process}>Apply</button>
            </TabPanel>
            <TabPanel value="3">
              Quiz
              <p/>
              <Question q={questions[qid]}/>
              <button onClick={() => {
                if(qid-1>=0)
                setQid(qid-1)
              }}>Previous</button>
              <button onClick={() => {
                if(qid+1<questions.length) 
                setQid(qid+1)
              }}>Next</button>
              
            </TabPanel>
            <TabPanel value='9'>
              <div style={{display: 'flex'}}>
              <div><img src='https://images.spaceappschallenge.org/images/XZHPysZTUCA9gBWH1MHIH2yRGJg=/19879/width-352/'/></div>
            <div style={{marginLeft: '30px'}}>
            <h2 style={{color: 'red'}}>What's Eloquent Juno?</h2>
            For most, Jupiter's just another distant planet, probably as distant and difficult as astronomy seems. So we worked on our project that gives the kids and young astronomers plenty of scopes to visualize the jovian system in a fun and creative way.<br/>
            <a href='https://2022.spaceappschallenge.org/challenges/2022-challenges/jovian-system/details' target='_blank' alt='' style={{color: '#00ff00'}}>View NASA Challenge Page</a>
            </div>
              </div>    
            <h2 style={{color: 'red'}}>Usage of Nasa Data</h2>
Raw Images captured by Junocam provided on the&nbsp;
<a href='https://www.nasa.gov/solve/feature/junocam' target='_blank' style={{color: '#00ff00'}} alt=''>NASA Junocam</a><br/>
Reading image metadata, our app is capable of filtering them by date, title, mission and other parameters. 
we use methane density, temperature, the 3D position of spacecraft and other metadata from the NASA website to extract meaningful scientific insights.
<div>
  <div>
  <h2 style={{color: 'red'}}>Tech Stack</h2>
Frontend - ReactJS, deployed on Netlify<br/>
Backend - Python Flask, Deployed on Heroku<br/>
Image Processing - Python OpenCV, Pillow<br/>
<h2 style={{color: 'red'}}>Impact of Solution</h2>
Our app aims at sparking interest in astronomy among youths.
In addition, scopes of playing quizzes, puzzles and thereby topping the international leaderboard will boost their confidence in their knowledge of astronomy.
Scientists will be able to gain countless insights just with a glance at our artificially engineered and labeled images.
Young astronomers can share their visualization of Jupiter among the community.
<h2 style={{color: 'red'}}>Future Prospect</h2>
Through this venture, our goal is to bring “Citizen Scientists” on board with NASA and explore the space and our findings as well.
Giving an opportunity to space enthusiasts and future astronomers to contribute to the research and ventures of NASA
Build a stronger community of space lovers and young astronomers to have the brightest future in Astronomy findings
              <h3><i>Made with ❤️ by <a style={{color: '#00ff00'}} alt='' href='#' onClick={() => {
                setSid('us.png');
                handleOpen();
              }}>BUET_Novochari</a></i></h3>
  </div>
  <div>
    <img src='us.png' alt=''/>
  </div>
</div>
              
            </TabPanel>
            <TabPanel value='8'>
            <Carousel autoPlay={false} navButtonsAlwaysVisible={true} animation="slide">
            
<div style={{display: 'flex'}}>
  <div style={{width: '50%'}}>
  <h2 style={{color: 'red'}}>LEFT PANE</h2>
- Contains raw JunoCam images<br/>
- Clicking on image loads it into the editor<br/>
- Images can be downloaded raw<br/>
<h2 style={{color: 'red'}}>FILTER</h2>
- Images can be filtered by title, mission and date<br/>
- Apply filter will filter the images on the left pane<br/>
- Clear filter will cancel the filtering<br/>
  </div>
  <div>
    <img src='manual/left-pane.png' alt=''/>
  </div>
</div>

<div style={{display: 'flex'}}>
  <div style={{width: '50%'}}>
  <h2 style={{color: 'red'}}>BASIC EDITOR</h2>
- Images can be cropped, rotated, flipped and resized<br/>
- Brightness, contrast, hue, saturation, warmth can be changed<br/>
- Filters and blur effect can be applied<br/>
- Watermarks can be added<br/>
- Text, drawing and other images can be added<br/>
- User must click 'save' after editing an image<br/>
  </div>
  <div>
    <img src='manual/editor.png' alt=''/>
  </div>
</div>

<div style={{display: 'flex'}}>
  <div style={{width: '50%'}}>
  <h2 style={{color: 'red'}}>CHANGE BACKGROUND</h2>
- Image saved in basic editor will show up here<br/>
- Both background and foreground can be changed<br/>
- User must click 'apply'<br/>
  </div>
  <div>
    <img src='manual/bg.png' alt=''/>
  </div>
</div>

<div style={{display: 'flex'}}>
  <div style={{width: '50%'}}>
  <h2 style={{color: 'red'}}>ADD QUOTES</h2>
- Image edited in basic editor/background changer will appear here<br/>
- Random quotes can be added by clicking 'Add Quotes'<br/>
- User must click 'Save' to add the final quote<br/>
  </div>
  <div>
    <img src='manual/quote.png' alt=''/>
  </div>
</div>

<div style={{display: 'flex'}}>
  <div style={{width: '50%'}}>
  <h2 style={{color: 'red'}}>GENEREATE MUSIC VIDEO</h2>
- User can choose songs from a list to generate music videos using JunoCam Images<br/>
- Users can also share the generated video via raw URL or via social media<br/>
  </div>
  <div>
    <img src='manual/video.png' alt=''/>
  </div>
</div>

<div style={{display: 'flex'}}>
  <div style={{width: '50%'}}>
  <h2 style={{color: 'red'}}>SHARE AND DOWNLOAD</h2>
- Users can share and download the edited image<br/>
- Edited and raw image can be compared by dragging the slider<br/>
  </div>
  <div>
    <img src='manual/share-2.png' alt=''/>
  </div>
</div>

<div style={{display: 'flex'}}>
  <div style={{width: '50%'}}>
  <h2 style={{color: 'red'}}>QUIZ</h2>
- Quiz games related to JunoCam images<br/>
  </div>
  <div>
    <img src='manual/quiz.png' alt=''/>
  </div>
</div>

<div style={{display: 'flex'}}>
  <div style={{width: '50%'}}>
  <h2 style={{color: 'red'}}>PUZZLE</h2>
- Image chosen from left pane will be converted into a picture puzzle<br/>
- Users can share the puzzle via social media or raw URL<br/>
  </div>
  <div>
    <img src='manual/puzzle.png' alt=''/>
  </div>
</div>
</Carousel>

<br/>
            </TabPanel>
            <TabPanel value="7">
              PUZZLE
              <div style={{display: 'flex'}}>
               <Puzzle key={puzzleId} size="600" image={HDUrl + puzzleId} onDone={()=> console.log(23123213123)}/>
                <div style={{marginLeft: '50px'}}>
                <h1>Share</h1>
                <div>
                  <input type='text' className="text-box" value={self + '/?puzzle=' + puzzleId}/>
                  <br/>
                  <br/>
                </div>
                <FacebookShareButton url={self + '/?puzzle=' + puzzleId}>
                  <FacebookIcon/>
                </FacebookShareButton>
                <FacebookMessengerShareButton url={self + '/?puzzle=' + puzzleId}>
                  <FacebookMessengerIcon/>
                </FacebookMessengerShareButton>
                <TwitterShareButton url={self + '/?puzzle=' + puzzleId}>
                  <TwitterIcon/>
                </TwitterShareButton>
                <WhatsappShareButton url={self + '/?puzzle=' + puzzleId}>
                  <WhatsappIcon/>
                </WhatsappShareButton>
                <TelegramShareButton url={self + '/?puzzle=' + puzzleId}>
                  <TelegramIcon/>
                </TelegramShareButton>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="5">
              <i>Click on 'Add Quote' to add random quotes. Click save to finalize the quote.</i>
              <div>
                <div>
                  Text Color: <input type="text" id='textColor' value={color} onChange={(e) => setColor(e.target.value)}/>
                </div>
                <p/>
                Select Category:
                <select id='category' value={cat} onChange={(e) => setCat(e.target.value)} style={{width: '100px'}}>
                <option value="age">age</option>
<option value="alone">alone</option>
<option value="amazing">amazing</option>
<option value="anger">anger</option>
<option value="anniversary">anniversary</option>
<option value="architecture">architecture</option>
<option value="art">art</option>
<option value="attitude">attitude</option>
<option value="beauty">beauty</option>
<option value="best">best</option>
<option value="birthday">birthday</option>
<option value="business">business</option>
<option value="car">car</option>
<option value="change">change</option>
<option value="communication">communication</option>
<option value="computers">computers</option>
<option value="cool">cool</option>
<option value="courage">courage</option>
<option value="dad">dad</option>
<option value="dating">dating</option>
<option value="death">death</option>
<option value="design">design</option>
<option value="diet">diet</option>
<option value="dreams">dreams</option>
<option value="education">education</option>
<option value="environmental">environmental</option>
<option value="equality">equality</option>
<option value="experience">experience</option>
<option value="failure">failure</option>
<option value="faith">faith</option>
<option value="family">family</option>
<option value="famous">famous</option>
<option value="fear">fear</option>
<option value="finance">finance</option>
<option value="fitness">fitness</option>
<option value="food">food</option>
<option value="forgiveness">forgiveness</option>
<option value="freedom">freedom</option>
<option value="friendship">friendship</option>
<option value="funny">funny</option>
<option value="future">future</option>
<option value="gardening">gardening</option>
<option value="god">god</option>
<option value="good">good</option>
<option value="government">government</option>
<option value="graduation">graduation</option>
<option value="great">great</option>
<option value="happiness">happiness</option>
<option value="health">health</option>
<option value="history">history</option>
<option value="home">home</option>
<option value="hope">hope</option>
<option value="humor">humor</option>
<option value="imagination">imagination</option>
<option value="inspirational">inspirational</option>
<option value="intelligence">intelligence</option>
<option value="jealousy">jealousy</option>
<option value="knowledge">knowledge</option>
<option value="leadership">leadership</option>
<option value="learning">learning</option>
<option value="legal">legal</option>
<option value="life">life</option>
<option value="love">love</option>
<option value="marriage">marriage</option>
<option value="medical">medical</option>
<option value="men">men</option>
<option value="mom">mom</option>
<option value="money">money</option>
<option value="morning">morning</option>
<option value="motivational">motivational</option>
<option value="movies">movies</option>
<option value="movingon">movingon</option>
<option value="music">music</option>
<option value="nature">nature</option>
<option value="parenting">parenting</option>
<option value="patience">patience</option>
<option value="patriotism">patriotism</option>
<option value="peace">peace</option>
<option value="pet">pet</option>
<option value="poetry">poetry</option>
<option value="politics">politics</option>
<option value="positive">positive</option>
<option value="power">power</option>
<option value="relationship">relationship</option>
<option value="religion">religion</option>
<option value="respect">respect</option>
<option value="romantic">romantic</option>
<option value="sad">sad</option>
<option value="science">science</option>
<option value="smile">smile</option>
<option value="society">society</option>
<option value="sports">sports</option>
<option value="strength">strength</option>
<option value="success">success</option>
<option value="sympathy">sympathy</option>
<option value="teacher">teacher</option>
<option value="technology">technology</option>
<option value="teen">teen</option>
<option value="thankful">thankful</option>
<option value="time">time</option>
<option value="travel">travel</option>
<option value="trust">trust</option>
<option value="truth">truth</option>
<option value="war">war</option>
<option value="wedding">wedding</option>
<option value="wisdom">wisdom</option>
<option value="women">women</option>
<option value="work">work</option>
<option value="christmas">christmas</option>
<option value="easter">easter</option>
<option value="fathersday">fathersday</option>
<option value="memorialday">memorialday</option>
<option value="mothersday">mothersday</option>
<option value="newyears">newyears</option>
<option value="saintpatricksday">saintpatricksday</option>
<option value="thanksgiving">thanksgiving</option>
<option value="valentinesday">valentinesday</option>
                </select>
                <p/>
                <button onClick={addQuote}>Add Quote</button>
                <button onClick={saveQuote}>Save</button>
                <div style={{margin: '50px'}}>
                  <canvas style={{display:"block", height:"50vh"}} id="canvass"></canvas>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="6">
              <i>Select a Music:</i><p/>
              <select name="cars" id="cars" value={video} onChange={(e) => setVideo(e.target.value)}>
                <option value="Photograph">Photograph</option>
                <option value="Memories">Memories</option>
                <option value="Alone">Alone</option>
                <option value="Faded">Faded</option>
              </select>
              <p/>
              <div style={{display: 'flex'}}>
              <div style={{width:600, height: 400}}>
                <Player
                  playsInline
                  poster="/assets/poster.png"
                  src={'https://raw.githubusercontent.com/aaniksahaa/vvvv/master/' + video + '.mp4'}
                />
              </div>
                <div style={{marginLeft: '50px'}}>
                <h1>Share</h1>
                <div>
                  <input type='text' className="text-box" value={'https://raw.githubusercontent.com/aaniksahaa/vvvv/master/' + video + '.mp4'}/>
                  <br/>
                  <br/>
                </div>
                <FacebookShareButton url={'https://raw.githubusercontent.com/aaniksahaa/vvvv/master/' + video + '.mp4'}>
                  <FacebookIcon/>
                </FacebookShareButton>
                <FacebookMessengerShareButton url={'https://raw.githubusercontent.com/aaniksahaa/vvvv/master/' + video + '.mp4'}>
                  <FacebookMessengerIcon/>
                </FacebookMessengerShareButton>
                <TwitterShareButton url={'https://raw.githubusercontent.com/aaniksahaa/vvvv/master/' + video + '.mp4'}>
                  <TwitterIcon/>
                </TwitterShareButton>
                <WhatsappShareButton url={'https://raw.githubusercontent.com/aaniksahaa/vvvv/master/' + video + '.mp4'}>
                  <WhatsappIcon/>
                </WhatsappShareButton>
                <TelegramShareButton url={'https://raw.githubusercontent.com/aaniksahaa/vvvv/master/' + video + '.mp4'}>
                  <TelegramIcon/>
                </TelegramShareButton>
                </div>
              </div>
              
            </TabPanel>
            <TabPanel value="4">
              <div style={{display: 'block', padding: '10px'}}>
                <div>
                  <div>
                    Raw URL: <input type='text' className='text-box' value={uploadedUrl}/>
                    <br/>
                    <br/>
                  </div>
                  <div>
                    <button onClick={downloadClick} className="download-btn">Download</button>
                  </div>
                  <div>
                    <h1>Share</h1>
                    <FacebookShareButton url={uploadedUrl}>
                      <FacebookIcon/>
                    </FacebookShareButton>
                    <FacebookMessengerShareButton url={uploadedUrl}>
                      <FacebookMessengerIcon/>
                    </FacebookMessengerShareButton>
                    <TwitterShareButton url={uploadedUrl}>
                      <TwitterIcon/>
                    </TwitterShareButton>
                    <WhatsappShareButton url={uploadedUrl}>
                      <WhatsappIcon/>
                    </WhatsappShareButton>
                    <TelegramShareButton url={uploadedUrl}>
                      <TelegramIcon/>
                    </TelegramShareButton>
                  </div>
                </div>
                <div style={{margin: '10px', padding: '10px'}} className='compare'>
                  <h2>COMPARE IMAGES</h2>
                  <ReactCompareImage leftImage={thumbnailUrl + id} rightImage={url3} />
                </div>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
     
    </div>
  );
}

export default App;

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard(props) {
  const [clsA, setClsA] = React.useState('option');
  const [clsB, setClsB] = React.useState('option');
  const [clsC, setClsC] = React.useState('option');
  const [clsD, setClsD] = React.useState('option');
  const verify=(ans)=> {
    if(props.q.a === '0') setClsA('option-green');
    if(props.q.a === '1') setClsB('option-green');
    if(props.q.a === '2') setClsC('option-green');
    if(props.q.a === '3') setClsD('option-green');
    if(ans+"" === props.q.a) return;

    if(ans === 0) setClsA('option-red');
    if(ans === 1) setClsB('option-red');
    if(ans === 2) setClsC('option-red');
    if(ans === 3) setClsD('option-red');

  }
  React.useEffect(() => {
    setClsA('option');
    setClsB('option');
    setClsC('option');
    setClsD('option');
  }, [props]);
  
  return (
    <div className="question">
      <img src={'questions/'+props.q.id+'q.jpg'} width="30%" alt=""/><p/>
      Q{props.q.id}. {props.q.q}
      <p/>
      <div style={{display: 'flex'}}>
      <div className={clsA}>
        <a onClick={() => verify(0)} href='#' className='option-a'>a. {props.q.o[0]}</a>
      </div>
      <div className={clsB}>
        <a onClick={() => verify(1)} href='#' className='option-a'>b. {props.q.o[1]}</a>
      </div>
      </div>
      <div style={{display: 'flex'}}>
      <div className={clsC}>
        <a onClick={() => verify(2)} href='#' className='option-a'>c. {props.q.o[2]}</a>
      </div>
      <div className={clsD}>
        <a onClick={() => verify(3)} href='#' className='option-a'>d. {props.q.o[3]}</a>
      </div>
      </div>
    </div>
  );
}

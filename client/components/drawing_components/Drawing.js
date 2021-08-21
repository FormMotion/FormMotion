import React, { useState, useEffect, Fragment } from 'react';
import { Stage, Layer, Line, Text } from 'react-konva';
import Konva from 'konva';
import * as htmlToImage from 'html-to-image';
import { toPng, toBlob } from 'html-to-image';
import { connect } from 'react-redux';
import { saveImageThunk } from '../../redux/actions';

// first, we need to set up the canvas
// const canvas = document.querySelector('#sketchpad');

// instantiate Atrament

const Drawing = (props) => {
  const isDrawing = React.useRef(false);

  let history = [
    {
      x: 20,
      y: 20,
    },
  ];
  let historyStep = 0;

  const [drawing, setDrawing] = useState(null);
  const [color, setColor] = useState('black');
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [isPaint, setIsPaint] = useState(false);
  const [mode, setMode] = useState('brush');
  const [tool, setTool] = React.useState('pen');
  const [lines, setLines] = React.useState([]);
  const [position, setPosition] = useState(history[0]);
  const [hasImage, setHasImage] = useState(false);
  const [image, setImage] = useState({});

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = (e) => {
    isDrawing.current = false;
    history = history.slice(0, historyStep + 1);
    const pos = e.target.getStage().getPointerPosition();
    history = history.concat([pos]);
    historyStep += 1;
  };

  const handleUndo = () => {
    console.log('i got to undo, and historyStep is', historyStep);
    if (historyStep === 0) {
      return;
    }
    historyStep -= 1;
    const previous = history[historyStep];
    setPosition(previous);
  };

  const handleRedo = () => {
    if (historyStep === history.length - 1) {
      return;
    }
    historyStep += 1;
    const next = history[historyStep];
    setPosition(next);
  };

  function downloadDrawing(uri, name) {
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    console.log(link, 'link');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const stageRef = React.useRef(null);
  // const secondRef = React.useRef(null);

  const handleExport = () => {
    // const image = stageRef.current.toImage({
    //   function(img) {
    //     console.log('found image');
    //     console.log('image, first', img);
    //   },
    // });
    // console.log(image, 'again');
    const uri = stageRef.current.toDataURL();
    localStorage.setItem('playerDrawnCharacter', uri);
    // const image = stageRef.current.toImage((img) => {

    // });
    // downloadDrawing(uri, 'playerDrawnCharacter.png');
  };

  const getDrawing = async () => {
    const playerDrawnCharacter = localStorage.getItem('playerDrawnCharacter');

    // const playerDrawnDecoded = ImageDataURI.decode(playerDrawnCharacter);
    // const result = playerDrawnDecoded.databuffer;
    // const notSure = playerDrawnDecoded.imageType ?? 'image/png';
    // const blob = b64toBlob(playerDrawnCharacter);
    // console.log('try', blob);
    // const formData = await new FormData();
    // await formData.append('cancel.jpeg', blob);
    // console.log(formData);
    // return playerDrawnCharacter;

    await props.saveImage(playerDrawnCharacter);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     console.log(image);
  //   }
  //   fetchData();
  // }, [hasImage]);

  const makeImage = async (playerDrawnCharacter) => {
    // const playerDrawnCharacter = localStorage.getItem('playerDrawnCharacter');
    // const base64 = await fetch(playerDrawnCharacter);
    // console.log(base64, '64');
    // const blob = await base64.blob();
    // console.log(blob, 'blob');
    // var imageUrl = await URL.createObjectURL(blob);
    // console.log(imageUrl, 'this one');
    // // document.querySelector('#image').src = imageUrl;
    // console.log(imageUrl);
  };
  function b64toBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
  }

  // Konva.Util._urlToImage = (url, callback) => {
  //   const imageObj = Konva.Util.createImageElement();
  //   imageObj.onload = function () {
  //     callback(imageObj);
  //   };
  //   imageObj.src = url
  // };

  return (
    <Fragment>
      <button onClick={handleExport}>Save picture</button>
      <button onClick={getDrawing}>Get Drawing</button>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>

      <select
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
        }}
      >
        <option value="black">Black</option>
        <option value="purple">Purple</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="blue">Blue</option>
        <option value="seagreen">Sea green</option>
        <option value="indigo">Indigo</option>
      </select>

      <select
        value={strokeWidth}
        onChange={(e) => {
          setStrokeWidth(e.target.value);
        }}
      >
        <option value={0.5}>Very thin line</option>
        <option value={2}>Thin line</option>
        <option value={3}>Medium line</option>
        <option value={7}>Think line</option>
        <option value={10}>Very thick line</option>
      </select>

      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          {/* <Text text="undo" onClick={handleUndo} />
          <Text text="redo" x={40} onClick={handleRedo} /> */}
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={color}
              strokeWidth={Number(strokeWidth)}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
      {image && <div>I have the image</div>}
    </Fragment>
  );
};

// const mapState = (state) => {
//   return {
//     product: state.product,
//     userId: state.auth.id,
//     cart: state.cart,
//   };
// };

const mapDispatch = (dispatch) => {
  return {
    saveImage: (dataUrl) => dispatch(saveImageThunk(dataUrl)),
  };
};

export default connect(null, mapDispatch)(Drawing);

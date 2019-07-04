import React, { useState, createRef } from 'react';
import MapGL from '@urbica/react-map-gl';
import { validate } from '@mapbox/mapbox-gl-style-spec';
import { initStyle, initViewport } from '../config';
import 'mapbox-gl/dist/mapbox-gl.css';

const initStyleString = JSON.stringify(initStyle, null, 1);

function App() {
  const [style, setStyle] = useState(initStyleString);
  const [viewport, setViewport] = useState(initViewport);
  const editorRef = createRef();

  const onViewportChange = (newViewport) => {
    setViewport(newViewport);
  };

  const setStyleHandler = () => {
    let { value } = editorRef.current;
    value = value.replace(/'/g, '"');

    const result = validate(value);

    if (result.length === 0) {
      setStyle(value);
      editorRef.current.value = JSON.stringify(JSON.parse(value), null, 1);
    } else {
      result.forEach(({ message }) => console.error(message));
    }
  };

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh'
    }}>
      <MapGL
        style={{
          width: '50%',
          height: '100vh'
        }}
        mapStyle={JSON.parse(style)}
        accessToken='pk.eyJ1IjoiZGV2aWNlMjUiLCJhIjoiY2lzaGN3d2tiMDAxOTJ6bGYydDZrcHptdiJ9.UK55aUzBquqYns1AdnuTQg'
        {...viewport}
        onViewportChange={onViewportChange}
      />
      <textarea
        ref={editorRef}
        style={{ width: '50%' }}
        defaultValue={style}
      />
      <button onClick={setStyleHandler}>
        apply
      </button>

      <div className='zoomPanel'>Zoom:{viewport.zoom.toFixed(2)}</div>

    </div>
  );
}

export default App;

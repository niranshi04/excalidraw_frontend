import React, { useEffect, useState, useRef } from "react";
import  axios  from "axios";
import Excalidraw,{
  exportToBlob,
} from "@excalidraw/excalidraw";
import InitialData from "./initialData";
import { Link } from 'react-router-dom';
import "./styles.scss";
const DrawPage = () =>  {
  const excalidrawRef = useRef(null);

  const [viewModeEnabled, setViewModeEnabled] = useState(false);
  const [zenModeEnabled, setZenModeEnabled] = useState(false);
  const [gridModeEnabled, setGridModeEnabled] = useState(false);
  const [blobUrl, setBlobUrl] = useState(null);
  const [exportWithDarkMode, setExportWithDarkMode] = useState(false);
  const [shouldAddWatermark, setShouldAddWatermark] = useState(false);
  const [theme, setTheme] = useState("light");
  var setInt;
  useEffect(() => {
    setInt = window.setInterval( ()=> {
      uploadImage();
    }, 10000);
    return () => {
      window.clearInterval(setInt);
    };
  }, []);

  const uploadImage = async () => {
    const blob = await exportToBlob({
      elements: excalidrawRef.current.getSceneElements(),
      mimeType: "image/png",
      appState: excalidrawRef.current.getAppState(),
    });
    const fileName = window.URL.createObjectURL(blob).split("/").pop();
    console.log(fileName);
    let formData = new FormData();
        formData.append('file', blob ,fileName);
        axios({
          method  : 'post',
          url : 'http://localhost:7900/uploadSingleFile',
          data : formData,
        })
        .then((res)=>{
          console.log(res);
        })
        .catch((err) => {throw err}); 
  };
  return (
    <div className="App">
      <h1> Excalidraw Task</h1>
      <Link to="/viewAndDownload">
        <button style={{ backgroundColor: "turquoise", color: "white", cursor: "pointer", padding: "1rem", border: "none", borderRadius: "10px", fontSize: "1.5rem", margin: "10px 0px" }}>Download Recents</button>
      </Link>
      <div className="excalidraw-wrapper">
        <Excalidraw
          ref={excalidrawRef}
          initialData={InitialData}
          onCollabButtonClick={() =>
            window.alert("You clicked on collab button")
          }
          viewModeEnabled={viewModeEnabled}
          zenModeEnabled={zenModeEnabled}
          gridModeEnabled={gridModeEnabled}
          theme={theme}
          name="Custom name of drawing"
          UIOptions={{ canvasActions: { loadScene: false } }}
        />
      </div>
    </div>
  );
}
export default DrawPage;
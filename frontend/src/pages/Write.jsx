// import axios from 'axios';
// import moment from 'moment';
// import { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';



// const Write = () => {
//   const navigate = useNavigate()
  
//   const state = useLocation().state
  
//   const [desc, setDesc] = useState(state?.desc || "");
//   const [title, setTitle] = useState(state?.title || "")
//   const [file, setFile] = useState(null)
//   const [cat, setCat] = useState(state?.cat || "")

//   const upload = async()=>{
//     try {
//       const formData = new FormData()
//       formData.append("file",file)
//       const res = await axios.post("http://localhost:5000/api/v1/upload",formData)
//       return res.data
      
//     } catch (error) {
//       console.log(error);
      
//     }
//   }

//   const handleClick = async(e)=>{
//     e.preventDefault()
//     const imgUrl = await upload()
//     try {
//       state ? await axios.put(`http://localhost:5000/api/v1/posts/${state.id}`,{
//         title,desc,cat,img:file?imgUrl:""
//       }) : await axios.post(`http://localhost:5000/api/v1/posts/`, {
//         title, desc, cat, img: file ? imgUrl : "",
//         date:moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
//       }, {
//         withCredentials: true,
//       })
//       navigate("/")
//     } catch (error) {
//       console.log(error);
      
//     }
//   }
  
//   return (
//     <div className="add">
//       <div className="content">
//         <input type="text"
//         value={title}
//         placeholder='Title...' onChange={e=>setTitle(e.target.value)}/>
//         <textarea
//           id="desc"
//           value={desc}
//           onChange={(e) => setDesc(e.target.value)}
//           placeholder="Write a description..."
//           rows={5}
//           style={{
//             width: '100%',
//             height:"88%",
//             padding: '10px',
//             fontSize: '16px',
//             border: '1px solid #ccc',
//             borderRadius: '5px',
//           }}
          
//         />
       
//       </div>
//       <div className="menu">
//         <div className="item">
//           <h1>Publish</h1>
//           <span>
//             <b>Status: </b>Draft
//           </span>
//           <span>
//             <b>Visibility: </b>Public
//           </span>
//           <input style={{display:"none"}} type="file"id='file' onChange={e=>setFile(e.target.files[0])}/>
//           <label className='file' htmlFor="file">Upload Image</label>
//           <div className="buttons">
//             <button>Save as a draft</button>
//             <button onClick={handleClick}>Publish</button>
//           </div>
//         </div>
//         <div className="item">
//           <h1>Category</h1>
//           <div className="cat">
//             <input type="radio" checked={cat=="art"} name='cat' value="art" id='art'onChange={e=>setCat(e.target.value)} />
//             <label htmlFor="art">Art</label>
//           </div>
//           <div className="cat">
//             <input type="radio" checked={cat=="science"} name='cat' value="science" id='science' onChange={e=>setCat(e.target.value)}/>
//             <label htmlFor="science">Science</label>
//           </div>
//           <div className="cat">
//             <input type="radio" checked={cat=="technology"} name='cat' value="technology" id='technology' onChange={e=>setCat(e.target.value)}/>
//             <label htmlFor="technology">Technology</label>
//           </div>
//           <div className="cat">
//             <input type="radio" checked={cat=="cinema"} name='cat' value="cinema" id='cinema' onChange={e=>setCat(e.target.value)}/>
//             <label htmlFor="cinema">Cinema</label>
//           </div>
//           <div className="cat">
//             <input type="radio" checked={cat=="design"} name='cat' value="design" id='design' onChange={e=>setCat(e.target.value)}/>
//             <label htmlFor="design">Design</label>
//           </div>
//           <div className="cat">
//             <input type="radio" checked={cat=="food"} name='cat' value="food" id='food' onChange={e => setCat(e.target.value)} />
//             <label htmlFor="food">Food</label>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Write;


import axios from 'axios';
import moment from 'moment';
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Write = () => {
  const navigate = useNavigate();
  const state = useLocation().state;

  const [desc, setDesc] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://localhost:5000/api/v1/upload", formData, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      if (state) {
        await axios.put(`http://localhost:5000/api/v1/posts/${state.id}`, {
          title,
          desc,
          cat,
          img: file ? imgUrl : ""
        }, {
          withCredentials: true,
        });
      } else {
        await axios.post(`http://localhost:5000/api/v1/posts/`, {
          title,
          desc,
          cat,
          img: file ? imgUrl : "",
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        }, {
          withCredentials: true,
        });
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          value={title}
          placeholder="Title..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          id="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Write a description..."
          rows={5}
          style={{
            width: '100%',
            height: "88%",
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        />
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span><b>Status:</b> Draft</span>
          <span><b>Visibility:</b> Public</span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          {["art", "science", "technology", "cinema", "design", "food"].map((category) => (
            <div className="cat" key={category}>
              <input
                type="radio"
                checked={cat === category}
                name="cat"
                value={category}
                id={category}
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Write;


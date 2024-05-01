"use client";

import Navbar from "@/app/components/navbar/page";
import { useState, useRef } from "react";
import ImageIcon from "@mui/icons-material/Image";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";




const page = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("image url");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("2024-05-01 00:00:00");
  const [content, setContent] = useState("");

  const [showBlogForm, setShowBlogForm] = useState(false);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const formData = {
      Title:title,
      ImageUrl:image,
      Author:author,
      PublishedDate:date,
      Content:content,
    };

    console.log(formData);
    
    if(title!=''&&author!=''&&content!=''){
      const url ="https://lxgn0999u8.execute-api.ap-south-1.amazonaws.com/dev/blogpost";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(formData), // Stringify the formData object
    });

    if (response.ok) {
      alert("succusfully submitted the form");
      setTitle(""); // Clearing the form fields
      setImage("");
      setAuthor("");
      setContent("");
      setDate("");
      setShowBlogForm(false);
    }
    }else{
      return alert('abc')
    }

    
  };
  

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedImage = event.target.files[0];
    // Here you can implement your upload logic, e.g., send the image to a server
    console.log("Selected image:", selectedImage);
    setImage('image url')
  };
  return (
    <div className={`h-svh md:mx-20 ${showBlogForm ? 'bg-black bg-opacity-50' : ''} `}>
      <div className=" h-[40%] bg-black flex justify-center items-center">
        <div className="avatar">
          <div className="w-12 h-12 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div>
          <button
            onClick={() => setShowBlogForm(true)}
            className="bg-white rounded-lg w-96"
          >
            What's on your mind
          </button>
        </div>
      </div>
      {showBlogForm ? (
        <div
          className={`flex justify-center w-full h-auto ${
            showBlogForm ? "" : "hidden"
          }`}
        >
          <form
            className="fixed flex-col items-center justify-center w-screen h-auto pb-5 bg-blue-900 top-20 lg:w-1/2 "
            onSubmit={submitForm}
          >
            <button
              onClick={() => setShowBlogForm(false)}
              className="text-red-50 float-end"
            >
              <HighlightOffIcon></HighlightOffIcon>
            </button>
            <div className="flex justify-center mx-5 mt-10 mb-2">
              {/* <label htmlFor="title">Title:</label> */}
              <input
                type="text"
                placeholder="Title"
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full font-semibold rounded-sm"
              />
            </div>
            <div className="flex justify-center mx-5 mb-2">
              {/* <label htmlFor="title">Author:</label> */}
              <input
                type="text"
                required
                placeholder="Author"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full rounded-sm"
              />
            </div>

            <div className="flex justify-center mx-5">
              {/* <label htmlFor="content">Blog Content:</label> */}
              <textarea
                className="w-full h-[300px] rounded-sm resize-y"
                id="content"
                required
                placeholder="Type your content here."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="mx-5 bg-white">
              <button>
                <ImageIcon onClick={handleIconClick} />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden text-white"
                />
              </button>
            </div>
            <div className="flex justify-center mt-2">
              <button className="btn" type="Post">
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        console.log("nothing happend..")
      )}
    </div>
  );
};

export default page;

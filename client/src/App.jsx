import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [file, setFile] = useState("");
  const [pictures, setPictures] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const getPictures = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/get-pictures");

      if (response.data.pictures) {
        setPictures(response.data.pictures);
      }

    } catch (error) {
      setError("Noe gikk galt med å hente bildene.");
    }
  }

  const uploadPicture = async () => {
    
    const formData = new FormData();
    formData.append('file', file);

    try {

      const response = await axios.post("http://localhost:4000/api/upload-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.data.success) {
        getPictures();
        setSuccess(response.data.success);
      } else if (response.data.error) {
        setError(response.data.error);
      }

    } catch (error) {
      console.log(error);
      setError("Noe gikk galt med opplastingen av bildet.")
    }

  };

  useEffect(() => {

    getPictures();

  }, []);

  return (
    <div>
      <nav className="fixed w-full bg-white flex justify-center  p-4">
        <h2 className="text-2xl">Bryllupsgalleri 2026</h2>
      </nav>
      <main className="flex flex-col gap-2 md:gap-6">
        <div className="flex flex-col md:flex-row justify-center items-center bg-[url('assets/picture.png')] bg-cover pb-12 pt-24">
          <h1 className="text-6xl text-center">RADU</h1>
          <h1 className="text-6xl text-center p-2">♡</h1>
          <h1 className="text-6xl text-center">EMMA</h1>
          <div className="ml-0 md:ml-48">
          {success ? <p className="bg-green-500 text-white p-4 rounded-xl">{success}</p> : null}
          {error ? <p className="bg-red-500 text-white p-4 rounded-xl">{error}</p> : null}
          <div className="border-2 border-violet-300 border-dashed rounded-lg mb-2 active:bg-zinc-100 mt-2">
              <label htmlFor="dropzone-file" className="cursor-pointer" >
                  <div className="flex flex-col items-center pt-5 pb-6 ">
                      <svg className="w-8 h-8 mb-4 text-[#dacce1]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="text-md text-gray-500 dark:text-gray-400 font-semibold">Trykk for å laste opp</p>
                      <p className="mb-2 text-md text-gray-500 dark:text-gray-400">bildet du ønsker</p>
                  </div>
                  <input id="dropzone-file" onChange={handleFileChange} type="file" className="hidden" />
              </label>
          </div> 
          <button onClick={uploadPicture} className="bg-[#dacce1] active:bg-[#dacce9] text-white py-2 px-4 rounded-xl w-[20rem]">
            Last opp
          </button>
        </div>
        </div>
        <div className="grid grid-cols-2 md:gap-6 md:grid-cols-3">
          {pictures.map((picture, index) => (
            <img key={index} src={"http://localhost:4000" + picture.filePath} className="border-2 rounded-xl" />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App

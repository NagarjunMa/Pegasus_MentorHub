import { useState } from "react";

export default function ImageUpload({ sendPushDataToParent }) {
  const [image, setImage] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const value=event.target.files[0];
      fileToDataUri(value).then(dataUri => {setImage(dataUri)})
    } else {
      setImage('');
      return;
    }
  };

  const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result)
    };
    reader.readAsDataURL(file);
  });

  sendPushDataToParent(image);

  return (
    <>
      <div>
        <input type="file" name="myImage" onChange={uploadToClient} />
        <div className=" items-center justify-center text-white"></div>
      </div>
    </>
  );
}

const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`

//console.log("process.env.REACT_APP_CLOUDINARY_CLOUD_NAME:",process.env.REACT_APP_CLOUDINARY_CLOUD_NAME ) //add this to check if cloudinary id is being received or not for the purpose of debugging
//console.log("url", url)

const uploadFile = async(file)=>{
    const formData = new FormData()
    formData.append('file',file)
    formData.append("upload_preset","chat-app")

    try {
        const response = await fetch(url, {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw new Error('File upload failed');
        }
        const data = await response.json();
        return { url: data.secure_url }; // Ensure you return the secure_url
      } catch (error) {
        console.error('Error during file upload:', error);
        return { url: undefined };
      }
    };

export default uploadFile
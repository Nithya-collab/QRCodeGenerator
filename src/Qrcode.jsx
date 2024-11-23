import { useState } from "react"

export default function QRCode(){
 
    const [url, setUrl] = useState('');
    const [size, setSize] = useState(200);
    const [loading, setLoading] = useState(false);
    const GenerateQRCodeImage = async() =>{
        setLoading(true);
        try{
               const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${url}&size=${size}`)
               setUrl(response.url)
               console.log(response)
        }catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }


    const DownloadQRCodeImage = async() => {
      if (!url) return; // Ensure the QR code URL exists

      try {
        const response = await fetch(url); // Fetch the QR code image
        const blob = await response.blob(); // Convert the response to a Blob
        const link = document.createElement("a"); // Create a hidden anchor element
        link.href = URL.createObjectURL(blob); // Create an object URL for the Blob
        link.download = "qrcode.png"; // Set the file name for download
        link.click(); // Trigger the download
        URL.revokeObjectURL(link.href); // Clean up the object URL
      } catch (err) {
        console.error("Error downloading the QR Code:", err);
      }
    }
    return (
        <div>
             <div className="container">
                   <h1>QR Code Generator</h1>
                   {
                      loading && (
                        <p style={{color:'black'}}>Loading...</p>
                      )
                   }
                   {/* <img src={url} alt="QRCode" width={size} height={size}/> */}
                   {
                      url && (
                        <img src={url} alt="QRCode" width={`${size}px`} height={`${size}px`}/>
                      )
                   }
                   <div className="inputs">
                   <div className="url">
                        <input 
                          type='text'
                          id="data-url" 
                          placeholder="https://www.google.com"
                          value={url}
                          onChange={(e)=> setUrl(e.target.value)}
                        />
                   </div>
                   <div className="size">
                        <input 
                            type='number'
                            id="size-input" 
                            placeholder="eg. 100"
                            value={size}
                            onChange={(e)=> setSize(e.target.value)}
                        />
                   </div>
                   </div>
                   <div className="btn-groups">
                        <button className="generate-btn" onClick={GenerateQRCodeImage}>Generate QRCode</button>
                        <button className="download-btn" onClick={DownloadQRCodeImage} disabled={!url}>Download QRCode</button>
                   </div>
             </div>
        </div>
    )
} 
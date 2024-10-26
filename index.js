const formEL = document.getElementById("form");
const qr_inputEL = document.getElementById("qr_input");
const generateEL = document.getElementById("Generate_btn");
const qr_cardEL = document.getElementById("qr_card");
const qr_downloadEL = document.getElementById("download");
const qr_copyEL = document.getElementById("copy");
const qr_imgEL = document.getElementById("qr_img");
const loadingEL = document.getElementById("loading");
const set_image = (url) => {
  console.log(url);
  qr_imgEL.src = url;
  qr_cardEL.classList.remove("hide");
  qr_cardEL.classList.add("qrcode");
  loadingEL.classList.add("loading");
  loadingEL.classList.remove("hide");
  qr_imgEL.classList.add("hide");
  qr_imgEL.classList.remove("qrimg");
  const setloading = () => {
    const interval = setInterval(() => {
      clearInterval(interval);
      loadingEL.classList.remove("loading");
      loadingEL.classList.add("hide");
      qr_imgEL.classList.add("qrimg");
      qr_imgEL.classList.remove("hide");
    }, 0);
  };
  qr_imgEL.addEventListener("load", setloading);
};
formEL.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(qr_inputEL.value);
  const api_img = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qr_inputEL.value}`;

  set_image(api_img);
});

qr_copyEL.addEventListener("click", function () {
  navigator.clipboard.writeText(`${qr_imgEL.src}`).then(function () {
    const button = document.getElementById("copy");
    button.classList.add("active");

    setTimeout(function () {
      button.classList.remove("active");
    }, 2000);
  });
});
qr_inputEL.addEventListener("keyup", () => {
  if (qr_inputEL.value.trim() == "") {
    qr_cardEL.classList.add("hide");
    qr_cardEL.classList.remove("qrcode");
  }
});
// qr_downloadEL.addEventListener("click", () => {
  // const a=document.createElement('a');
  // a.href=qr_imgEL.src;
  // a.download="QrCode.jpg";
  // a.target="_blank";
  // qr_cardEL.appendChild(a);
  // a.click();
  // qr_cardEL.removeChild(a);
  document.getElementById("download").addEventListener('click', async function() {
    const qrImgUrl = document.getElementById('qr_img').src;

    try {
        // Fetch the image as a blob
        const response = await fetch(qrImgUrl);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const blob = await response.blob();
        console.log(blob);
        // Create a temporary URL for the blob
        const blobUrl = URL.createObjectURL(blob);

        // Create a temporary link element
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'QRCode.png';  // Set the file name

        // Append link to the body (required for Firefox)
        document.body.appendChild(link);

        // Simulate a click on the link to start the download
        link.click();

        // Clean up: remove link and revoke object URL
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error('Image download failed:', error);
    }
});
var container = document.querySelector(".imgcontainer");

function clearImages() {
   var imageContainer = document.getElementById("imageContainer");
   while (imageContainer.firstChild) {
      imageContainer.removeChild(imageContainer.firstChild);
   }
}

async function searchImages() {
   clearImages();
   var searchKey = document.getElementById('imgSearch').value;
   var url = "https://googleimage.apinepdev.workers.dev/?search=" + searchKey;
   var imageContainer = document.getElementById("imageContainer");

   try {
      const response = await fetch(url, {
         method: 'POST',
      });

      if (!response.ok) {
         throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      const imageUrls = responseData.imageUrls;

      imageUrls.forEach(url => {
         const imageElement = document.createElement("img");
         imageElement.src = url;
         imageElement.alt = "Image result";
         container.appendChild(imageElement);
      });
   } catch (error) {
      console.error('Fetch error:', error);
   }
}
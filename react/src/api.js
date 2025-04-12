import axios from "axios";

async function searchImages() {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: "Client-ID yyuyzRXLQTea83yFCjjFDbvNbrA0PSC1ziNoIXLNIME",
    },
    params: {
      query: "cars",
    },
  });

  return response.data.results;
}

export default searchImages;

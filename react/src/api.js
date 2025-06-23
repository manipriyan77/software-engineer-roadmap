import axios from "axios";

async function searchImages(queryparam) {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: "Client-ID yyuyzRXLQTea83yFCjjFDbvNbrA0PSC1ziNoIXLNIME",
    },
    params: {
      query: queryparam,
    },
  });

  return response.data.results;
}

export default searchImages;

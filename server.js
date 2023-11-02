const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3001;
const cheerio = require("cheerio");
const cors = require("cors");


app.use(express.json());
app.use(cors());


app.get("/get-repositories", async (req, res) => {
  try {
    const response1 = await axios.get(
      "https://github.com/MunteanuAndrei237/minesweeperBot/blob/master/main.py"
    );
    const response2 = await axios.get(
      "https://github.com/MunteanuAndrei237/chess_bot/blob/main/main.cpp"
    );
    var responsearr = [];

    const html1 = response1.data;

    const $1 = cheerio.load(html1);

    const scriptTag1 = $1('script[data-target="react-app.embeddedData"]');

    const jsonData1 = scriptTag1.html();

    const parsedData1 = JSON.parse(jsonData1);

    responsearr[0] = parsedData1["payload"]["blob"]["rawLines"];

    const html2 = response2.data;

    const $2 = cheerio.load(html2);

    const scriptTag2 = $2('script[data-target="react-app.embeddedData"]');

    const jsonData2 = scriptTag2.html();

    const parsedData2 = JSON.parse(jsonData2);

    responsearr[1] = parsedData2["payload"]["blob"]["rawLines"];

    res.json(responsearr);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

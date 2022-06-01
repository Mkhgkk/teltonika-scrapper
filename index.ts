import fs from "fs";
import jsdom from "jsdom";
import axios from "axios";
const { JSDOM } = jsdom;

// specify device name here
const deviceName: string = "FMB920";

let dom: jsdom.JSDOM;

(async () => {
  try {
    const { data } = await axios.get(
      `https://wiki.teltonika-gps.com/view/${deviceName}_Teltonika_Data_Sending_Parameters_ID`
    );

    dom = await new JSDOM(data);
    console.log(dom.window.document.querySelector("h1")?.textContent);
  } catch (err: any) {
    throw new Error("ERROR: " + err);
  }

  const titlesList: string[] = [];

  // select table titles for all tables
  const titles = dom.window.document.querySelectorAll(".mw-headline");
  titles.forEach((heading: any) => titlesList.push(heading.textContent));

  const resultObj: Record<string, Record<number, string>> = {};

  const tables = dom.window.document.querySelectorAll("table");
  tables.forEach((table: any, index: number) => {
    const elements: Record<number, string> = {};

    const rows = table.querySelectorAll("tr");
    rows.forEach((row: any, index: number) => {
      // skip heading rows
      if (index === 0 || index === 1) return;

      const cols = row.querySelectorAll("td");
      const id = Number(cols[0].innerHTML.trim());
      const name = cols[1].innerHTML.trim();
      elements[id] = name;
    });
    resultObj[titlesList[index]] = elements;
  });

  fs.writeFileSync(
    `./output/${deviceName}AvlIDs.json`,
    JSON.stringify(resultObj)
  );
})();

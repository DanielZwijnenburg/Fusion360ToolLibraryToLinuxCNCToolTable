document.getElementById("jsonInput").addEventListener("input", function () {
  const input = this.value;
  try {
    const json = JSON.parse(input);
    const result = json.data
      .map((item) => {
        const description = item.description;
        const oal = item.geometry.OAL;
        const number = item["post-process"].number;
        return `T${number}     P${number}     X+0.000000   Y+0.000000   Z+${oal}.000000   D+${item.geometry.DC}.000000   ; ${description.toLowerCase()}`;
      })
      .join("\n");

    document.getElementById("resultOutput").value =
      `;Tool  Pocket X Offset     Y Offset     Z Offset     Diameter     Remark\n${result}`;
  } catch (e) {
    document.getElementById("resultOutput").value =
      "Error while parsing JSON, please check validity.";
  }
});

document.getElementById("downloadBtn").addEventListener("click", function () {
  const text = document.getElementById("resultOutput").value;
  const element = document.createElement("a");
  const file = new Blob([text], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = "tool.tbl";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
});


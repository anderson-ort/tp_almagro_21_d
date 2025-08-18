async function readDataFromGitHub(uriFilePath) {
    response = await fetch(uriFilePath, { method: "GET" })
    console.log(response)
}

const URI = "https://raw.githubusercontent.com/ropensci/historydata/refs/heads/master/data-raw/quasi-war.csv"
readDataFromGitHub(URI)
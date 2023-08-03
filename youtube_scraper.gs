function youtubeScraper() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet() //getting the active spreadsheet
  var activesheet = SpreadsheetApp.getActiveSheet() //getting the active sheet in the spreadsheet
  var search = YouTube.Search.list("snippet, id",{q: "pizza", maxResults:10}) // any key word you want to search in place of pizza and change the max results to how many ever results you want. 
  var results = search.items.map((item)=>[item.id.videoId, item.snippet.title, item.snippet.publishedAt]) // gets the video id, title and the published date of the video. 
  var ids = results.map((id)=>id[0]).join(",") 
  var stats = YouTube.Videos.list("statistics", {id:ids})
  var vid_stats = stats.items.map((item) =>[item.statistics.viewCount, item.statistics.likeCount, item.statistics.dislikeCount])// getting the number of views, likes and dislikes through the statistics tag (check out youtube data api for more functions)
 // entering our results in the active sheet
  activesheet.getRange(2,1,results.length, results[0].length).setValues(results)
  activesheet.getRange(2,4,vid_stats.length, results[0].length).setValues(vid_stats)
}

// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const rangeParser = require('range-parser');
const cors = require('cors');
const axios = require('axios');
const moment = require('moment');

const app = express();
const port = 4000;

app.use(cors());
const videoFolder = path.join(__dirname, 'videos');

const jsonFilePath = path.join(__dirname, 'viewerData.json');
let currentVideo = null;
let viewerData = [];


let screenId = "location2"; 
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/videos', express.static(videoFolder)); // Serve videos statically
app.use('/videos', express.static(videoFolder, { fallthrough: false }));
app.use(express.json());


app.use((req, res, next) => {
  res.range = rangeParser;
  next();
});
// console.log(videoFolder);



function setCurrentVideo(videoName) {
  currentVideo = videoName;
}


//Handling get requests
app.get('/videos-list', async (req, res) => {
  try {
    const files = fs.readdirSync(videoFolder);
    
    // Make a request to fetch video descriptions from "http://localhost:3000/videodata"
    const response = await axios.get('http://192.168.88.152:3000/videodata');
    const videoData = response.data.default;

    // Map the video files and merge with descriptions
    const videoFiles = files
      .filter(file => file.endsWith('.mp4'))
      .map(file => {
        const videoInfo = videoData.find(video => video.name === file.replace('.mp4', ''));
        return {
          video_name: file,
          video_text: `videoInfo ? videoInfo.description : Hey this is text for the ${file} video`,
        };
      });
      

    console.log('Video Data:', videoFiles); // Log the video data
    res.json(videoFiles);
  } catch (error) {
    console.error('Error reading video files:', error);
    res.status(500).send('Internal Server Error');
  }
});



//Handling endpoint request at /videos/:filename
app.get('/videos/:filename', (req, res) => {
  try {
    
  const { filename } = req.params;
  const filePath = path.join(videoFolder, filename);
  
  // Use res.sendFile with the range option
  res.sendFile(filePath, { acceptRanges: true }, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(err.status).end();
    } else {
      console.log('File sent successfully');
    }
  });
} catch (error) {
    console.log("Error to fetch the specified video", error);
}
});



//Handling root request
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//handling request at /current-video-info
app.get('/current-video-info', (req, res) => {
  res.json({ currentVideo });
});





app.get('/download-videos', async (req, res) => {
  const screenId = "location2";
  const currentDateTime = moment();

  try {
    const response = await axios.get('http://192.168.88.152:3000/videodata');
    const videoData = response.data.default;

    console.log('Video Data:', videoData); // Log videoData

    // Loop through each video in the videoData
    for (const video of videoData) {
      const { name, pathToDownload, locations, startTime, endTime } = video;
      const flattenedLocations = [].concat(...locations); // Flatten the locations array

      const filename = name + '.mp4';
      const filePath = path.join(videoFolder, filename);

      // Print debugging information

      // Check if the file already exists
      if (fs.existsSync(filePath)) {
        
        const videoStartTime = moment(startTime);
        const videoEndTime = moment(endTime);

        console.log(`Video '${filename}' already exists. Skipping download.`);
        if (currentDateTime.isAfter(videoEndTime) || currentDateTime.isSameOrAfter(videoEndTime)) {
          // Delete the video and skip download
          
          const response = await fetch(`http://192.168.88.152:3000/delete-client-video/${filename}`, {
            method: 'DELETE',
          });
          
          await deleteVideo(filename);

          console.log(`Video '${filename}' deleted from server due to end time reached.`);
          res.send('<script>window.location.reload();</script>');
          return;
        } 
      } else {
        // Check if the screen ID is present in the flattenedLocations array
        if (flattenedLocations.includes(screenId)) {
          const videoStartTime = moment(startTime);
          const videoEndTime = moment(endTime);

          // Print debugging information
          console.log('Is Current Time After Video End Time:', currentDateTime.isAfter(videoEndTime));

          // Check if the current time is after endTime
          if (currentDateTime.isAfter(videoEndTime) || currentDateTime.isSameOrAfter(videoEndTime)) {
            // Delete the video and skip download
            await deleteVideo(filename);
            console.log(`Video '${filename}' deleted from server due to end time reached.`);
          } else if (currentDateTime.isBetween(videoStartTime, videoEndTime) || currentDateTime.isSameOrAfter(videoStartTime)) {
            // Download the video as before
            const file = fs.createWriteStream(filePath);
            const request = http.get(pathToDownload, (response) => {
              response.pipe(file);

              file.on('finish', () => {
                file.close(() => {
                  console.log(`Video '${filename}' downloaded successfully for screen ID ${screenId}.`);
                });
              });
            });

            request.on('error', (err) => {
              console.error('Error downloading video:', err);
            });
          } else {
            console.log(`Video '${filename}' is not intended for screen ID ${screenId} at the current time. Skipping download.`);
          }
        } else {
          console.log(`Video '${filename}' is not intended for screen ID ${screenId}. Skipping download.`);
        }
      }
    }

    res.send('Videos downloaded successfully.');
  } catch (error) {
    console.error('Error downloading videos:', error);
    res.status(500).send('Internal Server Error');
  }
});



async function deleteVideo(filename) {
  const filePath = path.join(videoFolder, filename);

  try {
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      console.log(`Video '${filename}' deleted successfully.`);
    } else {
      console.log(`Video '${filename}' does not exist. Deletion skipped.`);
    }
  } catch (err) {
    console.error(`Error deleting video '${filename}':, err`);
  }
}




app.get('/videoDataSummary', (req, res) => {
  try {
    const jsonFilePath = path.join(__dirname, 'videoDataSummary.json');
    const videoSummaryData = fs.readFileSync(jsonFilePath, 'utf-8');
    const parsedData = JSON.parse(videoSummaryData);
    res.json(parsedData);
  } catch (error) {
    console.error('Error reading video summary data:', error);
    res.status(500).send('Internal Server Error');
  }
});




// app.post('/update-viewer-data', (req, res) => {

//   try {
//   const { viewerCount, startTime } = req.body;

//   if (!currentVideo) {
//     console.log('No video is currently playing.');
//     return res.status(400).send('No video is currently playing.');
//   }

//   // Update viewerData with the new data structure
//   const updatedViewerData = {
//     video_name: currentVideo,
//     viewer_count: viewerCount,
//     timeAt: startTime
//   };

//   // Save the updated data to viewerData.json
//   viewerData.push(updatedViewerData);
//   fs.writeFile(jsonFilePath, JSON.stringify(viewerData, null, 2), 'utf-8', (err) => {
//     if (err) {
//       console.error('Error saving viewer data to JSON file:', err);
//       return res.status(500).send('Internal Server Error');
//     }
//     console.log('Viewer data saved to JSON file.');

//     // Update videoDataSummary.json
//     updateVideoDataSummary(updatedViewerData, (summaryError) => {
//       if (summaryError) {
//         return res.status(500).send('Internal Server Error');
//       }
//       res.status(200).send('Viewer data received and saved successfully');
//     });
//   });

// } catch (error) {
//     console.log("Error in updating the user data", error);
// }
// });



// // Function to update videoDataSummary.json
// function updateVideoDataSummary(updatedViewerData, callback) {
//   const summaryFilePath = path.join(__dirname, 'videoDataSummary.json');

//   fs.readFile(summaryFilePath, 'utf-8', (readErr, summaryData) => {
//     if (readErr) {
//       console.error('Error reading videoDataSummary.json:', readErr);
//       return callback(readErr);
//     }

//     let videoDataSummary = [];
//     try {
//       videoDataSummary = JSON.parse(summaryData);
//     } catch (parseErr) {
//       console.error('Error parsing videoDataSummary.json:', parseErr);
//       return callback(parseErr);
//     }

//     const existingVideoIndex = videoDataSummary.findIndex(item => item.video_name === updatedViewerData.video_name);

//     if (existingVideoIndex !== -1) {
//       // Update existing entry
//       videoDataSummary[existingVideoIndex].viewer_count += updatedViewerData.viewer_count;
//     } else {
//       // Add new entry
//       videoDataSummary.push({
//         video_name: updatedViewerData.video_name,
//         viewer_count: updatedViewerData.viewer_count
//       });
//     }

//     // Save updated data to videoDataSummary.json
//     fs.writeFile(summaryFilePath, JSON.stringify(videoDataSummary, null, 2), 'utf-8', (writeErr) => {
//       if (writeErr) {
//         console.error('Error writing to videoDataSummary.json:', writeErr);
//         return callback(writeErr);
//       }
//       console.log('Video data summary updated successfully.');
//       callback(null);
//     });
//   });
// }







app.post('/update-viewer-data/:video_id', (req, res) => {
  try {
    const { viewerCount, startTime } = req.body;
    const videoId = req.params.video_id;

    if (!videoId) {
      console.log('No video ID provided.');
      return res.status(400).send('No video ID provided.');
    }

    // Update viewerData with the new data structure
    const updatedViewerData = {
      video_id: videoId,
      viewer_count: viewerCount,
      timeAt: startTime,
    };

    // Save the updated data to viewerData.json
    viewerData.push(updatedViewerData);
    fs.writeFile(jsonFilePath, JSON.stringify(viewerData, null, 2), 'utf-8', (err) => {
      if (err) {
        console.error('Error saving viewer data to JSON file:', err);
        return res.status(500).send('Internal Server Error');
      }
      console.log('Viewer data saved to JSON file.');

      // Update videoDataSummary.json
      updateVideoDataSummary(updatedViewerData, (summaryError) => {
        if (summaryError) {
          return res.status(500).send('Internal Server Error');
        }
        res.status(200).send('Viewer data received and saved successfully');
      });
    });
  } catch (error) {
    console.log('Error in updating the user data', error);
    res.status(500).send('Internal Server Error');
  }
});

// Function to update videoDataSummary.json
function updateVideoDataSummary(updatedViewerData, callback) {
  const summaryFilePath = path.join(__dirname, 'videoDataSummary.json');

  fs.readFile(summaryFilePath, 'utf-8', (readErr, summaryData) => {
    if (readErr) {
      console.error('Error reading videoDataSummary.json:', readErr);
      return callback(readErr);
    }

    let videoDataSummary = [];
    try {
      videoDataSummary = JSON.parse(summaryData);
    } catch (parseErr) {
      console.error('Error parsing videoDataSummary.json:', parseErr);
      return callback(parseErr);
    }

    const existingVideoIndex = videoDataSummary.findIndex((item) => item.video_id === updatedViewerData.video_id);

    if (existingVideoIndex !== -1) {
      // Update existing entry
      videoDataSummary[existingVideoIndex].viewer_count += updatedViewerData.viewer_count;
    } else {
      // Add new entry
      videoDataSummary.push({
        video_id: updatedViewerData.video_id,
        viewer_count: updatedViewerData.viewer_count,
      });
    }

    // Save updated data to videoDataSummary.json
    fs.writeFile(summaryFilePath, JSON.stringify(videoDataSummary, null, 2), 'utf-8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing to videoDataSummary.json:', writeErr);
        return callback(writeErr);
      }
      console.log('Video data summary updated successfully.');
      callback(null);
    });
  });
}






//Post request to set the current playing (inorder to access the video on server side)
app.post('/set-current-video', (req, res) => {

  try {
  const { videoName } = req.body;

  setCurrentVideo(videoName);

  res.json({ success: true, message: 'Currently playing video updated successfully' });

} catch (error) {
    console.log("Error in setting the current video", error);
}
});


// Add this route in your server.js
app.post('/delete-video', (req, res) => {
  const { videoName } = req.body;
  deleteVideo(videoName);
  res.json({ success: true, message: 'Video deleted successfully' });
});

// Add this function in your server.js
function deleteVideo(videoName) {
  const filePath = path.join(videoFolder, videoName);
  try {
    fs.unlinkSync(filePath);
    console.log(`Video '${videoName}' deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting video '${videoName}':, error`);
  }
}



//Listening the port
app.listen(port, () => {
  console.log(`Server is running at http://192.168.88.152:${port}`);
});


module.exports = {
  setCurrentVideo
};
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const cors = require('cors')
const bcrypt = require('bcrypt');


const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(session({
  secret: 'sahilisgreat',
  resave: false,
  saveUninitialized: false,
}));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/views'));



const requireAuth = (req, res, next) => {
  console.log('requireAuth middleware called');
  console.log('Session:', req.session);  // Log session information
  console.log('User:', req.session.user);  // Log user information

  if (req.session && req.session.user) {
    return next();
  } else {
    console.log('Redirecting to login page');
    res.redirect('/');
  }
};




const dataPath = path.join(__dirname, 'public', 'videoData.json');
const videoFolder = path.join(__dirname, 'public/uploads');

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const videoTitle = req.body.videoTitle || 'untitled';
    const filename = `${videoTitle.replace(/\s+/g, '_')}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

mongoose.connect('mongodb://localhost:27017/signageUsers');
const db = mongoose.connection;

// Check for MongoDB connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);






// Serve videoData.json
app.get('/videoData', (req, res) => {
  try {
    const data = fs.readFileSync(dataPath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading videoData.json:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get("/", (req, res) => {
  // res.sendFile(__dirname + '/public/login.html')
  res.render('login')
})

app.get("/register", (req, res) => {
  res.render('register')

})

// app.get("/analysis", requireAuth, (req, res) => {
//   res.render('analysis')

// })

app.get("/analysis", requireAuth, async (req, res) => {
  try {

      // Pass the currently logged-in user's email to the analysis template
      res.render('analysis', { currentUserEmail: req.session.user.email });
  } catch (error) {
      console.error('Error fetching user-specific video data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/analysis2", requireAuth, async (req, res) => {
  try {

      // Pass the currently logged-in user's email to the analysis template
      res.render('analysis2', { currentUserEmail: req.session.user.email });
  } catch (error) {
      console.error('Error fetching user-specific video data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get("/upload", requireAuth, (req, res) => {
  res.render('upload')

})





app.get("/dashboard", requireAuth, async (req, res) => {
  try {
    // Fetch video data for the currently logged-in user
    const userEmail = req.session.user.email;
    const userVideoData = await fetchUserVideoData(userEmail);

    // Render the dashboard with user-specific video data
    res.render('dashboard', { user: req.session.user, userVideoData });
  } catch (error) {
    console.error('Error fetching user-specific video data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to fetch video data for the currently logged-in user
async function fetchUserVideoData(userEmail) {
  try {
    // Read the current video data from the file
    const data = fs.readFileSync(dataPath, 'utf-8');
    const allVideoData = JSON.parse(data);

    // Filter videos for the logged-in user
    const userVideoData = allVideoData.default.filter(video => video.uploadedBy === userEmail);

    return userVideoData;
  } catch (error) {
    console.error('Error fetching user-specific video data:', error);
    throw error;
  }
}







app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.redirect('/');
    }
  });
});

app.get('/videos/:filename', (req, res) => {

  try {
  const { filename } = req.params;
  const filePath = path.join(videoFolder, filename);
  console.log(filePath);
  res.sendFile(filePath);

} catch (error) {
  console.log("Error to fetch the specified video", error);
}
});


// Serve uploaded videos
app.use('/uploads', express.static('public/uploads', { fallthrough: false }));




// Registration route
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already taken');
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save to the database
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Set the user in the session
    req.session.user = newUser;

    // Redirect to your main page after registration
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




//Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ email });

    // Check if the user exists and the password is correct
    if (user && await bcrypt.compare(password, user.password)) {
      // Log the session information before setting the user
      console.log('Session before setting user:', req.session);

      // Set the user in the session
      req.session.user = user;

      // Log the session information after setting the user
      console.log('Session after setting user:', req.session);

      // Redirect to your main page after login
      res.redirect('/dashboard');
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//Upload route
app.post('/upload', upload.single('videoFile'), (req, res) => {
  try {
    const { file } = req;
    const { videoTitle, videoDescription, startTime, endTime, videoLocations } = req.body;

    if (!file) {
      return res.status(400).json({ error: 'No video file provided' });
    }

    // Validate start and end time if needed
    // Add your validation logic here

    const videoData = {
      name: videoTitle || 'Untitled Video',
      path: `uploads/${file.filename}`,
      pathToDownload: `http://localhost:3000/videos/${file.filename}`,
      description: videoDescription || '',
      locations: videoLocations || [],
      uploadedBy: req.session.user.email,
      startTime,
      endTime
    };

    const clientID = req.query.clientID || 'default';

    try {
      let clientData = {};

      try {
        const data = fs.readFileSync(dataPath, 'utf-8');
        clientData = JSON.parse(data);
      } catch (error) {
        console.error('Error reading videoData.json:', error);
      }

      console.log('Client Data Before Update:', clientData);

      if (!clientData[clientID]) {
        clientData[clientID] = [];
      }

      clientData[clientID].push(videoData);

      fs.writeFileSync(dataPath, JSON.stringify(clientData, null, 2));

      console.log('Client Data After Update:', clientData);
      console.log('Data Successfully Written to File:', clientData);

      // res.redirect('/index.html');
      res.redirect('/dashboard');
    } catch (error) {
      console.error('Error reading/writing videoData.json:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.log('Error in uploading the video', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});







// Handling delete request at /delete-client-video/:filename
app.delete('/delete-client-video/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(videoFolder, filename);

    // Delete the file from the client-side (port 3000)
    fs.unlinkSync(filePath);

    console.log(`Video '${filename}' deleted from the client side.`);

    // Delete video data
    deleteVideoData(filename.replace('.mp4', ''));

    // Send a success response
    res.json({ success: true, message: `Video '${filename}' deleted from the client side.` });
  } catch (error) {
    console.error('Error deleting video from the client side:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});




// Function to delete video data from videoData.json
function deleteVideoData(videoName) {
  const currentVideoDataPath = path.join(__dirname, 'public', 'videoData.json');
  let currentVideoData = {};

  try {
    const data = fs.readFileSync(currentVideoDataPath, 'utf-8');
    currentVideoData = JSON.parse(data);
  } catch (error) {
    console.error('Error reading videoData.json:', error);
  }

  // Remove the video data from the current video data
  currentVideoData.default = currentVideoData.default.filter(video => video.name !== videoName);

  // Write the updated data back to videoData.json
  fs.writeFileSync(currentVideoDataPath, JSON.stringify(currentVideoData, null, 2));
}



// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

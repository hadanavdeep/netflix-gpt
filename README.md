Netflix GPT
Create React App
Configured TailwindCSS
Header
Routing of App
Login Form
Sign up Form
Form Validation
useRef Hook
Firebase Setup
Deploying our app to production
Create SignUp User Account
Implement Sign In user Api
Created Redux Store with userSlice
Implemented Sign out
Update Profile
BugFix: Sign up user displayName and profile picture update
BugFix: if the user is not logged in Redirect /browse to Login Page and vice-versa
Unsubscibed to the onAuthStateChanged callback
Add hardcoded values to the constants file
Regiter TMDB API & create an app & get access token
Get Data from TMDB now playing movies list API
Custom Hook for Now Playing Movies
Create movieSlice
Update Store with movies Data
Planning for MainContauiner & secondary container
Fetch Data for Trailer Video
Update Store with Trailer Video Data
Embedded the Yotube video and make it autoplay and mute
Tailwind Classes to make Main Container look awesome
Build Secondary Component
Build Movie List
build Movie Card
TMDB Image CDN URL
Made the Browsre page amazing with Tailwind CSS
usePopularMovies Custom hook
GPT Search Page
GPT Search Bar
(BONUS) Multi-language Feature in our App
Get Open AI Api Key
Gpt Search API Call
fetched gptMoviesSuggestions from TMDB
created gptSlice added data
Resused Movie List component to make movie suggestion container
Memoization
Added .env file
Adding .env file to gitignore
Made our Site Responsive

Features
Login/Sign Up
Sign In /Sign up Form
redirect to Browse Page
Browse (after authentication)
Header
Main Movie
Tailer in Background
Title & Description
MovieSuggestions
MovieLists * N
NetflixGPT
Search Bar
Movie Suggestions
Project Setup
Before starting the project please add .env file and add TMDB and OPENAI KEY into it.


Steps to deploy on Firebase-
1) Install firebase CLI- 'npm install -g firebase-tools'
2) Firebase login- 'firebase login'
3) Initialize firebase- 'firebase init', then select hosting and select build as home. then do npm run build to get build folder
4) Deploy command- 'firebase deploy'
**Need to change the folder for these commands from project folder- '..\..\AppData\Roaming\npm\firebase deploy'



# Quiz App

## Overview

This Quiz App is an interactive web application that lets users take quizzes on various topics. It’s designed to be easy to use, with features like error handling and a theme switcher for light and dark modes. The app supports different types of questions, including multiple choice and true/false.

## Features

- **Select a Quiz:** Choose a quiz from a list of categories.
- **Answer Questions:** Answer a set of questions, each with multiple choices or true/false options.
- **View Results:** See your score and performance summary at the end of the quiz.
- **Theme Toggle:** Easily switch between light and dark themes.
- **Progress Bar:** Track your progress through the quiz with a visual indicator.

## Technology Used

- **React.js** for building the user interface.
- **Open Trivia API** to fetch quiz questions.
- **Tailwind CSS** for styling and responsive design.

## Approach

1. **Breaking Down the App:**
   - I started by breaking the app into smaller, manageable parts (components). Each part has a specific job, like setting up the quiz, showing questions, or displaying the final score.

2. **Handling Quiz Data with a Custom Hook:**
   - I created a custom React hook to take care of fetching quiz questions from the Open Trivia API. This hook also manages all the quiz-related data, like which questions to show, what answers were selected, and how the user is progressing.

3. **Managing Global State:**
   - To keep things consistent across the app, I used React’s Context API. This helps manage global features like the theme (light or dark) and the quiz data, so changes in one part of the app are reflected everywhere.

4. **Making It Easy to Switch Themes:**
   - I added a theme toggle that allows users to switch between light and dark modes. This switch is available throughout the app, thanks to the global state management.

5. **Ensuring a Smooth User Experience:**
   - I paid special attention to error handling. If something goes wrong, like the quiz questions failing to load, the app shows clear error messages to guide the user.

6. **Responsive and User-Friendly Design:**
   - The app is designed to work well on all devices, from mobile phones to desktops. I used Tailwind CSS to make sure everything looks good and is easy to interact with, no matter the screen size.

## How to Run the App

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Jash2606/Quiz-App.git
   cd quiz-app
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the App:**
   ```bash
   npm start
   ```

## Future Improvements

- **Timed Quizzes:** Introduce a timer to add more challenge.
- **Leaderboard:** Show top scores to encourage competition.
- **Custom Quizzes:** Let users create and share their own quizzes.

## Demo Picture:
![Screenshot 2024-08-24 001820](https://github.com/user-attachments/assets/f206e61e-63c7-411a-8f85-6c0cf5fec737)

![Screenshot 2024-08-24 001830](https://github.com/user-attachments/assets/d0222790-fdeb-4d9c-a2d5-69ff0858ad81)

![Screenshot 2024-08-24 001901](https://github.com/user-attachments/assets/e0b1206c-405c-4f0c-9b45-8d69df641264)


## Contributions

Contributions are welcome! Feel free to fork the project and submit a pull request with your ideas.

## License

This project is licensed under the MIT License.

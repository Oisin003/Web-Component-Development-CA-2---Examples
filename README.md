# Web-Component-Development-CA-2---Examples
Sample Code for the class test

Set Up:
🧱 1. Create the Project
npx create-react-app react-athlete-manager
cd react-athlete-manager

⚙️ 2. Install Needed Packages
npm install axios
npm install -g json-server        # install JSON server globally
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

🎨 3. Configure Tailwind CSS
@tailwind base;
@tailwind components;
@tailwind utilities;
(add to index.css)

📁 4. Set Up the Folder Structure
src/
├── App.jsx
├── index.js
└── components/
    ├── RefFormExample.jsx
    ├── FetchUsers.jsx
    ├── AthleteApp.jsx
    └── RefAxiosForm.jsx

mkdir src/components
touch src/App.jsx src/components/RefFormExample.jsx src/components/FetchUsers.jsx src/components/AthleteApp.jsx src/components/RefAxiosForm.jsx

🗄️ 6. Create the Fake API Database
In the root of the project (same level as package.json), create a file named db.json:
{
  "athletes": [
    { "id": 1, "name": "Pele", "country": "Brazil" }
  ]
}

🖥️ 7. Run the Servers (two terminals)
🧠 Terminal 1 → Run JSON Server (Backend)
npx json-server --watch db.json --port 3001

💻 Terminal 2 → Run React App (Frontend)
npm start




sudo apt update -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash
sudo apt update nodejs git -y
git clone https://github.com/StromBreaker2/todo-list.git
cd todo-list
nano .env
MONGO_URI=mongodb+srv://sushantkoul001_db_user:sushant123@cluster0.f3aovsb.mongodb.net/cc-blog?appName=Cluster0 PORT=3000
npm install
cd client
npm install
npm run build
cd ..
nohup node server.js &

1) sudo apt update -y
2) curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash
3) sudo apt install nodejs git -y
4) git clone https://github.com/StromBreaker2/todo-list.git
5) cd todo-list
6) nano .env
7) MONGO_URI=mongodb+srv://sushantkoul001_db_user:sushant123@cluster0.f3aovsb.mongodb.net/cc-blog?appName=Cluster0
   PORT=3000
8) npm install
9) cd client
10) npm install
11) npm run build
12) cd ..
13) nohup node server.js &

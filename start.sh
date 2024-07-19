#!/bin/bash
echo "Starting SingboxConveter..."

# 进入项目根目录
cd /app/server

nohup node app.js > /dev/null 2>&1 &

echo "SingboxConverter started."

cd /app/web/SingboxConveterWeb

# 启动前端项目
pnpm run dev


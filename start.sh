#!/bin/bash

# 定义Express和Vite的启动命令
START_EXPRESS="cd server && npm run dev"
START_VITE="cd web/SingboxConveterWeb && npm run dev"

# 使用nohup和&将命令放入后台运行，并重定向输出到日志文件
nohup $START_EXPRESS > express.log 2>&1 &
echo "Express server started with PID $!"

nohup $START_VITE > vite.log 2>&1 &
echo "Vite server started with PID $!"

# 等待任意一个后台进程退出
wait -n

echo "One of the servers has stopped. Exiting..."
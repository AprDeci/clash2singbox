# 使用Node.js 18作为基础镜像
FROM node:18.20.4-slim

# 安装pnpm
RUN npm install -g pnpm

# 设置工作目录为项目根目录
WORKDIR /app

# 复制项目文件
COPY . .

# 进入到后端目录并安装后端依赖
WORKDIR /app/server
RUN pnpm install

# 回到项目根目录
WORKDIR /app

# 进入到前端目录并安装前端依赖
WORKDIR /app/web/SingboxConveterWeb
RUN pnpm install

# 回到项目根目录
WORKDIR /app

# 给予启动脚本执行权限
RUN chmod +x start.sh

# 暴露Express应用的端口
EXPOSE 3000

# 暴露Vite开发服务器的端口
EXPOSE 4012

# # 使用启动脚本来启动Express和Vite服务
CMD [ "/app/start.sh" ]
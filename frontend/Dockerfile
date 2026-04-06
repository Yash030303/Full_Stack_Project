FROM nginx:latest

# 👉 This copies your frontend files:
# 👉 This is the default folder Nginx uses to serve websites
COPY . /usr/share/nginx/html

# 👉 This replaces default Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
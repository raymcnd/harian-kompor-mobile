# based image yang akan digunakan
FROM node:latest

# path di container dimana berisi codingan kita (path bebas sesuai kesepakatan bersama)
WORKDIR /app

# untuk set ENV dalam aplikasi kita
ENV PORT=4002
ENV NODE_ENV=production
ENV DATABASE_URL=postgresql://postgres:UohPunUS39frtP1r@db.hqxtqclqyfvxkbkfigvn.supabase.co:5432/postgres

# copy deps yang ada di apps ke WORKDIR
COPY package.json package-lock.json /app

# Install npm & Mengapus cache
RUN npm install && npm cache clean --force

# 2 install setup for development
RUN npm install -g nodemon

# copy semua file & folder ke WORKDIR
COPY . .

# execute apps: production
CMD ["npm", "run", "start"]

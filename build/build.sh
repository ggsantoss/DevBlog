npm install

# Retire o comentario apenas se você não tiver o postgres.
# sudo docker-compose down

sudo npx prisma migrate reset

sudo npx prisma migrate dev

npm run dev

Dev Instructions:
npm install
npm run dev

Stack:
FE:
React
Tailwind

BE:
Next
SQL+Prisma (hosted on railway)

Utils:
Vercel (hosting)
Axiom (logging)

Prisma Commands:
npx prisma studio (open db explorer in browser)
npx prisma db push (syncs prisma schema with db)
npx prisma generate (updates typescript for new schema - npm install also accomplishes this)
npx prisma migrate dev

Notes:
manually redeploying to vercel fixed schema problem
add "postinstall": "prisma generate" to package.json if needed

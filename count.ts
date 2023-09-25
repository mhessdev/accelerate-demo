import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient();
const prismaWithAccelerate = new PrismaClient().$extends(withAccelerate());

async function main() {
	const start = Date.now();
	const count = await prisma.user.count();

	console.log(
		`There are ${count} users and took ${
			Date.now() - start
		}ms to count them`
	);

	const count2 = await prismaWithAccelerate.user.count({
		cacheStrategy: {
			ttl: 60,
		},
	});

	console.log(
		`Accelerate There are ${count2} users and took ${
			Date.now() - start
		}ms to count them`
	);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

import { PrismaClient } from "@prisma/client";
import {
	uniqueNamesGenerator,
	adjectives,
	colors,
	animals,
} from "unique-names-generator";

const prisma = new PrismaClient();
async function main() {
	const amount = 1000;
	for (let i = 0; i < amount; i++) {
		let name = uniqueNamesGenerator({
			dictionaries: [adjectives, colors, animals],
		});
		let postTitle = uniqueNamesGenerator({
			dictionaries: [adjectives, colors, animals],
		});
		await prisma.user.upsert({
			where: { email: `${name}@prisma.io` },
			update: {},
			create: {
				email: `${name}@prisma.io`,
				name: name,
				posts: {
					create: {
						title: postTitle,
						content: `https://www.prisma.io/${postTitle}`,
						published: true,
					},
				},
			},
		});
	}
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

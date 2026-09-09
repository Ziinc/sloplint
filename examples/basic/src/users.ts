function active(user: { active: boolean }) {
	return user.active;
}

function email(user: { email: string }) {
	return user.email;
}

const users = [{ active: true, email: "a@example.com" }];

// Violates anti-slop/no-array-filter-map: use .flatMap or a single reduce instead
// of an intermediate array built by .filter().map().
const activeEmails = users.filter(active).map(email);

console.log(activeEmails);

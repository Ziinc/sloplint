function active(user: { active: boolean }) {
	return user.active;
}

function email(user: { email: string }) {
	return user.email;
}

const users = [{ active: true, email: "a@example.com" }];

// This breaks the no-array-filter-map rule. Use flatMap or one reduce call
// instead of a filter then a map.
const activeEmails = users.filter(active).map(email);

console.log(activeEmails);

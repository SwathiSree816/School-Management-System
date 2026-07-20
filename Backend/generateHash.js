const bcrypt = require("bcrypt");

async function generate() {
  const passwords = [
    "Admin@123",
    "Teacher@123",
    "Student@123",
    "Parent@123"
  ];

  for (const password of passwords) {
    const hash = await bcrypt.hash(password, 10);
    console.log(`${password} -> ${hash}`);
  }
}

generate();
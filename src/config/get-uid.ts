import auth from './firebase'; // <-- You renamed admin to be the auth instance

const getUserUidByEmail = async (email: string) => {
  try {
    const userRecord = await auth.getUserByEmail(email); // ✅ no parentheses here
    console.log('UID:', userRecord.uid);
    return userRecord.uid;
  } catch (error) {
    console.error('Error fetching user UID:', error);
  }
};

getUserUidByEmail('testuser@example.com');

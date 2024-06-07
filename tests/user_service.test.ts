import { createUser, findUserByEmail } from '../service/user_service'
import User from '../src/database/userSchema'

describe('User Services', () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it('should create a user', async () => {
    const email = 'test@example.com';
    const name = 'Test User';
    const password = 'password123';
    const user = await createUser(email, name, password);
    expect(user).toHaveProperty('_id');
    expect(user.email).toBe(email);
    expect(user.name).toBe(name);
  });

  it('should find a user by email', async () => {
    const email = 'test@example.com';
    const name = 'Test User';
    const password = 'password123';
    await createUser(email, name, password);
    const user = await findUserByEmail(email);
    expect(user).not.toBeNull();
    expect(user?.email).toBe(email);
  });
});

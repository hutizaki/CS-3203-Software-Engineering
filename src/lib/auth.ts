import AsyncStorage from "@react-native-async-storage/async-storage";

const USERS_KEY = "advising_app_users";
const CURRENT_USER_KEY = "advising_app_current_user";

export type StoredUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginErrorCode =
  | "ACCOUNT_NOT_FOUND"
  | "INVALID_CREDENTIALS"
  | "NETWORK_ERROR";

export class LoginError extends Error {
  readonly code: LoginErrorCode;

  constructor(code: LoginErrorCode) {
    super(code);
    this.name = "LoginError";
    this.code = code;
  }
}

export async function getStoredUsers(): Promise<StoredUser[]> {
  try {
    const raw = await AsyncStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveUser(user: StoredUser): Promise<void> {
  const users = await getStoredUsers();
  const exists = users.some(
    (u) => u.email.toLowerCase() === user.email.toLowerCase(),
  );
  if (exists) {
    throw new Error("An account with this email already exists.");
  }
  users.push(user);
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function getCurrentUser(): Promise<string | null> {
  return AsyncStorage.getItem(CURRENT_USER_KEY);
}

export async function setCurrentUser(email: string): Promise<void> {
  await AsyncStorage.setItem(CURRENT_USER_KEY, email);
}

export async function clearCurrentUser(): Promise<void> {
  await AsyncStorage.removeItem(CURRENT_USER_KEY);
}

export async function loginWithCredentials(
  email: string,
  password: string,
): Promise<void> {
  try {
    const users = await getStoredUsers();
    const match = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (!match) {
      throw new LoginError("ACCOUNT_NOT_FOUND");
    }
    if (match.password !== password) {
      throw new LoginError("INVALID_CREDENTIALS");
    }
  } catch (e) {
    if (e instanceof LoginError) {
      throw e;
    }
    throw new LoginError("NETWORK_ERROR");
  }
}

export async function validateLogin(
  email: string,
  password: string,
): Promise<boolean> {
  const users = await getStoredUsers();
  const user = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password,
  );
  return !!user;
}

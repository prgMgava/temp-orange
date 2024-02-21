import { api } from "../orangeApi";

const resource = "auth";

export const AuthService = {
  /**
   * Performs login using provided email and password.
   * @async
   * @param {Object} body - Object containing email and password for login.
   * @param {string} body.email - The email address for login.
   * @param {string} body.password - The password for login.
   * @returns {Promise<void>} Does not return a specific value.
   */
  login: async (body) => {
    const { data } = await api.post(`${resource}/email/login`, body);
    return data;
  },
  /**
   * Registers a new user with the provided information.
   * @async
   * @param {Object} body - Object containing user registration information.
   * @param {string} body.email - The email address of the user.
   * @param {string} body.phoneNumber - The phone number of the user.
   * @param {string} body.password - The password for the user account.
   * @param {string} body.firstName - The first name of the user.
   * @param {string} body.lastName - The last name of the user.
   * @returns {Promise<{webInstanceId: string}>} A promise resolving to an id that referes to web instance created.
   */
  register: async (body) => {
    const { data } = await api.post(`${resource}/email/register`, body);
    return data;
  },
  /**
   * Confirms the email using the provided hash.
   * @async
   * @param {Object} body - Object containing the hash for email confirmation.
   * @param {string} body.hash - The hash string for email confirmation.
   * @returns {Promise<void>} Does not return a specific value.
   */
  emailConfirm: async (body) => {
    const { data } = await api.post(`${resource}/email/confirm`, body);
    return data;
  },
  /**
   * Confirms the email using the provided hash.
   * @async
   * @param {Object} body - Object containing the email.
   * @param {string} body.email - The email string.
   * @returns {Promise<void>} Does not return a specific value.
   */
  forgotPassword: async (body) => {
    const { data } = await api.post(`${resource}/forgot/password`, body);
    return data;
  },
  /**
   * Resets the password using the provided password and hash.
   * @async
   * @param {Object} body - Object containing the password and hash for resetting the password.
   * @param {string} body.password - The new password for the user account.
   * @param {string} body.hash - The hash string for password reset.
   * @returns {Promise<void>} Does not return a specific value.
   */
  resetPassword: async (body) => {
    const { data } = await api.post(`${resource}/reset/password`, body);
    return data;
  },
  /**
   * Get data from authenticated use
   * @returns {{ id: number, phoneNumber: string, email: string, provider: string, firstName: string, lastName: string, role: { id: number, name: string }, status: { id: number }, createdAt: string, updatedAt: string, deletedAt: string }}
   */
  me: async () => {
    const { data } = await api.get(`${resource}/me`);
    return data;
  },
  refreshToken: async () => {
    await api.post(`${resource}/refresh`);
  },
  logout: async () => {
    await api.post(`${resource}/logout`);
  },
};

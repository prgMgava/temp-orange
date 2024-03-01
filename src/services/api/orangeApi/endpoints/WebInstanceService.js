import { api } from "../orangeApi";

const resource = "web-instances";

/**
 * Represents a web instance.
 * @typedef {Object} WebInstance
 * @property {string} id - The ID of the web instance.
 * @property {string} name - The name of the web instance.
 * @property {string} phoneNumber - The phone number associated with the web instance.
 * @property {string} instanceName - The instance name.
 * @property {string} token - The token associated with the web instance.
 * @property {string} serverUrl - The server associated with the web instance.
 * @property {Object} settings - Settings for the web instance.
 * @property {number} settings.id - The ID of the settings.
 * @property {boolean} settings.rejectCall - Indicates if calls should be rejected.
 * @property {boolean} settings.readMessages - Indicates if messages should be read.
 * @property {boolean} settings.notifySent - Indicates if sent messages should be notified.
 * @property {string} settings.defaultResponseMessage - The default response message.
 * @property {string} settings.whSending - Webhook for sending messages.
 * @property {string} settings.whChatPresence - Webhook for chat presence.
 * @property {string} settings.whDisconnecting - Webhook for disconnecting.
 * @property {string} settings.whStatusMessage - Webhook for status messages.
 * @property {string} settings.whReceiving - Webhook for receiving messages.
 * @property {string} settings.whConnecting - Webhook for connecting.
 * @property {Object} state - The state of the web instance.
 * @property {number} state.id - The ID of the state.
 * @property {string} state.name - The name of the state.
 * @property {boolean} isTrial - Indicates if the web instance is a trial.
 * @property {boolean} paid - Indicates if the web instance is paid.
 * @property {Date} dueDate - The due date of the web instance.
 * @property {Date} createdAt - The creation date of the web instance.
 * @property {Date} updatedAt - The last update date of the web instance.
 * @property {Date} deletedAt - The deletion date of the web instance.
 */

export const WebInstanceService = {
  /**
   * Performs registration using provided data.
   * @async
   * @param {Object} body - Object containing registration data.
   * @param {string} body.name - The name for the web instance.
   * @param {string} body.phoneNumber - The phone number for the web instance.
   * @param {string} body.token - The token from Evolution API.
   * @param {Object} body.settings - Settings for the web instance.
   * @param {string} body.settings.someProperty - Description of some property.
   * @param {User} [body.user] - Optional user data.
   * @param {StatesDto} body.state - State data.
   * @param {boolean} [body.isTrial] - Optional flag indicating if it's a trial.
   * @param {boolean} [body.paid] - Optional flag indicating if it's paid.
   * @param {Date|null} [body.dueDate] - Optional due date.
   * @returns {Promise<WebInstance>} A promise that resolves with the registered web instance.
   */
  register: async function (body) {
    const { data } = await api.post(`${resource}`, body);
    return data;
  },

  /**
   * Performs updating using provided data.
   * @async
   * @param {Object} body - Object containing registration data.
   * @param {string} body.name - The name for the web instance.
   * @param {Object} body.settings - Settings for the web instance.
   * @param {string} body.settings.someProperty - Description of some property.
   * @param {User} [body.user] - Optional user data.
   * @param {StatesDto} body.state - State data.
   * @returns {Promise<WebInstance>} A promise that resolves with the registered web instance.
   */
  update: async function (webInstanceId, body) {
    const { data } = await api.patch(`${resource}/${webInstanceId}`, body);
    return data;
  },
  /**
   * Retrieves a list of web instances based on provided parameters.
   * @async
   * @param {QueryWebInstanceDto} params - Object containing query parameters.
   * @param {number} [params.page=1] - The page number for pagination.
   * @param {number} [params.limit=10] - The limit of results per page.
   * @param {Object} [params.filters] - Filters for the web instances.
   * @param {Object[]} [params.sort] - Sorting criteria for the web instances.
   * @returns {Promise<{ data: WebInstance[], hasNextPage: boolean }>} A promise that resolves with an object containing the retrieved data and pagination information.
   */
  findAll: async (params) => {
    const serializedFilters = params.filters
      ? JSON.stringify(params.filters)
      : undefined;

    const { data } = await api.get(`${resource}`, {
      params: {
        ...params,
        filters: serializedFilters,
      },
    });
    return data;
  },
  /**
   * Retrieves a single web instance by its ID.
   * @async
   * @param {string} webInstanceId - The ID of the web instance to retrieve.
   * @returns {Promise<WebInstance>} A promise that resolves with the retrieved web instance.
   */
  findOne: async (webInstanceId) => {
    const { data } = await api.get(`${resource}/${webInstanceId}`);
    return data;
  },

  /**
   * Function that returns an object with the specified data.
   * @typedef {Object} ConnectionReturnObj
   * @property {string} pairingCode - The pairing code.
   * @property {number} count - The count.
   * @property {string} base64 - The value in base64.
   * @property {string} token - The token.
   * @returns {ConnectionReturnObj} Returns an object with the specified data.
   */
  connect: async (webInstanceId, params) => {
    const { data } = await api.get(`${resource}/connect/${webInstanceId}`, {
      params,
    });
    return data;
  },

  /**
   * Function that returns an object with the specified data.
   * @returns {void} Returns an object with the specified data.
   */
  disconnect: async (webInstanceId, params) => {
    await api.delete(`${resource}/disconnect/${webInstanceId}`, {
      params,
    });
  },

  /**
   * Function that returns an object with the specified data.
   * @returns {void} Returns an object with the specified data.
   */
  delete: async (webInstanceId) => {
    await api.delete(`${resource}/${webInstanceId}`);
  },

  /**
   * Function that returns an object with the specified data.
   * @returns {void} Returns an object with the specified data.
   */
  restart: async (webInstanceId) => {
    await api.put(`${resource}/${webInstanceId}`);
  },

  /**
   * Function that returns an object with the specified data.
   * @returns {void} Returns an object with the specified data.
   */
  sendTextMessage: async (webInstanceId, message) => {
    await api.post(`${resource}/send-text-message/${webInstanceId}`, message);
  },
};

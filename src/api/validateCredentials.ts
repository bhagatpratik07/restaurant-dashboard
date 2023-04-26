/**
 * Validates a username and password by checking against an Airtable database.
 *
 * @param {string} username - The username to validate.
 * @param {string} password - The password to validate.
 * @returns {Promise<boolean>} A promise that resolves to true if the credentials are valid, false otherwise.
 *
 */

async function validateCredentials(
  username: string,
  password: string
): Promise<boolean> {
  const url =
    "https://api.airtable.com/v0/appjWdL7YgpxIxCKA/credenitals?maxRecords=3&view=Grid%20view";
  const headers = {
    Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_KEY}`,
  };

  try {
    const response = await fetch(url, { headers }); // Fetch data from Airtable
    const data = await response.json();
    const records = data.records;
    const matchingRecord = records.find(
      (
        record: { fields: { username: string; password: string } } // Find a record that matches the provided username and password
      ) =>
        record.fields.username === username &&
        record.fields.password === password
    );
    return Boolean(matchingRecord);
  } catch (error) {
    console.error(error);
    return false;
  }
}

export { validateCredentials };

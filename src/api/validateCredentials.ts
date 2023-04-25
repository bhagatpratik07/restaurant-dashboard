// type AirtableRecord = {
//   id: string;
//   fields: {
//     username: string;
//     password: string;
//   };
// };

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
    const response = await fetch(url, { headers });
    const data = await response.json();
    const records = data.records;
    const matchingRecord = records.find(
      (record: { fields: { username: string; password: string } }) =>
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

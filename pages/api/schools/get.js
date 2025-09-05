import { getConnection, initDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await initDatabase();
    
    const conn = await getConnection();
    
    // Fetch all schools
    const [rows] = await conn.execute(
      'SELECT id, name, address, city, state, image FROM schools ORDER BY id DESC'
    );

    res.status(200).json({ schools: rows });

  } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

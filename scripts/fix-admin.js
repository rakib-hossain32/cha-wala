const { MongoClient } = require('mongodb'); 
async function run() { 
  const uri = "mongodb+srv://cha_wala_admin:cha_wala_pass_2024@cluster0.pbgay.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const client = new MongoClient(uri); 
  try { 
    await client.connect(); 
    console.log('Connected to:', uri.substring(0, 20) + '...');
    const db = client.db('chai_token_db'); 
    const result = await db.collection('users').updateOne(
      { email: 'rakibulhasanmd678@gmail.com' }, 
      { $set: { role: 'admin' }, $unset: { image: "" } }
    ); 
    console.log('Success:', result); 
  } catch(e) { 
    console.error('Error:', e); 
  } finally { 
    await client.close(); 
  } 
} 
run();

import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

const sql = neon(process.env.DATABASE_URL || '');

async function createTestUser() {
  try {
    const email = 'test@laondatranquila.com';
    const password = 'Teste123!';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user exists
    const existing = await sql('SELECT id FROM users WHERE email = $1', [email]);
    
    if (existing.length > 0) {
      console.log('✅ Usuário já existe:', email);
      return;
    }

    // Create user
    const result = await sql(
      'INSERT INTO users (email, password, is_admin, status) VALUES ($1, $2, $3, $4) RETURNING id, email',
      [email, hashedPassword, false, 'approved']
    );

    console.log('✅ Usuário criado com sucesso!');
    console.log('📧 Email:', result[0].email);
    console.log('🔑 Senha: Teste123!');
    console.log('\n✨ Você pode fazer login em: https://laondatranquila-full.vercel.app/login');
  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error);
    process.exit(1);
  }
}

createTestUser();

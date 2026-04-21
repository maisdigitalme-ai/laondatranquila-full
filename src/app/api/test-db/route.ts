import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function GET() {
  try {
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Configurada' : 'NÃO configurada');
    
    // Tentar conectar
    const result = await sql`SELECT NOW() as now`;
    
    console.log('✅ Conexão com banco de dados OK');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Banco de dados conectado com sucesso',
      timestamp: result[0].now
    });
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco:', error);
    return NextResponse.json({ 
      success: false, 
      error: String(error),
      message: 'Erro ao conectar ao banco de dados'
    }, { status: 500 });
  }
}

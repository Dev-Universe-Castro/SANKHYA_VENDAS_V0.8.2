
import { NextResponse } from 'next/server';

// Array global para armazenar logs (limitado a 50 últimos)
let apiLogs: Array<{
  id: string;
  timestamp: string;
  method: string;
  url: string;
  status: number;
  duration: number;
  tokenUsed: boolean;
}> = [];

export function addApiLog(log: {
  method: string;
  url: string;
  status: number;
  duration: number;
  tokenUsed: boolean;
}) {
  const newLog = {
    id: `${Date.now()}-${Math.random()}`,
    timestamp: new Date().toISOString(),
    ...log
  };

  apiLogs.unshift(newLog);
  
  // Manter apenas os últimos 50 logs
  if (apiLogs.length > 50) {
    apiLogs = apiLogs.slice(0, 50);
  }
}

export async function GET() {
  try {
    return NextResponse.json({
      logs: apiLogs,
      total: apiLogs.length
    });
  } catch (error) {
    console.error('Erro ao obter logs:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';

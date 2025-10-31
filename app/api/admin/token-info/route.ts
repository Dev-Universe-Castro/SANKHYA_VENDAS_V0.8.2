
import { NextResponse } from 'next/server';

// Variável global para armazenar informações do token
let tokenCache: {
  token: string | null;
  createdAt: Date | null;
  expiresIn: number;
} = {
  token: null,
  createdAt: null,
  expiresIn: 3600 // 60 minutos em segundos
};

export function setTokenCache(token: string) {
  tokenCache = {
    token,
    createdAt: new Date(),
    expiresIn: 3600
  };
}

export function getTokenCache() {
  return tokenCache;
}

export async function GET() {
  try {
    if (!tokenCache.token || !tokenCache.createdAt) {
      return NextResponse.json({
        token: null,
        createdAt: null,
        expiresIn: 0,
        remainingTime: 0
      });
    }

    const now = new Date();
    const elapsedSeconds = Math.floor((now.getTime() - tokenCache.createdAt.getTime()) / 1000);
    const remainingTime = Math.max(0, tokenCache.expiresIn - elapsedSeconds);

    return NextResponse.json({
      token: tokenCache.token,
      createdAt: tokenCache.createdAt.toISOString(),
      expiresIn: tokenCache.expiresIn,
      remainingTime
    });
  } catch (error) {
    console.error('Erro ao obter informações do token:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';

#!/usr/bin/env node
/**
 * Natuativo - Gerador de Hash de Senha Admin
 *
 * Como usar:
 *   node scripts/hash-password.js SuaSenhaAqui
 *
 * Copie o hash gerado e coloque em ADMIN_PASSWORD_HASH no .env.local
 */

const bcrypt = require('bcryptjs')

const senha = process.argv[2]

if (!senha) {
  console.error('\n❌ Uso: node scripts/hash-password.js <sua-senha>\n')
  process.exit(1)
}

if (senha.length < 8) {
  console.error('\n❌ A senha deve ter pelo menos 8 caracteres\n')
  process.exit(1)
}

const hash = bcrypt.hashSync(senha, 12)

console.log('\n✅ Hash gerado com sucesso!\n')
console.log('Adicione ao seu .env.local:')
console.log(`\nADMIN_PASSWORD_HASH=${hash}\n`)

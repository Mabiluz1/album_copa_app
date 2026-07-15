import type { Raridade } from '@/models'

export interface StickerSeed {
  id: number
  nome: string
  selecao: string
  foto: string
  raridade: Raridade
}

export interface AchievementSeed {
  id: number
  nome: string
  descricao: string
  icone: string
  meta: number
  tipo: 'coletadas' | 'raras' | 'brilhantes' | 'porcentagem' | 'selecao'
  selecao?: string
}

const avatar = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'

// Este catálogo é utilizado exclusivamente na primeira carga. Depois disso,
// todas as leituras e alterações são feitas diretamente no SQLite.
export const stickerSeeds: StickerSeed[] = [
  { id: 1, nome: 'Neymar', selecao: 'Brasil', foto: avatar, raridade: 'Brilhante' },
  { id: 2, nome: 'Messi', selecao: 'Argentina', foto: avatar, raridade: 'Rara' },
  { id: 3, nome: 'Mbappé', selecao: 'França', foto: avatar, raridade: 'Comum' },
  { id: 4, nome: 'Raphinha', selecao: 'Brasil', foto: avatar, raridade: 'Comum' },
  { id: 5, nome: 'Cristiano Ronaldo', selecao: 'Portugal', foto: avatar, raridade: 'Brilhante' },
  { id: 6, nome: 'Marquinhos', selecao: 'Brasil', foto: avatar, raridade: 'Rara' },
  { id: 7, nome: 'Vinícius Júnior', selecao: 'Brasil', foto: avatar, raridade: 'Comum' },
  { id: 8, nome: 'Julián Álvarez', selecao: 'Argentina', foto: avatar, raridade: 'Comum' },
  { id: 9, nome: 'Antoine Griezmann', selecao: 'França', foto: avatar, raridade: 'Brilhante' },
  { id: 10, nome: 'Casemiro', selecao: 'Brasil', foto: avatar, raridade: 'Rara' },
  { id: 11, nome: 'Bruno Fernandes', selecao: 'Portugal', foto: avatar, raridade: 'Comum' },
  { id: 12, nome: 'Pedri', selecao: 'Espanha', foto: avatar, raridade: 'Comum' },
  { id: 13, nome: 'Rodrygo', selecao: 'Brasil', foto: avatar, raridade: 'Brilhante' },
  { id: 14, nome: 'Lautaro Martínez', selecao: 'Argentina', foto: avatar, raridade: 'Rara' },
  { id: 15, nome: 'Aurélien Tchouaméni', selecao: 'França', foto: avatar, raridade: 'Comum' },
  { id: 16, nome: 'Alisson', selecao: 'Brasil', foto: avatar, raridade: 'Comum' },
  { id: 17, nome: 'Bernardo Silva', selecao: 'Portugal', foto: avatar, raridade: 'Brilhante' },
  { id: 18, nome: 'Rodri', selecao: 'Espanha', foto: avatar, raridade: 'Rara' },
  { id: 19, nome: 'Jamal Musiala', selecao: 'Alemanha', foto: avatar, raridade: 'Comum' },
  { id: 20, nome: 'Sadio Mané', selecao: 'Senegal', foto: avatar, raridade: 'Comum' },
  { id: 21, nome: 'Harry Kane', selecao: 'Inglaterra', foto: avatar, raridade: 'Brilhante' },
  { id: 22, nome: 'Emiliano Martínez', selecao: 'Argentina', foto: avatar, raridade: 'Rara' },
  { id: 23, nome: 'Ousmane Dembélé', selecao: 'França', foto: avatar, raridade: 'Comum' },
  { id: 24, nome: 'Rúben Dias', selecao: 'Portugal', foto: avatar, raridade: 'Comum' },
  { id: 25, nome: 'Lamine Yamal', selecao: 'Espanha', foto: avatar, raridade: 'Brilhante' },
  { id: 26, nome: 'Joshua Kimmich', selecao: 'Alemanha', foto: avatar, raridade: 'Rara' },
  { id: 27, nome: 'Kalidou Koulibaly', selecao: 'Senegal', foto: avatar, raridade: 'Comum' },
  { id: 28, nome: 'Jude Bellingham', selecao: 'Inglaterra', foto: avatar, raridade: 'Comum' },
  { id: 29, nome: 'Kevin De Bruyne', selecao: 'Bélgica', foto: avatar, raridade: 'Brilhante' },
  { id: 30, nome: 'Luis Suárez', selecao: 'Uruguai', foto: avatar, raridade: 'Rara' },
  { id: 31, nome: 'Virgil van Dijk', selecao: 'Holanda', foto: avatar, raridade: 'Comum' },
  { id: 32, nome: 'Luka Modrić', selecao: 'Croácia', foto: avatar, raridade: 'Comum' },
  { id: 33, nome: 'Mohamed Salah', selecao: 'Egito', foto: avatar, raridade: 'Brilhante' },
  { id: 34, nome: 'Achraf Hakimi', selecao: 'Marrocos', foto: avatar, raridade: 'Rara' },
  { id: 35, nome: 'Christian Pulisic', selecao: 'Estados Unidos', foto: avatar, raridade: 'Comum' },
  { id: 36, nome: 'Hirving Lozano', selecao: 'México', foto: avatar, raridade: 'Comum' },
  { id: 37, nome: 'Son Heung-min', selecao: 'Coreia do Sul', foto: avatar, raridade: 'Brilhante' },
  { id: 38, nome: 'Takefusa Kubo', selecao: 'Japão', foto: avatar, raridade: 'Rara' },
  { id: 39, nome: 'André Onana', selecao: 'Camarões', foto: avatar, raridade: 'Comum' },
  { id: 40, nome: 'Victor Osimhen', selecao: 'Nigéria', foto: avatar, raridade: 'Comum' },
  { id: 41, nome: 'Granit Xhaka', selecao: 'Suíça', foto: avatar, raridade: 'Comum' },
  { id: 42, nome: 'Rasmus Højlund', selecao: 'Dinamarca', foto: avatar, raridade: 'Rara' },
  { id: 43, nome: 'Martin Ødegaard', selecao: 'Noruega', foto: avatar, raridade: 'Comum' },
  { id: 44, nome: 'Robert Lewandowski', selecao: 'Polônia', foto: avatar, raridade: 'Comum' },
  { id: 45, nome: 'Dominik Szoboszlai', selecao: 'Hungria', foto: avatar, raridade: 'Comum' },
  { id: 46, nome: 'Khvicha Kvaratskhelia', selecao: 'Geórgia', foto: avatar, raridade: 'Rara' },
  { id: 47, nome: 'David Alaba', selecao: 'Áustria', foto: avatar, raridade: 'Comum' },
  { id: 48, nome: 'Dušan Vlahović', selecao: 'Sérvia', foto: avatar, raridade: 'Comum' },
  { id: 49, nome: 'Hakan Çalhanoğlu', selecao: 'Turquia', foto: avatar, raridade: 'Comum' },
  { id: 50, nome: 'Oleksandr Zinchenko', selecao: 'Ucrânia', foto: avatar, raridade: 'Rara' },
  { id: 51, nome: 'Edson Álvarez', selecao: 'México', foto: avatar, raridade: 'Comum' },
  { id: 52, nome: 'Alphonso Davies', selecao: 'Canadá', foto: avatar, raridade: 'Comum' },
  { id: 53, nome: 'Darwin Núñez', selecao: 'Uruguai', foto: avatar, raridade: 'Comum' },
  { id: 54, nome: 'Federico Valverde', selecao: 'Uruguai', foto: avatar, raridade: 'Rara' },
  { id: 55, nome: 'Cody Gakpo', selecao: 'Holanda', foto: avatar, raridade: 'Comum' },
  { id: 56, nome: 'Joško Gvardiol', selecao: 'Croácia', foto: avatar, raridade: 'Comum' },
  { id: 57, nome: 'Yassine Bounou', selecao: 'Marrocos', foto: avatar, raridade: 'Comum' },
  { id: 58, nome: 'Declan Rice', selecao: 'Inglaterra', foto: avatar, raridade: 'Rara' },
  { id: 59, nome: 'Ilkay Gündoğan', selecao: 'Alemanha', foto: avatar, raridade: 'Comum' },
  { id: 60, nome: 'Dani Olmo', selecao: 'Espanha', foto: avatar, raridade: 'Comum' }
]

export const achievementSeeds: AchievementSeed[] = [
  { id: 1, nome: 'Primeira Figurinha', descricao: 'Colete sua primeira figurinha.', icone: 'ribbon-outline', meta: 1, tipo: 'coletadas' },
  { id: 2, nome: 'Iniciante', descricao: 'Colete 10 figurinhas.', icone: 'medal-outline', meta: 10, tipo: 'coletadas' },
  { id: 3, nome: 'Colecionador', descricao: 'Colete 25 figurinhas.', icone: 'albums-outline', meta: 25, tipo: 'coletadas' },
  { id: 4, nome: 'Álbum em Construção', descricao: 'Colete 50 figurinhas.', icone: 'construct-outline', meta: 50, tipo: 'coletadas' },
  { id: 5, nome: 'Caçador de Raras', descricao: 'Colete 5 figurinhas raras.', icone: 'star-outline', meta: 5, tipo: 'raras' },
  { id: 6, nome: 'Especialista em Raras', descricao: 'Colete 15 figurinhas raras.', icone: 'star-half-outline', meta: 15, tipo: 'raras' },
  { id: 7, nome: 'Brilho Inicial', descricao: 'Colete 3 figurinhas brilhantes.', icone: 'sparkles-outline', meta: 3, tipo: 'brilhantes' },
  { id: 8, nome: 'Mestre das Brilhantes', descricao: 'Colete 10 figurinhas brilhantes.', icone: 'diamond-outline', meta: 10, tipo: 'brilhantes' },
  { id: 9, nome: 'Álbum Quase Completo', descricao: 'Complete 80% do álbum.', icone: 'trending-up-outline', meta: 80, tipo: 'porcentagem' },
  { id: 10, nome: 'Campeão da Copa', descricao: 'Complete 100% do álbum.', icone: 'trophy-outline', meta: 100, tipo: 'porcentagem' },
  { id: 11, nome: 'Canarinho Completo', descricao: 'Complete a coleção de figurinhas do Brasil.', icone: 'flag-outline', meta: 100, tipo: 'selecao', selecao: 'Brasil' }
]

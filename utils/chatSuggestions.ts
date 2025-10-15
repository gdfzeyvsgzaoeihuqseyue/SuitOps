export interface ChatSuggestion {
  text: string;
  category: 'general' | 'product' | 'billing'
    | 'integration' | 'security' | 'support' | 'developer';
}

export const chatSuggestions: ChatSuggestion[] = [
  // Générales / produit
  { text: 'Qu’est-ce que SuitOps ?', category: 'general' },
  { text: 'Quels modules compose SuitOps ?', category: 'general' },
  { text: 'Comment SuitOps s’intègre dans l’écosystème PGS ?', category: 'general' },
  { text: 'Comment gérer les permissions et rôles ?', category: 'general' },

  // Produit / modules
  { text: 'Comment fonctionne SuitOps RH ?', category: 'product' },
  { text: 'Que contient SuitOps Facturation ?', category: 'product' },
  { text: 'Quels workflows d’automatisation sont disponibles ?', category: 'product' },
  { text: 'Comment gérer les factures et paiements récurrents ?', category: 'product' },

  // Facturation / tarification
  { text: 'Quels sont les plans et tarifs SuitOps ?', category: 'billing' },
  { text: 'Puis-je tester SuitOps gratuitement ?', category: 'billing' },
  { text: 'Quelles méthodes de paiement sont supportées ?', category: 'billing' },

  // Intégration & API
  { text: 'Disposez-vous d’une API publique SuitOps ?', category: 'integration' },
  { text: 'Comment connecter SuitOps à un ERP externe ?', category: 'integration' },
  { text: 'Comment utiliser les webhooks pour synchroniser les données ?', category: 'integration' },
  { text: 'Documentation API et exemples (GraphQL / REST) ?', category: 'integration' },

  // Sécurité
  { text: 'Quelles sont les mesures de sécurité de SuitOps ?', category: 'security' },
  { text: 'Comment activer 2FA pour mes utilisateurs ?', category: 'security' },
  { text: 'Comment SuitOps gère la conformité et la confidentialité des données ?', category: 'security' },

  // Support / aide
  { text: 'Où trouver la documentation SuitOps ?', category: 'support' },
  { text: 'Comment contacter le support PGS ?', category: 'support' },
  { text: 'Proposez-vous des formations pour SuitOps ?', category: 'support' },
  { text: 'Comment signaler un bug ou une anomalie ?', category: 'support' },

  // Développeurs / Extensibilité
  { text: 'Comment créer une extension pour PGS Store ?', category: 'developer' },
  { text: 'Quelles technologies sont recommandées pour les plugins ?', category: 'developer' },
  { text: 'Comment publier un package sur pgs-packages ?', category: 'developer' },
  { text: 'Guides de contribution et bonnes pratiques pour devs', category: 'developer' }

];

/**
 * Retourne un nombre aléatoire de suggestions (par défaut 3)
 */
export function getRandomSuggestions(count: number = 3): string[] {
  const shuffled = [...chatSuggestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(s => s.text);
}

/**
 * Retourne des suggestions par catégorie
 */
export function getSuggestionsByCategory(category: ChatSuggestion['category'], count: number = 3): string[] {
  const filtered = chatSuggestions.filter(s => s.category === category);
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(s => s.text);
}

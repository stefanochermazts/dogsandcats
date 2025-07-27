// Sistema di Internazionalizzazione (i18n)

// Traduzioni per tutte le lingue supportate
const translations = {
  it: {
    // Header
    'nav.home': 'Home',
    'nav.adoptions': 'Adozioni',
    'nav.memories': 'Ricordi',
    'nav.cemetery': 'Cimitero',
    'nav.contact': 'Contatti',
    'theme.toggle': 'Cambia tema',
    'menu.open': 'Apri menu',
    'menu.close': 'Chiudi menu',
    'skip.content': 'Salta al contenuto principale',
    
    // Hero
    'hero.title': 'Trova il tuo <span class="hero__title-accent">amico perfetto</span>',
    'hero.description': 'Piattaforma dedicata esclusivamente a cani e gatti. Adozioni, salute, community e ricordi per i nostri amici a quattro zampe.',
    'hero.btn.search': 'Cerca Adozioni',
    'hero.btn.contact': 'Contattaci',
    
    // Services
    'services.title': 'I Nostri Servizi',
    'services.description': 'Tutto quello che serve per i tuoi amici a quattro zampe',
    'services.adoptions.title': 'Adozioni',
    'services.adoptions.description': 'Trova il tuo compagno perfetto tra cani e gatti in cerca di una famiglia amorevole.',
    'services.memories.title': 'Ricordi',
    'services.memories.description': 'Condividi i momenti speciali e le storie dei tuoi amici a quattro zampe.',
    'services.cemetery.title': 'Cimitero Virtuale',
    'services.cemetery.description': 'Un luogo di pace per onorare e ricordare i nostri amati compagni.',
    
    // Stats
    'stats.adoptions': 'Adozioni Completate',
    'stats.stories': 'Storie Condivise',
    'stats.users': 'Utenti Registrati',
    'stats.memorials': 'Memoriali Creati',
    
    // CTA
    'cta.title': 'Pronto a trovare il tuo amico?',
    'cta.description': 'Inizia subito la tua ricerca e trova il compagno perfetto per la tua famiglia.',
    'cta.btn.start': 'Inizia la Ricerca',
    'cta.btn.contact': 'Contattaci',
    
    // Footer
    'footer.description': 'Piattaforma dedicata esclusivamente a cani e gatti. Adozioni, salute, community e ricordi per i nostri amici a quattro zampe.',
    'footer.navigation': 'Navigazione',
    'footer.services': 'Servizi',
    'footer.support': 'Supporto',
    'footer.services.management': 'Gestione Adozioni',
    'footer.services.health': 'Registro Salute',
    'footer.services.community': 'Community Pet',
    'footer.services.memorial': 'Memorial Virtuale',
    'footer.support.help': 'Centro Aiuto',
    'footer.support.faq': 'FAQ',
    'footer.support.privacy': 'Privacy',
    'footer.support.terms': 'Termini',
    'footer.copyright': 'Tutti i diritti riservati.',
    'footer.social.facebook': 'Facebook',
    'footer.social.instagram': 'Instagram',
    'footer.social.twitter': 'Twitter',
    
    // Language
    'lang.current': 'Italiano',
    'lang.select': 'Seleziona lingua',
    
    // Authentication
    'auth.register.title': 'Registrazione',
    'auth.register.subtitle': 'Crea il tuo account per accedere alla piattaforma dedicata a cani e gatti',
    'auth.register.userType': 'Tipo di Utente',
    'auth.register.ownerTitle': 'Proprietario',
    'auth.register.ownerDescription': 'Gestisci il profilo del tuo cane o gatto',
    'auth.register.associationTitle': 'Associazione',
    'auth.register.associationDescription': 'Gestisci adozioni e volontari',
    'auth.register.volunteerTitle': 'Volontario',
    'auth.register.volunteerDescription': 'Aiuta nelle attività di rifugio',
    'auth.userType.proprietario': 'Proprietario',
    'auth.userType.associazione': 'Associazione', 
    'auth.userType.volontario': 'Volontario',
    'auth.userType.admin': 'Amministratore',
    'auth.register.firstName': 'Nome',
    'auth.register.firstNamePlaceholder': 'Il tuo nome',
    'auth.register.lastName': 'Cognome',
    'auth.register.lastNamePlaceholder': 'Il tuo cognome',
    'auth.register.email': 'Email',
    'auth.register.emailPlaceholder': 'La tua email',
    'auth.register.password': 'Password',
    'auth.register.passwordPlaceholder': 'Crea una password',
    'auth.register.passwordHelp': 'Minimo 8 caratteri',
    'auth.register.confirmPassword': 'Conferma Password',
    'auth.register.confirmPasswordPlaceholder': 'Ripeti la password',
    'auth.register.organizationName': 'Nome Organizzazione',
    'auth.register.organizationNamePlaceholder': 'Nome della tua organizzazione',
    'auth.register.vatNumber': 'Partita IVA / Codice Fiscale',
    'auth.register.vatNumberPlaceholder': 'Codice fiscale o P.IVA',
    'auth.register.phone': 'Telefono',
    'auth.register.phonePlaceholder': 'Numero di telefono',
    'auth.register.privacyConsent': 'Accetto la',
    'auth.register.privacyPolicy': 'Privacy Policy',
    'auth.register.termsConsent': 'Accetto i',
    'auth.register.termsOfService': 'Termini di Servizio',
    'auth.register.marketingConsent': 'Accetto di ricevere comunicazioni promozionali (opzionale)',
    'auth.register.submit': 'Registrati',
    'auth.register.processing': 'Creazione account in corso...',
    'auth.register.successTitle': 'Registrazione completata!',
    'auth.register.successMessage': 'Ti abbiamo inviato un\'email di conferma. Clicca sul link per attivare il tuo account.',
    'auth.register.hasAccount': 'Hai già un account?',
    'auth.register.loginLink': 'Accedi',
    
    'auth.login.title': 'Accedi',
    'auth.login.subtitle': 'Benvenuto nella piattaforma dedicata a cani e gatti',
    'auth.login.email': 'Email',
    'auth.login.emailPlaceholder': 'La tua email',
    'auth.login.password': 'Password',
    'auth.login.passwordPlaceholder': 'La tua password',
    'auth.login.rememberMe': 'Ricordami',
    'auth.login.forgotPassword': 'Password dimenticata?',
    'auth.login.submit': 'Accedi',
    'auth.login.processing': 'Accesso in corso...',
    'auth.login.activationTitle': 'Account non attivato',
    'auth.login.activationMessage': 'Il tuo account non è ancora stato attivato. Controlla la tua email e clicca sul link di attivazione.',
    'auth.login.resendActivation': 'Invia nuovamente email',
    'auth.login.noAccount': 'Non hai un account?',
    'auth.login.registerLink': 'Registrati',
    'auth.login.demoTitle': 'Account Demo',
    'auth.login.demoProprietario': 'Proprietario',
    'auth.login.demoAssociazione': 'Associazione',
    'auth.login.demoVolontario': 'Volontario',
    
    'auth.showPassword': 'Mostra password',
    'auth.hidePassword': 'Nascondi password',
    'auth.logout': 'Esci',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profilo',
    'nav.settings': 'Impostazioni',
    
    // Footer
    'footer.account': 'Account',
    
    // Admin Area
    'admin.dashboard.title': 'Dashboard Admin',
    'admin.dashboard.subtitle': 'Panoramica generale della piattaforma DogsAndCats',
    'admin.dashboard.export': 'Esporta',
    'admin.dashboard.refresh': 'Aggiorna',
    'admin.dashboard.stats.totalUsers': 'Utenti Totali',
    'admin.dashboard.stats.totalAdoptions': 'Adozioni',
    'admin.dashboard.stats.totalVolunteers': 'Volontari',
    'admin.dashboard.stats.totalAssociations': 'Associazioni',
    'admin.dashboard.stats.thisMonth': 'Questo mese',
    'admin.dashboard.activity.title': 'Attività Recenti',
    'admin.dashboard.activity.viewAll': 'Visualizza Tutte',
    'admin.dashboard.activity.loading': 'Caricamento...',
    'admin.dashboard.activity.empty': 'Nessuna attività recente',
    'admin.dashboard.activity.empty.description': 'Non ci sono attività da mostrare al momento.',
    'admin.dashboard.activity.error': 'Errore nel caricamento delle attività',
    'admin.dashboard.stats.error': 'Errore nel caricamento delle statistiche',
    
    // Admin Navigation
    'admin.nav.dashboard': 'Dashboard',
    'admin.nav.users': 'Gestione Utenti',
    'admin.nav.animals': 'Animali',
    'admin.nav.adoptions': 'Adozioni',
    'admin.nav.volunteers': 'Volontari',
    'admin.nav.settings': 'Impostazioni',
    
    // Admin User Menu
    'admin.user.goToSite': 'Vai al Sito',
    'admin.user.logout': 'Esci',
    'admin.user.profile': 'Profilo',
    'admin.user.settings': 'Impostazioni',
    
    // Admin Users Page
    'admin.users.title': 'Gestione Utenti',
    'admin.users.subtitle': 'Visualizza e gestisci tutti gli utenti registrati sulla piattaforma',
    'admin.users.export': 'Esporta',
    'admin.users.refresh': 'Aggiorna',
    'admin.users.search.placeholder': 'Cerca per nome, email o organizzazione...',
    'admin.users.filters.allTypes': 'Tutti i tipi',
    'admin.users.filters.allStatus': 'Tutti gli stati',
    'admin.users.filters.clear': 'Pulisci filtri',
    'admin.users.loading': 'Caricamento utenti...',
    'admin.users.error': 'Errore nel caricamento',
    'admin.users.retry': 'Riprova',
    'admin.users.empty': 'Nessun utente trovato',
    'admin.users.empty.description': 'Non ci sono utenti che corrispondono ai criteri di ricerca.'
  },
  
  en: {
    // Header
    'nav.home': 'Home',
    'nav.adoptions': 'Adoptions',
    'nav.memories': 'Memories',
    'nav.cemetery': 'Cemetery',
    'nav.contact': 'Contact',
    'theme.toggle': 'Toggle theme',
    'menu.open': 'Open menu',
    'menu.close': 'Close menu',
    'skip.content': 'Skip to main content',
    
    // Hero
    'hero.title': 'Find your <span class="hero__title-accent">perfect friend</span>',
    'hero.description': 'Platform dedicated exclusively to dogs and cats. Adoptions, health, community and memories for our four-legged friends.',
    'hero.btn.search': 'Search Adoptions',
    'hero.btn.contact': 'Contact Us',
    
    // Services
    'services.title': 'Our Services',
    'services.description': 'Everything you need for your four-legged friends',
    'services.adoptions.title': 'Adoptions',
    'services.adoptions.description': 'Find your perfect companion among dogs and cats looking for a loving family.',
    'services.memories.title': 'Memories',
    'services.memories.description': 'Share special moments and stories of your four-legged friends.',
    'services.cemetery.title': 'Virtual Cemetery',
    'services.cemetery.description': 'A place of peace to honor and remember our beloved companions.',
    
    // Stats
    'stats.adoptions': 'Completed Adoptions',
    'stats.stories': 'Shared Stories',
    'stats.users': 'Registered Users',
    'stats.memorials': 'Created Memorials',
    
    // CTA
    'cta.title': 'Ready to find your friend?',
    'cta.description': 'Start your search now and find the perfect companion for your family.',
    'cta.btn.start': 'Start Search',
    'cta.btn.contact': 'Contact Us',
    
    // Footer
    'footer.description': 'Platform dedicated exclusively to dogs and cats. Adoptions, health, community and memories for our four-legged friends.',
    'footer.navigation': 'Navigation',
    'footer.services': 'Services',
    'footer.support': 'Support',
    'footer.services.management': 'Adoption Management',
    'footer.services.health': 'Health Registry',
    'footer.services.community': 'Pet Community',
    'footer.services.memorial': 'Virtual Memorial',
    'footer.support.help': 'Help Center',
    'footer.support.faq': 'FAQ',
    'footer.support.privacy': 'Privacy',
    'footer.support.terms': 'Terms',
    'footer.copyright': 'All rights reserved.',
    'footer.social.facebook': 'Facebook',
    'footer.social.instagram': 'Instagram',
    'footer.social.twitter': 'Twitter',
    
    // Language
    'lang.current': 'English',
    'lang.select': 'Select language',
    
    // Authentication
    'auth.register.title': 'Registration',
    'auth.register.subtitle': 'Create your account to access the platform dedicated to dogs and cats',
    'auth.register.userType': 'User Type',
    'auth.register.ownerTitle': 'Owner',
    'auth.register.ownerDescription': 'Manage your dog or cat profile',
    'auth.register.associationTitle': 'Association',
    'auth.register.associationDescription': 'Manage adoptions and volunteers',
    'auth.register.volunteerTitle': 'Volunteer',
    'auth.register.volunteerDescription': 'Help in shelter activities',
    'auth.userType.proprietario': 'Owner',
    'auth.userType.associazione': 'Association', 
    'auth.userType.volontario': 'Volunteer',
    'auth.userType.admin': 'Administrator',
    'auth.register.firstName': 'First Name',
    'auth.register.firstNamePlaceholder': 'Your first name',
    'auth.register.lastName': 'Last Name',
    'auth.register.lastNamePlaceholder': 'Your last name',
    'auth.register.email': 'Email',
    'auth.register.emailPlaceholder': 'Your email',
    'auth.register.password': 'Password',
    'auth.register.passwordPlaceholder': 'Create a password',
    'auth.register.passwordHelp': 'Minimum 8 characters',
    'auth.register.confirmPassword': 'Confirm Password',
    'auth.register.confirmPasswordPlaceholder': 'Repeat password',
    'auth.register.organizationName': 'Organization Name',
    'auth.register.organizationNamePlaceholder': 'Name of your organization',
    'auth.register.vatNumber': 'VAT Number / Tax Code',
    'auth.register.vatNumberPlaceholder': 'Tax code or P.IVA',
    'auth.register.phone': 'Phone',
    'auth.register.phonePlaceholder': 'Phone number',
    'auth.register.privacyConsent': 'I accept the',
    'auth.register.privacyPolicy': 'Privacy Policy',
    'auth.register.termsConsent': 'I accept the',
    'auth.register.termsOfService': 'Terms of Service',
    'auth.register.marketingConsent': 'I agree to receive promotional communications (optional)',
    'auth.register.submit': 'Register',
    'auth.register.processing': 'Creating account...',
    'auth.register.successTitle': 'Registration successful!',
    'auth.register.successMessage': 'We have sent you a confirmation email. Click the link to activate your account.',
    'auth.register.hasAccount': 'Already have an account?',
    'auth.register.loginLink': 'Login',
    
    'auth.login.title': 'Login',
    'auth.login.subtitle': 'Welcome to the platform dedicated to dogs and cats',
    'auth.login.email': 'Email',
    'auth.login.emailPlaceholder': 'Your email',
    'auth.login.password': 'Password',
    'auth.login.passwordPlaceholder': 'Your password',
    'auth.login.rememberMe': 'Remember me',
    'auth.login.forgotPassword': 'Forgot password?',
    'auth.login.submit': 'Login',
    'auth.login.processing': 'Logging in...',
    'auth.login.activationTitle': 'Account not activated',
    'auth.login.activationMessage': 'Your account has not yet been activated. Check your email and click the activation link.',
    'auth.login.resendActivation': 'Resend email',
    'auth.login.noAccount': 'Don\'t have an account?',
    'auth.login.registerLink': 'Register',
    'auth.login.demoTitle': 'Demo Account',
    'auth.login.demoProprietario': 'Owner',
    'auth.login.demoAssociazione': 'Association',
    'auth.login.demoVolontario': 'Volunteer',
    
    'auth.showPassword': 'Show password',
    'auth.hidePassword': 'Hide password',
    'auth.logout': 'Logout',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    
    // Footer
    'footer.account': 'Account',
    
    // Admin Area
    'admin.dashboard.title': 'Admin Dashboard',
    'admin.dashboard.subtitle': 'General overview of the DogsAndCats platform',
    'admin.dashboard.export': 'Export',
    'admin.dashboard.refresh': 'Refresh',
    'admin.dashboard.stats.totalUsers': 'Total Users',
    'admin.dashboard.stats.totalAdoptions': 'Adoptions',
    'admin.dashboard.stats.totalVolunteers': 'Volunteers',
    'admin.dashboard.stats.totalAssociations': 'Associations',
    'admin.dashboard.stats.thisMonth': 'This Month',
    'admin.dashboard.activity.title': 'Recent Activity',
    'admin.dashboard.activity.viewAll': 'View All',
    'admin.dashboard.activity.loading': 'Loading...',
    'admin.dashboard.activity.empty': 'No recent activity',
    'admin.dashboard.activity.empty.description': 'There are no activities to show at the moment.',
    'admin.dashboard.activity.error': 'Error loading activities',
    'admin.dashboard.stats.error': 'Error loading statistics',
    
    // Admin Navigation
    'admin.nav.dashboard': 'Dashboard',
    'admin.nav.users': 'User Management',
    'admin.nav.animals': 'Animals',
    'admin.nav.adoptions': 'Adoptions',
    'admin.nav.volunteers': 'Volunteers',
    'admin.nav.settings': 'Settings',
    
    // Admin User Menu
    'admin.user.goToSite': 'Go to Site',
    'admin.user.logout': 'Logout',
    'admin.user.profile': 'Profile',
    'admin.user.settings': 'Settings',
    
    // Admin Users Page
    'admin.users.title': 'User Management',
    'admin.users.subtitle': 'View and manage all registered users on the platform',
    'admin.users.export': 'Export',
    'admin.users.refresh': 'Refresh',
    'admin.users.search.placeholder': 'Search by name, email or organization...',
    'admin.users.filters.allTypes': 'All Types',
    'admin.users.filters.allStatus': 'All Statuses',
    'admin.users.filters.clear': 'Clear Filters',
    'admin.users.loading': 'Loading users...',
    'admin.users.error': 'Error loading',
    'admin.users.retry': 'Retry',
    'admin.users.empty': 'No users found',
    'admin.users.empty.description': 'There are no users matching the search criteria.'
  },
  
  fr: {
    // Header
    'nav.home': 'Accueil',
    'nav.adoptions': 'Adoptions',
    'nav.memories': 'Souvenirs',
    'nav.cemetery': 'Cimetière',
    'nav.contact': 'Contact',
    'theme.toggle': 'Changer le thème',
    'menu.open': 'Ouvrir le menu',
    'menu.close': 'Fermer le menu',
    'skip.content': 'Aller au contenu principal',
    
    // Hero
    'hero.title': 'Trouvez votre <span class="hero__title-accent">ami parfait</span>',
    'hero.description': 'Plateforme dédiée exclusivement aux chiens et chats. Adoptions, santé, communauté et souvenirs pour nos amis à quatre pattes.',
    'hero.btn.search': 'Rechercher Adoptions',
    'hero.btn.contact': 'Nous Contacter',
    
    // Services
    'services.title': 'Nos Services',
    'services.description': 'Tout ce dont vous avez besoin pour vos amis à quatre pattes',
    'services.adoptions.title': 'Adoptions',
    'services.adoptions.description': 'Trouvez votre compagnon parfait parmi les chiens et chats cherchant une famille aimante.',
    'services.memories.title': 'Souvenirs',
    'services.memories.description': 'Partagez les moments spéciaux et les histoires de vos amis à quatre pattes.',
    'services.cemetery.title': 'Cimetière Virtuel',
    'services.cemetery.description': 'Un lieu de paix pour honorer et se souvenir de nos compagnons bien-aimés.',
    
    // Stats
    'stats.adoptions': 'Adoptions Terminées',
    'stats.stories': 'Histoires Partagées',
    'stats.users': 'Utilisateurs Inscrits',
    'stats.memorials': 'Mémoriaux Créés',
    
    // CTA
    'cta.title': 'Prêt à trouver votre ami?',
    'cta.description': 'Commencez votre recherche maintenant et trouvez le compagnon parfait pour votre famille.',
    'cta.btn.start': 'Commencer la Recherche',
    'cta.btn.contact': 'Nous Contacter',
    
    // Footer
    'footer.description': 'Plateforme dédiée exclusivement aux chiens et chats. Adoptions, santé, communauté et souvenirs pour nos amis à quatre pattes.',
    'footer.navigation': 'Navigation',
    'footer.services': 'Services',
    'footer.support': 'Support',
    'footer.services.management': 'Gestion des Adoptions',
    'footer.services.health': 'Registre de Santé',
    'footer.services.community': 'Communauté Pet',
    'footer.services.memorial': 'Mémorial Virtuel',
    'footer.support.help': 'Centre d\'Aide',
    'footer.support.faq': 'FAQ',
    'footer.support.privacy': 'Confidentialité',
    'footer.support.terms': 'Conditions',
    'footer.copyright': 'Tous droits réservés.',
    'footer.social.facebook': 'Facebook',
    'footer.social.instagram': 'Instagram',
    'footer.social.twitter': 'Twitter',
    
    // Language
    'lang.current': 'Français',
    'lang.select': 'Sélectionner la langue',
    
    // Authentication
    'auth.register.title': 'Inscription',
    'auth.register.subtitle': 'Créez votre compte pour accéder à la plateforme dédiée aux chiens et chats',
    'auth.register.userType': 'Type d\'utilisateur',
    'auth.register.ownerTitle': 'Propriétaire',
    'auth.register.ownerDescription': 'Gérez le profil de votre chien ou chat',
    'auth.register.associationTitle': 'Association',
    'auth.register.associationDescription': 'Gérez les adoptions et les bénévoles',
    'auth.register.volunteerTitle': 'Bénévole',
    'auth.register.volunteerDescription': 'Aidez dans les activités d\'accueil',
    'auth.userType.proprietario': 'Propriétaire',
    'auth.userType.associazione': 'Association', 
    'auth.userType.volontario': 'Bénévole',
    'auth.userType.admin': 'Administrateur',
    'auth.register.firstName': 'Prénom',
    'auth.register.firstNamePlaceholder': 'Votre prénom',
    'auth.register.lastName': 'Nom de famille',
    'auth.register.lastNamePlaceholder': 'Votre nom de famille',
    'auth.register.email': 'Email',
    'auth.register.emailPlaceholder': 'Votre email',
    'auth.register.password': 'Mot de passe',
    'auth.register.passwordPlaceholder': 'Créer un mot de passe',
    'auth.register.passwordHelp': 'Minimum 8 caractères',
    'auth.register.confirmPassword': 'Confirmer le mot de passe',
    'auth.register.confirmPasswordPlaceholder': 'Répéter le mot de passe',
    'auth.register.organizationName': 'Nom de l\'organisation',
    'auth.register.organizationNamePlaceholder': 'Nom de votre organisation',
    'auth.register.vatNumber': 'Numéro de TVA / Code fiscal',
    'auth.register.vatNumberPlaceholder': 'Code fiscal ou P.IVA',
    'auth.register.phone': 'Téléphone',
    'auth.register.phonePlaceholder': 'Numéro de téléphone',
    'auth.register.privacyConsent': 'J\'accepte la',
    'auth.register.privacyPolicy': 'Politique de confidentialité',
    'auth.register.termsConsent': 'J\'accepte les',
    'auth.register.termsOfService': 'Conditions d\'utilisation',
    'auth.register.marketingConsent': 'J\'accepte de recevoir des communications promotionnelles (optionnel)',
    'auth.register.submit': 'Inscription',
    'auth.register.processing': 'Création du compte...',
    'auth.register.successTitle': 'Inscription réussie!',
    'auth.register.successMessage': 'Nous vous avons envoyé un email de confirmation. Cliquez sur le lien pour activer votre compte.',
    'auth.register.hasAccount': 'Vous avez déjà un compte?',
    'auth.register.loginLink': 'Connexion',
    
    'auth.login.title': 'Connexion',
    'auth.login.subtitle': 'Bienvenue sur la plateforme dédiée aux chiens et chats',
    'auth.login.email': 'Email',
    'auth.login.emailPlaceholder': 'Votre email',
    'auth.login.password': 'Mot de passe',
    'auth.login.passwordPlaceholder': 'Votre mot de passe',
    'auth.login.rememberMe': 'Se souvenir de moi',
    'auth.login.forgotPassword': 'Mot de passe oublié?',
    'auth.login.submit': 'Connexion',
    'auth.login.processing': 'Connexion...',
    'auth.login.activationTitle': 'Compte non activé',
    'auth.login.activationMessage': 'Votre compte n\'a pas encore été activé. Vérifiez votre email et cliquez sur le lien d\'activation.',
    'auth.login.resendActivation': 'Renvoyer l\'email',
    'auth.login.noAccount': 'Vous n\'avez pas de compte?',
    'auth.login.registerLink': 'Inscription',
    'auth.login.demoTitle': 'Compte démo',
    'auth.login.demoProprietario': 'Propriétaire',
    'auth.login.demoAssociazione': 'Association',
    'auth.login.demoVolontario': 'Bénévole',
    
    'auth.showPassword': 'Afficher le mot de passe',
    'auth.hidePassword': 'Masquer le mot de passe',
    'auth.logout': 'Déconnexion',
    
    // Navigation
    'nav.dashboard': 'Tableau de bord',
    'nav.profile': 'Profil',
    'nav.settings': 'Paramètres',
    
    // Footer
    'footer.account': 'Compte',
    
    // Admin Area
    'admin.dashboard.title': 'Tableau de bord Admin',
    'admin.dashboard.subtitle': 'Aperçu général de la plateforme DogsAndCats',
    'admin.dashboard.export': 'Exporter',
    'admin.dashboard.refresh': 'Actualiser',
    'admin.dashboard.stats.totalUsers': 'Utilisateurs Totaux',
    'admin.dashboard.stats.totalAdoptions': 'Adoptions',
    'admin.dashboard.stats.totalVolunteers': 'Bénévoles',
    'admin.dashboard.stats.totalAssociations': 'Associations',
    'admin.dashboard.stats.thisMonth': 'Ce mois',
    'admin.dashboard.activity.title': 'Activité Récente',
    'admin.dashboard.activity.viewAll': 'Voir tout',
    'admin.dashboard.activity.loading': 'Chargement...',
    'admin.dashboard.activity.empty': 'Aucune activité récente',
    'admin.dashboard.activity.empty.description': 'Il n\'y a pas d\'activités à afficher pour le moment.',
    'admin.dashboard.activity.error': 'Erreur lors du chargement des activités',
    'admin.dashboard.stats.error': 'Erreur lors du chargement des statistiques',
    
    // Admin Navigation
    'admin.nav.dashboard': 'Tableau de bord',
    'admin.nav.users': 'Gestion des Utilisateurs',
    'admin.nav.animals': 'Animaux',
    'admin.nav.adoptions': 'Adoptions',
    'admin.nav.volunteers': 'Bénévoles',
    'admin.nav.settings': 'Paramètres',
    
    // Admin User Menu
    'admin.user.goToSite': 'Aller sur le site',
    'admin.user.logout': 'Déconnexion',
    'admin.user.profile': 'Profil',
    'admin.user.settings': 'Paramètres',
    
    // Admin Users Page
    'admin.users.title': 'Gestion des Utilisateurs',
    'admin.users.subtitle': 'Voir et gérer tous les utilisateurs inscrits sur la plateforme',
    'admin.users.export': 'Exporter',
    'admin.users.refresh': 'Actualiser',
    'admin.users.search.placeholder': 'Rechercher par nom, email ou organisation...',
    'admin.users.filters.allTypes': 'Tous les types',
    'admin.users.filters.allStatus': 'Tous les statuts',
    'admin.users.filters.clear': 'Effacer les filtres',
    'admin.users.loading': 'Chargement des utilisateurs...',
    'admin.users.error': 'Erreur de chargement',
    'admin.users.retry': 'Réessayer',
    'admin.users.empty': 'Aucun utilisateur trouvé',
    'admin.users.empty.description': 'Il n\'y a pas d\'utilisateurs correspondant aux critères de recherche.'
  },
  
  es: {
    // Header
    'nav.home': 'Inicio',
    'nav.adoptions': 'Adopciones',
    'nav.memories': 'Recuerdos',
    'nav.cemetery': 'Cementerio',
    'nav.contact': 'Contacto',
    'theme.toggle': 'Cambiar tema',
    'menu.open': 'Abrir menú',
    'menu.close': 'Cerrar menú',
    'skip.content': 'Ir al contenido principal',
    
    // Hero
    'hero.title': 'Encuentra tu <span class="hero__title-accent">amigo perfecto</span>',
    'hero.description': 'Plataforma dedicada exclusivamente a perros y gatos. Adopciones, salud, comunidad y recuerdos para nuestros amigos de cuatro patas.',
    'hero.btn.search': 'Buscar Adopciones',
    'hero.btn.contact': 'Contáctanos',
    
    // Services
    'services.title': 'Nuestros Servicios',
    'services.description': 'Todo lo que necesitas para tus amigos de cuatro patas',
    'services.adoptions.title': 'Adopciones',
    'services.adoptions.description': 'Encuentra tu compañero perfecto entre perros y gatos buscando una familia amorosa.',
    'services.memories.title': 'Recuerdos',
    'services.memories.description': 'Comparte momentos especiales e historias de tus amigos de cuatro patas.',
    'services.cemetery.title': 'Cementerio Virtual',
    'services.cemetery.description': 'Un lugar de paz para honrar y recordar a nuestros queridos compañeros.',
    
    // Stats
    'stats.adoptions': 'Adopciones Completadas',
    'stats.stories': 'Historias Compartidas',
    'stats.users': 'Usuarios Registrados',
    'stats.memorials': 'Memoriales Creados',
    
    // CTA
    'cta.title': '¿Listo para encontrar tu amigo?',
    'cta.description': 'Comienza tu búsqueda ahora y encuentra el compañero perfecto para tu familia.',
    'cta.btn.start': 'Comenzar Búsqueda',
    'cta.btn.contact': 'Contáctanos',
    
    // Footer
    'footer.description': 'Plataforma dedicada exclusivamente a perros y gatos. Adopciones, salud, comunidad y recuerdos para nuestros amigos de cuatro patas.',
    'footer.navigation': 'Navegación',
    'footer.services': 'Servicios',
    'footer.support': 'Soporte',
    'footer.services.management': 'Gestión de Adopciones',
    'footer.services.health': 'Registro de Salud',
    'footer.services.community': 'Comunidad Pet',
    'footer.services.memorial': 'Memorial Virtual',
    'footer.support.help': 'Centro de Ayuda',
    'footer.support.faq': 'FAQ',
    'footer.support.privacy': 'Privacidad',
    'footer.support.terms': 'Términos',
    'footer.copyright': 'Todos los derechos reservados.',
    'footer.social.facebook': 'Facebook',
    'footer.social.instagram': 'Instagram',
    'footer.social.twitter': 'Twitter',
    
    // Language
    'lang.current': 'Español',
    'lang.select': 'Seleccionar idioma',
    
    // Authentication
    'auth.register.title': 'Registro',
    'auth.register.subtitle': 'Crea tu cuenta para acceder a la plataforma dedicada a perros y gatos',
    'auth.register.userType': 'Tipo de Usuario',
    'auth.register.ownerTitle': 'Propietario',
    'auth.register.ownerDescription': 'Gestiona el perfil de tu perro o gato',
    'auth.register.associationTitle': 'Asociación',
    'auth.register.associationDescription': 'Gestiona adopciones y voluntarios',
    'auth.register.volunteerTitle': 'Voluntario',
    'auth.register.volunteerDescription': 'Ayuda en las actividades de refugio',
    'auth.userType.proprietario': 'Propietario',
    'auth.userType.associazione': 'Asociación', 
    'auth.userType.volontario': 'Voluntario',
    'auth.userType.admin': 'Administrador',
    'auth.register.firstName': 'Nombre',
    'auth.register.firstNamePlaceholder': 'Tu nombre',
    'auth.register.lastName': 'Apellido',
    'auth.register.lastNamePlaceholder': 'Tu apellido',
    'auth.register.email': 'Email',
    'auth.register.emailPlaceholder': 'Tu email',
    'auth.register.password': 'Contraseña',
    'auth.register.passwordPlaceholder': 'Crea una contraseña',
    'auth.register.passwordHelp': 'Mínimo 8 caracteres',
    'auth.register.confirmPassword': 'Confirmar Contraseña',
    'auth.register.confirmPasswordPlaceholder': 'Repite la contraseña',
    'auth.register.organizationName': 'Nombre de la Organización',
    'auth.register.organizationNamePlaceholder': 'Nombre de tu organización',
    'auth.register.vatNumber': 'Número de IVA / Código Fiscal',
    'auth.register.vatNumberPlaceholder': 'Código fiscal o P.IVA',
    'auth.register.phone': 'Teléfono',
    'auth.register.phonePlaceholder': 'Número de teléfono',
    'auth.register.privacyConsent': 'Acepto la',
    'auth.register.privacyPolicy': 'Política de Privacidad',
    'auth.register.termsConsent': 'Acepto los',
    'auth.register.termsOfService': 'Términos de Servicio',
    'auth.register.marketingConsent': 'Acepto recibir comunicaciones promocionales (opcional)',
    'auth.register.submit': 'Registrarse',
    'auth.register.processing': 'Creando cuenta...',
    'auth.register.successTitle': 'Registro completado!',
    'auth.register.successMessage': 'Te hemos enviado un email de confirmación. Haz clic en el enlace para activar tu cuenta.',
    'auth.register.hasAccount': '¿Ya tienes una cuenta?',
    'auth.register.loginLink': 'Iniciar Sesión',
    
    'auth.login.title': 'Iniciar Sesión',
    'auth.login.subtitle': 'Bienvenido a la plataforma dedicada a perros y gatos',
    'auth.login.email': 'Email',
    'auth.login.emailPlaceholder': 'Tu email',
    'auth.login.password': 'Contraseña',
    'auth.login.passwordPlaceholder': 'Tu contraseña',
    'auth.login.rememberMe': 'Recuérdame',
    'auth.login.forgotPassword': '¿Contraseña olvidada?',
    'auth.login.submit': 'Iniciar Sesión',
    'auth.login.processing': 'Iniciando sesión...',
    'auth.login.activationTitle': 'Cuenta no activada',
    'auth.login.activationMessage': 'Tu cuenta no ha sido activada todavía. Revisa tu email y haz clic en el enlace de activación.',
    'auth.login.resendActivation': 'Reenviar email',
    'auth.login.noAccount': '¿No tienes una cuenta?',
    'auth.login.registerLink': 'Registrarse',
    'auth.login.demoTitle': 'Cuenta Demo',
    'auth.login.demoProprietario': 'Propietario',
    'auth.login.demoAssociazione': 'Asociación',
    'auth.login.demoVolontario': 'Voluntario',
    
    'auth.showPassword': 'Mostrar contraseña',
    'auth.hidePassword': 'Ocultar contraseña',
    'auth.logout': 'Cerrar Sesión',
    
    // Navigation
    'nav.dashboard': 'Tablero',
    'nav.profile': 'Perfil',
    'nav.settings': 'Ajustes',
    
    // Footer
    'footer.account': 'Cuenta',
    
    // Admin Area
    'admin.dashboard.title': 'Tablero de Administración',
    'admin.dashboard.subtitle': 'Resumen general de la plataforma DogsAndCats',
    'admin.dashboard.export': 'Exportar',
    'admin.dashboard.refresh': 'Actualizar',
    'admin.dashboard.stats.totalUsers': 'Usuarios Totales',
    'admin.dashboard.stats.totalAdoptions': 'Adopciones',
    'admin.dashboard.stats.totalVolunteers': 'Voluntarios',
    'admin.dashboard.stats.totalAssociations': 'Asociaciones',
    'admin.dashboard.stats.thisMonth': 'Este mes',
    'admin.dashboard.activity.title': 'Actividad Reciente',
    'admin.dashboard.activity.viewAll': 'Ver Todo',
    'admin.dashboard.activity.loading': 'Cargando...',
    'admin.dashboard.activity.empty': 'No hay actividad reciente',
    'admin.dashboard.activity.empty.description': 'No hay actividades para mostrar por el momento.',
    'admin.dashboard.activity.error': 'Error al cargar actividades',
    'admin.dashboard.stats.error': 'Error al cargar estadísticas',
    
    // Admin Navigation
    'admin.nav.dashboard': 'Tablero',
    'admin.nav.users': 'Gestión de Usuarios',
    'admin.nav.animals': 'Animales',
    'admin.nav.adoptions': 'Adopciones',
    'admin.nav.volunteers': 'Voluntarios',
    'admin.nav.settings': 'Ajustes',
    
    // Admin User Menu
    'admin.user.goToSite': 'Ir al Sitio',
    'admin.user.logout': 'Cerrar Sesión',
    'admin.user.profile': 'Perfil',
    'admin.user.settings': 'Ajustes',
    
    // Admin Users Page
    'admin.users.title': 'Gestión de Usuarios',
    'admin.users.subtitle': 'Ver y gestionar todos los usuarios registrados en la plataforma',
    'admin.users.export': 'Exportar',
    'admin.users.refresh': 'Actualizar',
    'admin.users.search.placeholder': 'Buscar por nombre, email o organización...',
    'admin.users.filters.allTypes': 'Todos los tipos',
    'admin.users.filters.allStatus': 'Todos los estados',
    'admin.users.filters.clear': 'Limpiar filtros',
    'admin.users.loading': 'Cargando usuarios...',
    'admin.users.error': 'Error de carga',
    'admin.users.retry': 'Reintentar',
    'admin.users.empty': 'No se encontraron usuarios',
    'admin.users.empty.description': 'No hay usuarios que coincidan con los criterios de búsqueda.'
  },
  
  de: {
    // Header
    'nav.home': 'Startseite',
    'nav.adoptions': 'Adoptionen',
    'nav.memories': 'Erinnerungen',
    'nav.cemetery': 'Friedhof',
    'nav.contact': 'Kontakt',
    'theme.toggle': 'Design wechseln',
    'menu.open': 'Menü öffnen',
    'menu.close': 'Menü schließen',
    'skip.content': 'Zum Hauptinhalt springen',
    
    // Hero
    'hero.title': 'Finde deinen <span class="hero__title-accent">perfekten Freund</span>',
    'hero.description': 'Plattform ausschließlich für Hunde und Katzen. Adoptionen, Gesundheit, Gemeinschaft und Erinnerungen für unsere vierbeinigen Freunde.',
    'hero.btn.search': 'Adoptionen Suchen',
    'hero.btn.contact': 'Kontaktiere Uns',
    
    // Services
    'services.title': 'Unsere Dienste',
    'services.description': 'Alles was Sie für Ihre vierbeinigen Freunde brauchen',
    'services.adoptions.title': 'Adoptionen',
    'services.adoptions.description': 'Finden Sie Ihren perfekten Begleiter unter Hunden und Katzen, die eine liebevolle Familie suchen.',
    'services.memories.title': 'Erinnerungen',
    'services.memories.description': 'Teilen Sie besondere Momente und Geschichten Ihrer vierbeinigen Freunde.',
    'services.cemetery.title': 'Virtueller Friedhof',
    'services.cemetery.description': 'Ein Ort des Friedens, um unsere geliebten Begleiter zu ehren und zu erinnern.',
    
    // Stats
    'stats.adoptions': 'Abgeschlossene Adoptionen',
    'stats.stories': 'Geteilte Geschichten',
    'stats.users': 'Registrierte Benutzer',
    'stats.memorials': 'Erstellte Denkmäler',
    
    // CTA
    'cta.title': 'Bereit, deinen Freund zu finden?',
    'cta.description': 'Beginnen Sie jetzt Ihre Suche und finden Sie den perfekten Begleiter für Ihre Familie.',
    'cta.btn.start': 'Suche Beginnen',
    'cta.btn.contact': 'Kontaktiere Uns',
    
    // Footer
    'footer.description': 'Plattform ausschließlich für Hunde und Katzen. Adoptionen, Gesundheit, Gemeinschaft und Erinnerungen für unsere vierbeinigen Freunde.',
    'footer.navigation': 'Navigation',
    'footer.services': 'Dienste',
    'footer.support': 'Support',
    'footer.services.management': 'Adoptionsverwaltung',
    'footer.services.health': 'Gesundheitsregister',
    'footer.services.community': 'Haustier-Gemeinschaft',
    'footer.services.memorial': 'Virtuelles Denkmal',
    'footer.support.help': 'Hilfezentrum',
    'footer.support.faq': 'FAQ',
    'footer.support.privacy': 'Datenschutz',
    'footer.support.terms': 'Bedingungen',
    'footer.copyright': 'Alle Rechte vorbehalten.',
    'footer.social.facebook': 'Facebook',
    'footer.social.instagram': 'Instagram',
    'footer.social.twitter': 'Twitter',
    
    // Language
    'lang.current': 'Deutsch',
    'lang.select': 'Sprache auswählen',
    
    // Authentication
    'auth.register.title': 'Registrierung',
    'auth.register.subtitle': 'Erstellen Sie Ihr Konto, um auf die Plattform für Hunde und Katzen zuzugreifen',
    'auth.register.userType': 'Benutzer-Typ',
    'auth.register.ownerTitle': 'Eigentümer',
    'auth.register.ownerDescription': 'Verwalten Sie das Profil Ihres Hundes oder Ihres Katzes',
    'auth.register.associationTitle': 'Verein',
    'auth.register.associationDescription': 'Verwalten Sie Adoptionen und Bürger',
    'auth.register.volunteerTitle': 'Bürger',
    'auth.register.volunteerDescription': 'Unterstützen Sie Aktivitäten im Tierheim',
    'auth.userType.proprietario': 'Eigentümer',
    'auth.userType.associazione': 'Verein', 
    'auth.userType.volontario': 'Bürger',
    'auth.userType.admin': 'Administrator',
    'auth.register.firstName': 'Vorname',
    'auth.register.firstNamePlaceholder': 'Ihr Vorname',
    'auth.register.lastName': 'Nachname',
    'auth.register.lastNamePlaceholder': 'Ihr Nachname',
    'auth.register.email': 'Email',
    'auth.register.emailPlaceholder': 'Ihre Email',
    'auth.register.password': 'Passwort',
    'auth.register.passwordPlaceholder': 'Erstellen Sie ein Passwort',
    'auth.register.passwordHelp': 'Mindestens 8 Zeichen',
    'auth.register.confirmPassword': 'Passwort bestätigen',
    'auth.register.confirmPasswordPlaceholder': 'Passwort wiederholen',
    'auth.register.organizationName': 'Organisationsname',
    'auth.register.organizationNamePlaceholder': 'Name Ihrer Organisation',
    'auth.register.vatNumber': 'Umsatzsteuer-ID / Steuer-ID',
    'auth.register.vatNumberPlaceholder': 'Steuer-ID oder P.IVA',
    'auth.register.phone': 'Telefon',
    'auth.register.phonePlaceholder': 'Telefonnummer',
    'auth.register.privacyConsent': 'Ich akzeptiere die',
    'auth.register.privacyPolicy': 'Datenschutzerklärung',
    'auth.register.termsConsent': 'Ich akzeptiere die',
    'auth.register.termsOfService': 'Nutzungsbedingungen',
    'auth.register.marketingConsent': 'Ich stimme der Empfang von Werbekommunikationen zu (optional)',
    'auth.register.submit': 'Registrieren',
    'auth.register.processing': 'Konto erstellen...',
    'auth.register.successTitle': 'Registrierung erfolgreich!',
    'auth.register.successMessage': 'Wir haben Ihnen eine Bestätigungs-E-Mail gesendet. Klicken Sie auf den Link, um Ihr Konto zu aktivieren.',
    'auth.register.hasAccount': 'Sie haben bereits ein Konto?',
    'auth.register.loginLink': 'Anmelden',
    
    'auth.login.title': 'Anmeldung',
    'auth.login.subtitle': 'Willkommen bei der Plattform für Hunde und Katzen',
    'auth.login.email': 'Email',
    'auth.login.emailPlaceholder': 'Ihre Email',
    'auth.login.password': 'Passwort',
    'auth.login.passwordPlaceholder': 'Ihr Passwort',
    'auth.login.rememberMe': 'Angemeldet bleiben',
    'auth.login.forgotPassword': 'Passwort vergessen?',
    'auth.login.submit': 'Anmelden',
    'auth.login.processing': 'Anmeldung...',
    'auth.login.activationTitle': 'Konto nicht aktiviert',
    'auth.login.activationMessage': 'Ihr Konto wurde noch nicht aktiviert. Bitte überprüfen Sie Ihre E-Mail und klicken Sie auf den Aktivierungslink.',
    'auth.login.resendActivation': 'E-Mail erneut senden',
    'auth.login.noAccount': 'Sie haben noch kein Konto?',
    'auth.login.registerLink': 'Registrieren',
    'auth.login.demoTitle': 'Demo-Konto',
    'auth.login.demoProprietario': 'Eigentümer',
    'auth.login.demoAssociazione': 'Verein',
    'auth.login.demoVolontario': 'Bürger',
    
    'auth.showPassword': 'Passwort anzeigen',
    'auth.hidePassword': 'Passwort verstecken',
    'auth.logout': 'Abmelden',
    
    // Navigation
    'nav.dashboard': 'Startseite',
    'nav.profile': 'Profil',
    'nav.settings': 'Einstellungen',
    
    // Footer
    'footer.account': 'Konto',
    
    // Admin Area
    'admin.dashboard.title': 'Admin-Startseite',
    'admin.dashboard.subtitle': 'Allgemeiner Überblick der DogsAndCats-Plattform',
    'admin.dashboard.export': 'Exportieren',
    'admin.dashboard.refresh': 'Aktualisieren',
    'admin.dashboard.stats.totalUsers': 'Gesamte Benutzer',
    'admin.dashboard.stats.totalAdoptions': 'Adoptionen',
    'admin.dashboard.stats.totalVolunteers': 'Bürger',
    'admin.dashboard.stats.totalAssociations': 'Vereine',
    'admin.dashboard.stats.thisMonth': 'Dieser Monat',
    'admin.dashboard.activity.title': 'Aktuelle Aktivität',
    'admin.dashboard.activity.viewAll': 'Alle anzeigen',
    'admin.dashboard.activity.loading': 'Lädt...',
    'admin.dashboard.activity.empty': 'Keine aktuelle Aktivität',
    'admin.dashboard.activity.empty.description': 'Es gibt keine Aktivitäten zum Anzeigen.',
    'admin.dashboard.activity.error': 'Fehler beim Laden der Aktivitäten',
    'admin.dashboard.stats.error': 'Fehler beim Laden der Statistiken',
    
    // Admin Navigation
    'admin.nav.dashboard': 'Startseite',
    'admin.nav.users': 'Benutzerverwaltung',
    'admin.nav.animals': 'Tiere',
    'admin.nav.adoptions': 'Adoptionen',
    'admin.nav.volunteers': 'Bürger',
    'admin.nav.settings': 'Einstellungen',
    
    // Admin User Menu
    'admin.user.goToSite': 'Zur Website gehen',
    'admin.user.logout': 'Abmelden',
    'admin.user.profile': 'Profil',
    'admin.user.settings': 'Einstellungen',
    
    // Admin Users Page
    'admin.users.title': 'Benutzerverwaltung',
    'admin.users.subtitle': 'Alle registrierten Benutzer auf der Plattform anzeigen und verwalten',
    'admin.users.export': 'Exportieren',
    'admin.users.refresh': 'Aktualisieren',
    'admin.users.search.placeholder': 'Nach Namen, E-Mail oder Organisation suchen...',
    'admin.users.filters.allTypes': 'Alle Typen',
    'admin.users.filters.allStatus': 'Alle Status',
    'admin.users.filters.clear': 'Filter löschen',
    'admin.users.loading': 'Benutzer lädt...',
    'admin.users.error': 'Ladefehler',
    'admin.users.retry': 'Erneut versuchen',
    'admin.users.empty': 'Keine Benutzer gefunden',
    'admin.users.empty.description': 'Es gibt keine Benutzer, die den Suchkriterien entsprechen.'
  }
};

// Configurazione lingue supportate
const supportedLanguages = {
  'it': { name: 'Italiano', flag: '🇮🇹' },
  'en': { name: 'English', flag: '🇬��' },
  'fr': { name: 'Français', flag: '🇫🇷' },
  'es': { name: 'Español', flag: '🇪🇸' },
  'de': { name: 'Deutsch', flag: '🇩🇪' }
};

// Classe per la gestione i18n
class I18n {
  constructor() {
    this.translations = translations;
    this.supportedLanguages = supportedLanguages;
    this.currentLanguage = this.detectLanguage();
  }
  
  // Rileva la lingua del browser o usa quella salvata
  detectLanguage() {
    const saved = localStorage.getItem('language');
    if (saved && this.isSupported(saved)) {
      return saved;
    }
    
    const browser = navigator.language.split('-')[0];
    return this.isSupported(browser) ? browser : 'it';
  }
  
  // Verifica se la lingua è supportata
  isSupported(lang) {
    return this.translations && lang in this.translations;
  }
  
  // Cambia lingua
  setLanguage(lang) {
    if (!this.isSupported(lang)) {
      console.warn(`Language ${lang} not supported`);
      return;
    }
    
    this.currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    this.translatePage();
    this.updateLanguageSelector();
    
    console.log(`Language changed to: ${lang}`);
  }
  
  // Ottiene una traduzione
  t(key, params = {}) {
    const translation = this.translations[this.currentLanguage]?.[key] || key;
    
    // Sostituisce i parametri nella traduzione
    return Object.keys(params).reduce((str, param) => {
      return str.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
    }, translation);
  }
  
  // Traduce tutta la pagina
  translatePage() {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);
      
      if (element.getAttribute('data-i18n-html') === 'true') {
        element.innerHTML = translation;
      } else {
        element.textContent = translation;
      }
    });
    
    // Traduce gli attributi
    const attrElements = document.querySelectorAll('[data-i18n-attr]');
    attrElements.forEach(element => {
      const attrData = element.getAttribute('data-i18n-attr');
      const [attr, key] = attrData.split(':');
      element.setAttribute(attr, this.t(key));
    });
  }
  
  // Aggiorna il selettore di lingua
  updateLanguageSelector() {
    const currentLangElement = document.querySelector('[data-js="current-lang"]');
    
    if (currentLangElement && this.supportedLanguages[this.currentLanguage]) {
      const lang = this.supportedLanguages[this.currentLanguage];
      currentLangElement.innerHTML = `${lang.flag} <span class="lang-selector__text">${lang.name}</span>`;
    }
  }
  
  // Inizializza il sistema i18n
  init() {
    document.documentElement.lang = this.currentLanguage;
    this.translatePage();
    this.setupLanguageSelector();
    this.updateLanguageSelector();
    
    console.log(`i18n initialized with language: ${this.currentLanguage}`);
  }
  
  // Configura il selettore di lingua
  setupLanguageSelector() {
    const languageSelector = document.querySelector('[data-js="language-selector"]');
    const languageOptions = document.querySelector('[data-js="language-options"]');
    
    if (!languageSelector || !languageOptions) return;
    
    // Popola le opzioni di lingua
    languageOptions.innerHTML = '';
    Object.entries(this.supportedLanguages).forEach(([code, lang]) => {
      const option = document.createElement('button');
      option.className = 'lang-selector__option';
      option.setAttribute('data-lang', code);
      option.innerHTML = `${lang.flag} ${lang.name}`;
      option.addEventListener('click', () => {
        this.setLanguage(code);
        this.closeLangSelector();
      });
      languageOptions.appendChild(option);
    });
    
    // Toggle del dropdown
    const toggleButton = languageSelector.querySelector('[data-js="lang-toggle"]');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        this.toggleLangSelector();
      });
    }
    
    // Chiudi quando si clicca fuori
    document.addEventListener('click', (e) => {
      if (!languageSelector.contains(e.target)) {
        this.closeLangSelector();
      }
    });
  }
  
  toggleLangSelector() {
    const languageSelector = document.querySelector('[data-js="language-selector"]');
    const isOpen = languageSelector.classList.contains('lang-selector--open');
    
    if (isOpen) {
      this.closeLangSelector();
    } else {
      this.openLangSelector();
    }
  }
  
  openLangSelector() {
    const languageSelector = document.querySelector('[data-js="language-selector"]');
    const toggleButton = document.querySelector('[data-js="lang-toggle"]');
    
    languageSelector.classList.add('lang-selector--open');
    toggleButton.setAttribute('aria-expanded', 'true');
  }
  
  closeLangSelector() {
    const languageSelector = document.querySelector('[data-js="language-selector"]');
    const toggleButton = document.querySelector('[data-js="lang-toggle"]');
    
    languageSelector.classList.remove('lang-selector--open');
    toggleButton.setAttribute('aria-expanded', 'false');
  }
}

// Inizializza il sistema i18n quando il DOM è pronto
document.addEventListener('DOMContentLoaded', function() {
  window.i18n = new I18n();
}); 
# User Stories - Piattaforma dogsandcats

Le user stories qui di seguito riflettono l’Analisi Funzionale per la gestione di **cani** e **gatti**, suddivise per modulo e complete di Acceptance Criteria.

---

## A. Autenticazione & Profili Utente

1. **Registrazione Nuovo Utente**
   **Come** utente (associazione, volontario, proprietario)
   **Voglio** registrarmi con email e password
   **Così da** accedere all’area riservata
   **Acceptance Criteria**:

   * Given l’utente inserisce email valida e password ≥ 8 caratteri
   * When clicca “Registrati”
   * Then riceve email di conferma e attivazione account

2. **Login Utente**
   **Come** utente registrato
   **Voglio** effettuare il login con le mie credenziali
   **Così da** entrare nella dashboard appropriata
   **Acceptance Criteria**:

   * Given inserisce email e password corrette
   * When invia il form di login
   * Then viene reindirizzato alla dashboard del proprio ruolo

3. **Gestione Profilo**
   **Come** utente autenticato
   **Voglio** modificare nome, contatti e immagine del mio profilo
   **Così da** mantenere aggiornate le mie informazioni
   **Acceptance Criteria**:

   * Given si trova nella pagina “Profilo”
   * When aggiorna i campi obbligatori e salva
   * Then il sistema mostra un messaggio di conferma e persiste i cambiamenti

---

## B. Gestione Animali (Associazioni)

4. **Creazione Scheda Animale**
   **Come** operatore di associazione
   **Voglio** inserire un nuovo cane o gatto con foto, razza, età, stato sanitario e microchip
   **Così da** renderlo visibile nella vetrina adozioni
   **Acceptance Criteria**:

   * Given compila i campi obbligatori (nome, specie, razza, età)
   * When salva la scheda
   * Then l’animale appare nell’elenco “Cani e Gatti”

5. **Modifica/Eliminazione Scheda**
   **Come** operatore di associazione
   **Voglio** aggiornare o rimuovere una scheda
   **Così da** tenere i dati sempre aggiornati
   **Acceptance Criteria**:

   * Given apre la scheda esistente
   * When clicca “Modifica” o “Elimina” e conferma
   * Then il sistema applica la modifica o elimina la scheda

6. **Lista d’Attesa Adozioni**
   **Come** operatore di associazione
   **Voglio** visualizzare le richieste di adozione in coda
   **Così da** gestire l’ordine di visita e assegnazione
   **Acceptance Criteria**:

   * Given ci sono richieste inviate dagli utenti
   * When accede alla sezione “Lista d’Attesa”
   * Then vede le richieste ordinate per data di invio

7. **Eventi Adozione**
   **Come** operatore di associazione
   **Voglio** programmare open-day e fiere con data e capienza massima
   **Così da** permettere agli utenti di iscriversi
   **Acceptance Criteria**:

   * Given inserisce titolo, data, luogo e capienza
   * When pubblica l’evento
   * Then gli utenti possono registrarsi fino al limite indicato

---

## C. Piattaforma Adozioni Pubblica

8. **Ricerca e Filtri Animali**
   **Come** visitatore o proprietario
   **Voglio** filtrare per razza, taglia, età e sterilizzazione
   **Così da** trovare l’animale ideale
   **Acceptance Criteria**:

   * Given esistono più schede attive
   * When applica i filtri e invia la ricerca
   * Then vede solo gli animali corrispondenti

9. **Modulo di Contatto**
   **Come** utente interessato
   **Voglio** inviare una richiesta d’adozione con domande guidate
   **Così da** comunicare preferenze e motivazioni
   **Acceptance Criteria**:

   * Given compila nome, email e questionario obbligatorio
   * When invia la richiesta
   * Then l’associazione riceve la mail e la richiesta compare in lista d’attesa

10. **Adoption Stories**
    **Come** visitatore
    **Voglio** leggere storie di successo con foto e testo
    **Così da** conoscere le esperienze positive
    **Acceptance Criteria**:

    * Given l’associazione ha pubblicato almeno una storia
    * When visita la sezione “Storie di Adozione”
    * Then vede titolo, immagine e anteprima con link al dettaglio

---

## D. Rubrica Volontari & Workflow

11. **Visualizzazione Rubrica**
    **Come** manager di associazione
    **Voglio** vedere volontari con stato e competenze
    **Così da** scegliere i profili adatti agli interventi
    **Acceptance Criteria**:

    * Given volontari registrati con disponibilità aggiornata
    * When accede alla rubrica
    * Then vede nome, ruolo e stato di ogni volontario

12. **Assegna Intervento**
    **Come** manager
    **Voglio** inviare incarichi con descrizione e data
    **Così da** notificare automaticamente il volontario
    **Acceptance Criteria**:

    * Given sceglie volontario e inserisce dettagli intervento
    * When conferma
    * Then volontario riceve notifica push/email e task appare nel suo calendario

13. **Monitoraggio Formazione**
    **Come** manager
    **Voglio** tracciare corsi e attività formative dei volontari
    **Così da** garantire competenze aggiornate
    **Acceptance Criteria**:

    * Given corso creato con data e descrizione
    * When un volontario si iscrive
    * Then l’iscrizione compare nella cronologia formativa

---

## E. Registro Salute & Promemoria (Proprietari)

14. **Inserimento Vaccinazione/Trattamento**
    **Come** proprietario
    **Voglio** aggiungere voci di vaccinazioni e trattamenti
    **Così da** avere il calendario salute del mio pet
    **Acceptance Criteria**:

    * Given inserisce data, tipologia e note
    * When salva
    * Then la voce compare nel calendario salute

15. **Notifiche Promemoria**
    **Come** proprietario
    **Voglio** ricevere notifiche 3 giorni prima della scadenza
    **Così da** non dimenticare le visite
    **Acceptance Criteria**:

    * Given esiste una voce con data futura
    * When mancano 3 giorni
    * Then sistema invia push/email

16. **Gestione Documenti Veterinari**
    **Come** proprietario
    **Voglio** caricare referti e certificati in PDF
    **Così da** conservarli nel profilo pet
    **Acceptance Criteria**:

    * Given PDF ≤ 5MB caricato
    * When salva
    * Then documento è scaricabile dalla scheda salute

---

## F. Profilo Pet & Feed Locale

17. **Creazione Profilo Pet**
    **Come** proprietario
    **Voglio** creare un profilo per cane/gatto con nickname, foto e bio
    **Così da** partecipare alla community
    **Acceptance Criteria**:

    * Given nickname e foto caricati
    * When salva
    * Then il profilo appare nella lista pet registrati

18. **Post & Commenti Feed Locale**
    **Come** utente registrato
    **Voglio** pubblicare post e commentare altrui
    **Così da** organizzare play-date e condividere consigli
    **Acceptance Criteria**:

    * Given testo ≥ 10 caratteri
    * When pubblico
    * Then post compare con timestamp e opzioni interattive

19. **Segnalazioni Lost & Found**
    **Come** utente
    **Voglio** segnalare pet smarrito o trovato con posizione
    **Così da** favorire il ritrovamento
    **Acceptance Criteria**:

    * Given GPS e foto inseriti
    * When salva segnalazione
    * Then alert compare sulla mappa e notifica utenti nell’area

---

## G. Sezioni Pubbliche Avanzate

20. **Sezione Adozioni**
    **Come** visitatore
    **Voglio** vedere le schede aggiornate in tempo reale dalle CRUD interne
    **Così da** consultare sempre animali disponibili
    **Acceptance Criteria**:

    * Given una scheda viene creata/modificata/eliminata
    * When visito “Adozioni”
    * Then vedo l’elenco aggiornato in real time

21. **Sezione Ricordi (Memorial)**
    **Come** proprietario o associazione
    **Voglio** pubblicare memorial con foto e testo per pet adottati
    **Così da** condividere storie di successo
    **Acceptance Criteria**:

    * Given titolo, testo e foto caricati
    * When pubblico
    * Then la storia compare nella sezione “Ricordi”

22. **Cimitero Virtuale**
    **Come** utente registrato
    **Voglio** inserire memorial permanenti per pet defunti
    **Così da** creare un ricordo duraturo
    **Acceptance Criteria**:

    * Given nome, date di vita, dedica e foto
    * When salvo
    * Then il memorial compare in “Cimitero” e può essere cercato per nome o specie

---

*Fine User Stories*
